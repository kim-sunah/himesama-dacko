import { ChangeEvent, HtmlHTMLAttributes, useState, FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Body from "../body/Body";
import { useDispatch } from "react-redux";
import channelslice from "../../store/channel-slice";
import { channelActions } from "../../store/channel-slice";
import { Dropdown } from "flowbite-react";
import Getmethod from "../../http/Get_method";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



interface Channel {
    id: number;
    Channel_Id: string;
    Channel_Url_Id: string;
    Channel_img: string;
    Channel_nickname: string;
    subscriberCount: string;
    Channel_category: string
    videoCount: string;
    viewCount: string;
    previous_subscriberCount: string
    previous_viewCount: string
    previous_videoCount: string
}
export default function Headers() {
    const dispatch = useDispatch()
    const ChannelId = useRef<HTMLInputElement>(null);
    const [age, setAge] = useState('');

  

    const extractUsernameFromYouTubeUrl = (url: string): string | null => {
        const match = url.match(/\/@([^/]+)/);
        return match ? `@${match[1]}` : null;
    }
    const getYouTubeChannelId = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
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

    return (
        <div>
            <header className="bg-[#FF6B6B]">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <div className="flex items-center space-x-4" >
                        {/* <FlagIcon className="h-8 w-8" /> */}
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Youtube Data</InputLabel>
                                <Select
                                   
        
                                    label="Youtube Data Service"
                                >
                                    <Link className="text-black " to="/Subscriber_Rankings" ><MenuItem >구독자 순위 상위 100</MenuItem> </Link>
                                    
                                    <Link className="text-black" to="/View_Rankings"><MenuItem >조회수 순위 상위 100</MenuItem></Link>
                                   
                                </Select>
                            </FormControl>
                        </Box>

                        <nav className="flex space-x-4 " >
                            <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span style={{ color: "white" }}>YOTUBE INFO</span>}>

                                <Link className="text-black " to="/Subscriber_Rankings" >
                                    <Dropdown.Item >
                                        구독자 순위 상위 100
                                    </Dropdown.Item>
                                </Link>
                                <Link className="text-black" to="/View_Rankings">
                                    <Dropdown.Item>
                                        조회수 순위 상위 100
                                    </Dropdown.Item>
                                </Link>

                                {/* <Link className="text-black" to="/Category_Rankings">
                                    <Dropdown.Item>
                                        카테고리별 순위
                                    </Dropdown.Item>
                                </Link> */}
                            </Dropdown>
                            {/*<Link className="text-white" to="#">
                            리소스
                        </Link> */}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-white text-[#FF6B6B] p-2  rounded-lg">로그인</button>
                        <button className="bg-white text-[#FF6B6B] p-2  rounded-lg ">회원가입</button>
                    </div>
                </div>
                <div className="container mx-auto flex flex-col items-center justify-between py-6 px-6">
                    <h1 className="text-3xl font-bold text-white">스펙 성장 센터</h1>
                    <p className="mt-2 text-sm text-white">위 사이트는 선아님, 태영님을 위한</p>
                    <p className="text-sm text-white">빅데이터 마케팅 플랫폼입니다</p>
                    <div className="mt-6 flex flex-col w-full max-w-md items-center space-x-4 rounded-md bg-white p-4 justify-center">
                        <form onSubmit={getYouTubeChannelId} className="flex items-center space-x-4">
                            <BsSearch className="h-6 w-6 text-gray-400" />
                            <input ref={ChannelId} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-500" placeholder="Youtube data search..." type="text" />
                            <button className="bg-black text-white px-4 py-2 rounded-md flex-shrink-0">검색</button>
                        </form>
                        <p className="mt-5 text-gray-500">예시) https:www.youtube.com/@u_who</p>
                        <p className="mt-3 text-gray-500">예시) youtube </p>
                    </div>
                </div>
            </header>

        </div>
    )

}

