import React, { useEffect, useState } from 'react';
import Getmethod from '../../http/Get_method';
import "./subscriber.css"
import { Link, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BasicPagination from '../pagenation/BasicPagination';

interface Channel {
  id: number;
  Channel_Id: string;
  Channel_Url_Id: string;
  channel_img: string;
  Channel_nickname: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  previous_subscriberCount: string
  previous_viewCount: string
}
const SubscriberRankings: React.FC = () => {
  const [Ranking, setRanking] = useState<Channel[] | undefined>();
  const {pagenumber} = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/top-channels/${pagenumber}`);
        setRanking(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pagenumber])

  return (
   
      <div className="max-w-6xl mx-auto mt-6 border shadow-sm rounded-lg p-4 w-2/2">
    <table className="w-full border-collapse">
      <thead >
        <tr>
          
          <th className="w-1/12  text-center ">채널 이름</th>
          <th className="w-1/12  text-center">구독자 수</th>
          <th className="w-1/12  text-center">전일 대비</th>
        </tr>
      </thead>
      {Ranking && Ranking.map((Info, index) => (
        <tbody   className="table-spacing" key={Info.Channel_Id}>
          <tr >
           
            <td style={{fontWeight:"bold", fontSize:"1rem",whiteSpace:"nowrap", display:"flex", justifyContent:"center"}}>
              <Link  to ={`/${Info.Channel_Url_Id}`} className="flex items-center space-x-2">
                <img src={Info.channel_img} alt="YouTube Movies" className="h-10 w-10" />
                <span style={{color:"black"}}>{Info.Channel_nickname}</span>
              </Link>
            </td>
            <td style={{textAlign:"center" ,fontWeight:"bold"}}>
              {(parseInt(Info.subscriberCount) / 10000).toLocaleString('en')}만명
            </td>
            <td style={{textAlign:"center" , fontWeight:"bold"}}>
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
    <div style={{display:"flex", justifyContent:"center"}}>
    <BasicPagination></BasicPagination>

    </div>
    

  </div>


  
    
  );
};

export default SubscriberRankings;
