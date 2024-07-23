import { Link } from "react-router-dom";
import SubscriberTop from "../SubscriberTop";
import ViewTop from "../ViewTop";

import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import SubscriberIncreaseTop from "./SubscriberIncreaseTop";
import ViewIncreaseTop from "./ViewIncreaseTop";
import { FcLineChart } from "react-icons/fc";



import { FcManager } from "react-icons/fc";

import { FcAreaChart } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcNeutralTrading } from "react-icons/fc";
import SubscriberIncreaseLow from "./SubceriberIncreaselow";
import ViewIncreaseLow from "./ViewIncreatelow";
import PreviewIcon from '@mui/icons-material/Preview';


export default function TopChannel() {

  return (
    <div>
      <div className="flex gap-4 whitespace-nowrap justify-center" >
        <BiLogoYoutube className="h-6 w-6 text-red-500" />
        : 구독자 수,
        <AiFillVideoCamera className="h-6 w-6 text-gray-700" />
        : 동영상 수 ,
        <PreviewIcon className="h-6 w-6 text-black-500" />
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
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-center mt-4" >
        <div className="overflow-hidden "><SubscriberTop /></div>
        <div className="overflow-hidden"><ViewTop /></div>
        <div className="overflow-hidden"><SubscriberIncreaseTop /></div>
        <div className="overflow-hidden"><SubscriberIncreaseLow></SubscriberIncreaseLow></div>
        <div className="overflow-hidden"><ViewIncreaseTop /></div>
        <div className="overflow-hidden"><ViewIncreaseLow></ViewIncreaseLow></div>
      </div>
    </div>

  )

}