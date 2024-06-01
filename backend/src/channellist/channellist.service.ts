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

    const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${Channel_Url_Id}&maxResults=25&key=${process.env.Youtbe_Api_KEY}`)

    const resData = response.data

    if (resData.pageInfo.totalResults === 0) {
      throw new NotFoundException()
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
    return await this.channelList.findOne({ where: { Channel_Url_Id: channelId } })

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


  async YoutubeApiGetChannel(search: string) {
    const ChannelData = []
    let nextPageToken: string | undefined = '';
    let fetchCount = 0;
    const maxFetchCount = 20;


    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=relevance&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
    const newItems = response.data
    nextPageToken = newItems.nextPageToken;
    for (const ChnnelId of newItems.items) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChnnelId.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
      const resData = response.data;
      if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
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
    while (nextPageToken && fetchCount < maxFetchCount) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${nextPageToken}&order=relevance&type=video&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
      const newItems = response.data
      nextPageToken = newItems.nextPageToken;
      for (const ChnnelId of newItems.items) {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChnnelId.snippet.channelId}&key=${process.env.Youtbe_Api_KEY}`)
        const resData = response.data;
        if (!ChannelData.some(channel => channel.Channel_Url_Id === resData.items[0].snippet.customUrl)) {
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
      fetchCount++;
    }
    return ChannelData
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
}
