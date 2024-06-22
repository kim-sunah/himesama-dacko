import { useParams } from "react-router-dom";
import { YouTubeSearchResult } from "../../enum/Search_Item_Interface";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { AiOutlineComment } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { VideoStatistic } from "../../enum/Video_Statistics";




export default function PopularVideo() {
  const [PopularVideos, setPopularVideos] = useState<YouTubeSearchResult[]>([]);
  const { ChannelId } = useParams();
  const [VideosStatistics, setVideosStatistics] = useState<VideoStatistic[]>([]);


  function formatNumberUS(number: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    });

    return formatter.format(number);
  }



  const Youtubevideostatistics = async (VideoId: string) => {
    const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${VideoId}&key=${process.env.REACT_APP_Youtube_API}`)

    setVideosStatistics(prevState => {
      // 이미 존재하는 VideoId인지 확인
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
      const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${ChannelId}&order=viewCount&type=video&key=${process.env.REACT_APP_Youtube_API}`)
      setPopularVideos(response.items);
      for (const VideoId of response.items) {
        await Youtubevideostatistics(VideoId.id.videoId)
      }

    }
    fetchData()
  }, [ChannelId])







  return (<section>
    <h2 className="text-2xl font-bold mb-4">Popular Videos</h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {PopularVideos.map(video => (

        <div key={video.id.videoId} className="group relative rounded-lg overflow-hidden" >
          <img
            src={video.snippet.thumbnails.high.url}
            alt="Video Thumbnail"
            width={video.snippet.thumbnails.high.width}
            height={video.snippet.thumbnails.high.height}
            className="w-full aspect-video object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 " >
            <h3 className="text-lg font-semibold text-white line-clamp-2">{video.snippet.title}</h3>
          </div>

        </div>

      ))}
      {VideosStatistics && VideosStatistics.map(video => (
        <div key={video.id} className="flex justify-between whitespace-nowrap">
          <div className="flex gap-1">
            <BsCameraVideo size="25" color="red" />
            <div style={{ fontSize: "1rem" }}>{formatNumberUS(Number(video.statistics.viewCount))}</div>
          </div>
          <div className="flex  gap-1">
            <BiLike size="25" color="blue" />
            <div style={{ fontSize: "1rem" }}>{formatNumberUS(Number(video.statistics.likeCount))}</div>
          </div>
          <div className="flex  gap-1">
            <AiOutlineComment size="25" />
            <div style={{ fontSize: "1rem" }}>{formatNumberUS(Number(video.statistics.commentCount))}</div>
          </div>

        </div>
      ))}


    </div>
  </section>)

}