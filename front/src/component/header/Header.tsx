import { FormEvent, useState } from "react"
import { useRef } from "react";
// import { useChannelContext } from "../../store/context";
import Body from "../body/Body";
interface Info{
    subscriberCount  : string
    videoCount : string
    viewCount : string
}

export default function Header() {
    // const ChannelrCtx = useChannelContext()
    // const { startTimers } = useChannelContext()
  
    const ChannelId = useRef<HTMLInputElement>(null);

    const [ChannelInfo , setChannelInfo] = useState<Info>();
   

    const extractUsernameFromYouTubeUrl = (url: string): string | null => {
        const match = url.match(/\/@([^/]+)/);
        return match ? `@${match[1]}` : null;
    }

    const getYouTubeChannelId = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
        event?.preventDefault();
        const username = extractUsernameFromYouTubeUrl(ChannelId.current!.value);
         fetch("http://localhost:4000/channellist",{method : "POST" , headers:{"Content-Type" : "application/json"} , body : JSON.stringify({Channel_Url_Id :  username})}).then(res=>res.json()).then(resData => setChannelInfo(resData)).catch(err=>console.log(err))
    }
   
    return (
        <div className="relative" >
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[610px]" >
                <img src="https://piunikaweb.com/wp-content/uploads/2021/11/YouTube-logo-featured-1.jpg" alt="Google" className="h-12 mx-auto" />
                <form onSubmit={getYouTubeChannelId} className="mt-5 flex justify-between items-center bg-white rounded-full px-5 py-4 shadow-md border border-black-300">
                    <input ref={ChannelId} placeholder="YouTubue 채널 링크를 입력해주세요  ex) https:www.youtube.com/@u_who" className="flex-1 bg-transparent outline-none placeholder-bold placeholder-gray-500" type="text" />
                </form>
                 {ChannelInfo && <Body subscriberCount={ChannelInfo.subscriberCount} videoCount={ChannelInfo.videoCount} viewCount={ChannelInfo.viewCount} ></Body>} 

            </div>
        </div>
    )
}