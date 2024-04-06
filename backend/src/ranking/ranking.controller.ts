import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingService.create(createRankingDto);
  }

  @Get('top-channels')
  async getTopChannels() {
    return await this.rankingService.getTopChannels();
  }

  @Get('viewtop-channels')
  async getTopviewChannels() {
    return await this.rankingService.getTopviewChannels();
  }

  @Get(':Categoryid')
  async getTopCategory(@Param('Categoryid') id: string) {
    return await this.rankingService.getTopCategory(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingService.remove(+id);
  }
}
