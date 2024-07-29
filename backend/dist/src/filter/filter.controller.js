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
exports.FilterController = void 0;
const common_1 = require("@nestjs/common");
const filter_service_1 = require("./filter.service");
const create_filter_dto_1 = require("./dto/create-filter.dto");
const DbOrder_dto_1 = require("./dto/DbOrder.dto");
let FilterController = class FilterController {
    constructor(filterService) {
        this.filterService = filterService;
    }
    Filterlength(createFilterDto, search) {
        return this.filterService.Filterlength(createFilterDto, search);
    }
    FilterDuration(videoDuration, search) {
        console.log(videoDuration, search);
        return this.filterService.FilterDuration(videoDuration, search);
    }
    findOne(order, search) {
        console.log(order, search);
        return this.filterService.findOne(order, search);
    }
    async DBInfluencerOrder(DbOrder, pagenumber) {
        return this.filterService.DBInfluencerOrder(DbOrder, +pagenumber);
    }
    async YoutubeApiInfluencerOrder(YoutubeApiOrder, pagenumber) {
        return this.filterService.YoutubeApiInfluencerOrder(YoutubeApiOrder, +pagenumber);
    }
};
exports.FilterController = FilterController;
__decorate([
    (0, common_1.Post)("UploadDate/:videosearch"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('videosearch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_filter_dto_1.CreateFilterDto, String]),
    __metadata("design:returntype", void 0)
], FilterController.prototype, "Filterlength", null);
__decorate([
    (0, common_1.Post)("Duration/:videosearch"),
    __param(0, (0, common_1.Body)("videoDuration")),
    __param(1, (0, common_1.Param)("videosearch")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FilterController.prototype, "FilterDuration", null);
__decorate([
    (0, common_1.Post)('order/:videosearch'),
    __param(0, (0, common_1.Body)("order")),
    __param(1, (0, common_1.Param)('videosearch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FilterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('DBOrder/:pagenumber'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("pagenumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String]),
    __metadata("design:returntype", Promise)
], FilterController.prototype, "DBInfluencerOrder", null);
__decorate([
    (0, common_1.Post)("YoutubeAPiOrder/:pagenumber"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("pagenumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DbOrder_dto_1.InfluencerOrder, String]),
    __metadata("design:returntype", Promise)
], FilterController.prototype, "YoutubeApiInfluencerOrder", null);
exports.FilterController = FilterController = __decorate([
    (0, common_1.Controller)('filter'),
    __metadata("design:paramtypes", [filter_service_1.FilterService])
], FilterController);
//# sourceMappingURL=filter.controller.js.map