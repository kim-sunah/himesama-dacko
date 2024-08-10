import { useRecoilValue } from "recoil";
import { userIdState } from "../../store/auth";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import Postmethod from "../../http/Post_method";
import { YouTubeSearchResult } from "../../enum/Search_Item_Interface";
import { useNavigate } from "react-router-dom";

export default function RecommandVideo(){
    const UserId = useRecoilValue(userIdState);
    const [recommandVideo, setrecommandVideo] = useState<YouTubeSearchResult[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData  = async() => {
            try{
                const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/auth/${UserId}`)
                const searchData = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/nlp/tokenize`,{text: response.search, maxresult : 8})
                setrecommandVideo(searchData)
            

            }
            catch(err){

            }
         
        }
        fetchData();
     

    },[])
    return (
        <section className="py-8 px-4 block">

    <div className="grid sm:grid-cols-8 md:grid-cols-4 lg:grid-cols-8 gap-6" >
    {recommandVideo && recommandVideo.map((video,index) => (
       <div key={index} className="relative h-40 bg-gray-200" onClick={() => {navigate(`/${video.snippet.channelId}/${video.id.videoId}`)}}>
       <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
       <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
         {video.snippet.title.length > 25 ? `${video.snippet.title.slice(0,25)}...` : video.snippet.title}
       </div>
     </div>
    ))}
 
     
    </div>
  </section>

    )
 
}