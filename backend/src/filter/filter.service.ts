import { Inject, Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
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
          console.log(data)
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
                      { x: "30일전", y: videoview.Thirty_day_Ago },
                      { x: "29일전", y: videoview.Twenty_nine_day_Ago },
                      { x: "28일전", y: videoview.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videoview.Twenty_seven_day_Ago },
                      { x: "26일전", y: videoview.Twenty_six_day_Ago },
                      { x: "25일전", y: videoview.Twenty_five_day_Ago },
                      { x: "24일전", y: videoview.Twenty_four_day_Ago },
                      { x: "23일전", y: videoview.Twenty_three_day_Ago },
                      { x: "22일전", y: videoview.Twenty_two_day_Ago },
                      { x: "21일전", y: videoview.Twenty_one_day_Ago },
                      { x: "20일전", y: videoview.Twenty_day_Ago },
                      { x: "19일전", y: videoview.Nineteen_day_Ago },
                      { x: "18일전", y: videoview.Eigthteen_day_Ago },
                      { x: "17일전", y: videoview.seventeen_day_Ago },
                      { x: "16일전", y: videoview.sixteen_day_Ago },
                      { x: "15일전", y: videoview.fifteen_day_Ago },
                      { x: "14일전", y: videoview.fourteen_day_Ago },
                      { x: "13일전", y: videoview.thirteen_day_Ago },
                      { x: "12일전", y: videoview.twelve_day_Ago },
                      { x: "11일전", y: videoview.Eleven_day_Ago },
                      { x: "10일전", y: videoview.Ten_day_Ago },
                      { x: "9일전", y: videoview.Nine_day_Ago },
                      { x: "8일전", y: videoview.Eigth_day_Ago },
                      { x: "7일전", y: videoview.Sevent_day_Ago },
                      { x: "6일전", y: videoview.Six_day_Ago },
                      { x: "5일전", y: videoview.Five_day_Ago },
                      { x: "4일전", y: videoview.Four_day_Ago },
                      { x: "3일전", y: videoview.Three_day_Ago },
                      { x: "2일전", y: videoview.Two_day_Ago },
                      { x: "1일전", y: videoview.One_day_Ago },
                      { x: "오늘", y: videoview.today },

                    ]
                  },
                ],
                commentdata: [
                  {
                    id: "댓글수",
                    color: "hsl(26, 70%, 50%)",
                    data: [
                      { x: "30일전", y: videocomment.Thirty_day_Ago },
                      { x: "29일전", y: videocomment.Twenty_nine_day_Ago },
                      { x: "28일전", y: videocomment.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videocomment.Twenty_seven_day_Ago },
                      { x: "26일전", y: videocomment.Twenty_six_day_Ago },
                      { x: "25일전", y: videocomment.Twenty_five_day_Ago },
                      { x: "24일전", y: videocomment.Twenty_four_day_Ago },
                      { x: "23일전", y: videocomment.Twenty_three_day_Ago },
                      { x: "22일전", y: videocomment.Twenty_two_day_Ago },
                      { x: "21일전", y: videocomment.Twenty_one_day_Ago },
                      { x: "20일전", y: videocomment.Twenty_day_Ago },
                      { x: "19일전", y: videocomment.Nineteen_day_Ago },
                      { x: "18일전", y: videocomment.Eigthteen_day_Ago },
                      { x: "17일전", y: videocomment.seventeen_day_Ago },
                      { x: "16일전", y: videocomment.sixteen_day_Ago },
                      { x: "15일전", y: videocomment.fifteen_day_Ago },
                      { x: "14일전", y: videocomment.fourteen_day_Ago },
                      { x: "13일전", y: videocomment.thirteen_day_Ago },
                      { x: "12일전", y: videocomment.twelve_day_Ago },
                      { x: "11일전", y: videocomment.Eleven_day_Ago },
                      { x: "10일전", y: videocomment.Ten_day_Ago },
                      { x: "9일전", y: videocomment.Nine_day_Ago },
                      { x: "8일전", y: videocomment.Eigth_day_Ago },
                      { x: "7일전", y: videocomment.Sevent_day_Ago },
                      { x: "6일전", y: videocomment.Six_day_Ago },
                      { x: "5일전", y: videocomment.Five_day_Ago },
                      { x: "4일전", y: videocomment.Four_day_Ago },
                      { x: "3일전", y: videocomment.Three_day_Ago },
                      { x: "2일전", y: videocomment.Two_day_Ago },
                      { x: "1일전", y: videocomment.One_day_Ago },
                      { x: "오늘", y: videocomment.today },
                    ]
                  },
                ],
                likedata: [
                  {
                    id: "좋아요",
                    color: "hsl(107, 70%, 50%)",
                    data: [
                      { x: "30일전", y: videolike.Thirty_day_Ago },
                      { x: "29일전", y: videolike.Twenty_nine_day_Ago },
                      { x: "28일전", y: videolike.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videolike.Twenty_seven_day_Ago },
                      { x: "26일전", y: videolike.Twenty_six_day_Ago },
                      { x: "25일전", y: videolike.Twenty_five_day_Ago },
                      { x: "24일전", y: videolike.Twenty_four_day_Ago },
                      { x: "23일전", y: videolike.Twenty_three_day_Ago },
                      { x: "22일전", y: videolike.Twenty_two_day_Ago },
                      { x: "21일전", y: videolike.Twenty_one_day_Ago },
                      { x: "20일전", y: videolike.Twenty_day_Ago },
                      { x: "19일전", y: videolike.Nineteen_day_Ago },
                      { x: "18일전", y: videolike.Eigthteen_day_Ago },
                      { x: "17일전", y: videolike.seventeen_day_Ago },
                      { x: "16일전", y: videolike.sixteen_day_Ago },
                      { x: "15일전", y: videolike.fifteen_day_Ago },
                      { x: "14일전", y: videolike.fourteen_day_Ago },
                      { x: "13일전", y: videolike.thirteen_day_Ago },
                      { x: "12일전", y: videolike.twelve_day_Ago },
                      { x: "11일전", y: videolike.Eleven_day_Ago },
                      { x: "10일전", y: videolike.Ten_day_Ago },
                      { x: "9일전", y: videolike.Nine_day_Ago },
                      { x: "8일전", y: videolike.Eigth_day_Ago },
                      { x: "7일전", y: videolike.Sevent_day_Ago },
                      { x: "6일전", y: videolike.Six_day_Ago },
                      { x: "5일전", y: videolike.Five_day_Ago },
                      { x: "4일전", y: videolike.Four_day_Ago },
                      { x: "3일전", y: videolike.Three_day_Ago },
                      { x: "2일전", y: videolike.Two_day_Ago },
                      { x: "1일전", y: videolike.One_day_Ago },
                      { x: "오늘", y: videolike.today },
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
                      { x: "30일전", y: videoview.Thirty_day_Ago },
                      { x: "29일전", y: videoview.Twenty_nine_day_Ago },
                      { x: "28일전", y: videoview.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videoview.Twenty_seven_day_Ago },
                      { x: "26일전", y: videoview.Twenty_six_day_Ago },
                      { x: "25일전", y: videoview.Twenty_five_day_Ago },
                      { x: "24일전", y: videoview.Twenty_four_day_Ago },
                      { x: "23일전", y: videoview.Twenty_three_day_Ago },
                      { x: "22일전", y: videoview.Twenty_two_day_Ago },
                      { x: "21일전", y: videoview.Twenty_one_day_Ago },
                      { x: "20일전", y: videoview.Twenty_day_Ago },
                      { x: "19일전", y: videoview.Nineteen_day_Ago },
                      { x: "18일전", y: videoview.Eigthteen_day_Ago },
                      { x: "17일전", y: videoview.seventeen_day_Ago },
                      { x: "16일전", y: videoview.sixteen_day_Ago },
                      { x: "15일전", y: videoview.fifteen_day_Ago },
                      { x: "14일전", y: videoview.fourteen_day_Ago },
                      { x: "13일전", y: videoview.thirteen_day_Ago },
                      { x: "12일전", y: videoview.twelve_day_Ago },
                      { x: "11일전", y: videoview.Eleven_day_Ago },
                      { x: "10일전", y: videoview.Ten_day_Ago },
                      { x: "9일전", y: videoview.Nine_day_Ago },
                      { x: "8일전", y: videoview.Eigth_day_Ago },
                      { x: "7일전", y: videoview.Sevent_day_Ago },
                      { x: "6일전", y: videoview.Six_day_Ago },
                      { x: "5일전", y: videoview.Five_day_Ago },
                      { x: "4일전", y: videoview.Four_day_Ago },
                      { x: "3일전", y: videoview.Three_day_Ago },
                      { x: "2일전", y: videoview.Two_day_Ago },
                      { x: "1일전", y: videoview.One_day_Ago },
                      { x: "오늘", y: videoview.today },

                    ]
                  },
                ],
                commentdata: [
                  {
                    id: "댓글수",
                    color: "hsl(26, 70%, 50%)",
                    data: [
                      { x: "30일전", y: videocomment.Thirty_day_Ago },
                      { x: "29일전", y: videocomment.Twenty_nine_day_Ago },
                      { x: "28일전", y: videocomment.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videocomment.Twenty_seven_day_Ago },
                      { x: "26일전", y: videocomment.Twenty_six_day_Ago },
                      { x: "25일전", y: videocomment.Twenty_five_day_Ago },
                      { x: "24일전", y: videocomment.Twenty_four_day_Ago },
                      { x: "23일전", y: videocomment.Twenty_three_day_Ago },
                      { x: "22일전", y: videocomment.Twenty_two_day_Ago },
                      { x: "21일전", y: videocomment.Twenty_one_day_Ago },
                      { x: "20일전", y: videocomment.Twenty_day_Ago },
                      { x: "19일전", y: videocomment.Nineteen_day_Ago },
                      { x: "18일전", y: videocomment.Eigthteen_day_Ago },
                      { x: "17일전", y: videocomment.seventeen_day_Ago },
                      { x: "16일전", y: videocomment.sixteen_day_Ago },
                      { x: "15일전", y: videocomment.fifteen_day_Ago },
                      { x: "14일전", y: videocomment.fourteen_day_Ago },
                      { x: "13일전", y: videocomment.thirteen_day_Ago },
                      { x: "12일전", y: videocomment.twelve_day_Ago },
                      { x: "11일전", y: videocomment.Eleven_day_Ago },
                      { x: "10일전", y: videocomment.Ten_day_Ago },
                      { x: "9일전", y: videocomment.Nine_day_Ago },
                      { x: "8일전", y: videocomment.Eigth_day_Ago },
                      { x: "7일전", y: videocomment.Sevent_day_Ago },
                      { x: "6일전", y: videocomment.Six_day_Ago },
                      { x: "5일전", y: videocomment.Five_day_Ago },
                      { x: "4일전", y: videocomment.Four_day_Ago },
                      { x: "3일전", y: videocomment.Three_day_Ago },
                      { x: "2일전", y: videocomment.Two_day_Ago },
                      { x: "1일전", y: videocomment.One_day_Ago },
                      { x: "오늘", y: videocomment.today },
                    ]
                  },
                ],
                likedata: [
                  {
                    id: "좋아요",
                    color: "hsl(107, 70%, 50%)",
                    data: [
                      { x: "30일전", y: videolike.Thirty_day_Ago },
                      { x: "29일전", y: videolike.Twenty_nine_day_Ago },
                      { x: "28일전", y: videolike.Twenty_eigth_day_Ago },
                      { x: "27일전", y: videolike.Twenty_seven_day_Ago },
                      { x: "26일전", y: videolike.Twenty_six_day_Ago },
                      { x: "25일전", y: videolike.Twenty_five_day_Ago },
                      { x: "24일전", y: videolike.Twenty_four_day_Ago },
                      { x: "23일전", y: videolike.Twenty_three_day_Ago },
                      { x: "22일전", y: videolike.Twenty_two_day_Ago },
                      { x: "21일전", y: videolike.Twenty_one_day_Ago },
                      { x: "20일전", y: videolike.Twenty_day_Ago },
                      { x: "19일전", y: videolike.Nineteen_day_Ago },
                      { x: "18일전", y: videolike.Eigthteen_day_Ago },
                      { x: "17일전", y: videolike.seventeen_day_Ago },
                      { x: "16일전", y: videolike.sixteen_day_Ago },
                      { x: "15일전", y: videolike.fifteen_day_Ago },
                      { x: "14일전", y: videolike.fourteen_day_Ago },
                      { x: "13일전", y: videolike.thirteen_day_Ago },
                      { x: "12일전", y: videolike.twelve_day_Ago },
                      { x: "11일전", y: videolike.Eleven_day_Ago },
                      { x: "10일전", y: videolike.Ten_day_Ago },
                      { x: "9일전", y: videolike.Nine_day_Ago },
                      { x: "8일전", y: videolike.Eigth_day_Ago },
                      { x: "7일전", y: videolike.Sevent_day_Ago },
                      { x: "6일전", y: videolike.Six_day_Ago },
                      { x: "5일전", y: videolike.Five_day_Ago },
                      { x: "4일전", y: videolike.Four_day_Ago },
                      { x: "3일전", y: videolike.Three_day_Ago },
                      { x: "2일전", y: videolike.Two_day_Ago },
                      { x: "1일전", y: videolike.One_day_Ago },
                      { x: "오늘", y: videolike.today },
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

  update(id: number, updateFilterDto: UpdateFilterDto) {
    return `This action updates a #${id} filter`;
  }

  remove(id: number) {
    return `This action removes a #${id} filter`;
  }
}



