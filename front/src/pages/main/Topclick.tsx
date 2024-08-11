
import { useEffect, useState } from "react"
import Getmethod from "../../http/Get_method"
import { formatNumber } from "../../function/formatNumber";
import { Link, useNavigate } from "react-router-dom";
import { ChannelClick } from "../../enum/ChannelClick";
import { ChannelInfo } from "../../enum/ChannelInfo";

export default function Topclick({ channel }: { channel: ChannelInfo[] }) {
    return (
  
        // <div className="w-full overflow-hidden mb-3 ml-4  border" >
        //     <div className="relative "> {/* 고정 너비 설정 */}
        //         <img
        //             src={"https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/%EC%A0%9C%EB%AA%A9+%EC%97%86%EB%8A%94+%EB%94%94%EC%9E%90%EC%9D%B8.png"}
        //             className="w-full h-10 object-cover "
        //             alt="Leaderboard background"
        //         />
        //         <div className="absolute inset-0 flex items-center justify-between px-4 mt-2">
        //              <h1 className="text-sm font-bold text-white">
        //              일간 채널 방문 순위
        //              </h1>

        //          </div>

        //     </div>
        //     <div className="bg-background border-l border-r  " > {/* 고정 너비 설정 */}
        //         <table className="w-full table-fixed border-collapse " >
        //             <thead className="bg-muted border-b">
        //                 <tr>
        //                     <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap">이름</th>
        //                     <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">구독수</span></th>
        //                     <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">조회수</span></th>
        //                     <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">방문수</span></th>
        //                 </tr>
        //             </thead>
        //             <tbody >
        //                 {channel && channel.map((Channel, index) => (
        //                     <tr key={index} className="hover:bg-muted/50">
        //                         <td className="font-medium" style={{ marginLeft: "10%" }}>
        //                             <Link to={`${Channel.Channel_Id}`} className="flex items-center gap-2">
        //                                 <img src={Channel.channel_img} width={35} alt={Channel.Channel_nickname} className="flex-shrink-0 border-r rounded-full" />
        //                                 <span className="text-sm truncate text-black ">{Channel.Channel_nickname}</span>
        //                             </Link>
        //                         </td>
        //                         <td className=" px-4 text-center text-muted-foreground ">{formatNumber(Number(Channel.subscriberCount))} </td>
        //                         <td className=" px-4  text-center text-muted-foreground ">{formatNumber(Number(Channel.viewCount))}</td>
        //                         <td className="px-4  text-center text-muted-foreground ">{formatNumber(Number(Channel.today_click_count))}회</td>

        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>

        // </div>
        <div className="w-full overflow-hidden mb-3 ml-4  border" >
        <div className="relative "> {/* 고정 너비 설정 */}
            <img
                src={"https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/%EC%A0%9C%EB%AA%A9+%EC%97%86%EB%8A%94+%EB%94%94%EC%9E%90%EC%9D%B8.png"}
                className="w-full h-10 object-cover "
                alt="Leaderboard background"
            />
    
           
                    <div className="absolute inset-0 flex items-center justify-between px-4 mt-2">
                      <h1 className="text-sm font-bold text-white">
                      일간 채널 방문 순위
                      </h1>

                  </div>
    
        </div>
        <div className="bg-background border-l border-r  " > {/* 고정 너비 설정 */}
            <table className="w-full table-fixed border-collapse " >
                <thead className="bg-muted border-b">
                    <tr>
                        <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap">이름</th>
                        <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">구독수</span></th>
                        <th className="w-1/4 px-4  text-center  text-sm font-medium text-muted-foreground whitespace-nowrap"><span className="flex justify-center">조회수</span></th>
                    </tr>
                </thead>
                <tbody >
                    {channel && channel.map((Channel, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                            <td className="font-medium" style={{ marginLeft: "10%" }}>
                                <Link to={`${Channel.Channel_Id}`} className="flex items-center gap-2">
                                    <img src={Channel.channel_img} width={35} alt={Channel.Channel_nickname} className="flex-shrink-0 border-r rounded-full" />
                                    <span className="text-sm truncate text-black ">{Channel.Channel_nickname}</span>
                                </Link>
                            </td>
                            <td className=" px-4 text-center text-muted-foreground ">{formatNumber(Number(Channel.subscriberCount))} </td>
                            <td className=" px-4  text-center text-muted-foreground ">{formatNumber(Number(Channel.viewCount))}</td>
                          
                          
                         
    
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
    </div>

    )
}