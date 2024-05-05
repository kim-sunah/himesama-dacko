import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter, Repository } from "typeorm"
import { Channellist } from './entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';
import axios from 'axios'


@Injectable()
export class ChannellistService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>, private readonly FilterService : FilterService) {

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
    return await this.channelList.findOne({where : {Channel_Url_Id : Channel_Url_Id}})

  }

  async channelInfo(channelId : string){
    return await this.channelList.findOne({where : {Channel_Url_Id : channelId}})

  }

  remove(id: number) {
    return `This action removes a #${id} channellist`;
  }
}
