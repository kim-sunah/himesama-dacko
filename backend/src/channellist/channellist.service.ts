import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter, Repository } from "typeorm"
import { Channellist } from './entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';
import axios from 'axios'
import { Video } from 'src/video/entities/video.entity';
import { YoutubePageToken } from './dto/Yotube_PageToken.dto';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';


@Injectable()
export class ChannellistService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>, private readonly FilterService: FilterService,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>) {

  }

  async Urlcreate(Channel_Url_Id: string) {

    const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${Channel_Url_Id}&maxResults=25&key=${process.env.Youtbe_Api_KEY}`)
    const resData = response.data
    const SearchChannel = await this.channelList.findOne({ where: { Channel_Url_Id } })
    if (resData.pageInfo.totalResults === 1 && !SearchChannel) {
      return await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.medium.url })
    }
    if (resData.pageInfo.totalResults === 1 && SearchChannel) {
      return SearchChannel
    }
  }

  async Idcreate(Channel_Url_Id: string) {

    const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${Channel_Url_Id}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`)

    const resData = response.data

    if (resData.pageInfo.totalResults === 0) {
      return;
    }

    const SearchChannel = await this.channelList.findOne({ where: { Channel_Id: Channel_Url_Id } })
    if (resData.pageInfo.totalResults === 1 && !SearchChannel) {
      return await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.medium.url })
    }
    if (resData.pageInfo.totalResults === 1 && SearchChannel) {
      return SearchChannel
    }
  }

  async Getvideosearch(search: string) {
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
    const resData = response.data;
    return await this.FilterService.videoFilter(resData);
  }

  async searchchannel(Channel_Url_Id: string) {
    return await this.channelList.findOne({ where: { Channel_Url_Id: Channel_Url_Id } })

  }

  async channelInfo(channelId: string) {
    return await this.channelList.findOne({ where: { Channel_Id: channelId } })

  }

  async Channel_VideoCount() {
    // Skip all but the last record (offset of total - 1)
    const lastChannel = await this.channelList.find({
      order: { id: 'DESC' },
      take: 1,
    });

    const lastVideo = await this.VideoRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    if (lastChannel.length > 0 && lastVideo.length > 0) {
      return { lastChannel: lastChannel[0].id, lastVideo: lastVideo[0].id }
    }
    return { lastChannel: 0, lastVideo: 0 }

  }


  async YoutubeApiGetChannel(YoutubeChannelApi :InfluencerOrder, search: string) {
    const ChannelData = []
    let nextPageToken: string | undefined = '';
    let fetchCount = 0;
    
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&order=relevance&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
    const newItems = response.data
    const  maxFetchCount = 5
   
    
    nextPageToken = newItems.nextPageToken;
    for (const ChnnelId of newItems.items) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChnnelId.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
      const resData = response.data;
      if(YoutubeChannelApi.subscriberMin !== null || YoutubeChannelApi.videoMin !== null || YoutubeChannelApi.viewMin !== null){
        if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
          if (
            (YoutubeChannelApi.subscriberMin === null || (+resData.items[0].statistics.subscriberCount > +YoutubeChannelApi.subscriberMin && +resData.items[0].statistics.subscriberCount < +YoutubeChannelApi.subscriberMax)) &&
            (YoutubeChannelApi.videoMin === null || (+resData.items[0].statistics.videoCount > +YoutubeChannelApi.videoMin && +resData.items[0].statistics.videoCount < +YoutubeChannelApi.videoMax)) &&
            (YoutubeChannelApi.viewMin === null || (+resData.items[0].statistics.viewCount > +YoutubeChannelApi.viewMin && +resData.items[0].statistics.viewCount < +YoutubeChannelApi.viewMax))
        ) {
            ChannelData.push({
              Channel_nickname: resData.items[0].snippet.title,
              Channel_Id: resData.items[0].id,
              Channel_Url_Id: resData.items[0].snippet.customUrl,
              channel_img: resData.items[0].snippet.thumbnails.high.url,
              subscriberCount: +resData.items[0].statistics.subscriberCount,
              videoCount: +resData.items[0].statistics.videoCount,
              viewCount: +resData.items[0].statistics.viewCount,
            });
            if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
              await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
            }
          }
      }
    }
    else if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl) ) {
        ChannelData.push({
          Channel_nickname: resData.items[0].snippet.title,
          Channel_Id: resData.items[0].id,
          Channel_Url_Id: resData.items[0].snippet.customUrl,
          channel_img: resData.items[0].snippet.thumbnails.high.url,
          subscriberCount: +resData.items[0].statistics.subscriberCount,
          videoCount: +resData.items[0].statistics.videoCount,
          viewCount: +resData.items[0].statistics.viewCount,
        });
        if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
          await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
        }

      }

    if(!YoutubeChannelApi.accurate_search){
      while (nextPageToken && fetchCount < maxFetchCount) {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken=${nextPageToken}&order=relevance&type=video&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const newItems = response.data
        nextPageToken = newItems.nextPageToken;
        for (const ChnnelId of newItems.items) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChnnelId.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
          const resData = response.data;
          if(YoutubeChannelApi.subscriberMin !== null || YoutubeChannelApi.videoMin !== null || YoutubeChannelApi.viewMin !== null){
          
            if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
              if (
                (YoutubeChannelApi.subscriberMin === null || (+resData.items[0].statistics.subscriberCount > +YoutubeChannelApi.subscriberMin && +resData.items[0].statistics.subscriberCount < +YoutubeChannelApi.subscriberMax)) &&
                (YoutubeChannelApi.videoMin === null || (+resData.items[0].statistics.videoCount > +YoutubeChannelApi.videoMin && +resData.items[0].statistics.videoCount < +YoutubeChannelApi.videoMax)) &&
                (YoutubeChannelApi.viewMin === null || (+resData.items[0].statistics.viewCount > +YoutubeChannelApi.viewMin && +resData.items[0].statistics.viewCount < +YoutubeChannelApi.viewMax))
            ) {
                ChannelData.push({
                  Channel_nickname: resData.items[0].snippet.title,
                  Channel_Id: resData.items[0].id,
                  Channel_Url_Id: resData.items[0].snippet.customUrl,
                  channel_img: resData.items[0].snippet.thumbnails.high.url,
                  subscriberCount: +resData.items[0].statistics.subscriberCount,
                  videoCount: +resData.items[0].statistics.videoCount,
                  viewCount: +resData.items[0].statistics.viewCount,
                });
                if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
                  await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
                }
              }
          }
        }
          else if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
            ChannelData.push({
              Channel_nickname: resData.items[0].snippet.title,
              Channel_Id: resData.items[0].id,
              Channel_Url_Id: resData.items[0].snippet.customUrl,
              channel_img: resData.items[0].snippet.thumbnails.high.url,
              subscriberCount: +resData.items[0].statistics.subscriberCount,
              videoCount: +resData.items[0].statistics.videoCount,
              viewCount: +resData.items[0].statistics.viewCount,
            });
            if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
              await this.channelList.save({Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
            }
          }
        }
        fetchCount++;
      }
    }
    else if(YoutubeChannelApi.accurate_search){
      
      while (nextPageToken) {
       
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken=${nextPageToken}&order=relevance&type=video&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
        const newItems = response.data
        
        nextPageToken = newItems.nextPageToken;
        for (const ChnnelId of newItems.items) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChnnelId.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
          const resData = response.data;
          if(YoutubeChannelApi.subscriberMin !== null || YoutubeChannelApi.videoMin !== null || YoutubeChannelApi.viewMin !== null){
          
            if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
              if (
                (YoutubeChannelApi.subscriberMin === null || (+resData.items[0].statistics.subscriberCount > +YoutubeChannelApi.subscriberMin && +resData.items[0].statistics.subscriberCount < +YoutubeChannelApi.subscriberMax)) &&
                (YoutubeChannelApi.videoMin === null || (+resData.items[0].statistics.videoCount > +YoutubeChannelApi.videoMin && +resData.items[0].statistics.videoCount < +YoutubeChannelApi.videoMax)) &&
                (YoutubeChannelApi.viewMin === null || (+resData.items[0].statistics.viewCount > +YoutubeChannelApi.viewMin && +resData.items[0].statistics.viewCount < +YoutubeChannelApi.viewMax))
            ) {
                ChannelData.push({
                  Channel_nickname: resData.items[0].snippet.title,
                  Channel_Id: resData.items[0].id,
                  Channel_Url_Id: resData.items[0].snippet.customUrl,
                  channel_img: resData.items[0].snippet.thumbnails.high.url,
                  subscriberCount: +resData.items[0].statistics.subscriberCount,
                  videoCount: +resData.items[0].statistics.videoCount,
                  viewCount: +resData.items[0].statistics.viewCount,
                });
                if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
                  await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
                }
              }
          }
        }
          else if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
            ChannelData.push({
              Channel_nickname: resData.items[0].snippet.title,
              Channel_Id: resData.items[0].id,
              Channel_Url_Id: resData.items[0].snippet.customUrl,
              channel_img: resData.items[0].snippet.thumbnails.high.url,
              subscriberCount: +resData.items[0].statistics.subscriberCount,
              videoCount: +resData.items[0].statistics.videoCount,
              viewCount: +resData.items[0].statistics.viewCount,
            });
            if(!await this.channelList.findOne({where : { Channel_Url_Id : resData.items[0].snippet.customUrl}})){
              await this.channelList.save({Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].snippet.customUrl, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.high.url })
            }
          }
        }
      }
    }
    return ChannelData}
}

  async YoutubeApiGetVideo(YoutubeInfluencer: YoutubePageToken, search: string) {
    if (YoutubeInfluencer.PageToken) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${YoutubeInfluencer.PageToken}&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
      const resData = response.data;
      return await this.FilterService.videoFilter(resData);

    }
    else if (!YoutubeInfluencer.PageToken) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
      const resData = response.data;
      return await this.FilterService.videoFilter(resData);
    }
  }


  async Live_Popular_CreateApi(ChannelId : string){
  
    const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelId}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`)
    console.log(ChannelId)
    const resData = response.data
    console.log(resData)

    if (resData.pageInfo.totalResults === 0) {
      return;
    }
   
    const SearchChannel = await this.channelList.findOne({ where: { Channel_Id: ChannelId } })
    if (resData.pageInfo.totalResults === 1 && !SearchChannel) {
      return await this.channelList.save({ Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, channel_img: resData.items[0].snippet.thumbnails.medium.url })
    }
    if (resData.pageInfo.totalResults === 1 && SearchChannel) {
      return SearchChannel
    }
  }
}
