import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { videoview } from './entities/videoview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import axios from 'axios';
import { data } from 'cheerio/lib/api/attributes';
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

  async ChartDataUpdate() {
    const VideoData = await this.VideoRepository.find();
    for (const Data of VideoData) {
      const VideoView = await this.videoviewRepository.findOne({ where: { videoId: Data.id } })
      const Videocomment = await this.videocommentRepository.findOne({ where: { videoId: Data.id } })
      const Videolike = await this.videolikeRepository.findOne({ where: { videoId: Data.id } })
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${Data.videoid}&key=${process.env.Youtbe_Api_KEY}`);
      const channelData = response.data
      await this.videoviewRepository.update(Data.id, {

        Twelve_Month_Ago: +VideoView.Eleven_Month_Ago,
        Eleven_Month_Ago: +VideoView.Ten_Month_Ago,
        Ten_Month_Ago: +VideoView.Nine_Month_Ago,
        Nine_Month_Ago: +VideoView.Eigth_Month_Ago,
        Eigth_Month_Ago: +VideoView.Seven_Month_Ago,
        Seven_Month_Ago: +VideoView.Six_Month_Ago,
        Six_Month_Ago: +VideoView.Five_Month_Ago,
        Five_Month_Ago: +VideoView.Four_Month_Ago,
        Four_Month_Ago: + VideoView.Three_Month_Ago,
        Three_Month_Ago: +VideoView.Two_Month_Ago,
        Two_Month_Ago: +VideoView.One_Month_Ago,
        One_Month_Ago: +VideoView.today,
        today: +channelData.items[0].statistics.viewCount
      })

      await this.videocommentRepository.update(Data.id, {

        Twelve_Month_Ago: +Videocomment.Eleven_Month_Ago,
        Eleven_Month_Ago: +Videocomment.Ten_Month_Ago,
        Ten_Month_Ago: +Videocomment.Nine_Month_Ago,
        Nine_Month_Ago: +Videocomment.Eigth_Month_Ago,
        Eigth_Month_Ago: +Videocomment.Seven_Month_Ago,
        Seven_Month_Ago: +Videocomment.Six_Month_Ago,
        Six_Month_Ago: +Videocomment.Five_Month_Ago,
        Five_Month_Ago: +Videocomment.Four_Month_Ago,
        Four_Month_Ago: + Videocomment.Three_Month_Ago,
        Three_Month_Ago: +Videocomment.Two_Month_Ago,
        Two_Month_Ago: +Videocomment.One_Month_Ago,
        One_Month_Ago: +Videocomment.today,


        today: +channelData.items[0].statistics.commentCount
      })


      await this.videolikeRepository.update(Data.id, {
        Twelve_Month_Ago: +Videolike.Eleven_Month_Ago,
        Eleven_Month_Ago: +Videolike.Ten_Month_Ago,
        Ten_Month_Ago: +Videolike.Nine_Month_Ago,
        Nine_Month_Ago: +Videolike.Eigth_Month_Ago,
        Eigth_Month_Ago: +Videolike.Seven_Month_Ago,
        Seven_Month_Ago: +Videolike.Six_Month_Ago,
        Six_Month_Ago: +Videolike.Five_Month_Ago,
        Five_Month_Ago: +Videolike.Four_Month_Ago,
        Four_Month_Ago: + Videolike.Three_Month_Ago,
        Three_Month_Ago: +Videolike.Two_Month_Ago,
        Two_Month_Ago: +Videolike.One_Month_Ago,
        One_Month_Ago: +Videolike.today,
        today: +channelData.items[0].statistics.likeCount
      })
    }
  }

  async ChartViewData() {

  }

  async ChartCommentData() {

  }

  async ChartLikeData() {

  }

  FavoriteData() {
    return `This action returns a # video`;
  }

  CommentData() {
    return `This action updates a # video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

