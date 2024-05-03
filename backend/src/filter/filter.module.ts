import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Video } from 'src/video/entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channellist, Video])],
  controllers: [FilterController],
  providers: [FilterService],
  exports : [FilterService]
})
export class FilterModule {}
