"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModule = void 0;
const common_1 = require("@nestjs/common");
const update_service_1 = require("./update.service");
const update_controller_1 = require("./update.controller");
const typeorm_1 = require("@nestjs/typeorm");
const video_entity_1 = require("../video/entities/video.entity");
const videocomment_entity_1 = require("../video/entities/videocomment.entity");
const videolike_entity_1 = require("../video/entities/videolike.entity");
const videoview_entity_1 = require("../video/entities/videoview.entity");
const channellist_entity_1 = require("../channellist/entities/channellist.entity");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const subscriber_entity_1 = require("../channellist/entities/subscriber.entity");
const view_entity_1 = require("../channellist/entities/view.entity");
const video_entity_2 = require("../channellist/entities/video.entity");
let UpdateModule = class UpdateModule {
};
exports.UpdateModule = UpdateModule;
exports.UpdateModule = UpdateModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([video_entity_1.Video, videocomment_entity_1.videocomment, videolike_entity_1.videolike, videoview_entity_1.videoview, channellist_entity_1.Channellist, subscriber_entity_1.SubscriberCount, view_entity_1.ViewCount, video_entity_2.VideoCount])],
        controllers: [update_controller_1.UpdateController],
        providers: [update_service_1.UpdateService],
    })
], UpdateModule);
//# sourceMappingURL=update.module.js.map