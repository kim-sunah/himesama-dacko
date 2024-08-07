import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { YoutubePageToken } from './dto/Yotube_PageToken.dto';
import { get } from 'http';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';
import { PopularVideoArrayDto } from './dto/Live_Popular_dto';
import { Response, Request } from 'express';

@Controller('channellist')
export class ChannellistController {
  constructor(private readonly channellistService: ChannellistService) {}

  @Get(":channelId")
  channelInfo(@Param('channelId') channelId: string) {
    return this.channellistService.channelInfo(channelId);
  }

  @Get('channel/:videosearch')
  Getvideosearch(@Param('videosearch') search: string ,@Req() req: Request) {
    return this.channellistService.Getvideosearch(search, req);
  }

  @Post('searchchannel')
  searchchannel(@Body() createChannellistDto: CreateChannellistDto) {
    return this.channellistService.searchchannel(createChannellistDto.Channel_Url_Id);
  }

  //전체 Channel db갯수 (현재 사용 x);
  @Get("Channel_Video/Count")
  Channel_VideoCount(){
    return this.channellistService.Channel_VideoCount();
  }

  //Youtube Api(Condition) 일반 검색
  @Post("YoutubeChannelApi/:search")
  YoutubeApiGetChannel(@Body() YoutubeChannelApi : InfluencerOrder, @Param('search') search: string ,) {
    return this.channellistService.YoutubeApiGetChannel(YoutubeChannelApi , search);
  }

  
  //Youtube Api(Condition) 동영상 검색
  @Post('YoutubeVideoApi/:videosearch')
  YoutubeApiGetVideo(@Body() YoutubeInfluencer : YoutubePageToken , @Param('videosearch') search: string) {
    return this.channellistService.YoutubeApiGetVideo(YoutubeInfluencer, search);
  }
  //실시간 인기 , 실시간 인기있는 카테고리 비디오 채널 DB에 저장
  @Post("LivePopularChannel")
  Live_Popular_CreateApi(@Body("ChannelId") ChannelId: string , @Body("categoryid") categoryid : string , @Body("videoid") videoid: string) {
   return this.channellistService.Live_Popular_CreateApi(ChannelId , +categoryid, videoid);
  }

  //클릭한 채널 카운트 중가
  @Post("incrementChannelClicks")
  incrementChannelClicks(@Body("ChannelId") ChannelId : string){
 
    return this.channellistService.incrementChannelClicks(ChannelId);
  }

  //클릭 가장 많은 채널 1개 가져오기
  @Get("click/GetTopClickedChannel")
  GetTopClickedChannel(){
    return this.channellistService.GetTopClickedChannel();
  }


  
}
