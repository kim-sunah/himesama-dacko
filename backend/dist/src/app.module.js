"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const test_module_1 = require("./test/test.module");
const channellist_module_1 = require("./channellist/channellist.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const ranking_module_1 = require("./ranking/ranking.module");
const Joi = require("joi");
const schedule_1 = require("@nestjs/schedule");
const filter_module_1 = require("./filter/filter.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const video_module_1 = require("./video/video.module");
const channellist_entity_1 = require("./channellist/entities/channellist.entity");
const video_entity_1 = require("./video/entities/video.entity");
const videocomment_entity_1 = require("./video/entities/videocomment.entity");
const videolike_entity_1 = require("./video/entities/videolike.entity");
const videoview_entity_1 = require("./video/entities/videoview.entity");
const update_module_1 = require("./update/update.module");
const bodyParser = require("body-parser");
const subscriber_entity_1 = require("./channellist/entities/subscriber.entity");
const view_entity_1 = require("./channellist/entities/view.entity");
const video_entity_2 = require("./channellist/entities/video.entity");
const comment_module_1 = require("./comment/comment.module");
const comment_entity_1 = require("./comment/entities/comment.entity");
const nlp_module_1 = require("./nlp/nlp.module");
const typeOrmModuleOptions = {
    useFactory: async (configService) => ({
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        type: 'mysql',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        charset: configService.get("CHAR_SET"),
        entities: [channellist_entity_1.Channellist, video_entity_1.Video, videocomment_entity_1.videocomment, videolike_entity_1.videolike, videoview_entity_1.videoview, , view_entity_1.ViewCount, subscriber_entity_1.SubscriberCount, video_entity_2.VideoCount, comment_entity_1.Comment],
        synchronize: configService.get('DB_SYNC'),
        logging: true,
        timezone: 'Asia/Seoul'
    }),
    inject: [config_1.ConfigService],
};
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(bodyParser.json({ limit: '500mb' }))
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    JWT_SECRET_KEY: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_NAME: Joi.string().required(),
                    CHAR_SET: Joi.string().required(),
                    DB_SYNC: Joi.boolean().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeOrmModuleOptions),
            schedule_1.ScheduleModule.forRoot(),
            test_module_1.TestModule, channellist_module_1.ChannellistModule, ranking_module_1.RankingModule, filter_module_1.FilterModule,
            cache_manager_1.CacheModule.register({ ttl: 864000000, max: 1000, isGlobal: true }),
            video_module_1.VideoModule,
            update_module_1.UpdateModule,
            comment_module_1.CommentModule,
            nlp_module_1.NlpModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map