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
exports.AppController = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    setCookie(req, res) {
        res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
        res.send('Cookie has been set');
    }
    findAll(session) {
        session.visits = "wqdsdsf123";
    }
    getCookie(res) {
        const userCookie = res.req.cookies['user'];
        res.send(`Cookie value: ${userCookie}`);
    }
    setSession(req, res) {
        req.session.user = 'CHOI';
        res.send('Session has been set');
    }
    getSession(req, res) {
        console.log(req.session.user);
        if (req.session.user) {
            return { "Session value": req.session.user };
        }
        else {
            res.status(404).send('No session data');
        }
    }
    async login(req, res) {
        console.log("HEELO");
        req.session.user = { userId: 1, username: 'john.doe' };
        res.send('Login successful');
    }
    async logout(req, res) {
        console.log("HEELO");
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Error');
            }
            else {
                res.send('Logout successful');
            }
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('set-cookie'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setCookie", null);
__decorate([
    (0, common_1.Get)("Test"),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get-cookie'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCookie", null);
__decorate([
    (0, common_1.Get)('set-session'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setSession", null);
__decorate([
    (0, common_1.Get)('get-session'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSession", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map