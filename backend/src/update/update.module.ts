import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/video/entities/video.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';

@Module({
  imports:[HttpModule, ConfigModule , TypeOrmModule.forFeature([Video, videocomment, videolike, videoview, Channellist, SubscriberCount, ViewCount, VideoCount])],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
