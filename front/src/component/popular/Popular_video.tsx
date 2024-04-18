import React, { useEffect,useState } from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import Getmethod from "../../http/Get_method";

interface VideoItem {
    id: string;
    // 다른 필요한 속성들을 여기에 추가할 수 있습니다.
  }
export default function Popularvideo(): JSX.Element{
    const [Popular_video, setPopular_video] = useState<VideoItem[]>([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const apiKey = 'AIzaSyCG-Av5i12FnfYP9x2tPfM68QkdoQppOxI';
              const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=5&regionCode=kr&key=${apiKey}`);
            
              setPopular_video(response.items)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchData();
    },[])
  
    return (
        <>
        <h1 style={{textAlign:"center", fontSize:"2rem", fontWeight:"bold",marginTop:"2%"}}>  급 인기 상승 동영상 TOP 5</h1>
        <div style={{ display: "flex", flexWrap: "wrap" ,marginTop:"2%"}}>
            
        {Popular_video &&
          Popular_video.map((video) => (
            <div key={video.id} style={{ width: "20%", padding: "0.5rem" }}>
              <iframe
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${video.id}`}
                title="YouTube video player"
                style={{ display: "block" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
        </>
        
        
    )
}