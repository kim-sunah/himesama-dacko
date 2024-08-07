import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Search, Auth])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
