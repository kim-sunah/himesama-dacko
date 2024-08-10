import { Link, useNavigate } from "react-router-dom";
import { ChannelInfo } from "../../enum/ChannelInfo";
import { formatNumber } from "../../function/formatNumber";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs";

export default function TOP({ channel ,title}: { channel: ChannelInfo[], title: string}){
    const [Tab, setTab] = useState("today");
    const navigate = useNavigate();
    return  (<div className="w-full overflow-hidden mb-3 ml-4  border" >
    <div className="relative "> {/* 고정 너비 설정 */}
        <img
            src={"https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/%EC%A0%9C%EB%AA%A9+%EC%97%86%EB%8A%94+%EB%94%94%EC%9E%90%EC%9D%B8.png"}
            className="w-full h-10 object-cover "
            alt="Leaderboard background"
        />

           <div className="absolute inset-0 flex items-center justify-between px-4 mt-1">
                    <h1 className="text-sm font-bold text-white">
                        {title}
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
    <div className="bg-background border-l border-r  " > {/* 고정 너비 설정 */}
        <table className="w-full table-fixed border-collapse " >
            <thead className="bg-muted border-b">
                <tr>
                    <th className="w-1/4 px-4  text-center text-base text-sm font-medium text-muted-foreground whitespace-nowrap">이름</th>
                    <th className="w-1/4 px-4  text-center text-base text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">구독수</span></th>
                    <th className="w-1/4 px-4  text-center text-base text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">조회수</span></th>
                    <th className="w-1/4 px-4  text-center text-base text-sm font-medium text-muted-foreground whitespace-nowrap">
                                <span className="flex justify-center"> {Tab === "today" ? "전일 대비(%)" : Tab === "week" ? "주간 대비(%)" : "월간 대비(%)"}</span>

                            </th>
                </tr>
            </thead>
            <tbody >
                {channel && channel.map((Channel, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                        <td className="font-medium" style={{ marginLeft: "10%" }}>
                            <Link to={`${Channel.Channel_Id}`} className="flex items-center gap-2">
                                <img src={Channel.channel_img} width={35} alt={Channel.Channel_nickname} className="flex-shrink-0 border-r rounded-full" />
                                <span className="text-sm truncate text-black text-base">{Channel.Channel_nickname}</span>
                            </Link>
                        </td>
                        <td className=" px-4 text-center text-muted-foreground text-base">{formatNumber(Number(Channel.subscriberCount))} </td>
                        <td className=" px-4  text-center text-muted-foreground text-base">{formatNumber(Number(Channel.viewCount))}</td>
                      
                        <td
                                    className=" px-4  text-center text-muted-foreground text-base"
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

</div>)

}