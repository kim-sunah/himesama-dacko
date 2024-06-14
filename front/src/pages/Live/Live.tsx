import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Getmethod from "../../http/Get_method"
import { Button } from "../../component/v0/button";
import classes from "../../styles/Live.module.css";
import { PopularVideo } from "../../enum/Popular";
import { LiveVideo } from "../../enum/Live";
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
    const [selectedVideo, setSelectedVideo] = useState<PopularVideo | null | LiveVideo>(null); // 선택된 비디오 상태 추가
    const [selectedliveVideo, setSelectedliveVideo] = useState<null | LiveVideo>(null); // 선택된 비디오 상태 추가
    const [videolist, setvideolist] = useState<PopularVideo[]>([])
    const [livelist, setlivelist] = useState<LiveVideo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let selectnumberId;
            if (selectedCategory in CategoryIdMap) {
                selectnumberId = CategoryIdMap[selectedCategory];
            }
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=liveStreamingDetails&maxResults=50&chart=mostPopular&videoCategoryId=${selectnumberId}&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
            const Liveresponse = await Getmethod(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&location=37.5665,126.9780&locationRadius=1000km&maxResults=30&order=viewCount&regionCode=kr&type=video&key=${process.env.REACT_APP_Youtube_API}`)
            setvideolist(response.items);
            setlivelist(Liveresponse.items)

        }
        fetchData();
    }, [selectedCategory])

    const formatDuration = (duration: string): string => {
        let hours = 0, minutes = 0, seconds = 0;
        duration.match(/(\d+)(?=[HMS])/g)?.forEach((part, index, parts) => {
            if (duration.includes('H')) hours = parseInt(parts[index]);
            if (duration.includes('M')) minutes = parseInt(parts[index]);
            if (duration.includes('S')) seconds = parseInt(parts[index]);
        });
        return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
    };

    const handleOpenModal = (video: PopularVideo | LiveVideo) => {
        setSelectedVideo(video)
        setShowModal(true)
    }

    const LivehandleOpenModal =(video : LiveVideo) =>{
        setSelectedliveVideo(video)
        setShowliveModal(true)
    }
    const handleCloseModal = () => {
        setSelectedVideo(null)
        setShowModal(false)
    }

    const LivehandleCloseModal = () => {
        setSelectedliveVideo(null)
        setShowliveModal(false)
    }





    return (
        <div className="container mx-auto py-8 block">
            <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
        <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-4">
         {livelist.map((video,index) => (
            <div key={index} className="relative group" onClick={() => LivehandleOpenModal(video)}>
         
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              width={video.snippet.thumbnails.high.width/2}
              height={video.snippet.thumbnails.high.height/2}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videolist.map((video) => (
                        <div key={video.id} className="relative group" onClick={() => handleOpenModal(video)}>
                         
                            <img
                                src={video.snippet.thumbnails.high.url}
                                alt={video.snippet.title}
                                width={video.snippet.thumbnails.high.width}
                                height={video.snippet.thumbnails.high.height}
                                className="object-cover w-full aspect-video rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
                                <h3 className="font-semibold line-clamp-2" style={{ fontSize: "1rem" }}>{video.snippet.title}</h3>
                                <div className="text-sm flex justify-end items-center gap-2">
                                    <span>{formatDuration(video.contentDetails.duration)}</span>
                                    {/* <span>&middot;</span>
                                        <span>{video.views} views</span> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60" onClick={handleCloseModal}>
                    <div>
                        <div>
                            <div className="text-white"> {selectedVideo?.snippet.title.padEnd(200, '\u00A0')}</div>
                            {/* <div>
                               {formatDuration(selectedVideo?.contentDetails.duration)} views
                            </div> */}
                        </div>
                        <div>
                            <div style={{
                                minHeight: "275px",
                                width: "100%",
                                margin: "0 auto",
                                position: "relative",
                                paddingBottom: "56.25%", /* 16:9 비율을 유지하기 위한 값 */
                            }}>
                                <iframe
                                    className={`${classes.aspectVideoItem}`}
                                    src={`https://www.youtube.com/embed/${selectedVideo?.id}`}
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

                        </div>
                        <div>
                            <Button onClick={handleCloseModal}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
            {showliveModal && 
               <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60" onClick={LivehandleCloseModal}>
               <div>
                   <div>
                       <div className="text-white"> {selectedliveVideo?.snippet.title.padEnd(200, '\u00A0')}</div>
                       {/* <div>
                          {formatDuration(selectedVideo?.contentDetails.duration)} views
                       </div> */}
                   </div>
                   <div>
                       <div style={{
                           minHeight: "275px",
                           width: "100%",
                           margin: "0 auto",
                           position: "relative",
                           paddingBottom: "56.25%", /* 16:9 비율을 유지하기 위한 값 */
                       }}>
                           <iframe
                               className={`${classes.aspectVideoItem}`}
                               src={`https://www.youtube.com/embed/${selectedliveVideo?.id.videoId}`}
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

                   </div>
                   <div>
                       <Button onClick={LivehandleCloseModal}>Close</Button>
                   </div>
               </div>
           </div>}
        </div>
    )

}