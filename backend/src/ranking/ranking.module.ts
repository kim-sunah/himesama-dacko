import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Channellist])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
