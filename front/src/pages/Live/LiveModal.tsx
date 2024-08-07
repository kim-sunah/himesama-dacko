import React, { useState, useRef, useEffect } from "react";
import classes from "../../styles/Live.module.css";
import { LiveVideo } from "../../enum/Live";
import { PopularVideo } from "../../enum/Popular";
import Getmethod from "../../http/Get_method";
import {  useNavigate } from "react-router-dom";
import Postmethod from "../../http/Post_method";
import YoutubeGetmethod from "../../http/Youtube_Get_Method";



interface LiveModalProps {
  type : string
  handleCloseModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  PopularselectedVideo?: PopularVideo  | null;
  LiveselectedVideo? :  LiveVideo | null;
  videolist? : LiveVideo[] 
  onmodal: Function;
  selectedCategory?: string
}

const CategoryIdMap: { [key: string]: number } = {
  "All": 0,
  "Film & Animation": 1,
  "Autos & Vehicles": 2,
  "Music": 10,
  "Pets & Animals": 15,
  "Sports": 17,
  "Gaming": 20,
  "People & Blogs": 22,
  "Comedy": 23,
  "Entertainment": 24,
  "News & Politics": 25,
  "Howto & Style": 26,
  "Science & Technology": 28,
};




const LiveModal: React.FC<LiveModalProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(props.selectedCategory)
  const [livelist, setlivelist] = useState<LiveVideo[]>([]);
  const [videos, setVideos] = useState<PopularVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const containerModalRef = useRef<HTMLDivElement | null>(null);
  const fetchVideos = async (pageToken: string | null = null) => {

    let selectnumberId;
    if (selectedCategory! in CategoryIdMap) {
      selectnumberId = CategoryIdMap[selectedCategory!];
    }
    setLoading(true);
    try {
      if(props.selectedCategory){
        if (pageToken) {
          const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=liveStreamingDetails&maxResults=50&pageToken=${pageToken}&chart=mostPopular&videoCategoryId=${selectnumberId}&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
          setVideos(prevVideos => {
            const existingVideoIds = prevVideos.map(video => video.id);
            const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
            return [...prevVideos, ...filteredNewVideos];
          });
          setNextPageToken(response.nextPageToken);
        }
        else if (pageToken === null) {
          const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=liveStreamingDetails&maxResults=50&chart=mostPopular&videoCategoryId=${selectnumberId}&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
          setVideos(prevVideos => {
            const existingVideoIds = prevVideos.map(video => video.id);
            const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
            return [...prevVideos, ...filteredNewVideos];
          });
          setNextPageToken(response.nextPageToken);
  
        }
      }
      const Liveresponse = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&location=37.5665,126.9780&locationRadius=1000km&maxResults=10&order=viewCount&regionCode=kr&type=video&key=${process.env.REACT_APP_Youtube_API}`)
      setlivelist(ShuffleArray(Liveresponse.items))
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const ShuffleArray = <T,>(array: T[]): T[] => {
    const shuffledArray = [...array]; // 원본 배열을 복사하여 변형 방지
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    fetchVideos(); // 초기 로드 시 비디오를 가져옵니다.
    setVideos([]);
    setNextPageToken(null);
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      if (containerModalRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerModalRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && nextPageToken) {
          fetchVideos(nextPageToken);
        }
      }
    };

    const container = containerModalRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [nextPageToken, loading]);




  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - modalPosition.x,
      y: event.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const x = event.clientX - dragOffset.x;
      const y = event.clientY - dragOffset.y;
      setModalPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {

    const delta = event.deltaY;
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollTop + delta,
      behavior: "smooth",
    });
  };

  const getVideoSrc = () => {
  
    if(props.type === "Popular"){
      return `https://www.youtube.com/embed/${props.PopularselectedVideo!.id}`;
    }
    return `https://www.youtube.com/embed/${props.LiveselectedVideo!.id.videoId}`;

    
  };



  const ScrollTop = () => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  
  const NavigateHandler = async() =>{


    if(props.type === "Popular"){
      await Postmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/LivePopularChannel`, { ChannelId: props.PopularselectedVideo!.snippet.channelId , categoryid : props.PopularselectedVideo?.snippet.categoryId, videoid : props.PopularselectedVideo?.id });
      navigate(`/${props.PopularselectedVideo!.snippet.channelId}`)
    }
    else if(props.type ==="Live"){
      const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${props.LiveselectedVideo?.id.videoId}&key=${process.env.REACT_APP_Youtube_API}`)
       await Postmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/LivePopularChannel`, { ChannelId: props.LiveselectedVideo!.snippet.channelId , categoryid : response.items[0].snippet.categoryId, videoid : props.LiveselectedVideo?.id.videoId });
       navigate(`/${props.LiveselectedVideo!.snippet.channelId}`)

    }
    
 
   

  
  }

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60" onClick={(e) => { if (e.target === e.currentTarget) { props.handleCloseModal(e) } }}>
      <div
        id="modal-content"
        className={`${classes.modal}`}
        style={{
          transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
          maxHeight: "70vh", // 최대 높이 설정
          overflowY: "auto", // 스크롤 활성화
          scrollbarWidth: "none", // Firefox용 스크롤바 제거
          msOverflowStyle: "none", // IE/Edge용 스크롤바 제거

        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        ref={containerRef} // ref 추가
      >
        <div>
          <div>
       
          </div>
          <div>
          <button
          className=" bottom-20  left-0 flex px-4 py-2 mb-4 text-white bg-red-600 rounded-md"
          onClick={NavigateHandler}
        >
          다음에서 보기: 채널 정보
        </button>
            <div  
              style={{
                minHeight: "275px",
                width: "100%",
                margin: "0 auto",
                position: "relative",
                paddingBottom: "56.25%",
                overflowY: "hidden",
              }}
            >
              <iframe
                className={`${classes.aspectVideoItem}`}
                src={getVideoSrc()}
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
               
           
            </div>
         
            {/* <button type="button" style={{color:"white"}} onClick={NavigateHandler}>CLICK</button> */}
          </div>
          {props.type === "Popular" ?   <div ref={containerModalRef} style={{ height: '80vh', overflowY: 'auto' }} >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                        {videos.map(video => (
                            props.PopularselectedVideo!.id !== video.id && <div key={video.id} className="relative group" onClick={() => props.onmodal(video)}>
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="object-cover w-full aspect-video rounded-lg"
                                    onClick={ScrollTop}
                                />
                                <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
                                    <h3 className="font-semibold line-clamp-2" style={{ fontSize: '1rem' }}>
                                        {video.snippet.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    {loading && <p>Loading...</p>}
                </div> :  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {props.videolist!.map((video, index) => (
              props.LiveselectedVideo!.id !== video.id && <div key={index} className="relative group" onClick={() => props.onmodal(video)}>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  width={video.snippet.thumbnails.high.width / 2}
                  height={video.snippet.thumbnails.high.height / 2}
                  className="object-cover w-full aspect-video rounded-lg"
                  onClick={ScrollTop}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
                  <h3 className="font-semibold line-clamp-2" style={{ fontSize: "1rem" }}>{video.snippet.title}</h3>

                </div>
              </div>

            ))}
          </div>}
        
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {props.videolist.map((video, index) => (
              props.selectedVideo!.id !== video.id && <div key={index} className="relative group" onClick={() => props.onmodal(video)}>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  width={video.snippet.thumbnails.high.width / 2}
                  height={video.snippet.thumbnails.high.height / 2}
                  className="object-cover w-full aspect-video rounded-lg"
                  onClick={ScrollTop}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
                  <h3 className="font-semibold line-clamp-2" style={{ fontSize: "1rem" }}>{video.snippet.title}</h3>

                </div>
              </div>

            ))}
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default LiveModal;
