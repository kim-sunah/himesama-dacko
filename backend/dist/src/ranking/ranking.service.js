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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const channellist_entity_1 = require("../channellist/entities/channellist.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const axios_1 = require("axios");
const subscriber_entity_1 = require("../channellist/entities/subscriber.entity");
const view_entity_1 = require("../channellist/entities/view.entity");
const video_entity_1 = require("../channellist/entities/video.entity");
let RankingService = class RankingService {
    constructor(channelRepository, subcriberRepositry, viewRepositry, videoRepositry, cacheManager) {
        this.channelRepository = channelRepository;
        this.subcriberRepositry = subcriberRepositry;
        this.viewRepositry = viewRepositry;
        this.videoRepositry = videoRepositry;
        this.cacheManager = cacheManager;
    }
    async DBSubscriberChannels(dbOrder, page, select) {
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
        if (select === "High_Subscriber") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    subscriberCount: 'DESC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
        else if (select === "Low_Subscriber") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    subscriberCount: 'ASC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
    }
    async DBviewChannels(dbOrder, page, select) {
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
        if (select === "High_View") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    viewCount: 'DESC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
        else if (select === "Low_View") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    viewCount: 'ASC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
    }
    async DBVideoChannels(dbOrder, page, select) {
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
        if (select === "High_Videocount") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    videoCount: 'DESC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
        else if (select === "Low_Videocount") {
            return await this.channelRepository.find({
                where: {
                    ...where,
                },
                order: {
                    videoCount: 'ASC'
                },
                skip: (page - 1) * 10,
                take: 10
            });
        }
    }
    async SubscriberTop() {
        return await this.channelRepository.find({ take: 4, order: { subscriberCount: "DESC" } });
    }
    async ViewTop() {
        return await this.channelRepository.find({ take: 4, order: { viewCount: "DESC" } });
    }
    async SubscriberTopIncrease() {
        return await this.channelRepository.find({ take: 4, order: { subscriberCount_percentageincrease: "DESC" } });
    }
    async SubscriberlowIncrease() {
        return await this.channelRepository.find({ take: 4, order: { subscriberCount_percentageincrease: "asc" } });
    }
    async ViewTopIncrease() {
        return await this.channelRepository.find({ take: 4, order: { viewCount_percentageincrease: "DESC" } });
    }
    async ViewlowIncrease() {
        return await this.channelRepository.find({ take: 4, order: { viewCount_percentageincrease: "asc" } });
    }
    async WeekSubscriberTopIncrease() {
        return await this.channelRepository.find({ take: 4, order: { week_subscriberCount_percentageincrease: "DESC" } });
    }
    async WeekSubscriberlowIncrease() {
        return await this.channelRepository.find({ take: 4, order: { week_subscriberCount_percentageincrease: "asc" } });
    }
    async WeekViewTopIncrease() {
        return await this.channelRepository.find({ take: 4, order: { week_viewCount_percentageincrease: "DESC" } });
    }
    async WeekViewlowIncrease() {
        return await this.channelRepository.find({ take: 4, order: { week_viewCount_percentageincrease: "asc" } });
    }
    async SortSubscriber(sort, filter, page) {
        const take = 15;
        const skip = (page - 1) * take;
        if (sort === "subscribers") {
            if (filter === 0) {
                return await this.channelRepository.find({ take: take, skip: skip, order: { subscriberCount: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { subscriberCount: "DESC" } });
        }
        else if (sort === "videos") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { videoCount: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { videoCount: "DESC" } });
        }
        else if (sort === "views") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { viewCount: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { viewCount: "DESC" } });
        }
        else if (sort === "increase-subscribers") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { subscriberCount_percentageincrease: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { subscriberCount_percentageincrease: "DESC" } });
        }
        else if (sort === "increase-views") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { viewCount_percentageincrease: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { viewCount_percentageincrease: "DESC" } });
        }
        else if (sort === "week-increase-subscribers") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { week_subscriberCount_percentageincrease: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { week_subscriberCount_percentageincrease: "DESC" } });
        }
        else if (sort === "week-increase-views") {
            if (filter === 0) {
                return await this.channelRepository.find({ take, skip, order: { week_viewCount_percentageincrease: "DESC" } });
            }
            return await this.channelRepository.find({ where: { categoryid: filter }, take, skip, order: { week_viewCount_percentageincrease: "DESC" } });
        }
    }
    async Totalsubcriberincrease(channelId) {
        const channel = await this.channelRepository.findOne({ where: { Channel_Id: channelId } });
        const [subscribers] = await Promise.all([
            this.subcriberRepositry.findOne({ where: { channelId: channel.id } }),
        ]);
        return { subscribers };
    }
    async Totalviewincrease(channelId) {
        const channel = await this.channelRepository.findOne({ where: { Channel_Id: channelId } });
        const [views] = await Promise.all([
            this.viewRepositry.findOne({ where: { channelId: channel.id } }),
        ]);
        return { views };
    }
    async increaseview() {
        const channelInfo = await this.channelRepository.find({
            order: {
                viewCount_percentageincrease: 'DESC'
            },
            take: 50
        });
        const cachedChannelInfo = await this.cacheManager.get("IncreaseViewChannel");
        const isChanged = !cachedChannelInfo || JSON.stringify(channelInfo) !== JSON.stringify(cachedChannelInfo);
        if (!isChanged) {
            return await this.cacheManager.get("increaseview");
        }
        else {
            const channelData = [];
            for (const info of channelInfo) {
                if (info.Channel_Url_Id.includes("@")) {
                    const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
                    const resData = response.data;
                    if (resData && resData.items && resData.items.length > 0) {
                        channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
                    }
                    else {
                        continue;
                    }
                }
                else {
                    const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
                    const resData = response.data;
                    if (resData && resData.items && resData.items.length > 0) {
                        channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
                    }
                    else {
                        console.error('No channel data found or invalid response:', resData);
                    }
                }
            }
            await this.cacheManager.set("increaseview", channelData, 864000000);
            await this.cacheManager.set("IncreaseViewChannel", channelInfo, 864000000);
            return channelData;
        }
    }
    async increaseSubscriber() {
        const channelInfo = await this.channelRepository.find({
            order: {
                subscriberCount_percentageincrease: 'DESC'
            },
            take: 50
        });
        const cachedChannelInfo = await this.cacheManager.get("IncreaseSubscriberChannel");
        const isChanged = !cachedChannelInfo || JSON.stringify(channelInfo) !== JSON.stringify(cachedChannelInfo);
        if (!isChanged) {
            return await this.cacheManager.get("increaseSubscriber");
        }
        else {
            const channelData = [];
            for (const info of channelInfo) {
                if (info.Channel_Url_Id.includes("@")) {
                    const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
                    const resData = response.data;
                    if (resData && resData.items && resData.items.length > 0) {
                        channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
                    }
                    else {
                        continue;
                    }
                }
                else {
                    const response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
                    const resData = response.data;
                    if (resData && resData.items && resData.items.length > 0) {
                        channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
                    }
                    else {
                        continue;
                    }
                }
            }
            await this.cacheManager.set("increaseSubscriber", channelData, 864000000);
            await this.cacheManager.set("IncreaseSubscriberChannel", channelInfo, 864000000);
            return channelData;
        }
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channellist_entity_1.Channellist)),
    __param(1, (0, typeorm_1.InjectRepository)(subscriber_entity_1.SubscriberCount)),
    __param(2, (0, typeorm_1.InjectRepository)(view_entity_1.ViewCount)),
    __param(3, (0, typeorm_1.InjectRepository)(video_entity_1.VideoCount)),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], RankingService);
//# sourceMappingURL=ranking.service.js.map