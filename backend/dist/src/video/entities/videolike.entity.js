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
exports.videolike = void 0;
const typeorm_1 = require("typeorm");
const video_entity_1 = require("./video.entity");
let videolike = class videolike {
};
exports.videolike = videolike;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], videolike.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], videolike.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "today", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "One_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Two_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Three_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Four_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Five_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Six_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Seven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Eigth_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Nine_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Ten_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Eleven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videolike.prototype, "Twelve_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => video_entity_1.Video, video => video.videolike, { onDelete: 'CASCADE' }),
    __metadata("design:type", video_entity_1.Video)
], videolike.prototype, "video", void 0);
exports.videolike = videolike = __decorate([
    (0, typeorm_1.Entity)("videolike")
], videolike);
//# sourceMappingURL=videolike.entity.js.map