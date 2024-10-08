import { useRecoilValue } from "recoil";
import { userIdState } from "../../store/auth";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import Postmethod from "../../http/Post_method";
import { YouTubeSearchResult } from "../../enum/Search_Item_Interface";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LazyLoad from "react-lazyload";

export default function RecommendVideo() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  const UserId = useRecoilValue(userIdState);
  const [recommendVideo, setRecommendVideo] = useState<YouTubeSearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/auth/${UserId}`);
        const searchData = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/nlp/tokenize`, { text: response.search, maxresult: 8 });
        setRecommendVideo(searchData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [UserId]);

  const MobilerenderVideoGrid = () => (
    <div className={`grid grid-cols-2 gap-6`}>
      {recommendVideo && recommendVideo.map((video, index) => (
        <div key={index} className="relative h-40 bg-gray-200" onClick={() => { navigate(`/${video.snippet.channelId}/${video.id.videoId}`) }}>
           <LazyLoad height={200} offset={100}>
           <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
           </LazyLoad>
        
          <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
            {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0, 25)}...` : video.snippet.title}
          </div>
        </div>
      ))}
    </div>
  );


  const TabletrenderVideoGrid = () => (
    <div className={`grid grid-cols-3 gap-6 `}>
      {recommendVideo && recommendVideo.map((video, index) => (
        <div key={index} className="relative h-40 bg-gray-200 mb-4" onClick={() => { navigate(`/${video.snippet.channelId}/${video.id.videoId}`) }}>
           <LazyLoad height={200} offset={100}>
           <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
           </LazyLoad>
        
          <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
            {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0, 25)}...` : video.snippet.title}
          </div>
        </div>
      ))}
    </div>
  );

  const DeskToprenderVideoGrid = () => (
    <div className={`grid grid-cols-8 gap-6`}>
      {recommendVideo && recommendVideo.map((video, index) => (
        <div key={index} className="relative h-40 bg-gray-200" onClick={() => { navigate(`/${video.snippet.channelId}/${video.id.videoId}`) }}>
           <LazyLoad height={200} offset={100}>
           <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
           </LazyLoad>
        
          <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
            {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0, 25)}...` : video.snippet.title}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 px-4 block">
      {isMobile && MobilerenderVideoGrid()}
      {isTablet && TabletrenderVideoGrid()}
      {isDesktop && DeskToprenderVideoGrid()}
    </section>
  );
}