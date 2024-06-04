

import React, { useEffect, useState } from 'react';

import "../../styles/ranking.css"
import { Link,  } from 'react-router-dom';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
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

export default function Row(props: { row: Channel }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [view, setview] = React.useState(true);
  const [comment, setcomment] = React.useState(false)
  const [like, setlike] = React.useState(false)

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
