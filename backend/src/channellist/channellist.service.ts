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
import { SubscriberCount } from './entities/subscriber.entity';
import { ViewCount } from './entities/view.entity';
import { VideoCount } from './entities/video.entity';


@Injectable()
export class ChannellistService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>, private readonly FilterService: FilterService,
    @InjectRepository(Video) private readonly VideoRepository: Repository<Video>,
    @InjectRepository(SubscriberCount) private readonly SubscriberRepository: Repository<SubscriberCount>,
    @InjectRepository(ViewCount) private readonly ViewRepository: Repository<ViewCount>,
    @InjectRepository(VideoCount) private readonly VideoCountRepository: Repository<VideoCount>) {

  }
  async Getvideosearch(search: string) {
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&order=viewCount&q=${search}&key=${process.env.Youtbe_Api_KEY}`)
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
  async YoutubeApiGetChannel(YoutubeChannelApi: InfluencerOrder, search: string) {
    const ChannelData = [];
    let nextPageToken: string | undefined = '';
    const maxFetchCount = YoutubeChannelApi.accurate_search ? Infinity : 5;
    const batchSize = 50; // 한 번에 처리할 채널 수

    const processChannels = async (items) => {
      const channelIds = items.map(item => item.snippet.channelId).join(',');
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${process.env.Youtbe_Api_KEY}`);
      const channelsData = response.data.items;

      const newChannels = [];
      const dbOperations = [];

      for (const channel of channelsData) {
        const channelData = {
          Channel_nickname: channel.snippet.title,
          Channel_Id: channel.id,
          Channel_Url_Id: channel.snippet.customUrl,
          channel_img: channel.snippet.thumbnails.high.url,
          subscriberCount: +channel.statistics.subscriberCount,
          videoCount: +channel.statistics.videoCount,
          viewCount: +channel.statistics.viewCount,
        };

        if (this.meetsFilterCriteria(channelData, YoutubeChannelApi) && !ChannelData.some(c => c.Channel_Url_Id === channelData.Channel_Url_Id)) {
          ChannelData.push(channelData);
          newChannels.push(channelData);
        }
      }

      if (newChannels.length > 0) {
        // 먼저 channelList에 새 채널들을 삽입하고 생성된 ID를 가져옵니다.
        const insertResult = await this.channelList.createQueryBuilder()
          .insert()
          .values(newChannels)
          .orIgnore()
          .execute();

        // 삽입된 채널들의 ID를 가져옵니다.
        const insertedIds = insertResult.identifiers.map(identifier => identifier.id);

        // 삽입된 채널들과 그 ID를 매핑합니다.
        const channelsWithIds = newChannels.map((channel, index) => ({
          ...channel,
          id: insertedIds[index]
        }));

        // 이제 관련 테이블에 데이터를 삽입합니다.
        dbOperations.push(
          this.SubscriberRepository.createQueryBuilder()
            .insert()
            .values(channelsWithIds.map(c => ({ Today: c.subscriberCount, channelId: c.id })))
            .execute(),
          this.VideoCountRepository.createQueryBuilder()
            .insert()
            .values(channelsWithIds.map(c => ({ Today: c.videoCount, channelId: c.id })))
            .execute(),
          this.ViewRepository.createQueryBuilder()
            .insert()
            .values(channelsWithIds.map(c => ({ Today: c.viewCount, channelId: c.id })))
            .execute()
        );
      }
      await Promise.all(dbOperations);
    };

    for (let fetchCount = 0; fetchCount < maxFetchCount; fetchCount++) {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${batchSize}&pageToken=${nextPageToken}&type=video&order=relevance&q=${search}&key=${process.env.Youtbe_Api_KEY}`);
      const newItems = response.data;
      nextPageToken = newItems.nextPageToken;

      await processChannels(newItems.items);

      if (!nextPageToken) break;
    }
    return ChannelData;
  }
  meetsFilterCriteria(channel, filters) {
    return (
      (filters.subscriberMin === null || (channel.subscriberCount > filters.subscriberMin && channel.subscriberCount < filters.subscriberMax)) &&
      (filters.videoMin === null || (channel.videoCount > filters.videoMin && channel.videoCount < filters.videoMax)) &&
      (filters.viewMin === null || (channel.viewCount > filters.viewMin && channel.viewCount < filters.viewMax))
    );
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


  async Live_Popular_CreateApi(ChannelId: string, categoryid: number, videoid: string) {

    try {
      const response = await axios.get(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelId}&maxResults=1&key=${process.env.Youtbe_Api_KEY}`)
      const resData = response.data;
      if (resData.pageInfo.totalResults === 0) {
        return null;
      }


      const [videoInfo] = await Promise.all([this.FilterService.getVideoInfo(videoid)]);
      const videoData = videoInfo.data.items[0];
      const channelData = resData.items[0];
      const channelInfo = {
        categoryid: categoryid,
        Channel_nickname: channelData.snippet.title,
        Channel_Url_Id: channelData.id,
        Channel_Id: channelData.id,
        subscriberCount: +channelData.statistics.subscriberCount,
        videoCount: +channelData.statistics.videoCount,
        viewCount: +channelData.statistics.viewCount,
        channel_img: channelData.snippet.thumbnails.medium.url
      };


      const existingChannel = await this.channelList.findOne({ where: { Channel_Id: ChannelId } });
      if (!existingChannel) {
        const channelResult = await this.channelList.save(channelInfo);
        this.FilterService.findOrCreateVideo(videoData, channelResult),
          await Promise.all([
            this.SubscriberRepository.save({ Today: channelInfo.subscriberCount, channelId: channelResult.id }),
            this.ViewRepository.save({ Today: channelInfo.viewCount, channelId: channelResult.id }),
            this.VideoCountRepository.save({ Today: channelInfo.videoCount, channelId: channelResult.id }),
          ]);
        return channelResult;
      } else {
        return existingChannel;
      }
    } catch (error) {
      throw error;
    }

  }

  async incrementChannelClicks(ChannelId: string) {
    try {
      const channel = await this.channelList.findOne({where : {Channel_Id : ChannelId}})
      console.log(channel)
      const updatedChannel = await this.channelList.update(channel.id, {today_click_count : channel.today_click_count+1});
      console.log(updatedChannel)
      return updatedChannel;
    } catch (error) {
      console.error("Error updating channel click count:", error);
      throw error;
    }
  }

  async GetTopClickedChannel() {
    try {
      const topClickedChannel = await this.channelList.findOne({
        order: {
          today_click_count: 'DESC'
        },
        where: {} 
      });
  
      if (!topClickedChannel) {
        throw new Error('No channels found');
      }
      console.log(topClickedChannel)
  
      return topClickedChannel;
    } catch (error) {
      console.error('Error fetching top clicked channel:', error);
      throw error;
    }
  }


}
