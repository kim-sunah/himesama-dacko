import { useEffect, useState } from "react";
import { Button } from "../../../component/v0/button";
import Getmethod from "../../../http/Get_method";
import { channeInfo } from "../../../enum/ChannelInfo";
import { Link, useNavigate } from "react-router-dom";


import { formatNumberUS } from "../../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";




export default function SubscriberTop() {
  const navigate = useNavigate()
  const [Top, SetTop] = useState<channeInfo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/SubscriberTop`)

      SetTop(response)

    }
    fetchData()


  }, [])

  const LocationHandler = (Id : string) => {
      
    navigate(`/${Id}`);

}
const detailhandler = () =>{
  navigate(`/Ranking/subscribers`);
}
  return (
    <main className="p-6 md:p-10">
  <div className="flex flex-col md:flex-row justify-between items-center gap-2">
    <div className="grid gap-6 w-full">
      <div className="five flex justify-between items-center">
        <h1 className="mb-4">구독자  상위</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={detailhandler}>자세히 보기</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Top.map(Channel => (
          <div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg flex flex-col h-full">
            <div className="flex items-center mb-4">
              <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
              <h3 className="text-lg font-medium truncate flex-1 max-w-[150px]" title={Channel.Channel_nickname}>
                {Channel.Channel_nickname}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm flex-grow">
              <div className="flex items-center"><BiLogoYoutube className="h-5 w-5 text-red-500" /> <span className="ml-2">{formatNumberUS(Number(Channel.subscriberCount))}</span></div>
              <div className="flex items-center"><AiFillVideoCamera className="h-5 w-5 text-gray-700" /> <span className="ml-2">{formatNumberUS(Number(Channel.videoCount))}</span></div>
              <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500" /> <span className="ml-2">{formatNumberUS(Number(Channel.viewCount))}</span></div>
             
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

