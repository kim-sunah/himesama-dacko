import { useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import Getmethod from "../../http/Get_method";
import { BsArrowDown } from "react-icons/bs";
import { color } from "@chakra-ui/react";

interface Channel {
  id: number;
  Channel_Id: string;
  Channel_Url_Id: string;
  Channel_img: string;
  Channel_nickname: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  previous_subscriberCount: string
  previous_viewCount: string
}

export default function CategoryRankingsList(){
    const { Categoryid } = useParams();
    console.log(Categoryid)
    const [subscriberRanking, setsubscriberRanking] = useState<Channel[] | undefined>();
    const [subviewRanking, setsubviewRanking] = useState<Channel[] | undefined>();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/category/${Categoryid}`);
          setsubscriberRanking(response.subscriberCount)
          setsubviewRanking(response.viewCount)
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [Categoryid])
    return(
      <div className="flex gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg p-2 w-1/2 p-4">
          <table>
            <thead>
              <tr>
                <th className="w-1/12  text-center">Ranking</th>
                <th className="w-1/12  text-center">채널 이름</th>
                <th className="w-1/12  text-center">구독자 수</th>
                <th className="w-1/12  text-center">전일 대비</th>
              </tr>
            </thead>
            {subscriberRanking && subscriberRanking.map((Info, index) => (
            <tbody className="table-spacing" key={Info.Channel_Id}>
              <tr >
                <td className="font-medium"  style={{textAlign:"center", fontWeight:"bold"}} >{index + 1} </td>
                <td>
                  <Link   to ={`/${Info.Channel_Url_Id}`}  className="flex items-center space-x-2" style={{color: "black"}}>
                    <img src={Info.Channel_img} alt="YouTube Movies" className="h-10 w-10" />
                    <span style={{fontWeight:"bold" ,whiteSpace:"nowrap"}}>{Info.Channel_nickname}</span>
                  </Link>
                </td>
                <td style={{ textAlign: "center" ,fontWeight:"bold"}}>
                  {(parseInt(Info.subscriberCount) / 10000).toLocaleString('en')}만명
                </td>
                <td style={{ textAlign: "center", fontWeight:"bold" }}>
                {(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100) > 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"green"}}>{(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100).toFixed(2)}% 증가 </span>
                }
                 {(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100) < 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"red"}}>{(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100).toFixed(2)}% 감소</span>}
                   {(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100) === 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"black"}}>{(((  parseInt(Info.subscriberCount) - parseInt(Info.previous_subscriberCount) ) / parseInt(Info.previous_subscriberCount)) * 100).toFixed(2)}%</span>}
                </td>
              </tr>
            </tbody>
          ))}
          </table>
        </div>
        <div className="border shadow-sm rounded-lg p-2 w-1/2 p-4">
          <table>
            <thead>
              <tr>
                <th className="w-1/12  text-center">Ranking</th>
                <th className="w-1/12  text-center">채널 이름</th>
                <th className="w-1/12  text-center">조회 수</th>
                <th className="w-1/12  text-center">전일 대비</th>
              </tr>
            </thead>
            {subviewRanking && subviewRanking.map((Info, index) => (
          <tbody className="table-spacing"  key={Info.Channel_Id}>
            <tr className="space-x-10">
              <td className="font-medium" style={{ textAlign: "center" , fontWeight:"bold"}}>{index + 1}</td>
              <td>
                <Link   to ={`/${Info.Channel_Url_Id}`} className="flex items-center space-x-2"  style={{color: "black"}}> 
                  <img src={Info.Channel_img} alt="YouTube Movies" className="h-10 w-10" />
                  <span style={{fontWeight:"bold", whiteSpace:"nowrap"}}>{Info.Channel_nickname}</span>
                </Link>
              </td>
              <td style={{ textAlign: "center" ,fontWeight:"bold"}}>
              {parseInt(Info.viewCount).toLocaleString('en')}회
              </td>
              <td style={{ textAlign: "center" ,fontWeight:"bold"}}>
                {(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100) > 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"green"}}>{(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100).toFixed(2)}% 증가 </span>
                }
                 {(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100) < 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"red"}}>{(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100).toFixed(2)}% 감소</span>}
                   {(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100) === 0 && 
                <span className="px-2 py-1 rounded-md" style={{color:"black"}}>{(((  parseInt(Info.viewCount) - parseInt(Info.previous_viewCount) ) / parseInt(Info.previous_viewCount)) * 100).toFixed(2)}%</span>}
              </td>
            </tr>
          </tbody>
        ))}
          </table>
        </div>
      </div>
    )
}

