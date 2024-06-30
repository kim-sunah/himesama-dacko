import { useEffect, useState } from "react";
import { Button } from "../../../component/v0/button";
import Getmethod from "../../../http/Get_method";
import { channeInfo } from "../../../enum/ChannelInfo";
import { Link, useNavigate } from "react-router-dom";


import { formatNumberUS } from "../../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";


export default function ViewTop(){
  const navigate = useNavigate()
    const [Top, SetTop] = useState<channeInfo[]>([]);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/ViewTop`)

            SetTop(response)

        }
        fetchData()
    

    },[])

    const LocationHandler = (Id : string) => {
      
      navigate(`/${Id}`);

  }
    return (
        <main className="p-6 md:p-10">
        <div className="container mx-auto">
          <div className="grid gap-6">
        
            
          <div className="five" style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="mb-4">조회수 상위

            </h1>
            <button>자세히 보기</button>
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
            <Button variant="outline" className="w-full mt-4" onClick={() => {LocationHandler(Channel.Channel_Id)}}>View Channel</Button>

                </div>
              ))}
            </div>
          </div>
        </div>
        </main>
    )
}