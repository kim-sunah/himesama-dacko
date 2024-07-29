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
exports.videoview = void 0;
const typeorm_1 = require("typeorm");
const video_entity_1 = require("./video.entity");
let videoview = class videoview {
};
exports.videoview = videoview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], videoview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], videoview.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "today", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "One_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Two_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Three_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Four_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Five_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Six_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Seven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Eigth_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Nine_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Ten_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Eleven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videoview.prototype, "Twelve_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => video_entity_1.Video, video => video.videoview, { onDelete: 'CASCADE' }),
    __metadata("design:type", video_entity_1.Video)
], videoview.prototype, "video", void 0);
exports.videoview = videoview = __decorate([
    (0, typeorm_1.Entity)('videoview')
], videoview);
//# sourceMappingURL=videoview.entity.js.map