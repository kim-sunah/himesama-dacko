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
exports.ViewCount = void 0;
const typeorm_1 = require("typeorm");
const channellist_entity_1 = require("./channellist.entity");
let ViewCount = class ViewCount {
};
exports.ViewCount = ViewCount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ViewCount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Today", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "One_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Two_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Three_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Four_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Five_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Six_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Seven_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Eigth_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Nine_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Ten_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Eleven_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "twelve_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "thirteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "fourteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "fifteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "sixteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "seventeen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Eigthteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Nineteen_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_one_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_two_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_three_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_four_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_five_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_six_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_seven_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_eigth_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'bigint' }),
    __metadata("design:type", Number)
], ViewCount.prototype, "Twenty_nine_day_Ago", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ViewCount.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => channellist_entity_1.Channellist, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", channellist_entity_1.Channellist)
], ViewCount.prototype, "channel", void 0);
exports.ViewCount = ViewCount = __decorate([
    (0, typeorm_1.Entity)()
], ViewCount);
//# sourceMappingURL=view.entity.js.map