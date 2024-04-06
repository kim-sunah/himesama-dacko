import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
;
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Channellist])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
