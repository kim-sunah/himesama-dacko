import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(@InjectRepository(Channellist) private readonly channelRepository : Repository<Channellist>) {}
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
      where :{Channel_category : id},
      order: {
        subscriberCount: 'DESC' 
      },
      take: 10 
    });
    const viewCount = await this.channelRepository.find({
      where :{Channel_category : id},
      order: {
        viewCount: 'DESC' 
      },
      take: 10 
    });
    return {subscriberCount, viewCount}
     
  }

  async updateRankingSystem() {
    const apiKey = 'AIzaSyB-2lmQpVewHuaVnODOHr_plj15uEx7XOU';
    const channelInfo = await this.channelRepository.find();
    for (const info of channelInfo) {
        const response = await fetch(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${info.Channel_Url_Id}&maxResults=25&key=${apiKey}`);
        if (!response.ok) {
            throw new Error("Could not fetch events");
        } 
        const channelData = await response.json();
        await this.channelRepository.update(info.id, { previous_subscriberCount: +info.subscriberCount , subscriberCount :  +channelData.items[0].statistics.subscriberCount ,previous_viewCount : +info.viewCount , viewCount : +channelData.items[0].statistics.viewCount, previous_videoCount : +info.videoCount, videoCount : +channelData.items[0].statistics.videoCount});
    }
}

}
