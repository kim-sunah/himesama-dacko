import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { YouTubeSearchResult } from "../../enum/Search_Item_Interface";
import { AiOutlineComment } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { VideoStatistic } from "../../enum/Video_Statistics";
import { formatNumberUS } from "../../function/formatNumberUS";
import ErrorPage from "../error/Error";
import YoutubeGetmethod from "../../http/Youtube_Get_Method";
interface RouterError {
  status: number;
  message: string;
}

export default function RecentUpload() {

  const [RecentVideos, setRecentVideos] = useState<YouTubeSearchResult[]>([]);
  const { ChannelId } = useParams();
  const navigate = useNavigate();
  const [VideosStatistics, setVideosStatistics] = useState<VideoStatistic[]>([]);
  const [error, setError] = useState<RouterError | null>(null);

  const Youtubevideostatistics = async (VideoId: string) => {
    const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${VideoId}&maxResults=5&key=${process.env.REACT_APP_Youtube_API}`)
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
      try{
        const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${ChannelId}&maxResults=5&order=date&type=video&key=${process.env.REACT_APP_Youtube_API}`)
        setRecentVideos(response.items);
        for (const VideoId of response.items) {
          await Youtubevideostatistics(VideoId.id.videoId)
        }

      }
      catch(error){
        setError({
            message: '잘못된 요청입니다. 주소를 확인해 주세요.',
            status: 400,
          });

    }
    
     
    }
    fetchData()

  }, [ChannelId]);

  if (error) {
    return <ErrorPage error={error} />;
  }
  

  return (<section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Recent Uploads</h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6" >
    {RecentVideos && RecentVideos.map((video, index) => ( 
      <div key={index} className="relative h-40 bg-gray-200" onClick={() => {navigate(`${video.id.videoId}`)}}>
        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
        <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
        {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0,25)}...` : video.snippet.title}
        </div>
      </div>))}
      {VideosStatistics && VideosStatistics.map(video => (  <div key={video.id} className="flex justify-between text-xs text-gray-500  hidden md:flex">
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




