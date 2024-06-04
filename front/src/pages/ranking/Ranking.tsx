import  { useEffect, useState } from 'react';
import "../../styles/ranking.css"
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import BasicPagination from '../../component/pagenation/BasicPagination';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import Postmethod from '../../http/Post_method';
import Row from '../../component/table/InfluencerRow';
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

export default function Ranking() {
  const [loading, setLoading] = useState<boolean>(false)
  const [Ranking, setRanking] = useState<Channel[]>([]);
  const { pagenumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const select = queryParams.get('select');


  useEffect(() => {
    const fetchData = async () => {
      try {
        if(select === null){
          const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/Subscriber-channels/${pagenumber}`,{select : "High_Subscriber"});
          setRanking(response)
          console.log(response)
         
        }
        else if(select === "Low_View" || select ==="High_View"){
          const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/view-channels/${pagenumber}`,{select : select})
          setRanking(response)
      } 
        else if(select === "Low_Videocount" || select==="High_Videocount"){
          
          const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/Video-channels/${pagenumber}`,{select : select})
          setRanking(response)


        }
        else if(select ==="High_Subscriber" || select ==="Low_Subscriber"){
          const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/Subscriber-channels/${pagenumber}`,{select : select});
          setRanking(response);
        }
    }
      catch (error) {
        console.error("Error fetching data:", error)
      }
    };
    fetchData();
  }, [pagenumber,select])


  
  const videohandleClick = () => {
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
    if (select === 'Low_Videocount') {
      queryParams.set('select', 'High_Videocount');
    } else if (select === 'High_Videocount') {
      queryParams.delete('select');
    } else {
      queryParams.set('select', 'Low_Videocount');
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
 
  const ViewhandleClick = () => {
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
    if (select === 'Low_View') {
      queryParams.set('select', 'High_View');
    } else if (select === 'High_View') {
      queryParams.delete('select');
    } else {
      queryParams.set('select', 'Low_View');
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const SubscriberhandleClick = () => {
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
    if (select === 'Low_Subscriber') {
      queryParams.set('select', 'High_Subscriber');
    } else if (select === 'High_Subscriber') {
      queryParams.delete('select');
    } else {
      queryParams.set('select', 'Low_Subscriber');
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%',marginTop:"5%" }}>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : Ranking.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table " >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">
                  <div className="header-cell">
                    <span>채널 이름</span>
                   
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="header-cell">
                    <span>구독자 수</span>
                    <button onClick={SubscriberhandleClick}>
                      <CgArrowsExchangeAltV size={20} className="header-icon" />
                    </button>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="header-cell">
                    <span>조회수</span>
                    <button onClick={ ViewhandleClick}>
                      <CgArrowsExchangeAltV size={20} className="header-icon" />
                    </button>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="header-cell">
                    <span>영상 수</span>
                    <button onClick={videohandleClick}>
                      <CgArrowsExchangeAltV size={20} className="header-icon" />
                    </button>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="header-cell">
                    <span>구독자 상승률 </span>
                    <CgArrowsExchangeAltV size={20} className="header-icon" />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="header-cell">
                    <span>조회수 상승률 </span>
                    <CgArrowsExchangeAltV size={20} className="header-icon" />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Ranking.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>

        </TableContainer>

      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
        <BasicPagination></BasicPagination>

      </div>


    </div>
  );
}


