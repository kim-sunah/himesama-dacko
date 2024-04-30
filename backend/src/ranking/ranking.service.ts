import { Inject, Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';
import axios  from 'axios';

@Injectable()
export class RankingService {
  constructor(@InjectRepository(Channellist) private readonly channelRepository: Repository<Channellist>, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }
  create(createRankingDto: CreateRankingDto) {
    return 'This action adds a new ranking';
  }

  async getTopChannels() {
    return await this.channelRepository.find({
      order: {
        subscriberCount: 'DESC'
      },
      take: 10 // 상위 10개의 결과만 가져오기
    });
  }

  async getTopviewChannels() {
    return await this.channelRepository.find({
      order: {
        viewCount: 'DESC'
      },
      take: 10
    });
  }

  async getTopCategory(id: string) {
    const subscriberCount = await this.channelRepository.find({
      where: { Channel_category: id },
      order: {
        subscriberCount: 'DESC'
      },
      take: 10
    });
    const viewCount = await this.channelRepository.find({
      where: { Channel_category: id },
      order: {
        viewCount: 'DESC'
      },
      take: 10
    });
    return { subscriberCount, viewCount }

  }

  async updateSystem() {
    
    const channelInfo = await this.channelRepository.find();
    for (const info of channelInfo) {
      if (info.Channel_Url_Id.includes("@")) {
        const response = await  axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
        const channelData = response.data
        if (!isNaN(((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount)) && !isNaN(((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount))) {
          await this.channelRepository.update(info.id,
            {
              previous_subscriberCount: +info.subscriberCount,
              subscriberCount: +channelData.items[0].statistics.subscriberCount,
              previous_viewCount: +info.viewCount,
              viewCount: +channelData.items[0].statistics.viewCount,
              previous_videoCount: +info.videoCount,
              videoCount: +channelData.items[0].statistics.videoCount,
              subscriberCount_percentageincrease: +((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount)) * 100),
              viewCount_percentageincrease: +((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount)) * 100)
            });
        }
      }
      else {
        const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`);
        const channelData = response.data
        await this.channelRepository.update(info.id,
          {
            previous_subscriberCount: +info.subscriberCount,
            subscriberCount: +channelData.items[0].statistics.subscriberCount,
            previous_viewCount: +info.viewCount,
            viewCount: +channelData.items[0].statistics.viewCount,
            previous_videoCount: +info.videoCount,
            videoCount: +channelData.items[0].statistics.videoCount,
            subscriberCount_percentageincrease: +((((+channelData.items[0].statistics.subscriberCount) - (+info.subscriberCount)) / (+info.subscriberCount)) * 100),
            viewCount_percentageincrease: +((((+channelData.items[0].statistics.viewCount) - (+info.viewCount)) / (+info.viewCount)) * 100)
          });
      }
    }
  }

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
      console.log("Asds")
      const channelData = [];
      for (const info of channelInfo) {
        
        console.log("HHHHHHH")
        console.log(info.Channel_Url_Id)
        if (info.Channel_Url_Id.includes("@")) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)
         
          const resData = response.data
          
          channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
        }
        else {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)
       
          const resData = response.data

          channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
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
    else{
      const channelData = [];
      for (const info of channelInfo) {
      
        
  
        if (info.Channel_Url_Id.includes("@")) {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)
          
          const resData = response.data
         
  
          channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
        }
        else {
          const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${info.Channel_Url_Id}&key=${process.env.Youtbe_Api_KEY}`)
         
          const resData = response.data
  
          channelData.push({ channelnickname: resData.items[0].snippet.title, channelId: resData.items[0].snippet.customUrl, channelimg: resData.items[0].snippet.thumbnails.high.url });
        }
  
      }
      await this.cacheManager.set("increaseSubscriber", channelData, 864000000);
      await this.cacheManager.set("IncreaseSubscriberChannel", channelInfo, 864000000);
      
      return channelData;
  
    }
  
  }

}
