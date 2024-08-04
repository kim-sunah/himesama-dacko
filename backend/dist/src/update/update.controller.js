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
exports.UpdateController = void 0;
const common_1 = require("@nestjs/common");
const update_service_1 = require("./update.service");
const schedule = require("node-schedule");
let UpdateController = class UpdateController {
    constructor(updateService) {
        this.updateService = updateService;
    }
    onModuleInit() {
        schedule.scheduleJob('0 0 17 1 * *', () => {
            this.ChartDataUpdate();
        });
        schedule.scheduleJob('0 0 17 * * *', () => {
            this.DailySubscriberChannelUpdate();
        });
        schedule.scheduleJob('0 0 17 * * *', () => {
            this.DailyViewChannelUpdate();
        });
        schedule.scheduleJob('0 0 17 * * *', () => {
            this.DailyVideoChannelUpdate();
        });
        schedule.scheduleJob('*/30 * * * *', () => {
            this.removeDuplicates();
        });
        schedule.scheduleJob('0 0 17 * * *', () => {
            this.DayCountUpdate();
        });
        schedule.scheduleJob('0 0 19 * * 1', () => {
            this.WeekCountUpdate();
        });
        schedule.scheduleJob('0 18 1 * * ', () => {
            this.MonthCountUpdate();
        });
        schedule.scheduleJob('0 0 * * *', () => {
            this.Clickreset();
        });
    }
    async ChartDataUpdate() {
        return await this.updateService.ChartDataUpdate();
    }
    async DailySubscriberChannelUpdate() {
        return await this.updateService.DailyChannelUpdate();
    }
    async DailyViewChannelUpdate() {
        return await this.updateService.DailyViewChannelUpdate();
    }
    async DailyVideoChannelUpdate() {
        return await this.updateService.DailyVideoChannelUpdate();
    }
    async removeDuplicates() {
        return await this.updateService.removeDuplicates();
    }
    async DayCountUpdate() {
        return await this.updateService.DayCountUpdate("Day");
    }
    async WeekCountUpdate() {
        return await this.updateService.WeekCountUpdate("Week");
    }
    async MonthCountUpdate() {
        return await this.updateService.MonthCountUpdate("Month");
    }
    async Clickreset() {
        return await this.updateService.Clickreset();
    }
};
exports.UpdateController = UpdateController;
exports.UpdateController = UpdateController = __decorate([
    (0, common_1.Controller)('update'),
    __metadata("design:paramtypes", [update_service_1.UpdateService])
], UpdateController);
//# sourceMappingURL=update.controller.js.map