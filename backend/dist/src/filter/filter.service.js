"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channellist_entity_1 = require("../channellist/entities/channellist.entity");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const video_entity_1 = require("../video/entities/video.entity");
const videoview_entity_1 = require("../video/entities/videoview.entity");
const videocomment_entity_1 = require("../video/entities/videocomment.entity");
const videolike_entity_1 = require("../video/entities/videolike.entity");
const subscriber_entity_1 = require("../channellist/entities/subscriber.entity");
const view_entity_1 = require("../channellist/entities/view.entity");
const video_entity_2 = require("../channellist/entities/video.entity");
let FilterService = class FilterService {
    constructor(channelList, videoRepository, cacheManager, videoviewRepository, videocommentRepository, videolikeRepository, SubscriberRepository, ViewRepository, VideoCountRepository, dataSource) {
        this.channelList = channelList;
        this.videoRepository = videoRepository;
        this.cacheManager = cacheManager;
        this.videoviewRepository = videoviewRepository;
        this.videocommentRepository = videocommentRepository;
        this.videolikeRepository = videolikeRepository;
        this.SubscriberRepository = SubscriberRepository;
        this.ViewRepository = ViewRepository;
        this.VideoCountRepository = VideoCountRepository;
        this.dataSource = dataSource;
    }
    getOneHourAgo() {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        return oneHourAgo.toISOString();
    }
    async getChannelInfo(channelId) {
        return axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels`, {
            params: {
                part: 'snippet,statistics',
                id: channelId,
                key: process.env.Youtbe_Api_KEY
            }
        });
    }
    async getVideoInfo(videoId) {
        return axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet,statistics,contentDetails',
                id: videoId,
                key: process.env.Youtbe_Api_KEY
            }
        });
    }
    async videoFilter(resData) {
        try {
            const channelDataArray = await Promise.all(resData.items.map(async (info) => {
                const [channelInfo, videoInfo] = await Promise.all([
                    this.getChannelInfo(info.snippet.channelId),
                    info.id.videoId ? this.getVideoInfo(info.id.videoId) : null
                ]);
                if (!channelInfo)
                    return null;
                const channelData = channelInfo.data.items[0];
                const videoData = videoInfo.data.items[0];
                const channelUrlID = await this.findOrCreateChannel(channelData, info, videoData.snippet.categoryId);
                if (!channelUrlID)
                    return null;
                if (!info.id.videoId)
                    return null;
                const video = await this.findOrCreateVideo(videoData, channelUrlID);
                if (!video)
                    return null;
                return this.createChannelDataObject(info, channelData, videoData, video, resData);
            }));
            return channelDataArray.filter(Boolean);
        }
        catch (err) {
            console.error('Error in videoFilter:', err);
            throw err;
        }
    }
    async findOrCreateChannel(channelData, info, videocategoryId) {
        const existingChannel = await this.channelList.findOne({ where: { Channel_Url_Id: channelData.snippet.customUrl } });
        if (existingChannel) {
            return existingChannel;
        }
        else {
            if (videocategoryId === 34) {
                videocategoryId = 23;
            }
            const channelToSave = {
                categoryid: videocategoryId,
                Channel_Url_Id: channelData.snippet.customUrl,
                Channel_Id: info.snippet.channelId,
                Channel_nickname: channelData.snippet.title,
                channel_img: channelData.snippet.thumbnails.default.url,
                subscriberCount: +channelData.statistics.subscriberCount,
                videoCount: +channelData.statistics.videoCount,
                viewCount: +channelData.statistics.viewCount
            };
            const savedChannel = await this.channelList.save(channelToSave);
            if (!savedChannel.id) {
                console.error('Channel saved but id is missing');
                return null;
            }
            await Promise.all([
                this.SubscriberRepository.save({
                    Today: +channelData.statistics.subscriberCount,
                    channelId: savedChannel.id
                }),
                this.VideoCountRepository.save({
                    Today: +channelData.statistics.videoCount,
                    channelId: savedChannel.id
                }),
                this.ViewRepository.save({
                    Today: +channelData.statistics.viewCount,
                    channelId: savedChannel.id
                })
            ]);
            return savedChannel;
        }
    }
    async findOrCreateVideo(videoData, channelData) {
        const existingVideo = await this.videoRepository.findOne({ where: { videoid: videoData.id } });
        if (existingVideo)
            return existingVideo;
        console.log(videoData.id, videoData.snippet.title, videoData.snippet.publishedAt);
        const videoToSave = {
            videoid: videoData.id,
            videotitle: videoData.snippet.title,
            videopublishedAt: videoData.snippet.publishedAt,
            channelId: channelData.id
        };
        const savedVideo = await this.videoRepository.save(videoToSave);
        await Promise.all([
            this.videoviewRepository.save({ videoId: savedVideo.id, today: videoData.statistics.viewCount }),
            this.videocommentRepository.save({ videoId: savedVideo.id, today: videoData.statistics.commentCount }),
            this.videolikeRepository.save({ videoId: savedVideo.id, today: videoData.statistics.likeCount })
        ]);
        return savedVideo;
    }
    async createChannelDataObject(info, channelData, videoData, video, resData) {
        const videoview = await this.videoviewRepository.findOne({ where: { videoId: video.id } });
        const videocomment = await this.videocommentRepository.findOne({ where: { videoId: video.id } });
        const videolike = await this.videolikeRepository.findOne({ where: { videoId: video.id } });
        return {
            Channel_Url_Id: channelData.snippet.customUrl,
            channel_img: channelData.snippet.thumbnails.default.url,
            videotitle: info.snippet.title,
            Channel_Id: info.snippet.channelId,
            nextPageToken: resData.nextPageToken,
            videoId: info.id.videoId,
            publishedAt: info.snippet.publishedAt,
            channelTitle: info.snippet.channelTitle,
            thumbnails: info.snippet.thumbnails.default.url,
            viewCount: +channelData.statistics.viewCount,
            subscriberCount: +channelData.statistics.subscriberCount,
            videoCount: +channelData.statistics.videoCount,
            videoviewcount: +videoData.statistics.viewCount,
            videolikecount: +videoData.statistics.likeCount,
            videocommentcount: +videoData.statistics.commentCount,
            viewdata: this.createChartData("조회수", videoview),
            commentdata: this.createChartData("댓글수", videocomment),
            likedata: this.createChartData("좋아요", videolike)
        };
    }
    createChartData(id, data) {
        const colorMap = { "조회수": "hsl(195, 70%, 50%)", "댓글수": "hsl(26, 70%, 50%)", "좋아요": "hsl(107, 70%, 50%)" };
        return [{
                id,
                color: colorMap[id],
                data: [
                    { x: "1년전", y: +data.Twelve_Month_Ago },
                    { x: "11달전", y: +data.Eleven_Month_Ago },
                    { x: "10달전", y: +data.Ten_Month_Ago },
                    { x: "9달전", y: +data.Nine_Month_Ago },
                    { x: "8달전", y: +data.Eight_Month_Ago },
                    { x: "7달전", y: +data.Seven_Month_Ago },
                    { x: "6달전", y: +data.Six_Month_Ago },
                    { x: "5달전", y: +data.Five_Month_Ago },
                    { x: "4달전", y: +data.Four_Month_Ago },
                    { x: "3달전", y: +data.Three_Month_Ago },
                    { x: "2달전", y: +data.Two_Month_Ago },
                    { x: "1달전", y: +data.One_Month_Ago },
                    { x: "오늘", y: +data.today },
                ]
            }];
    }
    async Filterlength(createFilterDto, search) {
        try {
            if (createFilterDto.upload === "1Hour_ago") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${this.getOneHourAgo()}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (createFilterDto.upload === "Today") {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${today.toISOString()}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (createFilterDto.upload === "Month") {
                const today = new Date();
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${firstDayOfMonth.toISOString()}&publishedBefore=${lastDayOfMonth.toISOString()}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
        }
        catch (error) {
            throw new Error('Error fetching data from YouTube API: ' + error.message);
        }
    }
    async FilterDuration(videoDuration, search) {
        try {
            if (videoDuration === "short") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (videoDuration === "medium") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (videoDuration === "long") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
        }
        catch (error) {
            throw new Error('Error fetching data from YouTube API: ' + error.message);
        }
    }
    async findOne(order, search) {
        try {
            if (order === "date") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (order === "relevance") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (order === "title") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (order === "videoCount") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
            else if (order === "viewCount") {
                const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
                const resData = response.data;
                return await this.videoFilter(resData);
            }
        }
        catch (error) {
            throw new Error('Error fetching data from YouTube API: ' + error.message);
        }
    }
    async DBInfluencerOrder(dbOrder, page) {
        const where = {};
        if (dbOrder.subscriberMin !== 0 && dbOrder.subscriberMax !== 0) {
            where.subscriberCount = (0, typeorm_2.Between)(dbOrder.subscriberMin, dbOrder.subscriberMax);
        }
        if (dbOrder.viewMin !== 0 && dbOrder.viewMax !== 0) {
            where.viewCount = (0, typeorm_2.Between)(dbOrder.viewMin, dbOrder.viewMax);
        }
        if (dbOrder.videoMin !== 0 && dbOrder.videoMax !== 0) {
            where.videoCount = (0, typeorm_2.Between)(dbOrder.videoMin, dbOrder.videoMax);
        }
        const channels = await this.channelList.find({
            where: {
                ...where,
            },
            skip: (page - 1) * 10,
            take: 10
        });
        return channels;
    }
    async categoryFilter(categoryid) {
        if (categoryid === 1) {
            return "Film & Animation";
        }
        else if (categoryid === 2) {
            return "Autos & Vehicles";
        }
        else if (categoryid === 10) {
            return "Music";
        }
        else if (categoryid === 15) {
            return "Pets & Animals";
        }
        else if (categoryid === 17) {
            return "Sports";
        }
        else if (categoryid === 18) {
            return "Short Movies";
        }
        else if (categoryid === 19) {
            return "Travel & Events";
        }
        else if (categoryid === 20) {
            return "Gaming";
        }
        else if (categoryid === 21) {
            return "Videoblogging";
        }
        else if (categoryid === 22) {
            return "People & Blogs";
        }
        else if (categoryid === 23) {
            return "Comedy";
        }
        else if (categoryid === 24) {
            return "Entertainment";
        }
        else if (categoryid === 25) {
            return "News & Politics";
        }
        else if (categoryid === 26) {
            return "Film & Animation";
        }
        else if (categoryid === 27) {
            return "Film & Animation";
        }
        else if (categoryid === 28) {
            return "Film & Animation";
        }
        else if (categoryid === 30) {
            return "Film & Animation";
        }
        else if (categoryid === 31) {
            return "Film & Animation";
        }
        else if (categoryid === 32) {
            return "Film & Animation";
        }
        else if (categoryid === 33) {
            return "Film & Animation";
        }
        else if (categoryid === 34) {
            return "Film & Animation";
        }
        else if (categoryid === 35) {
            return "Film & Animation";
        }
        else if (categoryid === 36) {
            return "Film & Animation";
        }
        else if (categoryid === 37) {
            return "Film & Animation";
        }
        else if (categoryid === 38) {
            return "Film & Animation";
        }
        else if (categoryid === 39) {
            return "Film & Animation";
        }
        else if (categoryid === 40) {
            return "Film & Animation";
        }
        else if (categoryid === 41) {
            return "Film & Animation";
        }
        else if (categoryid === 42) {
            return "Film & Animation";
        }
        else if (categoryid === 43) {
            return "Film & Animation";
        }
        else if (categoryid === 44) {
            return "Film & Animation";
        }
    }
    async YoutubeApiInfluencerOrder(YoutubeAPiOrder, pagenumber) {
        console.log("Hello");
    }
};
exports.FilterService = FilterService;
exports.FilterService = FilterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channellist_entity_1.Channellist)),
    __param(1, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectRepository)(videoview_entity_1.videoview)),
    __param(4, (0, typeorm_1.InjectRepository)(videocomment_entity_1.videocomment)),
    __param(5, (0, typeorm_1.InjectRepository)(videolike_entity_1.videolike)),
    __param(6, (0, typeorm_1.InjectRepository)(subscriber_entity_1.SubscriberCount)),
    __param(7, (0, typeorm_1.InjectRepository)(view_entity_1.ViewCount)),
    __param(8, (0, typeorm_1.InjectRepository)(video_entity_2.VideoCount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], FilterService);
//# sourceMappingURL=filter.service.js.map