
import { useEffect, useState } from "react"
import { Button } from "../../component/v0/button"
import Getmethod from "../../http/Get_method"
import { channeInfo } from "../../enum/ChannelInfo";
import { formatNumber } from "../../function/formatNumber";

export default function Topclick() {
    const [channel, setchannel] = useState<channeInfo>();
    useEffect(() =>{
        const fetchDate = async () =>{
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/click/GetTopClickedChannel`)
            setchannel(response)


        }
        fetchDate()
       

    },[])
    return (
        <div > 
            <div className="flex items-center justify-center "> 오늘 가장 많이 방문한 채널</div>
            <div className="flex items-center justify-center ">
                
                <div className="rounded-lg border w-64 mt-2 mb-2">
                  
                    <img
                        src={channel?.channel_img}
                        height="100"
                        width="100"
                        className="rounded-full -mt-24 border-4 border-white mx-auto mt-2 mb-2"
                        alt="User avatar"
                        style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                    <div className="text-center my-4">
                        <h2 className="text-lg font-semibold">{channel?.Channel_nickname}</h2>
                        
                    </div>
                    <div className="flex justify-around my-4">
                        <div className="text-center">
                            <h3 className="text-gray-500 text-lg">{formatNumber(Number(channel?.subscriberCount))}</h3>
                            <p className="text-gray-500">구독수</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-gray-500 text-lg">{formatNumber(Number(channel?.viewCount))}</h3>
                            <p className="text-gray-500">조회수</p>
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <Button className="w-full border bg-white-600 text-black rounded-lg">채널 상세 </Button>
                    </div>
                </div>
            </div>

        </div>

    )
}