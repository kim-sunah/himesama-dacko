import { Link, useParams } from "react-router-dom"
import { Button } from "../../component/v0/button"
import { Avatar, AvatarImage, AvatarFallback } from "../../component/v0/avatar"
import { BiLogoYoutube } from "react-icons/bi";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
export type channelItem = {
  id: number;
  Channel_Id: string;
  Channel_Url_Id: string;
  channel_img: string;
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
export default function Header(){

    const [ChannelInfo, setChannelInfo] = useState<channelItem | null>();
    const { ChannelId } = useParams();

    useEffect(()=>{
      const fetchData = async()=>{
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/${ChannelId}`)
        
        setChannelInfo(response);
      }
      fetchData()
    },[]);

    return   (<header className="bg-card py-4 shadow-sm" style={{border :"1px solid gray"}}>
    <div className="container mx-auto flex items-center justify-between px-4">
      <div  className="items-center gap-2 font-semibold text-center"  >
        <img src={ChannelInfo?.channel_img} width="150px" height="150px" alt="ChannelImg"/>
        <span >{ChannelInfo?.Channel_nickname}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <BiLogoYoutube className="w-6 h-6" />
          <span className="sr-only">Search</span>
        </Button>
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>)
}