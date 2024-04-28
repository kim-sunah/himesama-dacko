import { useSelector } from "react-redux"
import { useChannelSelector } from "../../store/hooks"
import { useEffect, useState } from "react"
import Getmethod from "../../http/Get_method"
import { useParams } from "react-router-dom"
import Headers from "../header/Headers"
interface Info {
  subscriberCount: string
  videoCount: string
  viewCount: string
}


export type channelItem = {
  
      id: number;
      Channel_Id: string;
      Channel_Url_Id: string;
      Channel_img: string;
      Channel_nickname: string;
      subscriberCount: string;
      Channel_category: string
      subscriberCount_percentageincrease : string
      viewCount_percentageincrease: string
      videoCount: string;
      viewCount: string;
      previous_subscriberCount: string
      previous_viewCount: string
      previous_videoCount : string
  
}
export default function Body() {
  // const ChannelInfo = useChannelSelector((state) => state.channel.items)
  const [ChannelInfo, setChannelInfo] = useState<channelItem | null>(); // 단일 객체로 정의
  const { Id } = useParams();

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/${Id}`)
      
      setChannelInfo(response);
      
    }
    fetchData()
  },[])

  console.log(ChannelInfo)

  return (
   <div>
    <Headers></Headers>
    {ChannelInfo &&  <section className="mt-10 bg-white rounded-lg max-w-6xl shadow px-6 py-4 " style={{ textAlign: "center", margin: "0px auto", marginTop: "2rem" }}>
      <img src={ChannelInfo.Channel_img} style={{ display: 'block', margin: 'auto', width: "10rem", borderRadius: "50%" }}></img>
      <p style={{ marginTop: "3%", fontWeight: "bold" }}>{ChannelInfo.Channel_nickname}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold">구독자 수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo.subscriberCount).toLocaleString('en')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">총 조회수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo.viewCount).toLocaleString('en')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">총 동영상 수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo.videoCount).toLocaleString('en')}</p>
        </div>
      </div>

    </section>}
   </div>
   

  )
}