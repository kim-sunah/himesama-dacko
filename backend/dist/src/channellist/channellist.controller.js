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
exports.ChannellistController = void 0;
const common_1 = require("@nestjs/common");
const channellist_service_1 = require("./channellist.service");
const create_channellist_dto_1 = require("./dto/create-channellist.dto");
const Yotube_PageToken_dto_1 = require("./dto/Yotube_PageToken.dto");
const DbOrder_dto_1 = require("../filter/dto/DbOrder.dto");
let ChannellistController = class ChannellistController {
    constructor(channellistService) {
        this.channellistService = channellistService;
    }
    channelInfo(channelId) {
        return this.channellistService.channelInfo(channelId);
    }
    Getvideosearch(search, req) {
        return this.channellistService.Getvideosearch(search, req);
    }
    searchchannel(createChannellistDto) {
        return this.channellistService.searchchannel(createChannellistDto.Channel_Url_Id);
    }
    Channel_VideoCount() {
        return this.channellistService.Channel_VideoCount();
    }
    YoutubeApiGetChannel(YoutubeChannelApi, search) {
        return this.channellistService.YoutubeApiGetChannel(YoutubeChannelApi, search);
    }
    YoutubeApiGetVideo(YoutubeInfluencer, search) {
        return this.channellistService.YoutubeApiGetVideo(YoutubeInfluencer, search);
    }
    Live_Popular_CreateApi(ChannelId, categoryid, videoid) {
        return this.channellistService.Live_Popular_CreateApi(ChannelId, +categoryid, videoid);
    }
    incrementChannelClicks(ChannelId) {
        return this.channellistService.incrementChannelClicks(ChannelId);
    }
    GetTopClickedChannel() {
        return this.channellistService.GetTopClickedChannel();
    }
};
exports.ChannellistController = ChannellistController;
__decorate([
    (0, common_1.Get)(":channelId"),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "channelInfo", null);
__decorate([
    (0, common_1.Get)('channel/:videosearch'),
    __param(0, (0, common_1.Param)('videosearch')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "Getvideosearch", null);
__decorate([
    (0, common_1.Post)('searchchannel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channellist_dto_1.CreateChannellistDto]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "searchchannel", null);
__decorate([
    (0, common_1.Get)("Channel_Video/Count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "Channel_VideoCount", null);
__decorate([
    (0, common_1.Post)("YoutubeChannelApi/:search"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "YoutubeApiGetChannel", null);
__decorate([
    (0, common_1.Post)('YoutubeVideoApi/:videosearch'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('videosearch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Yotube_PageToken_dto_1.YoutubePageToken, String]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "YoutubeApiGetVideo", null);
__decorate([
    (0, common_1.Post)("LivePopularChannel"),
    __param(0, (0, common_1.Body)("ChannelId")),
    __param(1, (0, common_1.Body)("categoryid")),
    __param(2, (0, common_1.Body)("videoid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "Live_Popular_CreateApi", null);
__decorate([
    (0, common_1.Post)("incrementChannelClicks"),
    __param(0, (0, common_1.Body)("ChannelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "incrementChannelClicks", null);
__decorate([
    (0, common_1.Get)("click/GetTopClickedChannel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChannellistController.prototype, "GetTopClickedChannel", null);
exports.ChannellistController = ChannellistController = __decorate([
    (0, common_1.Controller)('channellist'),
    __metadata("design:paramtypes", [channellist_service_1.ChannellistService])
], ChannellistController);
//# sourceMappingURL=channellist.controller.js.map