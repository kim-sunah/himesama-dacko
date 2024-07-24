import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Channellist,SubscriberCount, ViewCount, VideoCount]) ],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
