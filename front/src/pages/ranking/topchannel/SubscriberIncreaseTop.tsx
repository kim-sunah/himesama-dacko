import { useEffect, useState } from "react";
import { Button } from "../../../component/v0/button";
import Getmethod from "../../../http/Get_method";
import { channeInfo } from "../../../enum/ChannelInfo";
import { Link } from "react-router-dom";
import { FcLineChart } from "react-icons/fc";


import { formatNumberUS } from "../../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import { FcAreaChart } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcNeutralTrading } from "react-icons/fc";
import "../test.css"


export default function SubscriberIncreaseTop() {
    const [Top, SetTop] = useState<channeInfo[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/SubscriberTopIncrease`)

            SetTop(response)

        }
        fetchData()


    }, [])
    return (
        <main className=" p-6 md:p-10  " >

            <div className="flex flex-col md:flex-row justify-between items-center gap-2" >

                <div className=" grid gap-6">


                    <div className="five" >
                        <h1  className="mb-4">구독자 증가 상위</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Top.map(Channel => (
                            <div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg   ">
                                <div className="flex items-center mb-4">
                                    <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
                                    <h3 className="text-lg font-medium truncate flex-1">{Channel.Channel_nickname}</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    <div className="flex items-center"><BiLogoYoutube className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.subscriberCount))}</div>
                                    <div className="flex items-center"><AiFillVideoCamera className="h-5 w-5 text-gray-700 mr-1" /> {formatNumberUS(Number(Channel.videoCount))}</div>
                                    <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.viewCount))}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm mt-10">
                                    <div className="flex items-center">
                                        <FcLineChart className="h-6 w-6 text-red-500" />
                                        <span>{Number(Channel.subscriberCount_percentageincrease).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FcAreaChart className="h-5 w-5 text-gray-700 mr-1" /> 
                                    {formatNumberUS(Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount))}</div>
                                    <div className="flex items-center">
                                        {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) > 0 && <FcBullish className="h-6 w-6" />}
                                        {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) < 0 && <FcBearish className="h-6 w-6" />}
                                        {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) === 0 && <FcNeutralTrading className="h-6 w-6" />}
                                    </div>
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


{/* <main className=" p-6 md:p-10  " >

<div className="flex flex-col md:flex-row justify-between items-center gap-2" >

    <div className=" grid gap-6">
        <div className="flex gap-4 whitespace-nowrap">
            <BiLogoYoutube className="h-6 w-6 text-red-500" />
            : 구독자 수,
            <AiFillVideoCamera className="h-6 w-6 text-gray-700" />
            : 동영상 수 ,
            <FcManager className="h-6 w-6 text-red-500" />
            : 조회수 ,
            <FcLineChart className="h-6 w-6 text-red-500" />
            : 전주 대비 증가량(%),

            <FcAreaChart className="h-6 w-6 text-red-500" />
            : 전주 대비 증가수,

            <FcBearish className="h-6 w-6" />
            <FcBullish className="h-6 w-6 " />
            <FcNeutralTrading className="h-6 w-6 " />
            : 추세
        </div>

        <div style={{ backgroundColor: "#FFFACD" }}>
            <h2 className="text-2xl font-bold whitespace-nowrap"> Subscriber Top Channels</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{Top.map(Channel => (
<div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg   transition-shadow">
<div className="flex items-center mb-4">
  <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
  <h3 className="text-lg font-medium truncate flex-1">{Channel.Channel_nickname}</h3>
</div>
<div className="grid grid-cols-3 gap-2 text-sm">
  <div className="flex items-center"><BiLogoYoutube className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.subscriberCount))}</div>
  <div className="flex items-center"><AiFillVideoCamera className="h-5 w-5 text-gray-700 mr-1" /> {formatNumberUS(Number(Channel.videoCount))}</div>
  <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.viewCount))}</div>
</div>
<div className="grid grid-cols-3 gap-2 text-sm mt-10">
  <div className="flex items-center">
  <FcLineChart className="h-6 w-6 text-red-500" />
                                    <span>{Number(Channel.subscriberCount_percentageincrease).toFixed(2)}%</span>
  </div>
  <div className="flex items-center"><FcAreaChart className="h-5 w-5 text-gray-700 mr-1" /> {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount)}</div>
  <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500 mr-1" /> 
                                    {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) > 0 && <FcBullish className="h-6 w-6" />}
                                    {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) < 0 && <FcBearish className="h-6 w-6" />}
                                    {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) === 0 && <FcNeutralTrading className="h-6 w-6" />}
  </div>
</div>

<Link to={`${process.env.REACT_APP_FRONT_API}/${Channel.Channel_Id}`} className="block mt-4">
  <Button variant="outline" className="w-full">View Channel</Button>
</Link>
</div>
))}
</div>

    </div>
</div>
</main> */}