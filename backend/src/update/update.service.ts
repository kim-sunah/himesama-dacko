import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { videoview } from 'src/video/entities/videoview.entity';
import { Repository } from 'typeorm';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { Video } from 'src/video/entities/video.entity';
import axios from 'axios';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UpdateService {
  private readonly logger = new Logger("UpdateService");
  private readonly BATCH_SIZE = 100;


  constructor(@InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
    @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>,
    @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Channellist) private readonly ChannelListRepository: Repository<Channellist>, 
    private configService : ConfigService, private httpService : HttpService) { }


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


    async channelUpdate(): Promise<void> {
      const channelInfo = await this.ChannelListRepository.find();
      for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
       
        const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
  
        await this.processBatch(batch);
      }
    }

    private async processBatch(batch: Channellist[]): Promise<void> {
      const updatePromises = batch.map(info => this.processChannel(info));
      await Promise.all(updatePromises);
    }

    private async processChannel(info: Channellist): Promise<void> {
      if (info.Channel_Url_Id === null) {
        await this.deleteChannelData(info);
      } else {
        await this.updateChannelData(info);
      }
    }

    private async deleteChannelData(info: Channellist): Promise<void> {
      const video = await this.VideoRepository.findOne({ where: { channelId: info.id } });
      if (video) {
        await Promise.all([
          this.videoviewRepository.delete({ videoId: video.id }),
          this.videocommentRepository.delete({ videoId: video.id }),
          this.videolikeRepository.delete({ videoId: video.id }),
          this.VideoRepository.delete({ channelId: info.id }),
        ]);
      }
      await this.ChannelListRepository.delete(info.id);
    }
    private getApiUrl(channelUrlId: string): string {
      const apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
      const baseUrl = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics';
      return channelUrlId.includes('@')
        ? `${baseUrl}&forHandle=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`
        : `${baseUrl}&id=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`;
    }


    private async updateChannelData(info: Channellist): Promise<void> {
      const apiUrl = this.getApiUrl(info.Channel_Url_Id);
  
      try {
        const response = await lastValueFrom(this.httpService.get(apiUrl));
        const channelData = response.data;
  
        if (channelData.pageInfo.totalResults === 0) {
          await this.ChannelListRepository.delete(info.id);
        } else {
          const newData = this.calculateNewData(info, channelData.items[0].statistics);
          await this.ChannelListRepository.update(info.id, newData);
        }
      } catch (error) {
        this.logger.error(`Error updating channel ${info.id}: ${error.message}`);
      }
    }

    private calculateNewData(info: Channellist, newStats: any): Partial<Channellist> {
      const calculateIncrease = (newValue: number, oldValue: number) => 
        isNaN((newValue - oldValue) / oldValue) || oldValue === 0 ? 0 : ((newValue - oldValue) / oldValue) * 100;
  
      return {
        previous_subscriberCount: +info.subscriberCount,
        subscriberCount: +newStats.subscriberCount,
        previous_viewCount: +info.viewCount,
        viewCount: +newStats.viewCount,
        previous_videoCount: +info.videoCount,
        videoCount: +newStats.videoCount,
        subscriberCount_percentageincrease: calculateIncrease(+newStats.subscriberCount, +info.subscriberCount),
        viewCount_percentageincrease: calculateIncrease(+newStats.viewCount, +info.viewCount)
      };
    }
}
