import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { videoview } from 'src/video/entities/videoview.entity';
import { In, Repository } from 'typeorm';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { Video } from 'src/video/entities/video.entity';
import axios from 'axios';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';

@Injectable()
export class UpdateService {
  private readonly logger = new Logger("UpdateService");
  private readonly BATCH_SIZE = 100;


  constructor(@InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
    @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>,
    @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Channellist) private readonly ChannelListRepository: Repository<Channellist>,
    @InjectRepository(SubscriberCount) private readonly SubscriberCountRepository: Repository<SubscriberCount>,
    @InjectRepository(ViewCount) private readonly ViewCountRepository: Repository<ViewCount>,
    @InjectRepository(VideoCount) private readonly VideoCountRepository: Repository<VideoCount>,

    private configService: ConfigService, private httpService: HttpService) { }


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

  async getChannelInfo(ChannelId: string) {
    return await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelId}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`)
  }
  async DailyChannelUpdate() {
    const SubscriberCountData = await this.SubscriberCountRepository.find();
    for (let i = 0; i < SubscriberCountData.length; i += this.BATCH_SIZE) {
      const batch = SubscriberCountData.slice(i, i + this.BATCH_SIZE);
      await this.DayilySubscriberprocessBatch(batch);
    }
  }
  private async DayilySubscriberprocessBatch(batch: SubscriberCount[]): Promise<void> {
    const updatePromises = batch.map(info => this.SubscriberUpdate(info));
    await Promise.all(updatePromises);
  }
  private async SubscriberUpdate(info: SubscriberCount): Promise<void> {
    const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } })
    const [channelInfo] = await Promise.all([
      this.getChannelInfo(channelId.Channel_Id),
    ])
    const Subscriber = await this.SubscriberCountRepository.findOne({ where: { id: info.id } })
    await this.SubscriberCountRepository.update(info.id, {
      Twenty_nine_day_Ago: Subscriber.Twenty_eigth_day_Ago,
      Twenty_eigth_day_Ago: Subscriber.Twenty_seven_day_Ago,
      Twenty_seven_day_Ago: Subscriber.Twenty_six_day_Ago,
      Twenty_six_day_Ago: Subscriber.Twenty_five_day_Ago,
      Twenty_five_day_Ago: Subscriber.Twenty_four_day_Ago,
      Twenty_four_day_Ago: Subscriber.Twenty_three_day_Ago,
      Twenty_three_day_Ago: Subscriber.Twenty_two_day_Ago,
      Twenty_two_day_Ago: Subscriber.Twenty_one_day_Ago,
      Twenty_one_day_Ago: Subscriber.Twenty_day_Ago,
      Twenty_day_Ago: Subscriber.Nineteen_day_Ago,
      Nineteen_day_Ago: Subscriber.Eigthteen_day_Ago,
      Eigthteen_day_Ago: Subscriber.seventeen_day_Ago,
      seventeen_day_Ago: Subscriber.sixteen_day_Ago,
      sixteen_day_Ago: Subscriber.fifteen_day_Ago,
      fifteen_day_Ago: Subscriber.fourteen_day_Ago,
      fourteen_day_Ago: Subscriber.thirteen_day_Ago,
      thirteen_day_Ago: Subscriber.twelve_day_Ago,
      twelve_day_Ago: Subscriber.Eleven_day_Ago,
      Eleven_day_Ago: Subscriber.Ten_day_Ago,
      Ten_day_Ago: Subscriber.Nine_day_Ago,
      Nine_day_Ago: Subscriber.Eigth_day_Ago,
      Eigth_day_Ago: Subscriber.Seven_day_Ago,
      Seven_day_Ago: Subscriber.Six_day_Ago,
      Six_day_Ago: Subscriber.Five_day_Ago,
      Five_day_Ago: Subscriber.Four_day_Ago,
      Four_day_Ago: Subscriber.Three_day_Ago,
      Three_day_Ago: Subscriber.Two_day_Ago,
      Two_day_Ago: Subscriber.One_day_Ago,
      One_day_Ago: Subscriber.Today,
      Today: +channelInfo.data.items[0].statistics.subscriberCount
    })
  }



  async DailyViewChannelUpdate() {
    const ViewRepository = await this.ViewCountRepository.find();
    for (let i = 0; i < ViewRepository.length; i += this.BATCH_SIZE) {
      const batch = ViewRepository.slice(i, i + this.BATCH_SIZE);
      await this.DayilyViewprocessBatch(batch);
    }
  }
  private async DayilyViewprocessBatch(batch: ViewCount[]): Promise<void> {
    const updatePromises = batch.map(info => this.ViewUpdate(info));
    await Promise.all(updatePromises);
  }
  private async ViewUpdate(info: ViewCount): Promise<void> {
    const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } })
    const [channelInfo] = await Promise.all([
      this.getChannelInfo(channelId.Channel_Id),
    ])
    const View = await this.ViewCountRepository.findOne({ where: { id: info.id } })
    await this.ViewCountRepository.update(info.id, {
      Twenty_nine_day_Ago: View.Twenty_eigth_day_Ago,
      Twenty_eigth_day_Ago: View.Twenty_seven_day_Ago,
      Twenty_seven_day_Ago: View.Twenty_six_day_Ago,
      Twenty_six_day_Ago: View.Twenty_five_day_Ago,
      Twenty_five_day_Ago: View.Twenty_four_day_Ago,
      Twenty_four_day_Ago: View.Twenty_three_day_Ago,
      Twenty_three_day_Ago: View.Twenty_two_day_Ago,
      Twenty_two_day_Ago: View.Twenty_one_day_Ago,
      Twenty_one_day_Ago: View.Twenty_day_Ago,
      Twenty_day_Ago: View.Nineteen_day_Ago,
      Nineteen_day_Ago: View.Eigthteen_day_Ago,
      Eigthteen_day_Ago: View.seventeen_day_Ago,
      seventeen_day_Ago: View.sixteen_day_Ago,
      sixteen_day_Ago: View.fifteen_day_Ago,
      fifteen_day_Ago: View.fourteen_day_Ago,
      fourteen_day_Ago: View.thirteen_day_Ago,
      thirteen_day_Ago: View.twelve_day_Ago,
      twelve_day_Ago: View.Eleven_day_Ago,
      Eleven_day_Ago: View.Ten_day_Ago,
      Ten_day_Ago: View.Nine_day_Ago,
      Nine_day_Ago: View.Eigth_day_Ago,
      Eigth_day_Ago: View.Seven_day_Ago,
      Seven_day_Ago: View.Six_day_Ago,
      Six_day_Ago: View.Five_day_Ago,
      Five_day_Ago: View.Four_day_Ago,
      Four_day_Ago: View.Three_day_Ago,
      Three_day_Ago: View.Two_day_Ago,
      Two_day_Ago: View.One_day_Ago,
      One_day_Ago: View.Today,
      Today: +channelInfo.data.items[0].statistics.viewCount
    })
  }

  async DailyVideoChannelUpdate() {

    const VideoRepository = await this.VideoCountRepository.find();

    for (let i = 0; i < VideoRepository.length; i += this.BATCH_SIZE) {
      const batch = VideoRepository.slice(i, i + this.BATCH_SIZE);
      await this.DayilyVideoprocessBatch(batch);
    }
  }
  private async DayilyVideoprocessBatch(batch: VideoCount[]): Promise<void> {
    const updatePromises = batch.map(info => this.VideoUpdate(info));
    await Promise.all(updatePromises);
  }
  private async VideoUpdate(info: VideoCount): Promise<void> {

    const channelId = await this.ChannelListRepository.findOne({ where: { id: info.channelId } })
    const [channelInfo] = await Promise.all([
      this.getChannelInfo(channelId.Channel_Id),
    ])

    const Video = await this.VideoCountRepository.findOne({ where: { id: info.id } })

    await this.VideoCountRepository.update(info.id, {
      Twenty_nine_day_Ago: Video.Twenty_eigth_day_Ago,
      Twenty_eigth_day_Ago: Video.Twenty_seven_day_Ago,
      Twenty_seven_day_Ago: Video.Twenty_six_day_Ago,
      Twenty_six_day_Ago: Video.Twenty_five_day_Ago,
      Twenty_five_day_Ago: Video.Twenty_four_day_Ago,
      Twenty_four_day_Ago: Video.Twenty_three_day_Ago,
      Twenty_three_day_Ago: Video.Twenty_two_day_Ago,
      Twenty_two_day_Ago: Video.Twenty_one_day_Ago,
      Twenty_one_day_Ago: Video.Twenty_day_Ago,
      Twenty_day_Ago: Video.Nineteen_day_Ago,
      Nineteen_day_Ago: Video.Eigthteen_day_Ago,
      Eigthteen_day_Ago: Video.seventeen_day_Ago,
      seventeen_day_Ago: Video.sixteen_day_Ago,
      sixteen_day_Ago: Video.fifteen_day_Ago,
      fifteen_day_Ago: Video.fourteen_day_Ago,
      fourteen_day_Ago: Video.thirteen_day_Ago,
      thirteen_day_Ago: Video.twelve_day_Ago,
      twelve_day_Ago: Video.Eleven_day_Ago,
      Eleven_day_Ago: Video.Ten_day_Ago,
      Ten_day_Ago: Video.Nine_day_Ago,
      Nine_day_Ago: Video.Eigth_day_Ago,
      Eigth_day_Ago: Video.Seven_day_Ago,
      Seven_day_Ago: Video.Six_day_Ago,
      Six_day_Ago: Video.Five_day_Ago,
      Five_day_Ago: Video.Four_day_Ago,
      Four_day_Ago: Video.Three_day_Ago,
      Three_day_Ago: Video.Two_day_Ago,
      Two_day_Ago: Video.One_day_Ago,
      One_day_Ago: Video.Today,
      Today: +channelInfo.data.items[0].statistics.videoCount
    })
  }



  async removeDuplicates() {
    // 중복 채널 제거
    await this.removeDuplicateChannels();

    // 중복 비디오 제거
    await this.removeDuplicateVideos();

  }


  private async removeDuplicateChannels() {
    const duplicates = await this.ChannelListRepository.query(`
      SELECT Channel_Url_Id, COUNT(*) as count
      FROM channellist
      GROUP BY Channel_Url_Id
      HAVING COUNT(*) > 1
    `);

    for (const duplicate of duplicates) {
      const [keep, ...remove] = await this.ChannelListRepository.find({
        where: { Channel_Url_Id: duplicate.Channel_Url_Id },
        order: { id: 'ASC' }
      });

      await this.ChannelListRepository.remove(remove);
    }
  }

  private async removeDuplicateVideos() {
    const duplicates = await this.VideoRepository.query(`
      SELECT videoid, COUNT(*) as count
      FROM video
      GROUP BY videoid
      HAVING COUNT(*) > 1
    `);

    for (const duplicate of duplicates) {
      const [keep, ...remove] = await this.VideoRepository.find({
        where: { videoid: duplicate.videoid },
        order: { id: 'ASC' }
      });

      await this.VideoRepository.remove(remove);
    }
  }











  async DayCountUpdate( duration : string) {
    const channelInfo = await this.ChannelListRepository.find();
    for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
      const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
      await this.processBatch(batch,duration);
    }
  }
  async WeekCountUpdate(duration : string){
    const channelInfo = await this.ChannelListRepository.find();
    for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
      const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
      await this.processBatch(batch, duration);
    }
  }
  async MonthCountUpdate(duration : string){
    const channelInfo = await this.ChannelListRepository.find();
    for (let i = 0; i < channelInfo.length; i += this.BATCH_SIZE) {
      const batch = channelInfo.slice(i, i + this.BATCH_SIZE);
      await this.processBatch(batch, duration);
    }
  }


  private async processBatch(batch: Channellist[], duration:string): Promise<void> {
    const updatePromises = batch.map(info => this.processChannel(info,duration));
    await Promise.all(updatePromises);
  }


  private async processChannel(info: Channellist, duration:string): Promise<void> {
    if (info.Channel_Url_Id === null) {
      await this.deleteChannelData(info);
    } else {
      await this.updateChannelData(info,duration);
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

  private async updateChannelData(info: Channellist, duration:string): Promise<void> {
    const apiUrl = this.getApiUrl(info.Channel_Url_Id);

    try {
      const response = await lastValueFrom(this.httpService.get(apiUrl));
      const channelData = response.data;

      if (channelData.pageInfo.totalResults === 0) {
        await this.ChannelListRepository.delete(info.id);
      } else {
        const SubscriberData = await this.SubscriberCountRepository.findOne({ where: { channelId: info.id } })
        const ViewData = await this.ViewCountRepository.findOne({ where: { channelId: info.id } })
        const newData = this.calculateNewData(info, channelData.items[0].statistics, SubscriberData, ViewData,duration);
        await this.ChannelListRepository.update(info.id, newData);
      }
    } catch (error) {
      this.logger.error(`Error updating channel ${info.id}: ${error.message}`);
    }
  }

  private getApiUrl(channelUrlId: string): string {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics';
    return channelUrlId.includes('@')
      ? `${baseUrl}&forHandle=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`
      : `${baseUrl}&id=${channelUrlId}&key=${process.env.Youtbe_Api_KEY}`;
  }

  private calculateNewData(info: Channellist, newStats: any, SubscriberCount: SubscriberCount, ViewCount: ViewCount, duration:string): Partial<Channellist> {
    const calculateIncrease = (newValue: number, oldValue: number) =>
      isNaN((newValue - oldValue) / oldValue) || oldValue === 0 ? 0 : ((newValue - oldValue) / oldValue) * 100;

    if(duration === "Day"){
      return { 
        subscriberCount: +newStats.subscriberCount,
        viewCount: +newStats.viewCount,
        videoCount: +newStats.videoCount,
        subscriberCount_percentageincrease: calculateIncrease(+newStats.subscriberCount, SubscriberCount.Today),
        viewCount_percentageincrease: calculateIncrease(+newStats.viewCount, +ViewCount.Today)
      };
    }
    else if(duration ==="Week"){
      
      return {
        week_subscriberCount_percentageincrease: calculateIncrease(+SubscriberCount.Today, +SubscriberCount.Seven_day_Ago),
        week_viewCount_percentageincrease: calculateIncrease(+ViewCount.Today, +ViewCount.Seven_day_Ago)
      };

    }
    else if(duration ==="Month"){
      return {
        month_subscriberCount_percentageincrease: calculateIncrease(+SubscriberCount.Today, SubscriberCount.Twenty_nine_day_Ago),
        month_viewCount_percentageincrease: calculateIncrease(+ViewCount.Today, +ViewCount.Twenty_nine_day_Ago)
      };

    }
   
  }



}
