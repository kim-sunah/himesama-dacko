import { Injectable} from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import * as cheerio from "cheerio";
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriberService {
  constructor(@InjectRepository(Channellist) private readonly channelRepository : Repository<Channellist>) {}

  
  create(createSubscriberDto: CreateSubscriberDto) {
    return 'This action adds a new subscriber';
  }
  async getTopChannels() {
    return await this.channelRepository.find({
      order: {
        subscriberCount: 'DESC' // 'subscriberCount' 컬럼을 기준으로 내림차순으로 정렬
      },
      take: 10 // 상위 10개의 결과만 가져오기
    });

    
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
