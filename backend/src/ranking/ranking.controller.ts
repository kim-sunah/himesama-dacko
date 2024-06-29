import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Cron, CronExpression  } from '@nestjs/schedule';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}
  
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

  //구독자 1~4위 나열(DB기준)
  @Get("SubscriberTop")
  async SubscriberTop(){
    return await this.rankingService.SubscriberTop();
  }

  //조회수 1~4위 나열(DB기준)
  @Get("ViewTop")
  async ViewTop(){
    return await this.rankingService.ViewTop();
  }

  //구독자 상승률 1~4위 나열(DB 기준)
  @Get("SubscriberTopIncrease")
  async SubscriberTopIncrease(){
    return await this.rankingService.SubscriberTopIncrease();
  }

  //조회수 상승률 1~4위 나열(DB 기준)
  @Get("ViewTopIncrease")
  async ViewTopIncrease(){
    return await this.rankingService.ViewTopIncrease();
  }

  //Sort 높은순으로 나열 
  @Post("RankingSort")
  async SortSubscriber(@Body("sort") sort : String){
    return await this.rankingService.SortSubscriber(sort);
  }

  //조회수 증가량 순위(현재 사용 x)
  @Get("increaseview")
  async increaseview(){
    return await this.rankingService.increaseview();
  }

  //구독자 증가량 순위(현재 사용 x)
  @Get("increaseSubscriber")
  async increaseSubscriber(){
    return await this.rankingService.increaseSubscriber()
  }
  
}
