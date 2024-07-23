import { Inject, Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Between, DataSource, Repository } from 'typeorm';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { InfluencerOrder } from './dto/DbOrder.dto';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';
interface Data {
  nextPageToken: any;
  prevPageToken: any;
  items: {
    id: any;
    snippet: any;
    prevPageToken: string;
  }[];
}

@Injectable()
export class FilterService {

  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>,
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
    @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>,
    @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>,
    @InjectRepository(SubscriberCount) private readonly SubscriberRepository: Repository<SubscriberCount>,
    @InjectRepository(ViewCount) private readonly ViewRepository: Repository<ViewCount>,
    @InjectRepository(VideoCount) private readonly VideoCountRepository: Repository<VideoCount>,
    private dataSource: DataSource
  ) { }


  private getOneHourAgo(): string {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return oneHourAgo.toISOString();
  }

  async getChannelInfo(channelId: string) {
    return axios.get(`https://youtube.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'snippet,statistics',
        id: channelId,
        key: process.env.Youtbe_Api_KEY
      }
    });
  }

  async getVideoInfo(videoId: string) {
    return axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: process.env.Youtbe_Api_KEY
      }
    });
  }

  async videoFilter(resData: Data) {
    try {
      const channelDataArray = await Promise.all(resData.items.map(async (info) => {
        const [channelInfo, videoInfo] = await Promise.all([
          this.getChannelInfo(info.snippet.channelId),
          info.id.videoId ? this.getVideoInfo(info.id.videoId) : null
        ]);

        if (!channelInfo) 
          return null;

        const channelData = channelInfo.data.items[0];
        const videoData = videoInfo.data.items[0];
      
        const channelUrlID = await this.findOrCreateChannel(channelData, info, videoData.snippet.categoryId);

        if (!channelUrlID) 
          return null;
        if (!info.id.videoId) 
          return null;

      
   
        const video = await this.findOrCreateVideo(videoData, channelUrlID);

        if (!video) return null;

        return this.createChannelDataObject(info, channelData, videoData, video, resData);
      }));

      return channelDataArray.filter(Boolean);
    } catch (err) {
      console.error('Error in videoFilter:', err);
      throw err;
    }
  }



  private async findOrCreateChannel(channelData: any, info: any, videocategoryId : number) {
    const existingChannel = await this.channelList.findOne({ where: { Channel_Url_Id: channelData.snippet.customUrl } });
    if (existingChannel){
      return existingChannel;
    }
    else{
      if(videocategoryId === 34){
        videocategoryId = 23
      }
      const channelToSave = {
        categoryid : videocategoryId,
        Channel_Url_Id: channelData.snippet.customUrl,
        Channel_Id: info.snippet.channelId,
        Channel_nickname: channelData.snippet.title,
        channel_img: channelData.snippet.thumbnails.default.url,
        subscriberCount: +channelData.statistics.subscriberCount,
        videoCount: +channelData.statistics.videoCount,
        viewCount: +channelData.statistics.viewCount
      };
  
      const savedChannel = await this.channelList.save(channelToSave);
      if (!savedChannel.id) {
        console.error('Channel saved but id is missing');
        return null;
      }
  
      await Promise.all([
        this.SubscriberRepository.save({
          Today: +channelData.statistics.subscriberCount,
          channelId: savedChannel.id
        }),
        this.VideoCountRepository.save({ 
          Today: +channelData.statistics.videoCount,
          channelId: savedChannel.id
        }),
        this.ViewRepository.save({
          Today: +channelData.statistics.viewCount,
          channelId: savedChannel.id
        })
      ]);
  
      return savedChannel;

    }
     

  
  }

  async findOrCreateVideo(videoData: any, channelData: any) {
    const existingVideo = await this.videoRepository.findOne({ where: { videoid: videoData.id } });
    if (existingVideo) return existingVideo;
    console.log(videoData.id , videoData.snippet.title, videoData.snippet.publishedAt)
    const videoToSave = {
      videoid: videoData.id,
      videotitle: videoData.snippet.title,
      videopublishedAt: videoData.snippet.publishedAt,
      channelId: channelData.id
    };

    const savedVideo = await this.videoRepository.save(videoToSave);

    await Promise.all([
      this.videoviewRepository.save({ videoId: savedVideo.id, today: videoData.statistics.viewCount }),
      this.videocommentRepository.save({ videoId: savedVideo.id, today: videoData.statistics.commentCount }),
      this.videolikeRepository.save({ videoId: savedVideo.id, today: videoData.statistics.likeCount })
    ]);

    return savedVideo;
  }

  private async createChannelDataObject(info: any, channelData: any, videoData: any, video: any, resData: any) {
    const videoview = await this.videoviewRepository.findOne({ where: { videoId: video.id } });
    const videocomment = await this.videocommentRepository.findOne({ where: { videoId: video.id } });
    const videolike = await this.videolikeRepository.findOne({ where: { videoId: video.id } });

    return {
      Channel_Url_Id: channelData.snippet.customUrl,
      channel_img: channelData.snippet.thumbnails.default.url,
      videotitle: info.snippet.title,
      Channel_Id: info.snippet.channelId,
      nextPageToken: resData.nextPageToken,
      videoId: info.id.videoId,
      publishedAt: info.snippet.publishedAt,
      channelTitle: info.snippet.channelTitle,
      thumbnails: info.snippet.thumbnails.default.url,
      viewCount: +channelData.statistics.viewCount,
      subscriberCount: +channelData.statistics.subscriberCount,
      videoCount: +channelData.statistics.videoCount,
      videoviewcount: +videoData.statistics.viewCount,
      videolikecount: +videoData.statistics.likeCount,
      videocommentcount: +videoData.statistics.commentCount,
      viewdata: this.createChartData("조회수", videoview),
      commentdata: this.createChartData("댓글수", videocomment),
      likedata: this.createChartData("좋아요", videolike)
    };
  }

  private createChartData(id: string, data: any) {
    const colorMap = { "조회수": "hsl(195, 70%, 50%)", "댓글수": "hsl(26, 70%, 50%)", "좋아요": "hsl(107, 70%, 50%)" };
    return [{
      id,
      color: colorMap[id],
      data: [
        { x: "1년전", y: +data.Twelve_Month_Ago },
        { x: "11달전", y: +data.Eleven_Month_Ago },
        { x: "10달전", y: +data.Ten_Month_Ago },
        { x: "9달전", y: +data.Nine_Month_Ago },
        { x: "8달전", y: +data.Eight_Month_Ago },
        { x: "7달전", y: +data.Seven_Month_Ago },
        { x: "6달전", y: +data.Six_Month_Ago },
        { x: "5달전", y: +data.Five_Month_Ago },
        { x: "4달전", y: +data.Four_Month_Ago },
        { x: "3달전", y: +data.Three_Month_Ago },
        { x: "2달전", y: +data.Two_Month_Ago },
        { x: "1달전", y: +data.One_Month_Ago },
        { x: "오늘", y: +data.today },
      ]
    }];
  }



  async Filterlength(createFilterDto: CreateFilterDto, search: string) {
    try {
      if (createFilterDto.upload === "1Hour_ago") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${this.getOneHourAgo()}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (createFilterDto.upload === "Today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${today.toISOString()}&key=${process.env.Youtbe_Api_KEY}`)

        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (createFilterDto.upload === "Month") {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${firstDayOfMonth.toISOString()}&publishedBefore=${lastDayOfMonth.toISOString()}&key=${process.env.Youtbe_Api_KEY}`)

        const resData = response.data
        return await this.videoFilter(resData);
      }
    } catch (error) {
      throw new Error('Error fetching data from YouTube API: ' + error.message);
    }
  }

  async FilterDuration(videoDuration: string, search: string) {
    try {
      if (videoDuration === "short") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (videoDuration === "medium") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (videoDuration === "long") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&videoDuration=${videoDuration}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);
      }
    } catch (error) {
      throw new Error('Error fetching data from YouTube API: ' + error.message);
    }
  }

  async findOne(order: string, search: string) {
    try {
      if (order === "date") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (order === "relevance") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);

      }
      else if (order === "title") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);
      }
      else if (order === "videoCount") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);
      }
      else if (order === "viewCount") {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=${order}&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data
        return await this.videoFilter(resData);
      }
    } catch (error) {
      throw new Error('Error fetching data from YouTube API: ' + error.message);
    }
  }

  async DBInfluencerOrder(dbOrder: InfluencerOrder, page: number) {
    const where: any = {};
    if (dbOrder.subscriberMin !== 0 && dbOrder.subscriberMax !== 0) {
      where.subscriberCount = Between(dbOrder.subscriberMin, dbOrder.subscriberMax);
    }
    if (dbOrder.viewMin !== 0 && dbOrder.viewMax !== 0) {
      where.viewCount = Between(dbOrder.viewMin, dbOrder.viewMax);
    }
    if (dbOrder.videoMin !== 0 && dbOrder.videoMax !== 0) {
      where.videoCount = Between(dbOrder.videoMin, dbOrder.videoMax);
    }
    const channels = await this.channelList.find({
      where: {
        ...where,
      },
      skip: (page - 1) * 10,
      take: 10 // 상위 10개의 결과만 가져오기
    });
    return channels
  }


  async categoryFilter(categoryid : number){
    if(categoryid === 1){
      return "Film & Animation"
    }
    else if(categoryid === 2){
      return "Autos & Vehicles"

    }
    else if(categoryid === 10){
      return "Music"

    }
    else if(categoryid === 15){
      return "Pets & Animals"
      
    }
    else if(categoryid === 17){
      return "Sports"
      
    }
    else if(categoryid === 18){
      return "Short Movies"
      
    }
    else if(categoryid === 19){
      return "Travel & Events"
      
    }
    else if(categoryid === 20){
      return "Gaming"
      
    }
    else if(categoryid === 21){
      return "Videoblogging"
      
    }
    else if(categoryid === 22){
      return "People & Blogs"
      
    }
    else if(categoryid === 23){
      return "Comedy"
      
    }
    else if(categoryid === 24){
      return "Entertainment"
      
    }
    else if(categoryid === 25){
      return "News & Politics"
      
    }
    else if(categoryid === 26){
      return "Film & Animation"
      
    }
    else if(categoryid === 27){
      return "Film & Animation"
      
    }
    else if(categoryid === 28){
      return "Film & Animation"
      
    }
    else if(categoryid === 30){
      return "Film & Animation"
      
    }
    else if(categoryid === 31){
      return "Film & Animation"
      
    }
    else if(categoryid === 32){
      return "Film & Animation"
      
    }
    else if(categoryid === 33){
      return "Film & Animation"
      
    }
    else if(categoryid === 34){
      return "Film & Animation"
      
    }
    else if(categoryid === 35){
      return "Film & Animation"
      
    }
    else if(categoryid === 36){
      return "Film & Animation"
    }

    else if(categoryid === 37){
      return "Film & Animation"
    }

    else if(categoryid === 38){
      return "Film & Animation"
    }

    else if(categoryid === 39){
      return "Film & Animation"
    }

    else if(categoryid === 40){
      return "Film & Animation"
    }
    else if(categoryid === 41){
      return "Film & Animation" 
    }
    else if(categoryid === 42){
      return "Film & Animation"
    }
    else if(categoryid === 43){
      return "Film & Animation"
    }
    else if(categoryid === 44){
      return "Film & Animation"
    }




   

  }

  async YoutubeApiInfluencerOrder(YoutubeAPiOrder: InfluencerOrder, pagenumber: number) {
    console.log("Hello");
  }


}



