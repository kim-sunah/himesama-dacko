import { useEffect, useState } from "react";
import { Button } from "../../../component/v0/button";
import Getmethod from "../../../http/Get_method";
import { channeInfo } from "../../../enum/ChannelInfo";
import { Link } from "react-router-dom";


import { formatNumberUS } from "../../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";


export default function ViewTop(){
    const [Top, SetTop] = useState<channeInfo[]>([]);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/ViewTop`)

            SetTop(response)

        }
        fetchData()
    

    },[])

    const ScrollDown = () => {
      window.scrollBy({
        top: 900, // 스크롤할 픽셀 수 (원하는 만큼 조절 가능)
        left: 0,
        behavior: 'smooth' // 부드러운 스크롤 효과
      });
    };
    return (
        <main className="p-6 md:p-10">
        <div className="container mx-auto">
          <div className="grid gap-6">
        
            
          <div className="five" style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="mb-4">조회수 상위

            </h1>
            <button onClick={ScrollDown}>자세히 보기</button>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Top.map(Channel => (
                <div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg ">
                  <div className="flex items-center mb-4">
                    <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
                    <h3 className="text-lg font-medium truncate flex-1">{Channel.Channel_nickname}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center"><BiLogoYoutube className="h-5 w-5 text-red-500 mr-1" /> <span className="ml-2">{formatNumberUS(Number(Channel.subscriberCount))}</span></div>
              <div className="flex items-center"><AiFillVideoCamera className="h-5 w-5 text-gray-700 mr-1" /> <span className="ml-2">{formatNumberUS(Number(Channel.videoCount))}</span></div>
              <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500 mr-1" /> <span className="ml-2">{formatNumberUS(Number(Channel.viewCount))}</span></div>
            </div>
                  <Link to={`${process.env.REACT_APP_FRONT_API}/${Channel.Channel_Id}`} className="block mt-4">
                    <Button variant="outline" className="w-full">View Channel</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        </main>
    )
}