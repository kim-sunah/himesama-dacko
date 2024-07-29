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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const DbOrder_dto_1 = require("../filter/dto/DbOrder.dto");
let RankingController = class RankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async DBSubscriberChannels(DbOrder, pagenumber, select) {
        return await this.rankingService.DBSubscriberChannels(DbOrder, +pagenumber, select);
    }
    async DBviewChannels(DbOrder, pagenumber, select) {
        return await this.rankingService.DBviewChannels(DbOrder, +pagenumber, select);
    }
    async DBVideoChannels(DbOrder, pagenumber, select) {
        return await this.rankingService.DBVideoChannels(DbOrder, +pagenumber, select);
    }
    async SubscriberTop() {
        return await this.rankingService.SubscriberTop();
    }
    async ViewTop() {
        return await this.rankingService.ViewTop();
    }
    async SubscriberTopIncrease() {
        return await this.rankingService.SubscriberTopIncrease();
    }
    async SubscriberLowIncrease() {
        return await this.rankingService.SubscriberlowIncrease();
    }
    async ViewTopIncrease() {
        return await this.rankingService.ViewTopIncrease();
    }
    async ViewLowIncrease() {
        return await this.rankingService.ViewlowIncrease();
    }
    async WeekSubscriberTopIncrease() {
        return await this.rankingService.WeekSubscriberTopIncrease();
    }
    async WeekSubscriberLowIncrease() {
        return await this.rankingService.WeekSubscriberlowIncrease();
    }
    async WeekViewTopIncrease() {
        return await this.rankingService.WeekViewTopIncrease();
    }
    async WeekViewLowIncrease() {
        return await this.rankingService.WeekViewlowIncrease();
    }
    async SortSubscriber(body) {
        const { sort, filter, page } = body;
        return await this.rankingService.SortSubscriber(sort, +filter, page);
    }
    async Totalsubcriberincrease(channelId) {
        return await this.rankingService.Totalsubcriberincrease(channelId);
    }
    async Totalviewincrease(channelId) {
        return await this.rankingService.Totalviewincrease(channelId);
    }
    async increaseview() {
        return await this.rankingService.increaseview();
    }
    async increaseSubscriber() {
        return await this.rankingService.increaseSubscriber();
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Post)('DBSubscriber-channels/:pagenumber'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("pagenumber")),
    __param(2, (0, common_1.Body)("select")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String, String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "DBSubscriberChannels", null);
__decorate([
    (0, common_1.Post)('DBview-channels/:pagenumber'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("pagenumber")),
    __param(2, (0, common_1.Body)("select")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String, String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "DBviewChannels", null);
__decorate([
    (0, common_1.Post)('DBVideo-channels/:pagenumber'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("pagenumber")),
    __param(2, (0, common_1.Body)("select")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String, String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "DBVideoChannels", null);
__decorate([
    (0, common_1.Get)("SubscriberTop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "SubscriberTop", null);
__decorate([
    (0, common_1.Get)("ViewTop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "ViewTop", null);
__decorate([
    (0, common_1.Get)("SubscriberTopIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "SubscriberTopIncrease", null);
__decorate([
    (0, common_1.Get)("SubscriberLowIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "SubscriberLowIncrease", null);
__decorate([
    (0, common_1.Get)("ViewTopIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "ViewTopIncrease", null);
__decorate([
    (0, common_1.Get)("ViewLowIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "ViewLowIncrease", null);
__decorate([
    (0, common_1.Get)("WeekSubscriberTopIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "WeekSubscriberTopIncrease", null);
__decorate([
    (0, common_1.Get)("WeekSubscriberLowIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "WeekSubscriberLowIncrease", null);
__decorate([
    (0, common_1.Get)("WeekViewTopIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "WeekViewTopIncrease", null);
__decorate([
    (0, common_1.Get)("WeekViewLowIncrease"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "WeekViewLowIncrease", null);
__decorate([
    (0, common_1.Post)("RankingSort"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "SortSubscriber", null);
__decorate([
    (0, common_1.Post)("Totalsubcriberincrease"),
    __param(0, (0, common_1.Body)("channelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "Totalsubcriberincrease", null);
__decorate([
    (0, common_1.Post)("Totalviewincrease"),
    __param(0, (0, common_1.Body)("channelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "Totalviewincrease", null);
__decorate([
    (0, common_1.Get)("increaseview"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "increaseview", null);
__decorate([
    (0, common_1.Get)("increaseSubscriber"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "increaseSubscriber", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map