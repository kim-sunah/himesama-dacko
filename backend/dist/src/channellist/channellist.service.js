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
exports.ChannellistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channellist_entity_1 = require("./entities/channellist.entity");
const filter_service_1 = require("../filter/filter.service");
const axios_1 = require("axios");
const video_entity_1 = require("../video/entities/video.entity");
const subscriber_entity_1 = require("./entities/subscriber.entity");
const view_entity_1 = require("./entities/view.entity");
const video_entity_2 = require("./entities/video.entity");
const search_entity_1 = require("../search/entities/search.entity");
const auth_entity_1 = require("../auth/entities/auth.entity");
let ChannellistService = class ChannellistService {
    constructor(channelList, FilterService, VideoRepository, SubscriberRepository, ViewRepository, VideoCountRepository, SearchRepository, AuthRepository) {
        this.channelList = channelList;
        this.FilterService = FilterService;
        this.VideoRepository = VideoRepository;
        this.SubscriberRepository = SubscriberRepository;
        this.ViewRepository = ViewRepository;
        this.VideoCountRepository = VideoCountRepository;
        this.SearchRepository = SearchRepository;
        this.AuthRepository = AuthRepository;
    }
    async Getvideosearch(search, req) {
        if (req.session.user) {
            const user = await this.AuthRepository.findOne({ where: { id: +req.session.user.userId } });
            const searchData = await this.SearchRepository.findOne({ where: { auth: user } });
            if (searchData) {
                await this.SearchRepository.update({ id: searchData.id }, { search: search });
            }
            else {
                const searchuser = await this.SearchRepository.create({ search: search, auth: user });
                await this.SearchRepository.save(searchuser);
            }
        }
        const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
        const resData = response.data;
        return await this.FilterService.videoFilter(resData);
    }
    async searchchannel(Channel_Url_Id) {
        return await this.channelList.findOne({ where: { Channel_Url_Id: Channel_Url_Id } });
    }
    async channelInfo(channelId) {
        return await this.channelList.findOne({ where: { Channel_Id: channelId } });
    }
    async Channel_VideoCount() {
        const lastChannel = await this.channelList.find({
            order: { id: 'DESC' },
            take: 1,
        });
        const lastVideo = await this.VideoRepository.find({
            order: { id: 'DESC' },
            take: 1,
        });
        if (lastChannel.length > 0 && lastVideo.length > 0) {
            return { lastChannel: lastChannel[0].id, lastVideo: lastVideo[0].id };
        }
        return { lastChannel: 0, lastVideo: 0 };
    }
    async YoutubeApiGetChannel(YoutubeChannelApi, search) {
        const ChannelData = [];
        let nextPageToken = '';
        const maxFetchCount = YoutubeChannelApi.accurate_search ? Infinity : 5;
        const batchSize = 50;
        const processChannels = async (items) => {
            const channelIds = items.map(item => item.snippet.channelId).join(',');
            const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${process.env.Youtbe_Api_KEY}`);
            const channelsData = response.data.items;
            const newChannels = [];
            const dbOperations = [];
            for (const channel of channelsData) {
                const channelData = {
                    Channel_nickname: channel.snippet.title,
                    Channel_Id: channel.id,
                    Channel_Url_Id: channel.snippet.customUrl,
                    channel_img: channel.snippet.thumbnails.high.url,
                    subscriberCount: +channel.statistics.subscriberCount,
                    videoCount: +channel.statistics.videoCount,
                    viewCount: +channel.statistics.viewCount,
                };
                if (this.meetsFilterCriteria(channelData, YoutubeChannelApi) && !ChannelData.some(c => c.Channel_Url_Id === channelData.Channel_Url_Id)) {
                    ChannelData.push(channelData);
                    newChannels.push(channelData);
                }
            }
            if (newChannels.length > 0) {
                const insertResult = await this.channelList.createQueryBuilder()
                    .insert()
                    .values(newChannels)
                    .orIgnore()
                    .execute();
                const insertedIds = insertResult.identifiers.map(identifier => identifier.id);
                const channelsWithIds = newChannels.map((channel, index) => ({
                    ...channel,
                    id: insertedIds[index]
                }));
                dbOperations.push(this.SubscriberRepository.createQueryBuilder()
                    .insert()
                    .values(channelsWithIds.map(c => ({ Today: c.subscriberCount, channelId: c.id })))
                    .execute(), this.VideoCountRepository.createQueryBuilder()
                    .insert()
                    .values(channelsWithIds.map(c => ({ Today: c.videoCount, channelId: c.id })))
                    .execute(), this.ViewRepository.createQueryBuilder()
                    .insert()
                    .values(channelsWithIds.map(c => ({ Today: c.viewCount, channelId: c.id })))
                    .execute());
            }
            await Promise.all(dbOperations);
        };
        for (let fetchCount = 0; fetchCount < maxFetchCount; fetchCount++) {
            const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${batchSize}&pageToken=${nextPageToken}&type=video&order=relevance&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
            const newItems = response.data;
            nextPageToken = newItems.nextPageToken;
            await processChannels(newItems.items);
            if (!nextPageToken)
                break;
        }
        return ChannelData;
    }
    meetsFilterCriteria(channel, filters) {
        return ((filters.subscriberMin === null || (channel.subscriberCount > filters.subscriberMin && channel.subscriberCount < filters.subscriberMax)) &&
            (filters.videoMin === null || (channel.videoCount > filters.videoMin && channel.videoCount < filters.videoMax)) &&
            (filters.viewMin === null || (channel.viewCount > filters.viewMin && channel.viewCount < filters.viewMax)));
    }
    async YoutubeApiGetVideo(YoutubeInfluencer, search) {
        if (YoutubeInfluencer.PageToken) {
            const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${YoutubeInfluencer.PageToken}&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
            const resData = response.data;
            return await this.FilterService.videoFilter(resData);
        }
        else if (!YoutubeInfluencer.PageToken) {
            const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
            const resData = response.data;
            return await this.FilterService.videoFilter(resData);
        }
    }
    async Live_Popular_CreateApi(ChannelId, categoryid, videoid) {
        try {
            const response = await axios_1.default.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelId}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`);
            const resData = response.data;
            if (resData.pageInfo.totalResults === 0) {
                return null;
            }
            const [videoInfo] = await Promise.all([this.FilterService.getVideoInfo(videoid)]);
            const videoData = videoInfo.data.items[0];
            const channelData = resData.items[0];
            const channelInfo = {
                categoryid: categoryid,
                Channel_nickname: channelData.snippet.title,
                Channel_Url_Id: channelData.id,
                Channel_Id: channelData.id,
                subscriberCount: +channelData.statistics.subscriberCount,
                videoCount: +channelData.statistics.videoCount,
                viewCount: +channelData.statistics.viewCount,
                channel_img: channelData.snippet.thumbnails.medium.url
            };
            const existingChannel = await this.channelList.findOne({ where: { Channel_Id: ChannelId } });
            if (!existingChannel) {
                const channelResult = await this.channelList.save(channelInfo);
                this.FilterService.findOrCreateVideo(videoData, channelResult),
                    await Promise.all([
                        this.SubscriberRepository.save({ Today: channelInfo.subscriberCount, channelId: channelResult.id }),
                        this.ViewRepository.save({ Today: channelInfo.viewCount, channelId: channelResult.id }),
                        this.VideoCountRepository.save({ Today: channelInfo.videoCount, channelId: channelResult.id }),
                    ]);
                return channelResult;
            }
            else {
                return existingChannel;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async incrementChannelClicks(ChannelId) {
        try {
            const channel = await this.channelList.findOne({ where: { Channel_Id: ChannelId } });
            console.log(channel);
            const updatedChannel = await this.channelList.update(channel.id, { today_click_count: channel.today_click_count + 1 });
            console.log(updatedChannel);
            return updatedChannel;
        }
        catch (error) {
            console.error("Error updating channel click count:", error);
            throw error;
        }
    }
    async GetTopClickedChannel() {
        try {
            const topClickedChannel = await this.channelList.find({
                take: 4,
                order: {
                    today_click_count: 'DESC'
                },
                where: {}
            });
            if (!topClickedChannel) {
                throw new Error('No channels found');
            }
            return topClickedChannel;
        }
        catch (error) {
            console.error('Error fetching top clicked channel:', error);
            throw error;
        }
    }
};
exports.ChannellistService = ChannellistService;
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChannellistService.prototype, "Getvideosearch", null);
exports.ChannellistService = ChannellistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channellist_entity_1.Channellist)),
    __param(2, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(3, (0, typeorm_1.InjectRepository)(subscriber_entity_1.SubscriberCount)),
    __param(4, (0, typeorm_1.InjectRepository)(view_entity_1.ViewCount)),
    __param(5, (0, typeorm_1.InjectRepository)(video_entity_2.VideoCount)),
    __param(6, (0, typeorm_1.InjectRepository)(search_entity_1.Search)),
    __param(7, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository, filter_service_1.FilterService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChannellistService);
//# sourceMappingURL=channellist.service.js.map