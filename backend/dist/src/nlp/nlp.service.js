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
exports.NlpService = void 0;
const common_1 = require("@nestjs/common");
const natural = require("natural");
const axios_1 = require("axios");
let NlpService = class NlpService {
    constructor() {
        this.tokenizer = new natural.WordTokenizer();
        this.tfidf = new natural.TfIdf();
        this.koreanStopwords = [
            '이', '그', '저', '것', '수', '등', '들', '및', '에', '에서', "을", "이", '의', '가', '은', '는', '을', '를',
            '으로', '로', '에게', '뿐', '다', '와', '과', '도', '에도', '만', '까지', '마저', '조차', '보다',
            '한', '두', '세', '네', '어떤', '또', '또는', '혹은', '그리고', '하지만', '그러나', '그래서', '따라서'
        ];
    }
    processText(text) {
        const tokens = text.split(/\s+/);
        const filteredTokens = tokens.filter(token => !this.koreanStopwords.includes(token));
        return filteredTokens;
    }
    extractKeywords(text, numKeywords = 6) {
        const processedText = this.processText(text);
        if (processedText.length === 0) {
            return [];
        }
        const frequencyMap = new Map();
        processedText.forEach(word => {
            frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
        });
        return Array.from(frequencyMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, numKeywords)
            .map(item => item[0]);
    }
    async searchVideos(query, maxResults) {
        let video = [];
        console.log(query);
        const encodedQuery = encodeURIComponent(query);
        console.log(encodedQuery);
        let response;
        if (maxResults) {
            response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&type=video&q=${encodedQuery}&key=${process.env.Youtbe_Api_KEY}`);
        }
        else {
            response = await axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${encodedQuery}&key=${process.env.Youtbe_Api_KEY}`);
        }
        video = response.data.items;
        return video;
    }
};
exports.NlpService = NlpService;
exports.NlpService = NlpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NlpService);
//# sourceMappingURL=nlp.service.js.map