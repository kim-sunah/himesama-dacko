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

