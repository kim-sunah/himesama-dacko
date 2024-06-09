import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Cron, CronExpression  } from '@nestjs/schedule';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}
  
  @Post('Subscriber-channels/:pagenumber')
  async SubscriberChannels(@Param("pagenumber") pagenumber : string,@Body("select") select : string) {
    return await this.rankingService.getTopChannels(+pagenumber,select);
  }

  @Post('view-channels/:pagenumber')
  async viewChannels(@Param("pagenumber") pagenumber : string, @Body("select") select : string) {
    return await this.rankingService.viewChannels(+pagenumber, select);
  }


  @Post('Video-channels/:pagenumber')
  async VideoChannels(@Param("pagenumber") pagenumber : string, @Body("select") select : string) {
    return await this.rankingService.VideoChannels(+pagenumber, select);
  }


  @Post('DBSubscriber-channels/:pagenumber')
  async DBSubscriberChannels(@Body() DbOrder: InfluencerOrder, @Param("pagenumber") pagenumber : string,@Body("select") select : string) {
    return await this.rankingService.DBSubscriberChannels(DbOrder,+pagenumber,select);
  }

  @Post('DBview-channels/:pagenumber')
  async  DBviewChannels(@Body() DbOrder: InfluencerOrder,@Param("pagenumber") pagenumber : string, @Body("select") select : string) {
    return await this.rankingService.DBviewChannels(DbOrder,+pagenumber, select);
  }


  @Post('DBVideo-channels/:pagenumber')
  async  DBVideoChannels(@Body() DbOrder: InfluencerOrder, @Param("pagenumber") pagenumber : string, @Body("select") select : string) {
    return await this.rankingService.DBVideoChannels(DbOrder,+pagenumber, select);
  }

  // @Get('category/:Categoryid')
  // async getTopCategory(@Param('Categoryid') id: string) {
  //   return await this.rankingService.getTopCategory(id)
  // }

  @Get("increaseview")
  async increaseview(){
    return await this.rankingService.increaseview();
  }
  @Get("increaseSubscriber")
  async increaseSubscriber(){
    return await this.rankingService.increaseSubscriber()
  }
  
}
