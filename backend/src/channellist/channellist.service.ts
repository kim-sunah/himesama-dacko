import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { UpdateChannellistDto } from './dto/update-channellist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm"
import { Channellist } from './entities/channellist.entity';

@Injectable()
export class ChannellistService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>){

  }
  private subscriber(count: number): string {
    if (count >= 10000) {
      const man = (count / 10000).toFixed(1); 
      return `${man}`;
    } else {
      return count.toString();
    }
  }
  private formatNumber(number: string): string {
    return Number(number).toLocaleString('en-US');
  }
  async create(Channel_Url_Id: string) {
     const apiKey = 'AIzaSyB-2lmQpVewHuaVnODOHr_plj15uEx7XOU';
     const response = await fetch(`https:youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${Channel_Url_Id}&maxResults=25&key=${apiKey}`)
        if (!response.ok) {
            throw new Error("Could not fetch events");
        } 
        else {
            const resData = await response.json();
            if(resData.pageInfo.totalResults === 0){
              throw new NotFoundException()
            }
            const SearchChannel = await this.channelList.findOne({where :{Channel_Url_Id}})
            if(resData.pageInfo.totalResults === 1 && !SearchChannel){
           
              console.log(resData.items[0].id)
               const channelSearch = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${resData.items[0].id}&maxResults=1&key=${apiKey}`)
               if (!channelSearch.ok) {
                 throw new Error("Could not fetch events");
               }
               const channelData = await channelSearch.json(); 
              
              if(channelData.items[0].id.videoId){
                const channelcategory = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${channelData.items[0].id.videoId}&key=${apiKey}`)
                if (!channelcategory.ok) {
                  throw new Error("Could not fetch events");
                }
                console.log("channelcategory")
                const channelcategoryData = await channelcategory.json()
                console.log(channelcategoryData.items[0].snippet.categoryId)
                if(channelcategoryData.items[0].snippet.categoryId === 1){
                  return await this.channelList.save({Channel_category : "Film_Animation", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "2"){
                  return await this.channelList.save({Channel_category : "Cars_Vehicles", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "10" ){
                  return await this.channelList.save({Channel_category : "Music", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "15" ){
                  return await this.channelList.save({Channel_category : "Pets_Animals", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "17" ){
                  return await this.channelList.save({Channel_category : "Sports", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId ==="18"){
                  return await this.channelList.save({Channel_category : "Short_Movies", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "19" ){
                  return await this.channelList.save({Channel_category : "Travel_Events", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "20" ){
                  return await this.channelList.save({Channel_category : "Gaming", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "21" ){
                  return await this.channelList.save({Channel_category : "Videoblogging", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "22"){
                  return await this.channelList.save({Channel_category : "People_Blogs", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "23" || channelcategoryData.items[0].snippet.categoryId === 34){
                  return await this.channelList.save({Channel_category : "Comedy", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "24"){
                  return await this.channelList.save({Channel_category : "Entertainment", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "25"){
              
                  return await this.channelList.save({Channel_category : "News_Politics", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "26"){
                  return await this.channelList.save({Channel_category : "How_to_Style", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "27" ){
                  return await this.channelList.save({Channel_category : "Education", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "28" ){
                  return await this.channelList.save({Channel_category : "Science_Technology", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "29"){
                  return await this.channelList.save({Channel_category : "Non_profits_Activism", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "30"){
                  return await this.channelList.save({Channel_category : "Movies", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "31"){
                  return await this.channelList.save({Channel_category : "AnimeAnimation", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "32"){
                  return await this.channelList.save({Channel_category : "ActionAdventure", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "33" ){
                  return await this.channelList.save({Channel_category : "Classics", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "35"){
                  return await this.channelList.save({Channel_category : "Documentary", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "36"){
                  return await this.channelList.save({Channel_category : "Drama", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "37"){
                  return await this.channelList.save({Channel_category : "Family", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "38" ){
                  return await this.channelList.save({Channel_category : "Foreign", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "39" ){
                  return await this.channelList.save({Channel_category : "Horror", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "40" ){
                  return await this.channelList.save({Channel_category : "Sci_Fi_Fantasy", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "41" ){
                  return await this.channelList.save({Channel_category : "Thriller", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "42" ){
                  return await this.channelList.save({Channel_category : "Shorts", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "43" ){
                  return await this.channelList.save({Channel_category : "Shows", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
                else if(channelcategoryData.items[0].snippet.categoryId === "44" ){
                  return await this.channelList.save({Channel_category : "Trailers", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
                }
              }
              else{
                return await this.channelList.save({Channel_category : "none", Channel_nickname: resData.items[0].snippet.title ,Channel_Url_Id : Channel_Url_Id, Channel_Id : resData.items[0].id ,subscriberCount : +resData.items[0].statistics.subscriberCount , videoCount : +resData.items[0].statistics.videoCount, viewCount : +resData.items[0].statistics.viewCount, Channel_img :  resData.items[0].snippet.thumbnails.medium.url})
              }
            }
            if(resData.pageInfo.totalResults === 1 && SearchChannel){
              return SearchChannel
              
          
              // return {subscriberCount : this.subscriber(resData.items[0].statistics.subscriberCount) , videoCount: resData.items[0].statistics.videoCount  , viewCount : this.formatNumber(resData.items[0].statistics.viewCount)}
            }
        }
  }

  getchannelInfo() {
    return `This action returns all channellist`;
  
  }

  findOne(id: number) {
    return `This action returns a #${id} channellist`;
  }

  update(id: number, updateChannellistDto: UpdateChannellistDto) {
    return `This action updates a #${id} channellist`;
  }

  remove(id: number) {
    return `This action removes a #${id} channellist`;
  }
}
