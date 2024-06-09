import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateService } from './update.service';
import * as schedule from 'node-schedule';
import { Cron } from '@nestjs/schedule';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}


  onModuleInit() {
    // (매월 1일 5시에 실행)
    schedule.scheduleJob('0 0 17 1 * *', () => {
      this.ChartDataUpdate();
    });

    schedule.scheduleJob('0 0 17 * * 1', () => {
      this.Channelupdate();
    });
  }

  async ChartDataUpdate() {
    return await this.updateService.ChartDataUpdate();
  }

  async Channelupdate() {
    return await this.updateService.Channelupdate()
  }

}
