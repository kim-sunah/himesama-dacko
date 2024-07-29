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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channellist = void 0;
const video_entity_1 = require("../../video/entities/video.entity");
const typeorm_1 = require("typeorm");
let Channellist = class Channellist {
};
exports.Channellist = Channellist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Channellist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channellist.prototype, "Channel_nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Channellist.prototype, "Channel_Url_Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channellist.prototype, "Channel_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], Channellist.prototype, "subscriberCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Channellist.prototype, "categoryid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "subscriberCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "week_subscriberCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "month_subscriberCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], Channellist.prototype, "videoCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Channellist.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "viewCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "week_viewCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Channellist.prototype, "month_viewCount_percentageincrease", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channellist.prototype, "channel_img", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => video_entity_1.Video, (video) => video.channel),
    __metadata("design:type", Array)
], Channellist.prototype, "video", void 0);
exports.Channellist = Channellist = __decorate([
    (0, typeorm_1.Entity)()
], Channellist);
//# sourceMappingURL=channellist.entity.js.map