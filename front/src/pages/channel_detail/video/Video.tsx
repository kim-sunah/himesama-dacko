
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../component/v0/avatar"
import { Button } from "../../../component/v0/button"
import { Youtube_Video } from "../../../enum/Youtbe_video";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Getmethod from "../../../http/Get_method";
import TimeAgo from 'react-timeago';
import { VideoStatistic } from "../../../enum/Video_Statistics";
import { YouTubeSearchResult } from "../../../enum/Search_Item_Interface";
import Postmethod from "../../../http/Post_method";
import Comment from "./Comment";



export default function Video() {
    const location = useLocation();
    const [video, setVideo] = useState<Youtube_Video | null>(null);
    const [recommandVideo, setrecommandVideo] = useState<YouTubeSearchResult[]>([]);
    const [recommandloading, setrecommandloading] = useState<boolean>(false)
    const [relationloading, setrelationloading] = useState<boolean>(false)

    const [RecentVideos, setRecentVideos] = useState<YouTubeSearchResult[]>([]);
    const [relationVideo, setrelationVideo] = useState<YouTubeSearchResult[]>([]);
    const [channelImg, setchannelImg] = useState();
    const [subscriberCount, setsubscriberCount] = useState()
    const { ChannelId } = useParams();

    const navigate = useNavigate()

    const [channelButton, setchannelButton] = useState(true);
    const [recommandButton, setrecommandButton] = useState(false);
    const [relationButton, setrelationButton] = useState(false);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    const convertToKorean = (num: number) => {

        if (num < 10000) {
            return `${num}명`;
        }

        const units = ['', '만', '억'];
        let result = '';
        let unitIndex = 0;

        // 억 단위 계산
        const 억 = Math.floor(num / 100000000);
        if (억 > 0) {
            result += `${억}억 `;
            num %= 100000000; // 남은 숫자
        }

        // 만 단위 계산
        const 만 = Math.floor(num / 10000);
        if (만 > 0) {
            result += `${만}만 `;
            num %= 10000; // 남은 숫자
        }

        // 천 단위 이하 처리
        if (num > 0) {
            result += `${num}`;
        }

        return result.trim() + '명';
    };




    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${location.pathname.split("/")[2]}&maxResults=1&key=${process.env.REACT_APP_Youtube_API}`)

            setVideo(response.items[0])
        }
        fetchData()
    }, [location.pathname.split("/")[2]])
    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${ChannelId}&maxResults=25&order=date&type=video&key=${process.env.REACT_APP_Youtube_API}`)

            setRecentVideos(response.items);
        }
        fetchData()

    }, [ChannelId]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${ChannelId}&maxResults=1&key=${process.env.REACT_APP_Youtube_API}`)

            setsubscriberCount(response.items[0].statistics.subscriberCount);
            setchannelImg(response.items[0].snippet.thumbnails.high.url);
        }
        fetchData()

    }, [ChannelId]);




    const remmandHandler = async () => {
        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/nlp/tokenize`, { text: video?.snippet.title })
        setrecommandVideo(response)
        setrecommandloading(true)

    }

    const relationHandler = async () => {
        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/nlp/tokenize`, { text: (video?.snippet.tags)?.join(" ") })
        setrelationVideo(response)
        setrelationloading(true)

    }
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white text-black">
            <div className="flex w-full max-w-5xl mt-4">
                <div className="flex flex-col w-full">
                    <div className="relative w-full h-0 pb-[56.25%]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video?.id}`}

                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Video"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={channelImg} />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>

                            <div>
                                <h2 className="text-lg font-bold">{video?.snippet.channelTitle}</h2>
                                <p className="text-sm text-gray-400 mt-2">구독자 {convertToKorean(Number(subscriberCount))}</p>
                                <div className="mt-2">
                                    <p className="text-gray-400">
                                        조회수 {video?.statistics.viewCount ? formatNumber(Number(video?.statistics.viewCount)) : 0}회 &nbsp;  • &nbsp;
                                        좋아요 {video?.statistics.likeCount ? formatNumber(Number(video?.statistics.likeCount)) : 0}회 &nbsp;  • &nbsp;

                                        댓글 {video?.statistics.commentCount ? formatNumber(Number(video?.statistics.commentCount)) : 0}회 &nbsp;  • &nbsp;
                                        <TimeAgo
                                            date={video?.snippet.publishedAt ? new Date(video.snippet.publishedAt).toISOString() : ''}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                 
                    </div>
                    <hr></hr>
                    <div className="mt-2 ml-2">
                                    <p className="text-gray-400">
                                        댓글
                                    </p>
                                </div>
                    <Comment></Comment>

                </div>
                <div className="flex flex-col w-1/3 ml-10">
                    <div className="flex items-center  mb-4 gap-6">
                        <Button
                            variant="outline"
                            style={{
                                backgroundColor: channelButton ? 'black' : '',
                                color: channelButton ? 'white' : '',
                            }}
                            onClick={() => { setchannelButton(true); setrecommandButton(false); setrelationButton(false); }}
                        >
                            {video?.snippet.channelTitle} 제공
                        </Button>
                        {video?.snippet.title && <Button
                            variant="outline"
                            style={{
                                backgroundColor: recommandButton ? 'black' : '',
                                color: recommandButton ? 'white' : '',
                            }}
                            onClick={() => { setchannelButton(false); setrecommandButton(true); setrelationButton(false); remmandHandler(); }}
                        >
                            추천 영상
                        </Button>}

                        {video?.snippet.tags && <Button
                            variant="outline"
                            style={{
                                backgroundColor: relationButton ? 'black' : '',
                                color: relationButton ? 'white' : '',
                            }}
                            onClick={() => { setchannelButton(false); setrecommandButton(false); setrelationButton(true); relationHandler(); }}
                        >
                            관련 영상
                        </Button>}
                    </div>
                    {channelButton && <div className="space-y-4">
                        {RecentVideos && RecentVideos.map((video, index) => (
                            <div key={index} className="flex space-x-4" onClick={() => { navigate(`/${ChannelId}/${video.id.videoId}`); window.scrollTo(0, 0); }}>
                                <img src={`${video.snippet.thumbnails.high.url}`} alt="Thumbnail" className="w-34 h-24 object-cover" />
                                <div className="flex flex-col justify-between">
                                    <h4 className="text-sm font-bold" style={{ whiteSpace: "nowrap" }}> {video.snippet.title.length > 15 ? `${video.snippet.title.slice(0, 15)}...` : video.snippet.title}</h4>
                                    <p className="text-xs text-gray-400">{video.snippet.channelTitle} </p>
                                </div>
                            </div>

                        ))}

                    </div>}
                   
                    {recommandButton && <div className="space-y-4">
                        {recommandVideo && recommandVideo.map((video, index) => (
                            <div key={index} className="flex space-x-4" onClick={() => { navigate(`/${ChannelId}/${video.id.videoId}`); window.scrollTo(0, 0); }}>
                                <img src={`${video.snippet.thumbnails.high.url}`} alt="Thumbnail" className="w-34 h-24 object-cover" />
                                <div className="flex flex-col justify-between">
                                    <h4 className="text-sm font-bold" style={{ whiteSpace: "nowrap" }}> {video.snippet.title.length > 15 ? `${video.snippet.title.slice(0, 15)}...` : video.snippet.title}</h4>
                                    <p className="text-xs text-gray-400">{video.snippet.channelTitle} </p>
                                </div>
                            </div>

                        ))}
                    {recommandButton && recommandVideo.length === 0  &&  recommandloading && <p> 적합한 추천영상이 없습니다</p>}

                    </div>}
                  
                    {relationButton && <div className="space-y-4">
                        {relationVideo && relationVideo.map((video, index) => (
                            <div key={index} className="flex space-x-4" onClick={() => { navigate(`/${ChannelId}/${video.id.videoId}`); window.scrollTo(0, 0); }}>
                                <img src={`${video.snippet.thumbnails.high.url}`} alt="Thumbnail" className="w-34 h-24 object-cover" />
                                <div className="flex flex-col justify-between">
                                    <h4 className="text-sm font-bold" style={{ whiteSpace: "nowrap" }}> {video.snippet.title.length > 15 ? `${video.snippet.title.slice(0, 15)}...` : video.snippet.title}</h4>
                                    <p className="text-xs text-gray-400">{video.snippet.channelTitle} </p>
                                </div>
                            </div>

                        ))}
                    {relationButton && relationVideo.length === 0  &&  relationloading && <p> 적합한 관련영상이 없습니다</p>}

                    </div>}

                </div>
            </div>
        </div>

    )
}



