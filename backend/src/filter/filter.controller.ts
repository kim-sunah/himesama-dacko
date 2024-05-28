import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FilterService } from './filter.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { InfluencerOrder } from './dto/DbOrder.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Post("UploadDate/:videosearch")
  Filterlength(@Body() createFilterDto: CreateFilterDto, @Param('videosearch') search: string) {
    return this.filterService.Filterlength(createFilterDto, search);
  }

  @Post("Duration/:videosearch")
  FilterDuration(@Body("videoDuration") videoDuration : string, @Param("videosearch") search : string) {
    console.log(videoDuration, search)
    return this.filterService.FilterDuration(videoDuration, search);
  }

  @Post('order/:videosearch')
  findOne(@Body("order") order : string, @Param('videosearch') search: string) {
    console.log(order, search)
    return this.filterService.findOne(order, search);
  }

  @Post('DBOrder/:pagenumber')
  async DBInfluencerOrder(@Body() DbOrder: InfluencerOrder, @Param("pagenumber") pagenumber: string) {
    return this.filterService.DBInfluencerOrder(DbOrder, +pagenumber);
  }


  @Post("YoutubeAPiOrder/:pagenumber")
  async YoutubeApiInfluencerOrder(@Body() YoutubeApiOrder :InfluencerOrder ,@Param("pagenumber") pagenumber :string){
    return this.filterService.YoutubeApiInfluencerOrder(YoutubeApiOrder,+pagenumber);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterService.remove(+id);
  }
}
