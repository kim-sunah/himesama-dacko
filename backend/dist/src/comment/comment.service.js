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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const typeorm_2 = require("typeorm");
const date_fns_tz_1 = require("date-fns-tz");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createcomment(createCommentDto) {
        const createAt = (0, date_fns_tz_1.format)(Date.now(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Seoul' });
        return await this.commentRepository.save({ comment: createCommentDto.comment, createAt: createAt });
    }
    async findAllcomment() {
        return await this.commentRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map