import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import * as schedule from 'node-schedule';
import { Cron  } from '@nestjs/schedule';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}


}
