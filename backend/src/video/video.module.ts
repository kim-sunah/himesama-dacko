import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import {  videoview } from './entities/videoview.entity';
import { videolike } from './entities/videolike.entity';

import { videocomment } from './entities/videocomment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Video, Channellist, videocomment,videolike,videoview])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
