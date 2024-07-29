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
exports.Video = void 0;
const channellist_entity_1 = require("../../channellist/entities/channellist.entity");
const typeorm_1 = require("typeorm");
const videoview_entity_1 = require("./videoview.entity");
const videocomment_entity_1 = require("./videocomment.entity");
const videolike_entity_1 = require("./videolike.entity");
let Video = class Video {
};
exports.Video = Video;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Video.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Video.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "videoid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "videotitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "videopublishedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channellist_entity_1.Channellist, (channel) => channel.video, { onDelete: 'CASCADE' }),
    __metadata("design:type", channellist_entity_1.Channellist)
], Video.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => videoview_entity_1.videoview, videoview => videoview.video),
    __metadata("design:type", videoview_entity_1.videoview)
], Video.prototype, "videoview", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => videocomment_entity_1.videocomment, videocomment => videocomment.video),
    __metadata("design:type", videocomment_entity_1.videocomment)
], Video.prototype, "videocomment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => videolike_entity_1.videolike, videolike => videolike.video),
    __metadata("design:type", videolike_entity_1.videolike)
], Video.prototype, "videolike", void 0);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)("video"),
    (0, typeorm_1.Unique)(['videoid'])
], Video);
//# sourceMappingURL=video.entity.js.map