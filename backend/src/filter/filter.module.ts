import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channellist])],
  controllers: [FilterController],
  providers: [FilterService],
  exports : [FilterService]
})
export class FilterModule {}
