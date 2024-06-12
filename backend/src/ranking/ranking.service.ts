import { Inject, Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';
import axios from 'axios';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';

@Injectable()
export class RankingService {
  constructor(@InjectRepository(Channellist) private readonly channelRepository: Repository<Channellist>, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }
 

  async getTopChannels(page: number, select: string) {
    if (select === "High_Subscriber") {
      return await this.channelRepository.find({
        order: {
          subscriberCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_Subscriber") {
      return await this.channelRepository.find({
        order: {
          subscriberCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }
  }


  async viewChannels(page: number, select: string) {
    if (select === "High_View") {
      return await this.channelRepository.find({
        order: {
          viewCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_View") {
      return await this.channelRepository.find({
        order: {
          viewCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }
  }

  async VideoChannels(page: number, select: string) {
    if (select === "High_Videocount") {
      return await this.channelRepository.find({
        order: {
          videoCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_Videocount") {
      return await this.channelRepository.find({
        order: {
          videoCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }

  }




  async DBSubscriberChannels(dbOrder: InfluencerOrder, page: number, select: string) {

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

    if (select === "High_Subscriber") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          subscriberCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_Subscriber") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          subscriberCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }
  }


  async DBviewChannels(dbOrder: InfluencerOrder, page: number, select: string) {
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
    if (select === "High_View") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          viewCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_View") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          viewCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }
  }

  async DBVideoChannels(dbOrder: InfluencerOrder, page: number, select: string) {
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
    if (select === "High_Videocount") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          videoCount: 'DESC'
        },
        skip: (page - 1) * 10,
        take: 10 // 상위 10개의 결과만 가져오기
      });
    }
    else if (select === "Low_Videocount") {
      return await this.channelRepository.find({
        where: {
          ...where,
        },
        order: {
          videoCount: 'ASC'
        },
        skip: (page - 1) * 10,
        take: 10 // 하위 10개의 결과만 가져오기
      });

    }

  }

  // async getTopCategory(id: string) {
  //   const subscriberCount = await this.channelRepository.find({
  //     where: { Channel_category: id },
  //     order: {
  //       subscriberCount: 'DESC'
  //     },
  //     take: 10
  //   });
  //   const viewCount = await this.channelRepository.find({
  //     where: { Channel_category: id },
  //     order: {
  //       viewCount: 'DESC'
  //     },
  //     take: 10
  //   });
  //   return { subscriberCount, viewCount }

  // }


  async increaseview() {
    const channelInfo = await this.channelRepository.find({
      order: {
        viewCount_percentageincrease: 'DESC'
      },
      take: 50
    });
    const cachedChannelInfo = await this.cacheManager.get("IncreaseViewChannel");
    const isChanged = !cachedChannelInfo || JSON.stringify(channelInfo) !== JSON.stringify(cachedChannelInfo);
    if (!isChanged) {
      return await this.cacheManager.get("increaseview");
    }
    else {

      const channelData = [];
      for (const info of channelInfo) {
        if (info.Channel_Url_Id.includes("@")) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);

          const resData = response.data;

          if (resData && resData.items && resData.items.length > 0) {
            channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
          } else {
            continue;
          }

        }
        else {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)

          const resData = response.data
          if (resData && resData.items && resData.items.length > 0) {
            channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
          } else {
            console.error('No channel data found or invalid response:', resData);
          }
        }
      }
      await this.cacheManager.set("increaseview", channelData, 864000000);
      await this.cacheManager.set("IncreaseViewChannel", channelInfo, 864000000);
      return channelData;
    }

  }

  async increaseSubscriber() {
    const channelInfo = await this.channelRepository.find({
      order: {
        subscriberCount_percentageincrease: 'DESC'
      },
      take: 50
    });

    const cachedChannelInfo = await this.cacheManager.get("IncreaseSubscriberChannel");
    const isChanged = !cachedChannelInfo || JSON.stringify(channelInfo) !== JSON.stringify(cachedChannelInfo);
    if (!isChanged) {

      return await this.cacheManager.get("increaseSubscriber");
    }
    else {
      const channelData = [];
      for (const info of channelInfo) {
        if (info.Channel_Url_Id.includes("@")) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)
          const resData = response.data
          if (resData && resData.items && resData.items.length > 0) {
            channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
          }
          else{
            continue;
          }
        }
        else {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)

          const resData = response.data

          if (resData && resData.items && resData.items.length > 0) {
            channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
          }
          else{
            continue;
          }
        }

      }
      await this.cacheManager.set("increaseSubscriber", channelData, 864000000);
      await this.cacheManager.set("IncreaseSubscriberChannel", channelInfo, 864000000);

      return channelData;

    }

  }

}




