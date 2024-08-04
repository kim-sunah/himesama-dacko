import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateService } from './update.service';
import * as schedule from 'node-schedule';
import { Cron } from '@nestjs/schedule';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) { }


  onModuleInit() {
    // (매월 1일 5시에 실행)
    schedule.scheduleJob('0 0 17 1 * *', () => {
      this.ChartDataUpdate();
    });
 
    //(매일 5시에 실행)
    schedule.scheduleJob('0 0 17 * * *', () => {
      this.DailySubscriberChannelUpdate();
    });
    //(매일 5시에 실행)
    schedule.scheduleJob('0 0 17 * * *', () => {
      this.DailyViewChannelUpdate();
    });
    //(매일 5시에 실행)
    schedule.scheduleJob('0 0 17 * * *', () => {
      this.DailyVideoChannelUpdate();
    });
    //(30분마다 실행)
    schedule.scheduleJob('*/30 * * * *', () => {
      this.removeDuplicates();
    });
    //(매일 5시에 실행)
    schedule.scheduleJob('0 0 17 * * *', () => {
      this.DayCountUpdate();
    });
     //(매주 7시에 실행 )
    schedule.scheduleJob('0 0 19 * * 1', () => {
      this.WeekCountUpdate();
    });
    //(매월 1일 6시에 실행 )
    schedule.scheduleJob('0 18 1 * * ', () => {
      this.MonthCountUpdate();
    });

    schedule.scheduleJob('0 0 * * *', () => {
      this.Clickreset();
    });
  
  }

  async ChartDataUpdate() {
    return await this.updateService.ChartDataUpdate();
  }

  //매일매일 구독자 업데이트
  async DailySubscriberChannelUpdate() {
    return await this.updateService.DailyChannelUpdate();
  }

  //매일 조회수 업데이트
  async DailyViewChannelUpdate() {
    return await this.updateService.DailyViewChannelUpdate();
  }

  //매일 동영상수 업데이트
  async DailyVideoChannelUpdate() {
    return await this.updateService.DailyVideoChannelUpdate();
  }

  //5분마다 중복된 Channel, Video 삭제
  async removeDuplicates() {
    return await this.updateService.removeDuplicates()
  }

  //매일매일 구독자, 조회수 증가 업데이트
  async DayCountUpdate() {
    return await this.updateService.DayCountUpdate("Day");
  }
  //일주일마다 구독자, 조회수 증가 업데이트
  async WeekCountUpdate() {
    return await this.updateService.WeekCountUpdate("Week");
  }
  async MonthCountUpdate() {
    return await this.updateService.MonthCountUpdate("Month");
  }

  async Clickreset(){
    return await this.updateService.Clickreset();
  }

}
