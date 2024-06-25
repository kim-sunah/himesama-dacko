import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TestModule } from './test/test.module';
import { ChannellistModule } from './channellist/channellist.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import{ TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import {SnakeNamingStrategy} from "typeorm-naming-strategies"
import { RankingModule } from './ranking/ranking.module';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { FilterModule } from './filter/filter.module';
import { CacheModule } from '@nestjs/cache-manager';
import { VideoModule } from './video/video.module';
import { Channellist } from './channellist/entities/channellist.entity';
import { Video } from './video/entities/video.entity';
import { videocomment } from './video/entities/videocomment.entity';
import { videolike } from './video/entities/videolike.entity';

import { videoview } from './video/entities/videoview.entity';
import { UpdateModule } from './update/update.module';
import { json, urlencoded } from 'express';
import * as bodyParser from 'body-parser';


const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'), 
    charset : configService.get("CHAR_SET"), //이모지를 위한 추가 설정기능 이유 : 이모지는 3byte인데 utf8mb는 최대 2바이트밖에 받지 못하기 때문이다.
    entities: [Channellist, Video, videocomment, videolike, videoview], 
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      JWT_SECRET_KEY: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_NAME: Joi.string().required(),
      CHAR_SET :Joi.string().required(),
      DB_SYNC: Joi.boolean().required(),
    }),
  })
  ,
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ScheduleModule.forRoot(),
   TestModule, ChannellistModule, RankingModule, FilterModule,
  CacheModule.register({ttl: 864000000, max: 1000,isGlobal: true}),
  VideoModule,
  UpdateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(bodyParser.json({ limit: '500mb' }))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
