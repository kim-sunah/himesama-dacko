import { useEffect, useRef, useState } from "react"

import Getmethod from "../../http/Get_method"

import { PopularVideo } from "../../enum/Popular";
import { LiveVideo } from "../../enum/Live";
import LiveModal from "./LiveModal";
import YoutubeGetmethod from "../../http/Youtube_Get_Method";

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


const categories = ["All", "Film & Animation", "Autos & Vehicles", "Music", "Pets & Animals", "Sports", "Gaming", "People & Blogs", "Comedy", "Entertainment", "News & Politics", "Howto & Style", "Science & Technology"]

export default function Live() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [showModal, setShowModal] = useState(false)
    const [showliveModal, setShowliveModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<PopularVideo | null >(null);
    const [selectedliveVideo, setSelectedliveVideo] = useState<null | LiveVideo>(null);
 
    const [livelist, setlivelist] = useState<LiveVideo[]>([]);
    const [videos, setVideos] = useState<PopularVideo[]>([]);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);


    const fetchVideos = async (pageToken: string | null = null) => {

        let selectnumberId;
        if (selectedCategory in CategoryIdMap) {
            selectnumberId = CategoryIdMap[selectedCategory];
        }
        setLoading(true);
        try {

            if (pageToken) {
                const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&part=liveStreamingDetails&maxResults=50&pageToken=${pageToken}&chart=mostPopular&videoCategoryId=${selectnumberId}&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
                setVideos(prevVideos => {
                    const existingVideoIds = prevVideos.map(video => video.id);
                    const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
                    return [...prevVideos, ...filteredNewVideos];
                });
                
                setNextPageToken(response.nextPageToken);
              
            }
            else if (pageToken === null) {
                const response = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&part=liveStreamingDetails&maxResults=50&chart=mostPopular&videoCategoryId=${selectnumberId}&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)

                setVideos(prevVideos => {
                    const existingVideoIds = prevVideos.map(video => video.id);
                    const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
                    return [...prevVideos, ...filteredNewVideos];
                });
                setNextPageToken(response.nextPageToken);
                
            }

            const Liveresponse = await YoutubeGetmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&location=37.5665,126.9780&locationRadius=1000km&maxResults=50&order=viewCount&regionCode=kr&type=video&key=${process.env.REACT_APP_Youtube_API}`)
            setlivelist(ShuffleArray(Liveresponse.items))
          
            

           
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(); // 초기 로드 시 비디오를 가져옵니다.
        setVideos([]);
        setNextPageToken(null);
    }, [selectedCategory]);



    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && nextPageToken) {
                    fetchVideos(nextPageToken);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [nextPageToken, loading]);


    const ShuffleArray = <T,>(array: T[]): T[] => {
        const shuffledArray = [...array]; // 원본 배열을 복사하여 변형 방지
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    //모달을 켜고 비디오 데이터 삽입(라이브)
    const HandleOpenModal = async (video: PopularVideo ) => {
       
        setSelectedVideo(video)
        setShowModal(true)
     
    }
    //모달을 켜고 비디오 데이터 삽입(라이브)
    const LiveHandleOpenModal = async (video: LiveVideo) => {
        setSelectedliveVideo(video)
        setShowliveModal(true)
      
    }
    //검정색 바탕화면을 클릭했을떄 창닫기
    const HandleCloseModal = () => {
        setShowModal(false)
    }
    //검정색 바탕화면을 클릭했을떄 창닫기(라이브)
    const LivehandleCloseModal = () => {
        setShowliveModal(false)
    }

    //모달이 켜져 있을떄  선택
    const OnModal = async (video: PopularVideo ) => {
      
        setSelectedVideo(video);
       
    };
    //모달이 켜져 있을때 선택(라이브)
    const OnLiveModal = async (video: LiveVideo) => {
      
        setSelectedliveVideo(video)
      

    }



    return (

        <div className="container mx-auto py-8 block">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Live Trending Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {livelist.slice(0, 10).map((video, index) => (
                        <div key={index} className="relative group" onClick={() => LiveHandleOpenModal(video)}>

                            <img
                                src={video.snippet.thumbnails.high.url}
                                alt={video.snippet.title}
                                width={video.snippet.thumbnails.high.width / 2}
                                height={video.snippet.thumbnails.high.height / 2}
                                className="object-cover w-full aspect-video rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
                                <h3 className="font-semibold line-clamp-2" style={{ fontSize: "0.75rem" }}>{video.snippet.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
                <div className="flex flex-wrap gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div ref={containerRef} style={{ height: '80vh', overflowY: 'auto' }} >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map(video => (
                            <div key={video.id} className="relative group" onClick={() => HandleOpenModal(video)}>
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="object-cover w-full aspect-video rounded-lg"
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
                </div>
            </div>
            {showModal &&
                <LiveModal type={"Popular"} handleCloseModal={HandleCloseModal} PopularselectedVideo={selectedVideo} onmodal={OnModal} selectedCategory={selectedCategory}></LiveModal>}

            {showliveModal && (<div>
                <LiveModal type={"Live"} handleCloseModal={LivehandleCloseModal} LiveselectedVideo={selectedliveVideo} videolist={livelist} onmodal={OnLiveModal} ></LiveModal>
            </div>)}
        </div>
    )

}