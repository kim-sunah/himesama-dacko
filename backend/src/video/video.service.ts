import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { videoview } from './entities/videoview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';


import { videocomment } from './entities/videocomment.entity';
import { videolike } from './entities/videolike.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
    @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>,
    @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>) { }
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

}

