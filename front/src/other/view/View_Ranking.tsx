import React, { useEffect, useState } from 'react';
import Getmethod from '../../http/Get_method';
import "./view.css"
import { Link, useParams } from 'react-router-dom';
import BasicPagination from '../../component/pagenation/BasicPagination';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
function ViewRanking() {
  const [Ranking, setRanking] = useState<Channel[] | undefined>();
  const { pagenumber } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/viewSubscriber-channels/${pagenumber}`);
        setRanking(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pagenumber])



  return (
    <div className="max-w-6xl mx-auto mt-6 border rounded-lg p-4 w-2/2">
      <table className="w-full border-collapse ">
        <thead >
          <tr>

            <th className="w-1/12 text-center">채널 이름</th>
            <th className="w-1/12  text-center">전체 조회수</th>
            <th className="w-1/12  text-center">전일 대비</th>
          </tr>
        </thead>
        {Ranking && Ranking.map((row, index) => (
          <tbody className="table-spacing" key={row.Channel_Id}>
            <tr >

              <td style={{ fontWeight: "bold", fontSize: "1rem", whiteSpace: "nowrap", display: "flex", justifyContent: "center" }}>
                <Link to={`/${row.Channel_Url_Id}`} className="flex items-center space-x-2">
                  <img src={row.channel_img} alt="YouTube Movies" className="h-10 w-10" />
                  <span style={{ color: "black" }}>{row.Channel_nickname}</span>
                </Link>
              </td>
              <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", whiteSpace: "nowrap" }}>
                {parseInt(row.viewCount).toLocaleString('en')}회
              </td>
              <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", whiteSpace: "nowrap" }}>
                {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) > 0 &&
                  <span className="px-2 py-1 rounded-md" style={{ color: "green" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}% 증가 </span>
                }
                {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) < 0 &&
                  <span className="px-2 py-1 rounded-md" style={{ color: "red" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}% 감소</span>}
                {(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100) === 0 &&
                  <span className="px-2 py-1 rounded-md" style={{ color: "black" }}>{(((parseInt(row.viewCount) - parseInt(row.previous_viewCount)) / parseInt(row.previous_viewCount)) * 100).toFixed(2)}%</span>}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}><BasicPagination></BasicPagination></div>

    </div>

  );

}


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
        <TableCell component="th" scope="row" align="center">
          <Link to="" style={{ color: "black", whiteSpace: "nowrap", fontWeight: "bold", fontSize: "1rem", display: "flex", justifyContent: "center" }} >
            <img src={row.channel_img} alt="YouTube Movies" className="h-10 w-10" />

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
  const { pagenumber } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/viewSubscriber-channels/${pagenumber}`);
        setRanking(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pagenumber])

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : Ranking.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>채널 이름</TableCell>
                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>구독자 수</TableCell>

                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>조회수</TableCell>

                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>동영상 수</TableCell>
                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>전일 대비</TableCell>

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
