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
exports.UpdateService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const videoview_entity_1 = require("../video/entities/videoview.entity");
const typeorm_2 = require("typeorm");
const videocomment_entity_1 = require("../video/entities/videocomment.entity");
const videolike_entity_1 = require("../video/entities/videolike.entity");
const video_entity_1 = require("../video/entities/video.entity");
const axios_1 = require("axios");
const channellist_entity_1 = require("../channellist/entities/channellist.entity");
const rxjs_1 = require("rxjs");
const axios_2 = require("@nestjs/axios");
const subscriber_entity_1 = require("../channellist/entities/subscriber.entity");
const view_entity_1 = require("../channellist/entities/view.entity");
const video_entity_2 = require("../channellist/entities/video.entity");
let UpdateService = class UpdateService {
    constructor(videoviewRepository, videocommentRepository, videolikeRepository, VideoRepository, ChannelListRepository, SubscriberCountRepository, ViewCountRepository, VideoCountRepository, configService, httpService) {
        this.videoviewRepository = videoviewRepository;
        this.videocommentRepository = videocommentRepository;
        this.videolikeRepository = videolikeRepository;
        this.VideoRepository = VideoRepository;
        this.ChannelListRepository = ChannelListRepository;
        this.SubscriberCountRepository = SubscriberCountRepository;
        this.ViewCountRepository = ViewCountRepository;
        this.VideoCountRepository = VideoCountRepository;
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger("UpdateService");
        this.BATCH_SIZE = 100;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async ChartDataUpdate() {
        const VideoData = await this.VideoRepository.find();
        for (const Data of VideoData) {
            await this.delay(250);
            const VideoView = await this.videoviewRepository.findOne({ where: { videoId: Data.id } });
            const Videocomment = await this.videocommentRepository.findOne({ where: { videoId: Data.id } });
            const Videolike = await this.videolikeRepository.findOne({ where: { videoId: Data.id } });
            const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${Data.videoid}&key=${process.env.Youtbe_Api_KEY}`);
            const channelData = response.data;
            await this.videoviewRepository.update(Data.id, {
                Twelve_Month_Ago: +VideoView.Eleven_Month_Ago,
                Eleven_Month_Ago: +VideoView.Ten_Month_Ago,
                Ten_Month_Ago: +VideoView.Nine_Month_Ago,
                Nine_Month_Ago: +VideoView.Eigth_Month_Ago,
                Eigth_Month_Ago: +VideoView.Seven_Month_Ago,
                Seven_Month_Ago: +VideoView.Six_Month_Ago,
                Six_Month_Ago: +VideoView.Five_Month_Ago,
                Five_Month_Ago: +VideoView.Four_Month_Ago,
                Four_Month_Ago: +VideoView.Three_Month_Ago,
                Three_Month_Ago: +VideoView.Two_Month_Ago,
                Two_Month_Ago: +VideoView.One_Month_Ago,
                One_Month_Ago: +VideoView.today,
                today: +channelData.items[0].statistics.viewCount
            });
            await this.videocommentRepository.update(Data.id, {
                Twelve_Month_Ago: +Videocomment.Eleven_Month_Ago,
                Eleven_Month_Ago: +Videocomment.Ten_Month_Ago,
                Ten_Month_Ago: +Videocomment.Nine_Month_Ago,
                Nine_Month_Ago: +Videocomment.Eigth_Month_Ago,
                Eigth_Month_Ago: +Videocomment.Seven_Month_Ago,
                Seven_Month_Ago: +Videocomment.Six_Month_Ago,
                Six_Month_Ago: +Videocomment.Five_Month_Ago,
                Five_Month_Ago: +Videocomment.Four_Month_Ago,
                Four_Month_Ago: +Videocomment.Three_Month_Ago,
                Three_Month_Ago: +Videocomment.Two_Month_Ago,
                Two_Month_Ago: +Videocomment.One_Month_Ago,
                One_Month_Ago: +Videocomment.today,
                today: +channelData.items[0].statistics.commentCount
            });
            await this.videolikeRepository.update(Data.id, {
                Twelve_Month_Ago: +Videolike.Eleven_Month_Ago,
                Eleven_Month_Ago: +Videolike.Ten_Month_Ago,
                Ten_Month_Ago: +Videolike.Nine_Month_Ago,
                Nine_Month_Ago: +Videolike.Eigth_Month_Ago,
                Eigth_Month_Ago: +Videolike.Seven_Month_Ago,
                Seven_Month_Ago: +Videolike.Six_Month_Ago,
                Six_Month_Ago: +Videolike.Five_Month_Ago,
                Five_Month_Ago: +Videolike.Four_Month_Ago,
                Four_Month_Ago: +Videolike.Three_Month_Ago,
                Three_Month_Ago: +Videolike.Two_Month_Ago,
                Two_Month_Ago: +Videolike.One_Month_Ago,
                One_Month_Ago: +Videolike.today,
                today: +channelData.items[0].statistics.likeCount
            });
        }
    }
    async getChannelInfo(ChannelId) {
        return await axios_1.default.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelId}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`);
    }
    async DailyChannelUpdate() {
        const SubscriberCountData = await this.SubscriberCountRepository.find();
        for (let i = 0; i < SubscriberCountData.length; i += this.BATCH_SIZE) {
            const batch = SubscriberCountData.slice(i, i + this.BATCH_SIZE);
            await this.DayilySubscriberprocessBatch(batch);
        }
    }
    async DayilySubscriberprocessBatch(batch) {
        const updatePromises = batch.map(info => this.SubscriberUpdate(info));
        await Promise.all(updatePromises);
    }
    async SubscriberUpdate(info) {
        const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } });
        const [channelInfo] = await Promise.all([
            this.getChannelInfo(channelId.Channel_Id),
        ]);
        const Subscriber = await this.SubscriberCountRepository.findOne({ where: { id: info.id } });
        await this.SubscriberCountRepository.update(info.id, {
            Twenty_nine_day_Ago: Subscriber.Twenty_eigth_day_Ago,
            Twenty_eigth_day_Ago: Subscriber.Twenty_seven_day_Ago,
            Twenty_seven_day_Ago: Subscriber.Twenty_six_day_Ago,
            Twenty_six_day_Ago: Subscriber.Twenty_five_day_Ago,
            Twenty_five_day_Ago: Subscriber.Twenty_four_day_Ago,
            Twenty_four_day_Ago: Subscriber.Twenty_three_day_Ago,
            Twenty_three_day_Ago: Subscriber.Twenty_two_day_Ago,
            Twenty_two_day_Ago: Subscriber.Twenty_one_day_Ago,
            Twenty_one_day_Ago: Subscriber.Twenty_day_Ago,
            Twenty_day_Ago: Subscriber.Nineteen_day_Ago,
            Nineteen_day_Ago: Subscriber.Eigthteen_day_Ago,
            Eigthteen_day_Ago: Subscriber.seventeen_day_Ago,
            seventeen_day_Ago: Subscriber.sixteen_day_Ago,
            sixteen_day_Ago: Subscriber.fifteen_day_Ago,
            fifteen_day_Ago: Subscriber.fourteen_day_Ago,
            fourteen_day_Ago: Subscriber.thirteen_day_Ago,
            thirteen_day_Ago: Subscriber.twelve_day_Ago,
            twelve_day_Ago: Subscriber.Eleven_day_Ago,
            Eleven_day_Ago: Subscriber.Ten_day_Ago,
            Ten_day_Ago: Subscriber.Nine_day_Ago,
            Nine_day_Ago: Subscriber.Eigth_day_Ago,
            Eigth_day_Ago: Subscriber.Seven_day_Ago,
            Seven_day_Ago: Subscriber.Six_day_Ago,
            Six_day_Ago: Subscriber.Five_day_Ago,
            Five_day_Ago: Subscriber.Four_day_Ago,
            Four_day_Ago: Subscriber.Three_day_Ago,
            Three_day_Ago: Subscriber.Two_day_Ago,
            Two_day_Ago: Subscriber.One_day_Ago,
            One_day_Ago: Subscriber.Today,
            Today: +channelInfo.data.items[0].statistics.subscriberCount
        });
    }
    async DailyViewChannelUpdate() {
        const ViewRepository = await this.ViewCountRepository.find();
        for (let i = 0; i < ViewRepository.length; i += this.BATCH_SIZE) {
            const batch = ViewRepository.slice(i, i + this.BATCH_SIZE);
            await this.DayilyViewprocessBatch(batch);
        }
    }
    async DayilyViewprocessBatch(batch) {
        const updatePromises = batch.map(info => this.ViewUpdate(info));
        await Promise.all(updatePromises);
    }
    async ViewUpdate(info) {
        const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } });
        const [channelInfo] = await Promise.all([
            this.getChannelInfo(channelId.Channel_Id),
        ]);
        const View = await this.ViewCountRepository.findOne({ where: { id: info.id } });
        await this.ViewCountRepository.update(info.id, {
            Twenty_nine_day_Ago: View.Twenty_eigth_day_Ago,
            Twenty_eigth_day_Ago: View.Twenty_seven_day_Ago,
            Twenty_seven_day_Ago: View.Twenty_six_day_Ago,
            Twenty_six_day_Ago: View.Twenty_five_day_Ago,
            Twenty_five_day_Ago: View.Twenty_four_day_Ago,
            Twenty_four_day_Ago: View.Twenty_three_day_Ago,
            Twenty_three_day_Ago: View.Twenty_two_day_Ago,
            Twenty_two_day_Ago: View.Twenty_one_day_Ago,
            Twenty_one_day_Ago: View.Twenty_day_Ago,
            Twenty_day_Ago: View.Nineteen_day_Ago,
            Nineteen_day_Ago: View.Eigthteen_day_Ago,
            Eigthteen_day_Ago: View.seventeen_day_Ago,
            seventeen_day_Ago: View.sixteen_day_Ago,
            sixteen_day_Ago: View.fifteen_day_Ago,
            fifteen_day_Ago: View.fourteen_day_Ago,
            fourteen_day_Ago: View.thirteen_day_Ago,
            thirteen_day_Ago: View.twelve_day_Ago,
            twelve_day_Ago: View.Eleven_day_Ago,
            Eleven_day_Ago: View.Ten_day_Ago,
            Ten_day_Ago: View.Nine_day_Ago,
            Nine_day_Ago: View.Eigth_day_Ago,
            Eigth_day_Ago: View.Seven_day_Ago,
            Seven_day_Ago: View.Six_day_Ago,
            Six_day_Ago: View.Five_day_Ago,
            Five_day_Ago: View.Four_day_Ago,
            Four_day_Ago: View.Three_day_Ago,
            Three_day_Ago: View.Two_day_Ago,
            Two_day_Ago: View.One_day_Ago,
            One_day_Ago: View.Today,
            Today: +channelInfo.data.items[0].statistics.viewCount
        });
    }
    async DailyVideoChannelUpdate() {
        const VideoRepository = await this.VideoCountRepository.find();
        for (let i = 0; i < VideoRepository.length; i += this.BATCH_SIZE) {
            const batch = VideoRepository.slice(i, i + this.BATCH_SIZE);
            await this.DayilyVideoprocessBatch(batch);
        }
    }
    async DayilyVideoprocessBatch(batch) {
        const updatePromises = batch.map(info => this.VideoUpdate(info));
        await Promise.all(updatePromises);
    }
    async VideoUpdate(info) {
        const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } });
        const [channelInfo] = await Promise.all([
            this.getChannelInfo(channelId.Channel_Id),
        ]);
        const Video = await this.VideoCountRepository.findOne({ where: { id: info.id } });
        await this.VideoCountRepository.update(info.id, {
            Twenty_nine_day_Ago: Video.Twenty_eigth_day_Ago,
            Twenty_eigth_day_Ago: Video.Twenty_seven_day_Ago,
            Twenty_seven_day_Ago: Video.Twenty_six_day_Ago,
            Twenty_six_day_Ago: Video.Twenty_five_day_Ago,
            Twenty_five_day_Ago: Video.Twenty_four_day_Ago,
            Twenty_four_day_Ago: Video.Twenty_three_day_Ago,
            Twenty_three_day_Ago: Video.Twenty_two_day_Ago,
            Twenty_two_day_Ago: Video.Twenty_one_day_Ago,
            Twenty_one_day_Ago: Video.Twenty_day_Ago,
            Twenty_day_Ago: Video.Nineteen_day_Ago,
            Nineteen_day_Ago: Video.Eigthteen_day_Ago,
            Eigthteen_day_Ago: Video.seventeen_day_Ago,
            seventeen_day_Ago: Video.sixteen_day_Ago,
            sixteen_day_Ago: Video.fifteen_day_Ago,
            fifteen_day_Ago: Video.fourteen_day_Ago,
            fourteen_day_Ago: Video.thirteen_day_Ago,
            thirteen_day_Ago: Video.twelve_day_Ago,
            twelve_day_Ago: Video.Eleven_day_Ago,
            Eleven_day_Ago: Video.Ten_day_Ago,
            Ten_day_Ago: Video.Nine_day_Ago,
            Nine_day_Ago: Video.Eigth_day_Ago,
            Eigth_day_Ago: Video.Seven_day_Ago,
            Seven_day_Ago: Video.Six_day_Ago,
            Six_day_Ago: Video.Five_day_Ago,
            Five_day_Ago: Video.Four_day_Ago,
            Four_day_Ago: Video.Three_day_Ago,
            Three_day_Ago: Video.Two_day_Ago,
            Two_day_Ago: Video.One_day_Ago,
            One_day_Ago: Video.Today,
            Today: +channelInfo.data.items[0].statistics.videoCount
        });
    }
    async removeDuplicates() {
        await this.removeDuplicateChannels();
        await this.removeDuplicateVideos();
    }
    async removeDuplicateChannels() {
        const duplicates = await this.ChannelListRepository.query(`
      SELECT Channel_Url_Id, COUNT(*) as count
      FROM channellist
      GROUP BY Channel_Url_Id
      HAVING COUNT(*) > 1
    `);
        for (const duplicate of duplicates) {
            const [keep, ...remove] = await this.ChannelListRepository.find({
                where: { Channel_Url_Id: duplicate.Channel_Url_Id },
                order: { id: 'ASC' }
            });
            await this.ChannelListRepository.remove(remove);
        }
    }
    async removeDuplicateVideos() {
        const duplicates = await this.VideoRepository.query(`
      SELECT videoid, COUNT(*) as count
      FROM video
      GROUP BY videoid
      HAVING COUNT(*) > 1
    `);
        for (const duplicate of duplicates) {
            const [keep, ...remove] = await this.VideoRepository.find({
                where: { videoid: duplicate.videoid },
                order: { id: 'ASC' }
            });
            await this.VideoRepository.remove(remove);
        }
    }
    async DayCountUpdate(duration) {
        const channelInfo = await this.ChannelListRepository.find();
        for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
            const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
            await this.processBatch(batch, duration);
        }
    }
    async WeekCountUpdate(duration) {
        const channelInfo = await this.ChannelListRepository.find();
        for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
            const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
            await this.processBatch(batch, duration);
        }
    }
    async MonthCountUpdate(duration) {
        const channelInfo = await this.ChannelListRepository.find();
        for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
            const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
            await this.processBatch(batch, duration);
        }
    }
    async processBatch(batch, duration) {
        const updatePromises = batch.map(info => this.processChannel(info, duration));
        await Promise.all(updatePromises);
    }
    async processChannel(info, duration) {
        if (info.Channel_Url_Id === null) {
            await this.deleteChannelData(info);
        }
        else {
            await this.updateChannelData(info, duration);
        }
    }
    async deleteChannelData(info) {
        const video = await this.VideoRepository.findOne({ where: { channelId: info.id } });
        if (video) {
            await Promise.all([
                this.videoviewRepository.delete({ videoId: video.id }),
                this.videocommentRepository.delete({ videoId: video.id }),
                this.videolikeRepository.delete({ videoId: video.id }),
                this.VideoRepository.delete({ channelId: info.id }),
            ]);
        }
        await this.ChannelListRepository.delete(info.id);
    }
    async updateChannelData(info, duration) {
        const apiUrl = this.getApiUrl(info.Channel_Url_Id);
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(apiUrl));
            const channelData = response.data;
            if (channelData.pageInfo.totalResults === 0) {
                await this.ChannelListRepository.delete(info.id);
            }
            else {
                const SubscriberData = await this.SubscriberCountRepository.findOne({ where: { channelId: info.id } });
                const ViewData = await this.ViewCountRepository.findOne({ where: { channelId: info.id } });
                const newData = this.calculateNewData(info, channelData.items[0].statistics, SubscriberData, ViewData, duration);
                await this.ChannelListRepository.update(info.id, newData);
            }
        }
        catch (error) {
            this.logger.error(`Error updating channel ${info.id}: ${error.message}`);
        }
    }
    getApiUrl(channelUrlId) {
        const baseUrl = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics';
        return channelUrlId.includes('@')
            ? `${baseUrl}&forHandle=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`
            : `${baseUrl}&id=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`;
    }
    calculateNewData(info, newStats, SubscriberCount, ViewCount, duration) {
        const calculateIncrease = (newValue, oldValue) => isNaN((newValue - oldValue) / oldValue) || oldValue === 0 ? 0 : ((newValue - oldValue) / oldValue) * 100;
        if (duration === "Day") {
            return {
                subscriberCount: +newStats.subscriberCount,
                viewCount: +newStats.viewCount,
                videoCount: +newStats.videoCount,
                subscriberCount_percentageincrease: calculateIncrease(+newStats.subscriberCount, SubscriberCount.Today),
                viewCount_percentageincrease: calculateIncrease(+newStats.viewCount, +ViewCount.Today)
            };
        }
        else if (duration === "Week") {
            return {
                week_subscriberCount_percentageincrease: calculateIncrease(+SubscriberCount.Today, +SubscriberCount.Seven_day_Ago),
                week_viewCount_percentageincrease: calculateIncrease(+ViewCount.Today, +ViewCount.Seven_day_Ago)
            };
        }
        else if (duration === "Month") {
            return {
                month_subscriberCount_percentageincrease: calculateIncrease(+SubscriberCount.Today, SubscriberCount.Twenty_nine_day_Ago),
                month_viewCount_percentageincrease: calculateIncrease(+ViewCount.Today, +ViewCount.Twenty_nine_day_Ago)
            };
        }
    }
};
exports.UpdateService = UpdateService;
exports.UpdateService = UpdateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(videoview_entity_1.videoview)),
    __param(1, (0, typeorm_1.InjectRepository)(videocomment_entity_1.videocomment)),
    __param(2, (0, typeorm_1.InjectRepository)(videolike_entity_1.videolike)),
    __param(3, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(4, (0, typeorm_1.InjectRepository)(channellist_entity_1.Channellist)),
    __param(5, (0, typeorm_1.InjectRepository)(subscriber_entity_1.SubscriberCount)),
    __param(6, (0, typeorm_1.InjectRepository)(view_entity_1.ViewCount)),
    __param(7, (0, typeorm_1.InjectRepository)(video_entity_2.VideoCount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService, axios_2.HttpService])
], UpdateService);
//# sourceMappingURL=update.service.js.map