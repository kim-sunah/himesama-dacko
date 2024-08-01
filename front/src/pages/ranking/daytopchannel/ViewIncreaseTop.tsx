import { useEffect, useState } from "react";
import { Button } from "../../../component/v0/button";
import Getmethod from "../../../http/Get_method";
import { channeInfo } from "../../../enum/ChannelInfo";
import { Link, useNavigate } from "react-router-dom";
import { FcLineChart } from "react-icons/fc";


import { formatNumberUS } from "../../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import PreviewIcon from '@mui/icons-material/Preview';
import { formatNumber } from "../../../function/formatNumber";

export default function ViewIncreaseTop() {
  const navigate = useNavigate();
  const [Top, SetTop] = useState<channeInfo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/ViewTopIncrease`)

      SetTop(response)

    }
    fetchData()


  }, [])



  const LocationHandler = (Id: string) => {

    navigate(`/${Id}`);

  }

  const detailhandler = () => {
    navigate(`/Ranking/increase-views/0`);
  }



  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="grid gap-6 w-full">
          <div className="five sm:block  md:flex justify-between items-center">
            <span className=" text-xs whitespace-nowrap sm: text-center">금일 구독자 하락 상위</span>
            <Button variant="outline"  onClick={detailhandler}>자세히 보기</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Top.map(Channel => (
              <div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg flex flex-col h-full">
                <div className="flex items-center mb-4 ml-2">
                  <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
                  <h3 className="text-lg font-medium truncate flex-1 max-w-[150px]" title={Channel.Channel_nickname}>
                    {Channel.Channel_nickname}
                  </h3>
                </div>
                <div >
                  <div className="flex items-center justify-center mt-2"> <span className="mt-2 text-xs whitespace-nowrap"  > 구독자 :{formatNumber(Number(Channel.subscriberCount))}명</span></div>
                  <div className="flex items-center justify-center mt-2"> <span className="mt-2  text-xs whitespace-nowrap"> 조회수 : {formatNumber(Number(Channel.viewCount))}회</span></div>
                  <div className="flex items-center justify-center mt-2">
                    <span className="mt-2 text-xs whitespace-nowrap"> 전일 대비 : <span style={{
                      color: Number(Channel.viewCount_percentageincrease) > 0
                        ? "blue"
                        : Number(Channel.viewCount_percentageincrease) < 0
                          ? "red"
                          : "grey"
                    }}>
                      {Number(Channel.viewCount_percentageincrease).toFixed(2)}%
                    </span></span>
                  </div>
                  {/* <div className="flex items-center">
                      <FcAreaChart className="h-5 w-5 text-gray-700" />
                      <span className="ml-2">{formatNumberUS(Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount))}</span>
                    </div>
                    <div className="flex items-center">
                      {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) > 0 && <FcBullish className="h-6 w-6" />}
                      {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) < 0 && <FcBearish className="h-6 w-6" />}
                      {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) === 0 && <FcNeutralTrading className="h-6 w-6" />}
                    </div> */}
                </div>
                <Button variant="outline" className="w-full mt-4 " onClick={() => { LocationHandler(Channel.Channel_Id) }} style={{ fontSize: "0.75rem" }}>채널 상세</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}