import React, { useEffect, useState } from 'react';
import Getmethod from '../../http/Get_method';
import "./view.css"
import { Link } from 'react-router-dom';

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
export default function ViewRanking() {
  const [Ranking, setRanking] = useState<Channel[] | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod("http://localhost:4000/ranking/viewtop-channels");
        setRanking(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [])

  

  return (
      <div className="max-w-6xl mx-auto mt-6 border shadow-sm rounded-lg p-4 w-2/2">
      <table className="w-full border-collapse ">
        <thead >
          <tr>
            
            <th className="w-1/12 text-center">채널 이름</th>
            <th className="w-1/12  text-center">전체 조회수</th>
            <th className="w-1/12  text-center">전일 대비</th>
          </tr>
        </thead>
        {Ranking && Ranking.map((Info, index) => (
          <tbody   className="table-spacing" key={Info.Channel_Id}>
            <tr >
              
              <td style={{fontWeight:"bold", fontSize:"1rem",whiteSpace:"nowrap", display:"flex", justifyContent:"center"}}>
                <Link  to ={`/${Info.Channel_Url_Id}`} className="flex items-center space-x-2">
                  <img src={Info.Channel_img} alt="YouTube Movies" className="h-10 w-10" />
                  <span style={{color:"black"}}>{Info.Channel_nickname}</span>
                </Link>
              </td>
              <td style={{textAlign:"center" ,fontWeight:"bold",fontSize:"1rem" ,whiteSpace:"nowrap"}}>
              {parseInt(Info.viewCount).toLocaleString('en')}회
              </td>
              <td style={{textAlign:"center" ,fontWeight:"bold" ,fontSize:"1rem" ,whiteSpace:"nowrap"}}>
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

  );

}