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
exports.PopularVideoArrayDto = exports.PopularVideo = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class Thumbnail {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Thumbnail.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Thumbnail.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Thumbnail.prototype, "height", void 0);
class Thumbnails {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnail),
    __metadata("design:type", Thumbnail)
], Thumbnails.prototype, "default", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnail),
    __metadata("design:type", Thumbnail)
], Thumbnails.prototype, "medium", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnail),
    __metadata("design:type", Thumbnail)
], Thumbnails.prototype, "high", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnail),
    __metadata("design:type", Thumbnail)
], Thumbnails.prototype, "standard", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnail),
    __metadata("design:type", Thumbnail)
], Thumbnails.prototype, "maxres", void 0);
class Snippet {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Snippet.prototype, "publishedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Snippet.prototype, "channelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Snippet.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Snippet.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Thumbnails),
    __metadata("design:type", Thumbnails)
], Snippet.prototype, "thumbnails", void 0);
class ContentDetails {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetails.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetails.prototype, "dimension", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetails.prototype, "definition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetails.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContentDetails.prototype, "licensedContent", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ContentDetails.prototype, "contentRating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetails.prototype, "projection", void 0);
class PopularVideo {
}
exports.PopularVideo = PopularVideo;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PopularVideo.prototype, "kind", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PopularVideo.prototype, "etag", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PopularVideo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Snippet),
    __metadata("design:type", Snippet)
], PopularVideo.prototype, "snippet", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ContentDetails),
    __metadata("design:type", ContentDetails)
], PopularVideo.prototype, "contentDetails", void 0);
class PopularVideoArrayDto {
}
exports.PopularVideoArrayDto = PopularVideoArrayDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PopularVideo),
    __metadata("design:type", Array)
], PopularVideoArrayDto.prototype, "videos", void 0);
//# sourceMappingURL=Live_Popular_dto.js.map