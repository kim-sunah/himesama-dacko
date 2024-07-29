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
exports.videocomment = void 0;
const typeorm_1 = require("typeorm");
const video_entity_1 = require("./video.entity");
let videocomment = class videocomment {
};
exports.videocomment = videocomment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], videocomment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], videocomment.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "today", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "One_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Two_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Three_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Four_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Five_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Six_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Seven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Eigth_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Nine_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Ten_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Eleven_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], videocomment.prototype, "Twelve_Month_Ago", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => video_entity_1.Video, video => video.videocomment, { onDelete: 'CASCADE' }),
    __metadata("design:type", video_entity_1.Video)
], videocomment.prototype, "video", void 0);
exports.videocomment = videocomment = __decorate([
    (0, typeorm_1.Entity)("videocomment")
], videocomment);
//# sourceMappingURL=videocomment.entity.js.map