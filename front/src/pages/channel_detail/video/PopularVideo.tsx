import { useEffect, useState } from "react";
import { YouTubeSearchResult } from "../../../enum/Search_Item_Interface";
import Getmethod from "../../../http/Get_method";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VideoStatistic } from "../../../enum/Video_Statistics";
import { AiOutlineComment } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { formatNumberUS } from "../../../function/formatNumberUS";
import { Video } from "lucide-react";

export default function PopularVideo() {
    const [PopularVideos, setPopularVideos] = useState<YouTubeSearchResult[]>([]);
    const { ChannelId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [VideosStatistics, setVideosStatistics] = useState<VideoStatistic[]>([]);
    console.log(ChannelId)
    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${ChannelId}&maxResults=20&order=viewCount&type=video&key=${process.env.REACT_APP_Youtube_API}`)
            console.log(response.items)
            setPopularVideos(response.items);
            // for (const VideoId of response.items) {
            //     await Youtubevideostatistics(VideoId.id.videoId)
            // }
        }
        fetchData()
    }, [ChannelId,location.pathname.split("/")[2]])
    // const Youtubevideostatistics = async (VideoId: string) => {
    //     const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${VideoId}&maxResults=5&key=${process.env.REACT_APP_Youtube_API}`)
    //     console.log(response)
    //     setVideosStatistics(prevState => {
    //         if (prevState.some(stat => stat.id === VideoId)) {
    //             return prevState;
    //         }
    //         return [
    //             ...prevState,
    //             { id: VideoId, statistics: response.items[0].statistics }
    //         ];
    //     });
    // }
    return (<section className="mb-8">
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto  gap-4" >
            <h2 className="text-2xl font-bold mb-4">인기 영상</h2>
            {PopularVideos && PopularVideos.map((video, index) => (
                <div key={index} className="relative h-40 bg-gray-200" onClick={()=>{navigate(`/${ChannelId}/${video.id.videoId}`)}}>
                    <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
                    <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
                        {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0, 25)}...` : video.snippet.title}
                    </div>
                </div>
            ))}

        </div>
    </section>)
}


