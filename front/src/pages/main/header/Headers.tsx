import {FormEvent, useRef,  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { channelActions } from "../../../store/channel-slice";
import Card from '@mui/material/Card';
import {  CardActionArea,  } from '@mui/material';
import "../../../styles/header.css"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AiOutlineFileSearch } from "react-icons/ai";
import Getmethod from "../../../http/Get_method";
import { BiLogoYoutube } from "react-icons/bi";
import LiveTvIcon from '@mui/icons-material/LiveTv';


interface Count{
    lastChannel : string
    lastVideo : string
}

export default function Headers() {

    const [Count, Setcount] = useState<Count>();
    useEffect(()=>{
        const fetchData = async () => {
          
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/Channel_Video/Count`)
            console.log(response)
            Setcount(response)
        
        }
        fetchData()

    },[]);
    const dispatch = useDispatch()
    const ChannelId = useRef<HTMLInputElement>(null);

    const extractUsernameFromYouTubeUrl = (url: string): string | null => {
        const match = url.match(/\/@([^/]+)/);
        return match ? `@${match[1]}` : null;
    }
    
    const getYouTubeChannelId = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        if(ChannelId.current?.value){
            if (ChannelId.current?.value && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(ChannelId.current?.value)) {
                if (ChannelId.current!.value.includes('http')) {
                    if (ChannelId.current!.value.includes('@')) {
                        const username = extractUsernameFromYouTubeUrl(ChannelId.current!.value);
                        const respose = await fetch(`${process.env.REACT_APP_BACKEND_API}/channellist/channelurl`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ Channel_Url_Id: username })
                        });
    
                        if (!respose.ok) {
                            throw new Error("Failed to fetch data");
                        }
    
                        const data = await respose.json();
                        (event.target as HTMLFormElement).reset();
    
                        console.log(data);
                        window.location.href = `/${username}`
                        dispatch(channelActions.addTochannelInfo({ channelInfo: data })); // data를 전달해야 
                    }
                    else {
                        const channel = ChannelId.current!.value.match(/(?<=channel\/)[\w-]+/);
                        if (channel) {
                            const respose = await fetch(`${process.env.REACT_APP_BACKEND_API}/channellist/channelId`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ Channel_Url_Id: channel[0] })
                            });
                            if (!respose.ok) {
                                throw new Error("Failed to fetch data");
                            }
                            const data = await respose.json();
                            (event.target as HTMLFormElement).reset();
                            window.location.href = `/${channel[0]}`
                            dispatch(channelActions.addTochannelInfo({ channelInfo: data })); // data를 전달해야 
                        }
                    }
                }
                else {
                    if (ChannelId.current!.value) {
    
                        window.location.href = `/seachlist/${ChannelId.current!.value}`;
                        (event.target as HTMLFormElement).reset();
                    }
                }
            }
            else {
                alert("특수문자가 포함되어있습니다.");
            }

        }
       
    }

    return (
        <div className="bg-gray-100 py-10 px-6 md:px-10">
        <div className="header max-w-6xl mx-auto md:grid md:grid-cols-1 md:gap-6 mb-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:justify-center">
            <CardActionArea>
                <Link className="text-black" to="/Ranking/1">
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                        <EmojiEventsIcon className="text-yellow-300 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fontSize="large" />
                        <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">랭킹</h3>
                     
                    </Card>
                </Link>
            </CardActionArea>
            <CardActionArea>
                <Link className="text-black" to="/Condition_Search/">
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                        <AiOutlineFileSearch className="text-purple-600 h-9 w-9" />
                        <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">DB 검색</h3>
                       
                    </Card>
                </Link>
            </CardActionArea>
            <CardActionArea>
                <Link className="text-black" to="/YoutubeCondition/">
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                        <BiLogoYoutube className="text-red-600 h-9 w-9" />
                        <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">Youtube API 기반 검색</h3>
                       
                    </Card>
                </Link>
            </CardActionArea>
            <CardActionArea>
                <Link className="text-black" to="/Live">
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                        <LiveTvIcon className="text-black" fontSize="large" />
                        <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">실시간 라이브 인기 영상</h3>
                       
                    </Card>
                </Link>
            </CardActionArea>
        </div>
        <div className="container mx-auto flex flex-col items-center justify-between py-6 px-6">
            <form onSubmit={getYouTubeChannelId} className="flex items-center space-x-4">
                <div className="search">
                    <input ref={ChannelId} type="text" placeholder="Search..." />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </div>
            </form>
        </div>
    </div>
    )

}



