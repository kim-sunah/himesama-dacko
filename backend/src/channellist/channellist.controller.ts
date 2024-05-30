import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { YoutubePageToken } from './dto/Yotube_PageToken.dto';

@Controller('channellist')
export class ChannellistController {
  constructor(private readonly channellistService: ChannellistService) {}

  @Post("channelurl")
  Urlcreate(@Body() createChannellistDto: CreateChannellistDto) {
    return this.channellistService.Urlcreate(createChannellistDto.Channel_Url_Id);
  }

  @Post("channelId")
  Idcreate(@Body() createChannellistDto: CreateChannellistDto) {
    return this.channellistService.Idcreate(createChannellistDto.Channel_Url_Id);
  }

  @Get(":channelId")
  channelInfo(@Param('channelId') channelId: string) {
    return this.channellistService.channelInfo(channelId);
  }

  @Get('channel/:videosearch')
  Getvideosearch(@Param('videosearch') search: string) {
    return this.channellistService.Getvideosearch(search);
  }

  @Post('searchchannel')
  searchchannel(@Body() createChannellistDto: CreateChannellistDto) {
    return this.channellistService.searchchannel(createChannellistDto.Channel_Url_Id);
  }

  @Get("Channel_Video/Count")
  Channel_VideoCount(){
    return this.channellistService.Channel_VideoCount();
  }

  //Youtube Api(Condition) 일반 검색
  @Post("YoutubeChannelApi/:search")
  YoutubeApiGetChannel(@Body() YoutubeInfluencer : YoutubePageToken, @Param('search') search: string ,) {
    console.log(YoutubeInfluencer);
    return this.channellistService.YoutubeApiGetChannel(YoutubeInfluencer , search);
  }

  
  @Post('YoutubeVideoApi/:videosearch')
  YoutubeApiGetVideo(@Body() YoutubeInfluencer : YoutubePageToken , @Param('videosearch') search: string) {
    return this.channellistService.YoutubeApiGetVideo(YoutubeInfluencer, search);
  }
  

  
}
