import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { videoview } from './entities/videoview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import axios from 'axios';
import { data } from 'cheerio/lib/api/attributes';
import { videocomment } from './entities/videocomment.entity';
import { videolike } from './entities/videolike.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(videoview) private readonly videoviewRepository: Repository<videoview>,
              @InjectRepository(videocomment) private readonly videocommentRepository: Repository<videocomment>, 
              @InjectRepository(videolike) private readonly videolikeRepository: Repository<videolike>, 
              @InjectRepository(Video) private readonly VideoRepository: Repository<Video>){}
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async ChartDataUpdate() {
    const VideoData = await this.VideoRepository.find();
    for (const Data of VideoData){
      const VideoView = await this.videoviewRepository.findOne({where : {videoId : Data.id}})
      const Videocomment = await this.videocommentRepository.findOne({where : {videoId : Data.id}})
      const Videolike = await this.videolikeRepository.findOne({where : {videoId : Data.id}})
      const response = await  axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${Data.videoid}&key=${process.env.Youtbe_Api_KEY}`);
      const channelData = response.data
      await this.videoviewRepository.update(Data.id, {
        Thirty_day_Ago :  VideoView.Twenty_nine_day_Ago,
        Twenty_nine_day_Ago:  VideoView.Twenty_eigth_day_Ago,
        Twenty_eigth_day_Ago:  VideoView.Twenty_seven_day_Ago,
        Twenty_seven_day_Ago:  VideoView.Twenty_six_day_Ago,
        Twenty_six_day_Ago:  VideoView.Twenty_five_day_Ago,
        Twenty_five_day_Ago: VideoView.Twenty_four_day_Ago,
        Twenty_four_day_Ago:  VideoView.Twenty_three_day_Ago,
        Twenty_three_day_Ago:  VideoView.Twenty_two_day_Ago,
        Twenty_two_day_Ago:  VideoView.Twenty_one_day_Ago,
        Twenty_one_day_Ago:  VideoView.Twenty_day_Ago,
        Twenty_day_Ago:  VideoView.Nineteen_day_Ago,
        Nineteen_day_Ago:  VideoView.Eigthteen_day_Ago,
        Eigthteen_day_Ago:  VideoView.seventeen_day_Ago,
        seventeen_day_Ago:  VideoView.sixteen_day_Ago,
        sixteen_day_Ago:  VideoView.fifteen_day_Ago,
        fifteen_day_Ago:  VideoView.fourteen_day_Ago,
        fourteen_day_Ago:  VideoView.thirteen_day_Ago,
        thirteen_day_Ago:  VideoView.twelve_day_Ago,
        twelve_day_Ago:  VideoView.Eleven_day_Ago,
        Eleven_day_Ago: VideoView.Ten_day_Ago,
        Ten_day_Ago:  VideoView.Nine_day_Ago,
        Nine_day_Ago:  VideoView.Eigth_day_Ago,
        Eigth_day_Ago: VideoView.Sevent_day_Ago,
        Sevent_day_Ago: VideoView.Six_day_Ago,
        Six_day_Ago : VideoView.Five_day_Ago , 
        Five_day_Ago : VideoView.Four_day_Ago, 
        Four_day_Ago : VideoView.Three_day_Ago, 
        Three_day_Ago : VideoView.Two_day_Ago , 
        Two_day_Ago : VideoView.One_day_Ago, 
        One_day_Ago : VideoView.today , 
        today : channelData.items[0].statistics.viewCount})

        await this.videocommentRepository.update(Data.id, {
          Thirty_day_Ago :  Videocomment.Twenty_nine_day_Ago,
          Twenty_nine_day_Ago:  Videocomment.Twenty_eigth_day_Ago,
          Twenty_eigth_day_Ago:  Videocomment.Twenty_seven_day_Ago,
          Twenty_seven_day_Ago:  Videocomment.Twenty_six_day_Ago,
          Twenty_six_day_Ago:  Videocomment.Twenty_five_day_Ago,
          Twenty_five_day_Ago: Videocomment.Twenty_four_day_Ago,
          Twenty_four_day_Ago:  Videocomment.Twenty_three_day_Ago,
          Twenty_three_day_Ago:  Videocomment.Twenty_two_day_Ago,
          Twenty_two_day_Ago:  Videocomment.Twenty_one_day_Ago,
          Twenty_one_day_Ago:  Videocomment.Twenty_day_Ago,
          Twenty_day_Ago:  Videocomment.Nineteen_day_Ago,
          Nineteen_day_Ago:  Videocomment.Eigthteen_day_Ago,
          Eigthteen_day_Ago:  Videocomment.seventeen_day_Ago,
          seventeen_day_Ago:  Videocomment.sixteen_day_Ago,
          sixteen_day_Ago:  Videocomment.fifteen_day_Ago,
          fifteen_day_Ago:  Videocomment.fourteen_day_Ago,
          fourteen_day_Ago:  Videocomment.thirteen_day_Ago,
          thirteen_day_Ago:  Videocomment.twelve_day_Ago,
          twelve_day_Ago:  Videocomment.Eleven_day_Ago,
          Eleven_day_Ago: Videocomment.Ten_day_Ago,
          Ten_day_Ago:  Videocomment.Nine_day_Ago,
          Nine_day_Ago:  Videocomment.Eigth_day_Ago,
          Eigth_day_Ago: Videocomment.Sevent_day_Ago,
          Sevent_day_Ago: Videocomment.Six_day_Ago,
          Six_day_Ago : Videocomment.Five_day_Ago , 
          Five_day_Ago : Videocomment.Four_day_Ago, 
          Four_day_Ago : Videocomment.Three_day_Ago, 
          Three_day_Ago : Videocomment.Two_day_Ago , 
          Two_day_Ago : Videocomment.One_day_Ago, 
          One_day_Ago : Videocomment.today , 
          today : channelData.items[0].statistics.commentCount})


          await this.videolikeRepository.update(Data.id, {
            Thirty_day_Ago :  Videolike.Twenty_nine_day_Ago,
            Twenty_nine_day_Ago:  Videolike.Twenty_eigth_day_Ago,
            Twenty_eigth_day_Ago:  Videolike.Twenty_seven_day_Ago,
            Twenty_seven_day_Ago:  Videolike.Twenty_six_day_Ago,
            Twenty_six_day_Ago:  Videolike.Twenty_five_day_Ago,
            Twenty_five_day_Ago: Videolike.Twenty_four_day_Ago,
            Twenty_four_day_Ago:  Videolike.Twenty_three_day_Ago,
            Twenty_three_day_Ago:  Videolike.Twenty_two_day_Ago,
            Twenty_two_day_Ago:  Videolike.Twenty_one_day_Ago,
            Twenty_one_day_Ago:  Videolike.Twenty_day_Ago,
            Twenty_day_Ago:  Videolike.Nineteen_day_Ago,
            Nineteen_day_Ago:  Videolike.Eigthteen_day_Ago,
            Eigthteen_day_Ago:  Videolike.seventeen_day_Ago,
            seventeen_day_Ago:  Videolike.sixteen_day_Ago,
            sixteen_day_Ago:  Videolike.fifteen_day_Ago,
            fifteen_day_Ago:  Videolike.fourteen_day_Ago,
            fourteen_day_Ago:  Videolike.thirteen_day_Ago,
            thirteen_day_Ago:  Videolike.twelve_day_Ago,
            twelve_day_Ago:  Videolike.Eleven_day_Ago,
            Eleven_day_Ago: Videolike.Ten_day_Ago,
            Ten_day_Ago:  Videolike.Nine_day_Ago,
            Nine_day_Ago:  Videolike.Eigth_day_Ago,
            Eigth_day_Ago: Videolike.Sevent_day_Ago,
            Sevent_day_Ago: Videolike.Six_day_Ago,
            Six_day_Ago : Videolike.Five_day_Ago , 
            Five_day_Ago : Videolike.Four_day_Ago, 
            Four_day_Ago : Videolike.Three_day_Ago, 
            Three_day_Ago : Videolike.Two_day_Ago , 
            Two_day_Ago : Videolike.One_day_Ago, 
            One_day_Ago : Videolike.today , 
            today : channelData.items[0].statistics.likeCount})
      }
  }

  async ChartViewData(){

  }

  async ChartCommentData(){
    
  }

  async ChartLikeData(){
    
  }

  FavoriteData() {
    return `This action returns a # video`;
  }

  CommentData() {
    return `This action updates a # video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

// data: [
//   { id: "조회수",
//   color: "hsl(195, 70%, 50%)",
//   data: [
//     { x: "오늘", y: channelcategoryData.items[0].statistics.viewCount },
//     { x: "1일전", y: videoview.One_day_Ago },
//     { x: "2일전", y:  videoview.Two_day_Ago },
//     { x: "3일전", y: videoview.Three_day_Ago },
//     { x: "4일전", y: videoview.Four_day_Ago },
//     { x: "5일전", y: videoview.Five_day_Ago },
//     { x: "6일전", y: videoview.Six_day_Ago },
//     { x: "7일전", y: videoview.Sevent_day_Ago },
//     { x: "8일전", y: videoview.Eigth_day_Ago },
//     { x: "9일전", y: videoview.Nine_day_Ago },
//     { x: "10일전", y: videoview.Ten_day_Ago },
//     { x: "11일전", y: videoview.Eleven_day_Ago },
//     { x: "12일전", y: videoview.twelve_day_Ago },
//     { x: "13일전", y: videoview.thirteen_day_Ago},
//     { x: "14일전", y: videoview.fourteen_day_Ago },
//     { x: "15일전", y: videoview.fifteen_day_Ago },
//     { x: "16일전", y: videoview.sixteen_day_Ago },
//     { x: "17일전", y: videoview.seventeen_day_Ago },
//     { x: "18일전", y: videoview.Eigthteen_day_Ago },
//     { x: "19일전", y: videoview.Nineteen_day_Ago },
//     { x: "20일전", y: videoview.Twenty_day_Ago },
//     { x: "21일전", y: videoview.Twenty_one_day_Ago },
//     { x: "22일전", y: videoview.Twenty_two_day_Ago },
//     { x: "23일전", y: videoview.Twenty_three_day_Ago },
//     { x: "24일전", y: videoview.Twenty_four_day_Ago },
//     { x: "25일전", y: videoview.Twenty_five_day_Ago },
//     { x: "26일전", y: videoview.Twenty_six_day_Ago },
//     { x: "27일전", y: videoview.Twenty_seven_day_Ago},
//     { x: "28일전", y: videoview.Twenty_eigth_day_Ago},
//     { x: "29일전", y: videoview.Twenty_nine_day_Ago },
//     { x: "30일전", y: videoview.Thirty_day_Ago },
//   ]
//    },
//    { id: "댓글수",
//    color: "hsl(26, 70%, 50%)",
//    data: [
//     { x: "오늘", y: channelcategoryData.items[0].statistics.commentCount },
//     { x: "1일전", y: videocomment.One_day_Ago },
//     { x: "2일전", y:  videocomment.Two_day_Ago },
//     { x: "3일전", y: videocomment.Three_day_Ago },
//     { x: "4일전", y: videocomment.Four_day_Ago },
//     { x: "5일전", y: videocomment.Five_day_Ago },
//     { x: "6일전", y: videocomment.Six_day_Ago },
//     { x: "7일전", y: videocomment.Sevent_day_Ago },
//     { x: "8일전", y: videocomment.Eigth_day_Ago },
//     { x: "9일전", y: videocomment.Nine_day_Ago },
//     { x: "10일전", y: videocomment.Ten_day_Ago },
//     { x: "11일전", y: videocomment.Eleven_day_Ago },
//     { x: "12일전", y: videocomment.twelve_day_Ago },
//     { x: "13일전", y: videocomment.thirteen_day_Ago},
//     { x: "14일전", y: videocomment.fourteen_day_Ago },
//     { x: "15일전", y: videocomment.fifteen_day_Ago },
//     { x: "16일전", y: videocomment.sixteen_day_Ago },
//     { x: "17일전", y: videocomment.seventeen_day_Ago },
//     { x: "18일전", y: videocomment.Eigthteen_day_Ago },
//     { x: "19일전", y: videocomment.Nineteen_day_Ago },
//     { x: "20일전", y: videocomment.Twenty_day_Ago },
//     { x: "21일전", y: videocomment.Twenty_one_day_Ago },
//     { x: "22일전", y: videocomment.Twenty_two_day_Ago },
//     { x: "23일전", y: videocomment.Twenty_three_day_Ago },
//     { x: "24일전", y: videocomment.Twenty_four_day_Ago },
//     { x: "25일전", y: videocomment.Twenty_five_day_Ago },
//     { x: "26일전", y: videocomment.Twenty_six_day_Ago },
//     { x: "27일전", y: videocomment.Twenty_seven_day_Ago},
//     { x: "28일전", y: videocomment.Twenty_eigth_day_Ago},
//     { x: "29일전", y: videocomment.Twenty_nine_day_Ago },
//     { x: "30일전", y: videocomment.Thirty_day_Ago },
//   ]
//     },
//     { id: "좋아요",
//     color: "hsl(107, 70%, 50%)",
//     data: [
//       { x: "오늘", y: channelcategoryData.items[0].statistics.likeCount },
//       { x: "1일전", y: videolike.One_day_Ago },
//       { x: "2일전", y:  videolike.Two_day_Ago },
//       { x: "3일전", y: videolike.Three_day_Ago },
//       { x: "4일전", y: videolike.Four_day_Ago },
//       { x: "5일전", y: videolike.Five_day_Ago },
//       { x: "6일전", y: videolike.Six_day_Ago },
//       { x: "7일전", y: videolike.Sevent_day_Ago },
//       { x: "8일전", y: videolike.Eigth_day_Ago },
//       { x: "9일전", y: videolike.Nine_day_Ago },
//       { x: "10일전", y: videolike.Ten_day_Ago },
//       { x: "11일전", y: videolike.Eleven_day_Ago },
//       { x: "12일전", y: videolike.twelve_day_Ago },
//       { x: "13일전", y: videolike.thirteen_day_Ago},
//       { x: "14일전", y: videolike.fourteen_day_Ago },
//       { x: "15일전", y: videolike.fifteen_day_Ago },
//       { x: "16일전", y: videolike.sixteen_day_Ago },
//       { x: "17일전", y: videolike.seventeen_day_Ago },
//       { x: "18일전", y: videolike.Eigthteen_day_Ago },
//       { x: "19일전", y: videolike.Nineteen_day_Ago },
//       { x: "20일전", y: videolike.Twenty_day_Ago },
//       { x: "21일전", y: videolike.Twenty_one_day_Ago },
//       { x: "22일전", y: videolike.Twenty_two_day_Ago },
//       { x: "23일전", y: videolike.Twenty_three_day_Ago },
//       { x: "24일전", y: videolike.Twenty_four_day_Ago },
//       { x: "25일전", y: videolike.Twenty_five_day_Ago },
//       { x: "26일전", y: videolike.Twenty_six_day_Ago },
//       { x: "27일전", y: videolike.Twenty_seven_day_Ago},
//       { x: "28일전", y: videolike.Twenty_eigth_day_Ago},
//       { x: "29일전", y: videolike.Twenty_nine_day_Ago },
//       { x: "30일전", y: videolike.Thirty_day_Ago },
//     ]
//      },
// ]

