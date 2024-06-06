import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import * as schedule from 'node-schedule';
import { Cron  } from '@nestjs/schedule';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  onModuleInit() {
    // 2주마다 한 번씩 실행 (매월 1일 5시에 실행)
    schedule.scheduleJob('0 0 17 1 * *', () => {
      this.ChartDataUpdate();
    });
  }

  @Get("/viewData")
  ChartViewData(){
    return this.videoService.ChartViewData();
  }
  @Get("/commentData")
  ChartCommentData(){
    return this.videoService.ChartCommentData();
  }
  @Get("/LikeData")
  ChartLikeData(){
    return this.videoService.ChartLikeData();
  }

  ChartDataUpdate() {
    return this.videoService.ChartDataUpdate();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
