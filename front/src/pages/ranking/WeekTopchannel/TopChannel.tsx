import { Link } from "react-router-dom";
import SubscriberTop from "../CommonTop/SubscriberTop";
import ViewTop from "../CommonTop/ViewTop";

import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";

import { FcLineChart } from "react-icons/fc";



import { FcManager } from "react-icons/fc";

import { FcAreaChart } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcNeutralTrading } from "react-icons/fc";
import WeekSubscriberIncreaseLow from "./SubceriberIncreaselow";
import WeekSubscriberIncreaseTop from "./SubscriberIncreaseTop";
import WeekViewIncreaseTop from "./ViewIncreaseTop";

import PreviewIcon from '@mui/icons-material/Preview';


export default function WeekTopChannel() {

  return (
    <div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-center mt-4" >
        <div className="overflow-hidden "><SubscriberTop /></div>
        <div className="overflow-hidden"><ViewTop /></div>




      </div>
      <div  className="grid grid-cols-3 gap-4">
        <div ><WeekSubscriberIncreaseTop /></div>
        <div ><WeekSubscriberIncreaseLow /></div>
        <div><WeekViewIncreaseTop /></div>
      </div>
    </div>


  )

}