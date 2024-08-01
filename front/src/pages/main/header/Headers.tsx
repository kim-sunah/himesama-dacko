import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import { CardActionArea, } from '@mui/material';
import "../../../styles/header.css"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AiOutlineFileSearch } from "react-icons/ai";
import { FcAdvertising } from "react-icons/fc";

import { BiLogoYoutube } from "react-icons/bi";
import LiveTvIcon from '@mui/icons-material/LiveTv';


export default function Headers() {

    const ChannelId = useRef<HTMLInputElement>(null);

    const getYouTubeChannelId = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        if (ChannelId.current?.value) {
            if (ChannelId.current?.value && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(ChannelId.current?.value)) {
                if (ChannelId.current!.value) {
                    window.location.href = `/seachlist/${ChannelId.current!.value}`;
                    (event.target as HTMLFormElement).reset();
                }
            }
            else {
                alert("특수문자가 포함되어있습니다.");
            }
        }
    }
    return (
        <div className="bg-gray-100 py-10 px-6 md:px-10" >
            <div className="header max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-4 mb-5 lg:grid lg:grid-cols-4 lg:gap-6 lg:justify-center">
                <CardActionArea>
                    <Link className="text-black" to="/Ranking?today">
                        <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                            <EmojiEventsIcon className="text-yellow-300 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fontSize="large" />
                            <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">순위(수정중)</h3>

                        </Card>
                    </Link>
                </CardActionArea>
               
                <CardActionArea>
                    <Link className="text-black" to="/YoutubeCondition/">
                        <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                            <BiLogoYoutube className="text-red-600 h-9 w-9" />
                            <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">Youtube API 기반 검색(개발중)</h3>

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
                <CardActionArea>
                    <Link className="text-black" to="">
                        <Card className="col-span-1 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 transition-all sm:p-6 md:p-8 min-h-[125px]">
                            <FcAdvertising className="text-purple-600 h-9 w-9" />
                            <h3 className="font-semibold text-lg text-gray-800 sm:text-xl md:text-2xl whitespace-nowrap">공지사항 & 문의(개발중)</h3>

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



