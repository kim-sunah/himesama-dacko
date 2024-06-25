import { Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { videoview } from 'src/video/entities/videoview.entity';
import { Repository } from 'typeorm';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { Video } from 'src/video/entities/video.entity';
import axios from 'axios';
import { Channellist } from 'src/channellist/entities/channellist.entity';

@Injectable()
export class UpdateService {

  constructor(@InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
    @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>,
    @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Channellist) private readonly ChannelListRepository: Repository<Channellist>) { }


    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    async ChartDataUpdate() {
      const VideoData = await this.VideoRepository.find();
      for (const Data of VideoData) {
        await this.delay(250);
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


    async Channelupdate() {
      const channelInfo = await this.ChannelListRepository.find();
      try {
        for (const info of channelInfo) {
          await this.delay(50-0);
          console.log(info.id)
          if (info.Channel_Url_Id === null) {
            const VideoId = await this.VideoRepository.findOne({where : { channelId :  info.id}})
            await this.videoviewRepository.delete({videoId : +VideoId});
            await this.videocommentRepository.delete({videoId : +VideoId})
            await this.videolikeRepository.delete({videoId : +VideoId})
            await this.VideoRepository.delete({ channelId: info.id });
            await this.ChannelListRepository.delete(info.id);
          } else if (info.Channel_Url_Id.includes("@")) {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
            const channelData = response.data;
            if (channelData.pageInfo.totalResults === 0) {
              await this.ChannelListRepository.delete(info.id);
            } else {
              await this.ChannelListRepository.update(info.id, {
                previous_subscriberCount: +info.subscriberCount,
                subscriberCount: +channelData.items[0].statistics.subscriberCount,
                previous_viewCount: +info.viewCount,
                viewCount: +channelData.items[0].statistics.viewCount,
                previous_videoCount: +info.videoCount,
                videoCount: +channelData.items[0].statistics.videoCount,
                subscriberCount_percentageincrease: isNaN((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount))) || +info.subscriberCount === 0 ? 0 : +((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount)) * 100),
                viewCount_percentageincrease: isNaN((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount))) || +info.viewCount === 0 ? 0 : +((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount)) * 100)
              });
            }
          } else {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
            const channelData = response.data;
            if (channelData.pageInfo.totalResults === 0) {
              await this.ChannelListRepository.delete(info.id);
            } else {
              await this.ChannelListRepository.update(info.id, {
                previous_subscriberCount: +info.subscriberCount,
                subscriberCount: +channelData.items[0].statistics.subscriberCount,
                previous_viewCount: +info.viewCount,
                viewCount: +channelData.items[0].statistics.viewCount,
                previous_videoCount: +info.videoCount,
                videoCount: +channelData.items[0].statistics.videoCount,
                subscriberCount_percentageincrease: isNaN((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount))) || +info.subscriberCount === 0 ? 0 : +((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount)) * 100),
                viewCount_percentageincrease: isNaN((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount))) || +info.viewCount === 0 ? 0 : +((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount)) * 100)
              });
            }
          }
        }
      } catch (err) {
        throw new Error(`Error in Channelupdate: ${err.message}`);
      }
    }
  
  
}
