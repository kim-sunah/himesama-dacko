
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs";
import Postmethod from "../../http/Post_method";
import { channeInfo } from "../../enum/ChannelInfo";
import { formatNumber } from "../../function/formatNumber";


interface LeaderboardProps {
    title: string;
    img : string;
}



export default function Leaderboard({ title ,img }: LeaderboardProps) {
    const [Channel, setChannel] = useState<channeInfo[]>([]);
    const [Tab, setTab] = useState("today");

    useEffect(() => {
        const fetchData = async () => {
            const response = await Postmethod("http://localhost:4000/ranking/RankingSort", { sort: "subscribers", filter: title.split("|")[0], page: 1 })
            setChannel(response)
        }
        fetchData()
    }, [])


    if (Channel.length === 0) {
        return null
    }




    return (
        <div className="w-full overflow-hidden">
            <div className="relative w-[683px]"> {/* 고정 너비 설정 */}
                <img
                    src={img}
                    className="w-full h-16 object-cover "
                    alt="Leaderboard background"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold text-black">
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
            <div className="bg-background border w-[683px]"> {/* 고정 너비 설정 */}
                <table className="w-full table-fixed">
                    <thead className="bg-muted border-b">
                        <tr>
                            <th className="w-1/4 px-4 py-2 text-left text-sm font-medium text-muted-foreground">이름</th>
                            <th className="w-1/4 px-4 py-2 text-center text-sm font-medium text-muted-foreground">구독수</th>
                            <th className="w-1/4 px-4 py-2 text-center text-sm font-medium text-muted-foreground">조회수</th>
                            <th className="w-1/4 px-4 py-2 text-center text-sm font-medium text-muted-foreground">
                                {Tab === "today" ? "전일 대비(%)" : Tab === "week" ? "주간 대비(%)" : "월간 대비(%)"}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Channel && Channel.slice(0, 4).map((Channel, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="px-4 py-2 font-medium">
                                    <div className="flex items-center gap-2">
                                        <img src={Channel.channel_img} width={50} alt={Channel.Channel_nickname} className="flex-shrink-0" />
                                        <span className="text-sm truncate">{Channel.Channel_nickname}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center font-medium">{formatNumber(Number(Channel.subscriberCount))}</td>
                                <td className="px-4 py-2 text-center font-medium">{formatNumber(Number(Channel.viewCount))}</td>
                                <td
                                    className="px-4 py-2 text-center text-muted-foreground"
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
        </div>
    )
}



