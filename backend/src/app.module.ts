import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriberModule } from './subscriber/subscriber.module';
import { TestModule } from './test/test.module';
import { ChannellistModule } from './channellist/channellist.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import{ TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import {SnakeNamingStrategy} from "typeorm-naming-strategies"
import { RankingModule } from './ranking/ranking.module';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';


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
    entities: [__dirname + '/*/entities/*{.js,.ts}'],
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
      DB_SYNC: Joi.boolean().required(),
    }),
  }),
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ScheduleModule.forRoot(),
  SubscriberModule, TestModule, ChannellistModule, RankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
