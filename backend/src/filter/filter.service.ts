import { Inject, Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Between, MoreThanOrEqual, Repository, getRepository } from 'typeorm';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { InfluencerOrder } from './dto/DbOrder.dto';
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
  
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>, @InjectRepository(Video) private readonly videoRepository: Repository<Video>, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>, @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>, @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>) { }

  async videoFilter(resData: Data) {
    try {
      const channelDataArray = [];
      for (const info of resData.items) {
        const ChannelInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${info.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
        const ChannelData = ChannelInfo.data
        const ChannelUrlID = await this.channelList.findOne({ where: { Channel_Url_Id: ChannelData.items[0].snippet.customUrl } })
        if (!ChannelUrlID) {
          await this.channelList.save({ Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
        }

        if (info.id.videoId) {

          const ChannelInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&id=${info.id.videoId}&key=${process.env.Youtbe_Api_KEY}`)
          const channelcategoryData = ChannelInfo.data

          const data = await this.channelList.findOne({ where: { Channel_Id: info.snippet.channelId } })
          const videoId = await this.videoRepository.findOne({ where: { videoid: info.id.videoId } })
          if (!videoId && data) {
            const videoviewData = await this.videoRepository.create({ videoid: info.id.videoId, videotitle: info.snippet.title, videopublishedAt: info.snippet.publishedAt, channelId: +data.id })
            await this.videoRepository.save(videoviewData);
            await this.videoviewRepository.save({ videoId: videoviewData.id, today: channelcategoryData.items[0].statistics.viewCount })
            await this.videocommentRepository.save({ videoId: videoviewData.id, today: channelcategoryData.items[0].statistics.commentCount })
            await this.videolikeRepository.save({ videoId: videoviewData.id, today: channelcategoryData.items[0].statistics.likeCount })


            if (!resData.prevPageToken || resData.prevPageToken === undefined) {
              const videoview = await this.videoviewRepository.findOne({ where: { videoId: videoviewData.id } })
              const videocomment = await this.videocommentRepository.findOne({ where: { videoId: videoviewData.id } })
              const videolike = await this.videolikeRepository.findOne({ where: { videoId: videoviewData.id } })
              channelDataArray.push({
                Channel_Url_Id: data.Channel_Url_Id,
                channel_img: ChannelData.items[0].snippet.thumbnails.default.url,
                videotitle: info.snippet.title,
                Channel_Id: info.snippet.channelId,
                nextPageToken: resData.nextPageToken,
                videoId: info.id.videoId,
                publishedAt: info.snippet.publishedAt,
                channelTitle: info.snippet.channelTitle,
                thumbnails: info.snippet.thumbnails.default.url,
                viewCount: +ChannelData.items[0].statistics.viewCount,
                subscriberCount: +ChannelData.items[0].statistics.subscriberCount,
                videoCount: +ChannelData.items[0].statistics.videoCount,
                videoviewcount: +channelcategoryData.items[0].statistics.viewCount,
                videolikecount: +channelcategoryData.items[0].statistics.likeCount,
                videocommentcount: +channelcategoryData.items[0].statistics.commentCount,
                viewdata: [
                  {
                    id: "조회수",
                    color: "hsl(195, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videoview.Twelve_Month_Ago },
                      { x: "11달전", y: +videoview.Eigth_Month_Ago },
                      { x: "10달전", y: +videoview.Ten_Month_Ago },
                      { x: "9달전", y: +videoview.Nine_Month_Ago },
                      { x: "8달전", y: +videoview.Eigth_Month_Ago },
                      { x: "7달전", y: +videoview.Seven_Month_Ago },
                      { x: "6달전", y: +videoview.Six_Month_Ago },
                      { x: "5달전", y: +videoview.Five_Month_Ago },
                      { x: "4달전", y: +videoview.Four_Month_Ago },
                      { x: "3달전", y: +videoview.Three_Month_Ago },
                      { x: "2달전", y: +videoview.Two_Month_Ago },
                      { x: "1달전", y: +videoview.One_Month_Ago },
                    
                      { x: "오늘", y: +videoview.today },

                    ]
                  },
                ],
                commentdata: [
                  {
                    id: "댓글수",
                    color: "hsl(26, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videocomment.Twelve_Month_Ago },
                      { x: "11달전", y: +videocomment.Eigth_Month_Ago },
                      { x: "10달전", y: +videocomment.Ten_Month_Ago },
                      { x: "9달전", y: +videocomment.Nine_Month_Ago },
                      { x: "8달전", y: +videocomment.Eigth_Month_Ago },
                      { x: "7달전", y: +videocomment.Seven_Month_Ago },
                      { x: "6달전", y: +videocomment.Six_Month_Ago },
                      { x: "5달전", y: +videocomment.Five_Month_Ago },
                      { x: "4달전", y: +videocomment.Four_Month_Ago },
                      { x: "3달전", y: +videocomment.Three_Month_Ago },
                      { x: "2달전", y: +videocomment.Two_Month_Ago },
                      { x: "1달전", y: +videocomment.One_Month_Ago },
                     
                      { x: "오늘", y: +videocomment.today },
                    ]
                  },
                ],
                likedata: [
                  {
                    id: "좋아요",
                    color: "hsl(107, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videolike.Twelve_Month_Ago },
                      { x: "11달전", y: +videolike.Eigth_Month_Ago },
                      { x: "10달전", y: +videolike.Ten_Month_Ago },
                      { x: "9달전", y: +videolike.Nine_Month_Ago },
                      { x: "8달전", y: +videolike.Eigth_Month_Ago },
                      { x: "7달전", y: +videolike.Seven_Month_Ago },
                      { x: "6달전", y: +videolike.Six_Month_Ago },
                      { x: "5달전", y: +videolike.Five_Month_Ago },
                      { x: "4달전", y: +videolike.Four_Month_Ago },
                      { x: "3달전", y: +videolike.Three_Month_Ago },
                      { x: "2달전", y: +videolike.Two_Month_Ago },
                      { x: "1달전", y: +videolike.One_Month_Ago },
                      { x: "오늘", y: +videolike.today },
                    ]
                  },
                ]
              })
            }
            else {
              channelDataArray.push({ Channel_Url_Id: data.Channel_Url_Id, channel_img: ChannelData.items[0].snippet.thumbnails.default.url, videotitle: info.snippet.title, Channel_Id: info.snippet.channelId, channelId: info.snippet.channelId, nextPageToken: resData.nextPageToken, publishedAt: info.snippet.publishedAt, prevPageToken: resData.prevPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, videoviewcount: +channelcategoryData.items[0].statistics.viewCount, videolikecount: +channelcategoryData.items[0].statistics.likeCount, videocommentcount: +channelcategoryData.items[0].statistics.commentCount })
            }
          }
          else if (videoId) {
            if (!resData.prevPageToken || resData.prevPageToken === undefined) {
              const videoview = await this.videoviewRepository.findOne({ where: { videoId: videoId.id } })
              const videocomment = await this.videocommentRepository.findOne({ where: { videoId: videoId.id } })
              const videolike = await this.videolikeRepository.findOne({ where: { videoId: videoId.id } })
              channelDataArray.push({
                Channel_Url_Id: data.Channel_Url_Id,
                channel_img: ChannelData.items[0].snippet.thumbnails.default.url,
                videotitle: info.snippet.title,
                Channel_Id: info.snippet.channelId,
                nextPageToken: resData.nextPageToken,
                videoId: info.id.videoId,
                publishedAt: info.snippet.publishedAt,
                channelTitle: info.snippet.channelTitle,
                thumbnails: info.snippet.thumbnails.default.url,
                viewCount: +ChannelData.items[0].statistics.viewCount,
                subscriberCount: +ChannelData.items[0].statistics.subscriberCount,
                videoCount: +ChannelData.items[0].statistics.videoCount,
                videoviewcount: +channelcategoryData.items[0].statistics.viewCount,
                videolikecount: +channelcategoryData.items[0].statistics.likeCount,
                videocommentcount: +channelcategoryData.items[0].statistics.commentCount,
                viewdata: [
                  {
                    id: "조회수",
                    color: "hsl(195, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videoview.Twelve_Month_Ago },
                      { x: "11달전", y: +videoview.Eigth_Month_Ago },
                      { x: "10달전", y: +videoview.Ten_Month_Ago },
                      { x: "9달전", y: +videoview.Nine_Month_Ago },
                      { x: "8달전", y: +videoview.Eigth_Month_Ago },
                      { x: "7달전", y: +videoview.Seven_Month_Ago },
                      { x: "6달전", y: +videoview.Six_Month_Ago },
                      { x: "5달전", y: +videoview.Five_Month_Ago },
                      { x: "4달전", y: +videoview.Four_Month_Ago },
                      { x: "3달전", y: +videoview.Three_Month_Ago },
                      { x: "2달전", y: +videoview.Two_Month_Ago },
                      { x: "1달전", y: +videoview.One_Month_Ago },
                      { x: "오늘", y: +videoview.today },
                    ]
                  },
                ],
                commentdata: [
                  {
                    id: "댓글수",
                    color: "hsl(26, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videocomment.Twelve_Month_Ago },
                      { x: "11달전", y: +videocomment.Eigth_Month_Ago },
                      { x: "10달전", y: +videocomment.Ten_Month_Ago },
                      { x: "9달전", y: +videocomment.Nine_Month_Ago },
                      { x: "8달전", y: +videocomment.Eigth_Month_Ago },
                      { x: "7달전", y: +videocomment.Seven_Month_Ago },
                      { x: "6달전", y: +videocomment.Six_Month_Ago },
                      { x: "5달전", y: +videocomment.Five_Month_Ago },
                      { x: "4달전", y: +videocomment.Four_Month_Ago },
                      { x: "3달전", y: +videocomment.Three_Month_Ago },
                      { x: "2달전", y: +videocomment.Two_Month_Ago },
                      { x: "1달전", y: +videocomment.One_Month_Ago },
                      { x: "오늘", y: +videocomment.today },
                    ]
                  },
                ],
                likedata: [
                  {
                    id: "좋아요",
                    color: "hsl(107, 70%, 50%)",
                    data: [
                      { x: "1년전", y: +videolike.Twelve_Month_Ago },
                      { x: "11달전", y: +videolike.Eigth_Month_Ago },
                      { x: "10달전", y: +videolike.Ten_Month_Ago },
                      { x: "9달전", y: +videolike.Nine_Month_Ago },
                      { x: "8달전", y: +videolike.Eigth_Month_Ago },
                      { x: "7달전", y: +videolike.Seven_Month_Ago },
                      { x: "6달전", y: +videolike.Six_Month_Ago },
                      { x: "5달전", y: +videolike.Five_Month_Ago },
                      { x: "4달전", y: +videolike.Four_Month_Ago },
                      { x: "3달전", y: +videolike.Three_Month_Ago },
                      { x: "2달전", y: +videolike.Two_Month_Ago },
                      { x: "1달전", y: +videolike.One_Month_Ago },
                      { x: "오늘", y: +videolike.today },
                    ]
                  },
                ]
              })

            }
            else {
              channelDataArray.push({ Channel_Url_Id: data.Channel_Url_Id, channel_img: ChannelData.items[0].snippet.thumbnails.default.url, videotitle: info.snippet.title, Channel_Id: info.snippet.channelId, channelId: info.snippet.channelId, nextPageToken: resData.nextPageToken, publishedAt: info.snippet.publishedAt, prevPageToken: resData.prevPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, videoviewcount: +channelcategoryData.items[0].statistics.viewCount, videolikecount: +channelcategoryData.items[0].statistics.likeCount, videocommentcount: +channelcategoryData.items[0].statistics.commentCount })
            }
          }


        }
      }
      return channelDataArray
    }
    catch (err) {
      console.log(err)
    }

  }
  private getOneHourAgo(): string {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return oneHourAgo.toISOString();
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

  async DBInfluencerOrder( dbOrder: InfluencerOrder, page: number) {
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

  async YoutubeApiInfluencerOrder(YoutubeAPiOrder :InfluencerOrder ,pagenumber : number){
    console.log("Hello");
  }

  remove(id: number) {
    return `This action removes a #${id} filter`;
  }
}



