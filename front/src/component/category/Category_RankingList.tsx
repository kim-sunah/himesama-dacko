import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import Getmethod from "../../http/Get_method";

interface Channel {
    id: number;
    Channel_Id: string;
    Channel_Url_Id: string;
    Channel_img: string;
    Channel_nickname: string;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  }
export default function CategoryRankingsList(){
    const { Categoryid } = useParams();
    console.log(Categoryid)
    const [subscriberRanking, setsubscriberRanking] = useState<Channel[] | undefined>();
    const [subviewRanking, setsubviewRanking] = useState<Channel[] | undefined>();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Getmethod(`http://localhost:4000/ranking/${Categoryid}`);
          setsubscriberRanking(response.subscriberCount)
          setsubviewRanking(response.viewCount)
          console.log(response)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [Categoryid])
    return(
    
      <div style={{display:"flex"}}>
      <div className="max-w-6xl mx-auto mt-6">
        <table className="w-full border-collapse">
          <thead >
            <tr>
              <th className="">랭킹</th>
              <th className="">채널 이름</th>
              <th className="">구독자 수</th>
              <th className="">전일 대비</th>
            </tr>
          </thead>
          {subscriberRanking && subscriberRanking.map((Info, index) => (
            <tbody className="table-spacing" key={Info.Channel_Id}>
              <tr >
                <td className="font-medium">{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <img src={Info.Channel_img} alt="YouTube Movies" className="h-10 w-10" />
                    <span>{Info.Channel_nickname}</span>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  {(parseInt(Info.subscriberCount) / 10000).toLocaleString('en')}만명
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className="px-2 py-1 bg-gray-200 rounded-md">0.6%</span>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="max-w-6xl mx-auto mt-6">
      <table className="w-full border-collapse" >
        <thead >
          <tr>
            <th >랭킹</th>
            <th >채널 이름</th>
            <th >조회수</th>
            <th >전일 대비</th>
          </tr>
        </thead>
        {subviewRanking && subviewRanking.map((Info, index) => (
          <tbody className="table-spacing"  key={Info.Channel_Id}>
            <tr className="space-x-10">
              <td className="font-medium">{index + 1}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <img src={Info.Channel_img} alt="YouTube Movies" className="h-10 w-10" />
                  <span>{Info.Channel_nickname}</span>
                </div>
              </td>
              <td style={{ textAlign: "center" }}>
              {parseInt(Info.viewCount).toLocaleString('en')}회
              </td>
              <td style={{ textAlign: "center" }}>
                <span className="px-2 py-1 bg-gray-200 rounded-md">0.6%</span>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
    </div>
    )
}

// export async function loader({params}: {params: any}) {
//     const { someParameter } = params.Category_id;
//     console.log(someParameter)
   
   

// }