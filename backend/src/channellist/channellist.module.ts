import { Module } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { ChannellistController } from './channellist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from './entities/channellist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channellist])],
  controllers: [ChannellistController],
  providers: [ChannellistService],
})
export class ChannellistModule {}
