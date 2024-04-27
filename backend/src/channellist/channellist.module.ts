import { Module } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { ChannellistController } from './channellist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from './entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channellist]) ],
  controllers: [ChannellistController],
  providers: [ChannellistService,FilterService],
})
export class ChannellistModule {}
