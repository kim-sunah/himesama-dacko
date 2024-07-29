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
exports.NlpController = void 0;
const common_1 = require("@nestjs/common");
const nlp_service_1 = require("./nlp.service");
let NlpController = class NlpController {
    constructor(nlpService) {
        this.nlpService = nlpService;
    }
    async tokenize(text) {
        const keywords = this.nlpService.extractKeywords(text, 6);
        const searchQuery = keywords.join(' ');
        console.log(searchQuery);
        return await this.nlpService.searchVideos(searchQuery, 5);
    }
};
exports.NlpController = NlpController;
__decorate([
    (0, common_1.Post)('tokenize'),
    __param(0, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NlpController.prototype, "tokenize", null);
exports.NlpController = NlpController = __decorate([
    (0, common_1.Controller)('nlp'),
    __metadata("design:paramtypes", [nlp_service_1.NlpService])
], NlpController);
//# sourceMappingURL=nlp.controller.js.map