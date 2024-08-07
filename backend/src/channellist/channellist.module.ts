import { Module } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { ChannellistController } from './channellist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from './entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import {  videolike } from 'src/video/entities/videolike.entity';
import { SubscriberCount } from './entities/subscriber.entity';
import { ViewCount } from './entities/view.entity';
import { VideoCount } from './entities/video.entity';
import { Search } from 'src/search/entities/search.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channellist, Video, videoview, videocomment, videolike, SubscriberCount, ViewCount,VideoCount,Search, Auth])],
  controllers: [ChannellistController],
  providers: [ChannellistService,FilterService],
})
export class ChannellistModule {}
