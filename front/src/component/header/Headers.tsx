import {FormEvent, useRef, SVGProps, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { channelActions } from "../../store/channel-slice";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { JSX } from "react/jsx-runtime";
import "./header.css"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AiOutlineFileSearch } from "react-icons/ai";
import Getmethod from "../../http/Get_method";


interface Channel {
    id: number;
    Channel_Id: string;
    Channel_Url_Id: string;
    channel_img: string;
    Channel_nickname: string;
    subscriberCount: string;
    Channel_category: string
    videoCount: string;
    viewCount: string;
    previous_subscriberCount: string
    previous_viewCount: string
    previous_videoCount: string
}
interface Count{
    lastChannel : string
    lastVideo : string
}


export default function Headers() {

    const [Count, Setcount] = useState<Count>();
    useEffect(()=>{
        const fetchData = async () => {
          
            const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/Channel_Video/Count`)
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

    return (
     
        <div className="bg-gray-100 py-10 px-6 md:px-10 ">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 " style={{ display: "flex", marginBottom: "2.5%" }}>
               
                <CardActionArea>
                    <Link className="text-black " to="/Ranking/1" >
                        <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all">
                            <EmojiEventsIcon className="text-purple-600 h-10 w-10" fontSize="large" color="secondary" />
                            <h3 className="font-semibold text-lg text-gray-800">랭킹</h3>
                            <p className="text-center text-sm text-gray-600">구독자, 조회수, <br></br>동영상 수</p>
                        </Card>
                        </Link>
                    </CardActionArea>
                <CardActionArea>

                <Link className="text-black " to="/Condition_Search/1" >
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-green-50 transition-all">
                        <AiOutlineFileSearch className="text-purple-600 h-9 w-9" fontSize="medium" color="secondary"/>
                        <h3 className="font-semibold text-lg text-gray-800">DB 검색</h3>
                        <p className="text-center text-sm text-gray-600">{Count?.lastChannel}명 인플루언서 데이터와 <br/>{Count?.lastVideo}개의 영상 데이터 조건검색</p>
                    </Card>
                </Link>
                </CardActionArea>


                <CardActionArea>
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-yellow-50 transition-all">
                        <ReplyIcon className="text-purple-600 h-9 w-9" />
                        <h3 className="font-semibold text-lg text-gray-800">Youtube API 기반 검색</h3>
                        <p className="text-center text-sm text-gray-600">Youtube 맞춤 조건 검색</p>
                    </Card>
                </CardActionArea>
                <CardActionArea>
                    <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-pink-50 transition-all">
                        <PuzzleIcon className="text-purple-600 h-10 w-10" />
                        <h3 className="font-semibold text-lg text-gray-800">Challenges</h3>
                        <p className="text-center text-sm text-gray-600">Solve real-world problems together sdsdsdsds</p>
                    </Card>
                </CardActionArea>
            </div>

            <div className="container mx-auto flex flex-col items-center justify-between py-6 px-6">
                <form onSubmit={getYouTubeChannelId} className="flex items-center space-x-4">
                    <div className="search">
                        <input ref={ChannelId} type="text" placeholder="Search..." />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </div>



                    {/* <input ref={ChannelId} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-500" placeholder="Youtube data search..." type="text" /> */}

                </form>
            </div>
        </div>
    )

}


function BriefcaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    )
}


function GroupIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="5" x="7" y="7" rx="1" />
            <rect width="7" height="5" x="10" y="12" rx="1" />
        </svg>
    )
}


function PuzzleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
        </svg>
    )
}


function ReplyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="9 17 4 12 9 7" />
            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
    )
}

