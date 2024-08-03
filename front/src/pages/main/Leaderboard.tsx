
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs";
import Postmethod from "../../http/Post_method";
import { channeInfo } from "../../enum/ChannelInfo";
import { formatNumber } from "../../function/formatNumber";
import { CgAdd } from "react-icons/cg";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";


interface LeaderboardProps {
    title: string;
    img: string;
}



export default function Leaderboard({ title, img }: LeaderboardProps) {
    const [Channel, setChannel] = useState<channeInfo[]>([]);
    const [Tab, setTab] = useState("today");
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, { sort: "subscribers", filter: title.split("|")[0], page: 1 })
            setChannel(response)
        }
        fetchData()
    }, [])


    if (Channel.length === 0) {
        return null
    }




    return (
        <div className="w-full overflow-hidden ml-3">
            <div className="relative w-[525px]"> {/* 고정 너비 설정 */}
                <img
                    src={img}
                    className="w-full h-10 object-cover "
                    alt="Leaderboard background"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <h1 className="text-sm font-bold text-white">
                        {title.split("|")[1]}
                    </h1>
                    <Tabs defaultValue="today">
                        <TabsList>
                            <TabsTrigger value="today" onClick={() => { setTab("today") }} className="text-white text-sm">일간</TabsTrigger>
                            <TabsTrigger value="week" onClick={() => { setTab("week") }} className="text-white text-sm">주간</TabsTrigger>
                            <TabsTrigger value="month" onClick={() => { setTab("month") }} className="text-white text-sm">월간</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
            <div className="bg-background border w-[525px]"> {/* 고정 너비 설정 */}
                <table className="w-full table-fixed">
                    <thead className="bg-muted border-b">
                        <tr>
                            <th className="w-1/4 px-4  text-center text-sm font-medium text-muted-foreground">이름</th>
                            <th className="w-1/4 px-4  text-center text-sm font-medium text-muted-foreground "><span className="flex justify-center">구독수<AiFillCaretDown /></span></th>
                            <th className="w-1/4 px-4  text-center text-sm font-medium text-muted-foreground"><span className="flex justify-center">조회수</span></th>
                            <th className="w-1/4 px-4  text-center text-sm font-medium text-muted-foreground">
                                <span className="flex justify-center"> {Tab === "today" ? "전일 대비(%)" : Tab === "week" ? "주간 대비(%)" : "월간 대비(%)"}</span>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Channel && Channel.slice(0, 4).map((Channel, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="font-medium">
                                    <Link  to={`${Channel.Channel_Id}`}className="flex items-center gap-2">
                                        <img src={Channel.channel_img} width={35} alt={Channel.Channel_nickname} className="flex-shrink-0" />
                                        <span className="text-sm truncate text-black">{Channel.Channel_nickname}</span>
                                    </Link>
                                </td>
                                <td className="px-4 text-center text-muted-foreground">{formatNumber(Number(Channel.subscriberCount))} </td>
                                <td className="px-4  text-center text-muted-foreground">{formatNumber(Number(Channel.viewCount))}</td>
                                <td
                                    className="px-4  text-center text-muted-foreground"
                                    style={{
                                        color: (() => {
                                            let value;
                                            if (Tab === "today") {
                                                value = Number(Channel.subscriberCount_percentageincrease);
                                            } else if (Tab === "week") {
                                                value = Number(Channel.week_subscriberCount_percentageincrease);
                                            } else {
                                                value = Number(Channel.month_subscriberCount_percentageincrease);
                                            }
                                            return value > 0 ? "blue" : value < 0 ? "red" : "grey";
                                        })()
                                    }}
                                >
                                    {(() => {
                                        if (Tab === "today") {
                                            return formatNumber(Number(Channel.subscriberCount_percentageincrease));
                                        } else if (Tab === "week") {
                                            return formatNumber(Number(Channel.week_subscriberCount_percentageincrease));
                                        } else {
                                            return formatNumber(Number(Channel.month_subscriberCount_percentageincrease));
                                        }
                                    })()}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="border w-[525px]  h-10 flex justify-center items-center">
                <div className="flex items-center" onClick={() => { navigate(`/Ranking/subscribers/${title.split("|")[0]}`) }}>
                    <span>더보기</span>
                    <CgAdd size={20} ></CgAdd>
                </div>
            </div>
        </div>
    )
}






