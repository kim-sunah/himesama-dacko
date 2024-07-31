import { useNavigate, useParams } from "react-router-dom";
import { YouTubeSearchResult } from "../../enum/Search_Item_Interface";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { AiOutlineComment } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { VideoStatistic } from "../../enum/Video_Statistics";
import { formatNumberUS } from "../../function/formatNumberUS";




export default function PopularVideo() {
  const [PopularVideos, setPopularVideos] = useState<YouTubeSearchResult[]>([]);
  const { ChannelId } = useParams();
  const [VideosStatistics, setVideosStatistics] = useState<VideoStatistic[]>([]);
  const navigate = useNavigate();




  const Youtubevideostatistics = async (VideoId: string) => {
    const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${VideoId}&maxResults=5&key=${process.env.REACT_APP_Youtube_API}`)

    setVideosStatistics(prevState => {
      if (prevState.some(stat => stat.id === VideoId)) {
        return prevState;
      }
      return [
        ...prevState,
        { id: VideoId, statistics: response.items[0].statistics }
      ];
    });
  }




  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${ChannelId}&maxResults=5&order=viewCount&type=video&key=${process.env.REACT_APP_Youtube_API}`)
      setPopularVideos(response.items);
      for (const VideoId of response.items) {
        await Youtubevideostatistics(VideoId.id.videoId)
      }

    }
    fetchData()
  }, [ChannelId])







  return (<section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Popular Video</h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6" >
    {PopularVideos && PopularVideos.map((video,index) => (
       <div key={index} className="relative h-40 bg-gray-200" onClick={() => {navigate(`${video.id.videoId}`)}}>
       <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
       <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
         {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0,25)}...` : video.snippet.title}
       </div>
     </div>
    ))}
 
      {VideosStatistics && VideosStatistics.map(video => (  <div key={video.id} className="flex justify-between text-xs text-gray-500  hidden md:flex" >
        <div className="flex items-center space-x-1">
          <BsCameraVideo className="h-4 w-4 text-red-500" />
          <span>{formatNumberUS(Number(video.statistics.viewCount))}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BiLike className="h-4 w-4 text-blue-500" />
          <span>{formatNumberUS(Number(video.statistics.likeCount))}</span>
        </div>
        <div className="flex items-center space-x-1">
          <AiOutlineComment className="h-4 w-4 text-gray-500" />
          <span>{formatNumberUS(Number(video.statistics.commentCount))}</span>
        </div>
      </div>))}
    </div>
  </section>)

}