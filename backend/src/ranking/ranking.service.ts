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

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }
}
