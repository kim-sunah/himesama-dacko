import { Link, useParams } from "react-router-dom"

import { Avatar, AvatarImage, AvatarFallback } from "../../component/v0/avatar"
import { BiLogoYoutube } from "react-icons/bi";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { formatNumberUS } from "../../function/formatNumberUS";
import { ChannelSnippet } from "../../enum/Chennel_snippet";
export type channelItem = {
  id: number;
  Channel_Id: string;
  Channel_Url_Id: string;
  channel_img: string;
  Channel_nickname: string;
  subscriberCount: string;
  Channel_category: string
  subscriberCount_percentageincrease: string
  viewCount_percentageincrease: string
  videoCount: string;
  viewCount: string;
  previous_subscriberCount: string
  previous_viewCount: string
  previous_videoCount: string

}
export default function Header() {

  const [ChannelInfo, setChannelInfo] = useState<channelItem | null>();
  const { ChannelId } = useParams();
  const [ChannelDescription, setChannelDescripthon] = useState<String>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${ChannelId}&key=${process.env.REACT_APP_Youtube_API}`)
      setChannelDescripthon(response.items[0].snippet.description)
    
    }
    fetchData()
  }, [ChannelId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/${ChannelId}`)
      setChannelInfo(response);
  

    }
    fetchData()
  }, [ChannelId]);


  return (
    <div>
       <header className="bg-card py-2 shadow-sm" style={{ border: "1px solid gray" , width:"100% " }}>
    {ChannelDescription && <div className="container mx-auto flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={ChannelInfo?.channel_img} />

        </Avatar>
        <div>
          <h1 className="text-2xl font-bold whitespace-nowrap">{ChannelInfo?.Channel_nickname}</h1>
          <p className="text-sm text-muted-foreground font-bold whitespace-nowrap">subscribers : {formatNumberUS(Number(ChannelInfo?.subscriberCount))} </p>
          <p className="text-sm text-muted-foreground font-bold whitespace-nowrap">videos : {formatNumberUS(Number(ChannelInfo?.videoCount))} </p>
          <p className="text-sm text-muted-foreground font-bold whitespace-nowrap">total views : {formatNumberUS(Number(ChannelInfo?.viewCount))} </p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground ml-6">
        {ChannelDescription.split('. ').map((sentence, index, array) => (
          <div key={index}>
            <p>{sentence}{index < array.length - 1 ? '.' : ''}</p>
            {index < array.length - 1 && <br />}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 ml-4">
        <Link  to={`https://www.youtube.com/${ChannelInfo?.Channel_Url_Id}`} >
          <BiLogoYoutube size="40" color="red"/>
          <span className="sr-only">Search</span>
        </Link>
      
       
      </div>

    </div>}

  </header>
    </div>
 )
}