import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
import { Channellist } from './entities/channellist.entity';

@Injectable()
export class ChannellistService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>) {

  }

  async Urlcreate(Channel_Url_Id: string) {
    const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
    const response = await fetch(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${Channel_Url_Id}&maxResults=25&key=${apiKey}`)
    if (!response.ok) {
      throw new Error("Could not fetch events");
    }
    else {
      const resData = await response.json();
      if (resData.pageInfo.totalResults === 0) {
        throw new NotFoundException()
      }
      const SearchChannel = await this.channelList.findOne({ where: { Channel_Url_Id } })
      if (resData.pageInfo.totalResults === 1 && !SearchChannel) {
        const channelSearch = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${resData.items[0].id}&maxResults=1&key=${apiKey}`)
        if (!channelSearch.ok) {
          throw new Error("Could not fetch events");
        }
        const channelData = await channelSearch.json();
        if (channelData.items[0].id.videoId) {
          const channelcategory = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${channelData.items[0].id.videoId}&key=${apiKey}`)
          if (!channelcategory.ok) {
            throw new Error("Could not fetch events");
          }
          const channelcategoryData = await channelcategory.json()
          if (channelcategoryData.items[0].snippet.categoryId === 1) {
            return await this.channelList.save({ Channel_category: "Film_Animation", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "2") {
            return await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "10") {
            return await this.channelList.save({ Channel_category: "Music", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "15") {
            return await this.channelList.save({ Channel_category: "Pets_Animals", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "17") {
            return await this.channelList.save({ Channel_category: "Sports", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "18") {
            return await this.channelList.save({ Channel_category: "Short_Movies", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "19") {
            return await this.channelList.save({ Channel_category: "Travel_Events", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "20") {
            return await this.channelList.save({ Channel_category: "Gaming", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "21") {
            return await this.channelList.save({ Channel_category: "Videoblogging", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "22") {
            return await this.channelList.save({ Channel_category: "People_Blogs", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "23" || channelcategoryData.items[0].snippet.categoryId === "34") {
            return await this.channelList.save({ Channel_category: "Comedy", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "24") {
            return await this.channelList.save({ Channel_category: "Entertainment", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "25") {

            return await this.channelList.save({ Channel_category: "News_Politics", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "26") {
            return await this.channelList.save({ Channel_category: "How_to_Style", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "27") {
            return await this.channelList.save({ Channel_category: "Education", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "28") {
            return await this.channelList.save({ Channel_category: "Science_Technology", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "29") {
            return await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "30") {
            return await this.channelList.save({ Channel_category: "Movies", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "31") {
            return await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "32") {
            return await this.channelList.save({ Channel_category: "ActionAdventure", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "33") {
            return await this.channelList.save({ Channel_category: "Classics", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "35") {
            return await this.channelList.save({ Channel_category: "Documentary", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "36") {
            return await this.channelList.save({ Channel_category: "Drama", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "37") {
            return await this.channelList.save({ Channel_category: "Family", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "38") {
            return await this.channelList.save({ Channel_category: "Foreign", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "39") {
            return await this.channelList.save({ Channel_category: "Horror", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "40") {
            return await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "41") {
            return await this.channelList.save({ Channel_category: "Thriller", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "42") {
            return await this.channelList.save({ Channel_category: "Shorts", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "43") {
            return await this.channelList.save({ Channel_category: "Shows", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "44") {
            return await this.channelList.save({ Channel_category: "Trailers", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
          }
        }

        else {
          return await this.channelList.save({ Channel_category: "none", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: Channel_Url_Id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
      }
      if (resData.pageInfo.totalResults === 1 && SearchChannel) {
        return SearchChannel


        // return {subscriberCount : this.subscriber(resData.items[0].statistics.subscriberCount) , videoCount: resData.items[0].statistics.videoCount  , viewCount : this.formatNumber(resData.items[0].statistics.viewCount)}
      }
    }
  }

  async Idcreate(Channel_Url_Id: string) {
    const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
    const response = await fetch(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${Channel_Url_Id}&maxResults=25&key=${apiKey}`)
    if (!response.ok) {
      throw new Error("Could not fetch events");
    }
    const resData = await response.json();

    if (resData.pageInfo.totalResults === 0) {
      throw new NotFoundException()
    }

    const SearchChannel = await this.channelList.findOne({ where: { Channel_Id: Channel_Url_Id } })
    if (resData.pageInfo.totalResults === 1 && !SearchChannel) {
      const channelSearch = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${resData.items[0].id}&maxResults=1&key=${apiKey}`)
      if (!channelSearch.ok) {
        throw new Error("Could not fetch events");
      }
      const channelData = await channelSearch.json();
      if (channelData.items[0].id.videoId) {
        const channelcategory = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${channelData.items[0].id.videoId}&key=${apiKey}`)
        if (!channelcategory.ok) {
          throw new Error("Could not fetch events");
        }

        const channelcategoryData = await channelcategory.json()
        if (channelcategoryData.items[0].snippet.categoryId === 1) {
          return await this.channelList.save({ Channel_category: "Film_Animation", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "2") {
          return await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "10") {
          return await this.channelList.save({ Channel_category: "Music", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "15") {
          return await this.channelList.save({ Channel_category: "Pets_Animals", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "17") {
          return await this.channelList.save({ Channel_category: "Sports", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "18") {
          return await this.channelList.save({ Channel_category: "Short_Movies", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "19") {
          return await this.channelList.save({ Channel_category: "Travel_Events", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "20") {
          return await this.channelList.save({ Channel_category: "Gaming", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "21") {
          return await this.channelList.save({ Channel_category: "Videoblogging", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "22") {
          return await this.channelList.save({ Channel_category: "People_Blogs", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "23" || channelcategoryData.items[0].snippet.categoryId === "34") {
          return await this.channelList.save({ Channel_category: "Comedy", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "24") {
          return await this.channelList.save({ Channel_category: "Entertainment", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "25") {

          return await this.channelList.save({ Channel_category: "News_Politics", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "26") {
          return await this.channelList.save({ Channel_category: "How_to_Style", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "27") {
          return await this.channelList.save({ Channel_category: "Education", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "28") {
          return await this.channelList.save({ Channel_category: "Science_Technology", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "29") {
          return await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "30") {
          return await this.channelList.save({ Channel_category: "Movies", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "31") {
          return await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "32") {
          return await this.channelList.save({ Channel_category: "ActionAdventure", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "33") {
          return await this.channelList.save({ Channel_category: "Classics", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "35") {
          return await this.channelList.save({ Channel_category: "Documentary", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "36") {
          return await this.channelList.save({ Channel_category: "Drama", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "37") {
          return await this.channelList.save({ Channel_category: "Family", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "38") {
          return await this.channelList.save({ Channel_category: "Foreign", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "39") {
          return await this.channelList.save({ Channel_category: "Horror", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "40") {
          return await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "41") {
          return await this.channelList.save({ Channel_category: "Thriller", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "42") {
          return await this.channelList.save({ Channel_category: "Shorts", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "43") {
          return await this.channelList.save({ Channel_category: "Shows", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
        else if (channelcategoryData.items[0].snippet.categoryId === "44") {
          return await this.channelList.save({ Channel_category: "Trailers", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
        }
      }

      else {
        return await this.channelList.save({ Channel_category: "none", Channel_nickname: resData.items[0].snippet.title, Channel_Url_Id: resData.items[0].id, Channel_Id: resData.items[0].id, subscriberCount: +resData.items[0].statistics.subscriberCount, videoCount: +resData.items[0].statistics.videoCount, viewCount: +resData.items[0].statistics.viewCount, Channel_img: resData.items[0].snippet.thumbnails.medium.url })
      }
    }
    if (resData.pageInfo.totalResults === 1 && SearchChannel) {
      return SearchChannel
      // return {subscriberCount : this.subscriber(resData.items[0].statistics.subscriberCount) , videoCount: resData.items[0].statistics.videoCount  , viewCount : this.formatNumber(resData.items[0].statistics.viewCount)}
    }
  }

  async Getvideosearch(search: string) {
    const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=${search}&key=${apiKey}`)
    if (!response.ok) {
      throw new Error("Could not fetch events");
    }
    const resData = await response.json();
    const channelData = [];
    for (const info of resData.items) {
      const ChannelInfo = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${info.snippet.channelId}&key=${apiKey}`)
      if (!ChannelInfo.ok) {
        throw new Error("Could not fetch events");
      }
      const ChannelData = await ChannelInfo.json();
     
      const searchData = await this.channelList.findOne({ where: {Channel_Id: info.snippet.channelId } })
      if (info.id.videoId) {
        const channelcategory = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&id=${info.id.videoId}&key=${apiKey}`)
        if (!channelcategory.ok) {
          throw new Error("Could not fetch events");
        }
        const channelcategoryData = await channelcategory.json()
        if (!searchData) {
          if (channelcategoryData.items[0].snippet.categoryId === 1) {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Film_Animation", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Film_Animation", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "2") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "10") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Music", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Music", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "15") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Pets_Animals", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Pets_Animals", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "17") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Sports", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Sports", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "18") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Short_Movies", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Short_Movies", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "19") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Travel_Events", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Travel_Events", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "20") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Gaming", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Gaming", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "21") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Videoblogging", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Videoblogging", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "22") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "People_Blogs", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "People_Blogs", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "23" || channelcategoryData.items[0].snippet.categoryId === "34") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Comedy", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Comedy", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "24") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Entertainment", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Entertainment", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "25") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "News_Politics", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "News_Politics", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }


          }
          else if (channelcategoryData.items[0].snippet.categoryId === "26") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "How_to_Style", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "How_to_Style", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "27") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Education", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Education", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "28") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Science_Technology", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Science_Technology", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "29") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "30") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Movies", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Movies", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "31") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "32") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "ActionAdventure", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "ActionAdventure", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "33") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Classics", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Classics", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "35") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Documentary", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Documentary", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "36") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Drama", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Drama", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "37") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Family", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Family", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "38") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Foreign", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Foreign", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "39") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Horror", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Horror", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }

          else if (channelcategoryData.items[0].snippet.categoryId === "40") { 
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "41") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Thriller", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Thriller", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "42") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Shorts", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Shorts", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "43") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Shows", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Shows", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "44") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Trailers", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Trailers", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
          else {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "none", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "none", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
        }
       
        console.log(channelcategoryData.items[0].statistics)
        const data = await this.channelList.findOne({where : {Channel_Id :  info.snippet.channelId}})
        if (!resData.prevPageToken) {
          channelData.push({ Channel_Url_Id: data.Channel_Url_Id, Channel_Img : ChannelData.items[0].snippet.thumbnails.default.url,Channel_Id: info.snippet.channelId, nextPageToken: resData.nextPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, videoviewcount : +channelcategoryData.items[0].statistics.viewCount , videolikecount : +channelcategoryData.items[0].statistics.likeCount, videocommentcount : +channelcategoryData.items[0].statistics.commentCount  })
        }
        else {
          channelData.push({ Channel_Url_Id: data.Channel_Url_Id,Channel_Img : ChannelData.items[0].snippet.thumbnails.default.url, Channel_Id: info.snippet.channelId, channelId: info.snippet.channelId, nextPageToken: resData.nextPageToken, prevPageToken: resData.prevPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount,videoviewcount : +channelcategoryData.items[0].statistics.viewCount , videolikecount : +channelcategoryData.items[0].statistics.likeCount, videocommentcount : +channelcategoryData.items[0].statistics.commentCount })
        }
        
      }
      
      
   
    }
    return channelData
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
