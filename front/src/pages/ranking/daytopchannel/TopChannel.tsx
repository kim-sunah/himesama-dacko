import { Link } from "react-router-dom";
import SubscriberTop from "../CommonTop/SubscriberTop";
import ViewTop from "../CommonTop/ViewTop";

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

import PreviewIcon from '@mui/icons-material/Preview';


export default function TopChannel() {

  return (
    <div>
     
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-center mt-4" >
        <div className="overflow-hidden "><SubscriberTop /></div>
        <div className="overflow-hidden"><ViewTop /></div>
     
      
      
      </div>
      <div style={{display:"flex"}}>
        <div ><SubscriberIncreaseTop /></div>
        <div ><SubscriberIncreaseLow></SubscriberIncreaseLow></div>
        <div ><ViewIncreaseTop /></div>
        </div>
    </div>

  )

}