import React, { useEffect, useState } from 'react';
import Getmethod from '../../http/Get_method';
import "./subscriber.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BasicPagination from '../pagenation/BasicPagination';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import Modal from '../videolist/Modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import Postmethod from '../../http/Post_method';


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
  const { pagenumber } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/Subscriber-channels/${pagenumber}`);
        setRanking(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pagenumber])

  return (
    <React.Fragment>


    </React.Fragment>

    //     <div className="max-w-6xl mx-auto mt-6 border shadow-sm rounded-lg p-4 w-2/2">
    //   <table className="w-full border-collapse">
    //     <thead >
    //       <tr>

    //         <th className="w-1/12  text-center ">채널 이름</th>
    //         <th className="w-1/12  text-center">구독자 수</th>
    //         <th className="w-1/12  text-center">전일 대비</th>
    //       </tr>
    //     </thead>
    //     {Ranking && Ranking.map((row, index) => (
    //       <tbody   className="table-spacing" key={row.Channel_Id}>
    //         <tr >

    //           <td style={{fontWeight:"bold", fontSize:"1rem",whiteSpace:"nowrap", display:"flex", justifyContent:"center"}}>
    //             <Link  to ={`/${row.Channel_Url_Id}`} className="flex items-center space-x-2">
    //               <img src={row.channel_img} alt="YouTube Movies" className="h-10 w-10" />
    //               <span style={{color:"black"}}>{row.Channel_nickname}</span>
    //             </Link>
    //           </td>
    //           <td style={{textAlign:"center" ,fontWeight:"bold"}}>
    //             {(parseInt(row.subscriberCount) / 10000).toLocaleString('en')}만명
    //           </td>
    //           <td style={{textAlign:"center" , fontWeight:"bold"}}>
    //           {(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100) > 0 && 
    //               <span className="px-2 py-1 rounded-md" style={{color:"green"}}>{(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}% 증가 </span>
    //               }
    //                {(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100) < 0 && 
    //               <span className="px-2 py-1 rounded-md" style={{color:"red"}}>{(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}% 감소</span>}
    //                  {(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100) === 0 && 
    //               <span className="px-2 py-1 rounded-md" style={{color:"black"}}>{(((  parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount) ) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}%</span>}
    //           </td>
    //         </tr>
    //       </tbody> 
    //     ))}
    //   </table>
    //   <div style={{display:"flex", justifyContent:"center"}}>
    //   <BasicPagination></BasicPagination>

    //   </div>


    // </div>
  );
};


function Row(props: { row: Channel }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [view, setview] = React.useState(true);
  const [comment, setcomment] = React.useState(false);
  const [like, setlike] = React.useState(false);

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>


        <TableCell component="th" scope="row" align="center" className="sticky-cell">
          <Link to={`/${row.Channel_Url_Id}`}
            style={{
              color: "black",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={row.channel_img} alt="YouTube Movies" className="fixed-image h-10 w-10" />
            <span className="px-2 py-1 rounded-md">
              {row.Channel_nickname.length > 15 ? `${row.Channel_nickname.slice(0, 15)}...` : row.Channel_nickname}
            </span>
          </Link>
        </TableCell>
        <TableCell align="center" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>
          {(parseInt(row.subscriberCount) / 10000).toLocaleString('en')}만명
        </TableCell>
        <TableCell align="center">
          {row.viewCount !== null && row.viewCount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}> {(+row.viewCount).toLocaleString('en')}회</span>}

        </TableCell>
        <TableCell align="center">
          {row.videoCount !== null && row.videoCount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>{row.videoCount}개</span>}

        </TableCell>
        <TableCell align="center"> {(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100) > 0 &&
          <span className="px-2 py-1 rounded-md" style={{ color: "green" }}>{(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}% 증가 </span>
        }
          {(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100) < 0 &&
            <span className="px-2 py-1 rounded-md" style={{ color: "red" }}>{(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}% 감소</span>}
          {(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100) === 0 &&
            <span className="px-2 py-1 rounded-md" style={{ color: "black" }}>{(((parseInt(row.subscriberCount) - parseInt(row.previous_subscriberCount)) / parseInt(row.previous_subscriberCount)) * 100).toFixed(2)}%</span>}
        </TableCell>
        <TableCell align="center">
          {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) > 0 &&
            <span className="px-2 py-1 rounded-md" style={{ color: "green" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}% 증가 </span>
          }
          {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) < 0 &&
            <span className="px-2 py-1 rounded-md" style={{ color: "red" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}% 감소</span>}
          {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) === 0 &&
            <span className="px-2 py-1 rounded-md" style={{ color: "black" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}%</span>}

        </TableCell>

      </TableRow>



      {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
      <Collapse in={open} timeout="auto" unmountOnExit >
      <Stack direction="row" spacing={2} style={{display:"flex" ,justifyContent:"center", marginTop:"3%"}}>
        <Button variant="outlined" onClick={() => { setview(true); setcomment(false); setlike(false); }}>조회수</Button>
        <Button variant="outlined" onClick={() => { setview(false); setcomment(true); setlike(false); }}>댓글</Button>
        <Button variant="outlined" onClick={() => { setview(false); setcomment(false); setlike(true); }}>좋아요</Button>
          </Stack>
        <Box sx={{ margin: 1 ,height: '400px', width:"150vh" ,display:"flex"}} >
        {view && row && <ViewChart data = {row.viewdata}></ViewChart>}
        {comment && row &&<CommentChart data={row.commentdata}></CommentChart>}
        {like && row && <LikeChart data={row.likedata}></LikeChart>}
          
        </Box>
      </Collapse>
      </TableCell> */}


    </React.Fragment>
  )
}


export default function List() {
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
        console.log(select)
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
          setRanking(response)
        }
    }
      catch (error) {
        console.error("Error fetching data:", error);
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


