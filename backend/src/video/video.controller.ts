import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Cron  } from '@nestjs/schedule';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
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

  @Cron("0 0 17 * * 1-7")
  ChartDataUpdate() {
    return this.videoService.ChartDataUpdate();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
