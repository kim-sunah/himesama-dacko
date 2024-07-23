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

  //오늘 구독자 상승률 1~4위 나열(DB 기준)
  @Get("SubscriberTopIncrease")
  async SubscriberTopIncrease(){
    return await this.rankingService.SubscriberTopIncrease();
  }

  //오늘 구독자 하락률 1~4위 나열(DB 기준)
  @Get("SubscriberLowIncrease")
  async SubscriberLowIncrease(){
    return await this.rankingService.SubscriberlowIncrease();
  }

  //오늘 조회수 상승률 1~4위 나열(DB 기준)
  @Get("ViewTopIncrease")
  async ViewTopIncrease(){
    return await this.rankingService.ViewTopIncrease();
  }

  //오늘 조회수 하락률 1~4위 나열(DB 기준)
  @Get("ViewLowIncrease")
  async ViewLowIncrease(){
    return await this.rankingService.ViewlowIncrease();
  }

  //이번주 구독자 상승률 1~4위 나열(DB 기준)
  @Get("WeekSubscriberTopIncrease")
  async WeekSubscriberTopIncrease(){
    return await this.rankingService.WeekSubscriberTopIncrease();
  }

  //이번주 구독자 하락률 1~4위 나열(DB 기준)
  @Get("WeekSubscriberLowIncrease")
  async WeekSubscriberLowIncrease(){
    return await this.rankingService.WeekSubscriberlowIncrease();
  }

  //이번주 조회수 상승률 1~4위 나열(DB 기준)
  @Get("WeekViewTopIncrease")
  async WeekViewTopIncrease(){
    return await this.rankingService.WeekViewTopIncrease();
  }

  //이번주 조회수 하락률 1~4위 나열(DB 기준)
  @Get("WeekViewLowIncrease")
  async WeekViewLowIncrease(){
    return await this.rankingService.WeekViewlowIncrease();
  }

  //Sort 높은순으로 나열 
  @Post("RankingSort")
  async SortSubscriber(@Body("sort") sort : string, @Body("filter") filter : string){
  
    return await this.rankingService.SortSubscriber(sort, +filter);
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
