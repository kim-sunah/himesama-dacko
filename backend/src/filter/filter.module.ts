import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Channellist, Video, videoview, videocomment, videolike])],
  controllers: [FilterController],
  providers: [FilterService],
  exports : [FilterService]
})
export class FilterModule {}
