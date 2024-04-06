import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannellistService } from './channellist.service';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';

@Controller('channellist')
export class ChannellistController {
  constructor(private readonly channellistService: ChannellistService) {}

  @Post()
  create(@Body() createChannellistDto: CreateChannellistDto) {
    return this.channellistService.create(createChannellistDto.Channel_Url_Id);
  }

  @Get("channelInfo")
  getchannelInfo() {
    return this.channellistService.getchannelInfo();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channellistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannellistDto: UpdateChannellistDto) {
    return this.channellistService.update(+id, updateChannellistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channellistService.remove(+id);
  }
}
