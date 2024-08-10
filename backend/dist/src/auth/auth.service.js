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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const typeorm_2 = require("typeorm");
const search_entity_1 = require("../search/entities/search.entity");
let AuthService = class AuthService {
    constructor(AuthRepository, SearchRepository) {
        this.AuthRepository = AuthRepository;
        this.SearchRepository = SearchRepository;
    }
    async Kakaocreate(email, nickname, req, res) {
        const Existuser = await this.AuthRepository.findOne({ where: { email: email } });
        if (Existuser) {
            req.session.user = { userId: Existuser.id, email: Existuser.email, nickname: Existuser.nickname };
            res.send('Login successful');
            return { userId: Existuser.id, nickname: Existuser.nickname, email: Existuser.email };
        }
        const user = await this.AuthRepository.create({ email: email, nickname: nickname });
        req.session.user = { userId: user.id, email: user.email, nickname: user.nickname };
        res.send('Login successful');
        await this.AuthRepository.save(user);
        return { userId: user.id, nickname: user.nickname, email: user.email };
    }
    findAll() {
        return `This action returns all auth`;
    }
    async searchfind(id) {
        const user = await this.AuthRepository.findOne({ where: { id } });
        return await this.SearchRepository.findOne({ where: { auth: user.id } });
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __param(1, (0, typeorm_1.InjectRepository)(search_entity_1.Search)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map