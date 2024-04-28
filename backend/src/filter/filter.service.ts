import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Repository } from 'typeorm';
interface Data {
  nextPageToken: any;
  prevPageToken: any;
  items: {
      id: any;
      snippet: any;
      prevPageToken: string;
  }[];
}

@Injectable()
export class FilterService {
  constructor(@InjectRepository(Channellist) private readonly channelList: Repository<Channellist>){}

   async videoFilter(resData : Data){
    const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
    const channelData = [];
    for (const info of resData.items) {
      const ChannelInfo = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${info.snippet.channelId}&key=${apiKey}`)
      if (!ChannelInfo.ok) {
        throw new Error("Could not fetch events");
      }
      const ChannelData = await ChannelInfo.json();
     
      const searchData = await this.channelList.findOne({ where: {Channel_Id: info.snippet.channelId } })
      if (info.id.videoId) {
        const channelcategory = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&id=${info.id.videoId}&key=${apiKey}`)
        if (!channelcategory.ok) {
          throw new Error("Could not fetch events");
        }
        const channelcategoryData = await channelcategory.json()
        console.log(ChannelData.items[0].snippet.title)
        if (!searchData) {
          if (channelcategoryData.items[0].snippet.categoryId === 1) {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Film_Animation", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Film_Animation", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "2") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Cars_Vehicles", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "10") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Music", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Music", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "15") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Pets_Animals", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Pets_Animals", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "17") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Sports", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Sports", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
          else if (channelcategoryData.items[0].snippet.categoryId === "18") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Short_Movies", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Short_Movies", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "19") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Travel_Events", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Travel_Events", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "20") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Gaming", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Gaming", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "21") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Videoblogging", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Videoblogging", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "22") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "People_Blogs", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "People_Blogs", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "23" || channelcategoryData.items[0].snippet.categoryId === "34") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Comedy", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Comedy", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "24") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Entertainment", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Entertainment", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "25") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "News_Politics", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "News_Politics", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }


          }
          else if (channelcategoryData.items[0].snippet.categoryId === "26") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "How_to_Style", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "How_to_Style", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "27") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Education", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Education", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "28") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Science_Technology", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Science_Technology", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "29") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Non_profits_Activism", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "30") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Movies", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Movies", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "31") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "AnimeAnimation", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "32") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "ActionAdventure", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "ActionAdventure", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "33") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Classics", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Classics", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "35") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Documentary", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Documentary", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "36") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Drama", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Drama", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "37") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Family", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Family", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "38") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Foreign", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Foreign", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "39") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Horror", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Horror", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }

          else if (channelcategoryData.items[0].snippet.categoryId === "40") { 
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Sci_Fi_Fantasy", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "41") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Thriller", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Thriller", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "42") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Shorts", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Shorts", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "43") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Shows", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Shows", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }

          }
          else if (channelcategoryData.items[0].snippet.categoryId === "44") {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "Trailers", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "Trailers", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
          else {
            if(ChannelData.items[0].snippet.customUrl){
              await this.channelList.save({ Channel_category: "none", Channel_Url_Id: ChannelData.items[0].snippet.customUrl, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
            else{
              await this.channelList.save({ Channel_category: "none", Channel_Url_Id: info.snippet.channelId, Channel_Id: info.snippet.channelId, Channel_nickname: ChannelData.items[0].snippet.title, Channel_img: ChannelData.items[0].snippet.thumbnails.default.url, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, viewCount: +ChannelData.items[0].statistics.viewCount })
            }
          }
        }
        const data = await this.channelList.findOne({where : {Channel_Id :  info.snippet.channelId}})
        if (!resData.prevPageToken) {
          channelData.push({ Channel_Url_Id: data.Channel_Url_Id, Channel_Img : ChannelData.items[0].snippet.thumbnails.default.url,videotitle : info.snippet.title, Channel_Id: info.snippet.channelId, nextPageToken: resData.nextPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount, videoviewcount : +channelcategoryData.items[0].statistics.viewCount , videolikecount : +channelcategoryData.items[0].statistics.likeCount, videocommentcount : +channelcategoryData.items[0].statistics.commentCount  })
        }
        else {
          channelData.push({ Channel_Url_Id: data.Channel_Url_Id,Channel_Img : ChannelData.items[0].snippet.thumbnails.default.url,videotitle : info.snippet.title, Channel_Id: info.snippet.channelId, channelId: info.snippet.channelId, nextPageToken: resData.nextPageToken, prevPageToken: resData.prevPageToken, videoId: info.id.videoId, channelTitle: info.snippet.channelTitle, thumbnails: info.snippet.thumbnails.default.url, viewCount: +ChannelData.items[0].statistics.viewCount, subscriberCount: +ChannelData.items[0].statistics.subscriberCount, videoCount: +ChannelData.items[0].statistics.videoCount,videoviewcount : +channelcategoryData.items[0].statistics.viewCount , videolikecount : +channelcategoryData.items[0].statistics.likeCount, videocommentcount : +channelcategoryData.items[0].statistics.commentCount })
        }
      }
    }
    return channelData
  }
  private getOneHourAgo(): string {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return oneHourAgo.toISOString();
  }

  async Filterlength(createFilterDto: CreateFilterDto,search: string) {
    const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
    try {
      if(createFilterDto.upload === "1Hour_ago"){
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${this.getOneHourAgo()}&key=${apiKey}`)
        if(!response.ok){
          throw new Error("Could not fetch events");
        }
        const resData = await response.json();
        return await this.videoFilter(resData);
      }
      else if(createFilterDto.upload === "Today"){
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${today.toISOString()}&key=${apiKey}`)
        if(!response.ok){
          throw new Error("Could not fetch events");
        }
        const resData = await response.json();
        return await this.videoFilter(resData);

      }
      else if(createFilterDto.upload === "Month"){
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&q=${search}&publishedAfter=${firstDayOfMonth.toISOString()}&publishedBefore=${lastDayOfMonth.toISOString()}&key=${apiKey}`)
        if(!response.ok){
          throw new Error("Could not fetch events");
        }
        const resData = await response.json();
        return await this.videoFilter(resData);
      }
    } catch (error) {
      throw new Error('Error fetching data from YouTube API: ' + error.message);
    }
    
  }

  findAll() {
    return `This action returns all filter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filter`;
  }

  update(id: number, updateFilterDto: UpdateFilterDto) {
    return `This action updates a #${id} filter`;
  }

  remove(id: number) {
    return `This action removes a #${id} filter`;
  }
}



