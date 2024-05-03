import { Link, useNavigate, useParams } from "react-router-dom"

import { useEffect, useRef, useState } from 'react';

import Getmethod from "../../http/Get_method";

import { useDispatch } from "react-redux";
import Modal from "./Modal";
import "./video.css"
import { useChannelSelector } from "../../store/hooks";
import Postmethod from "../../http/Post_method";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as React from 'react';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';





interface VideoInfo {
    nextPageToken: string;
    prevPageToken?: string;
    videoId: string;
    Channel_Img: string
    channelTitle: string;
    thumbnails: string;
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
    Channel_Url_Id: string;
    Channel_Id: string,
    videoviewcount: number
    videolikecount: number
    videocommentcount: number
    videotitle: string
    publishedAt: string
}


function Row(props: { row: VideoInfo }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
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
                    <div style={{ display: "inline-block" }}> {/* 이미지와 링크를 감싸는 div 추가 */}
                        <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ alignItems: "center" }}><img src={row.thumbnails} alt="thumbnail" /></Link>
                    </div>
                    <div style={{ textAlign: "center" ,fontWeight:"bold" }}> {/* 텍스트를 감싸는 div 추가 */}
                        <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ color: "black" }}>
                            <span className="px-2 py-1 rounded-md">
                                {row.videotitle.length > 15 ? `${row.videotitle.slice(0, 15)}...` : row.videotitle}
                            </span>
                        </Link>
                    </div>
                </TableCell>
                <TableCell align="center">
                    <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ color: "black",fontWeight:"bold"  }}>
                        <span className="px-2 py-1 ">
                            {row.publishedAt.split("T")[0]}
                        </span>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <Link to={`/${row.Channel_Url_Id}`} style={{ color: "black",fontWeight:"bold"  }}>
                        <div className="flex items-center  justify-center">
                            <img src={row.Channel_Img} alt="YouTube Channel" className="h-10 w-10 rounded-full" />
                            <span style={{ fontWeight: "bold" }}>{row.channelTitle}</span>
                        </div>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    {row.videolikecount !== null && row.videolikecount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black",fontWeight:"bold" }}>{(row.videolikecount).toLocaleString('en')}</span>}

                </TableCell>
                <TableCell align="center">
                    {row.videoviewcount !== null && row.videoviewcount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black",fontWeight:"bold" }}>{row.videoviewcount.toLocaleString("en")}</span>}

                </TableCell>
                <TableCell align="center">
                    {row.videocommentcount !== null && row.videocommentcount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black",fontWeight:"bold" }}>{row.videocommentcount.toLocaleString("en")}</span>}

                </TableCell>
                <TableCell align="center">123</TableCell>
                <TableCell align="center">123</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            {/* <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}




export default function VideSearchList() {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const filterData = useChannelSelector(state => state.channel.items);
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[]>([]);
    const { search } = useParams();
    const { filter } = useParams();
    const [loading, setLoading] = useState<boolean>(false)
    const [searchData, setsearchData] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setsearchData(false)
            try {
                if (filter) {
                    if (filter === "1Hour_ago" || filter === "Today" || filter === "Month") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/UploadDate/${search}`, { upload: filter });
                        console.log(response)
                        if (response) {
                            setShowSearchAlert(response);
                        }
                    }
                    else if (filter === "short" || filter === "medium" || filter === "long") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/Duration/${search}`, { videoDuration: filter });
                        console.log(response)
                        if (response) {
                            setShowSearchAlert(response);
                        }
                    }
                    else if (filter === "date" || filter === "relevance" || filter === "title" || filter === "videoCount" || filter === "viewCount") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/order/${search}`, { order: filter });
                        console.log(response)
                        if (response) {
                            setShowSearchAlert(response);
                        }
                    }
                }
            }
            catch (err) {
                console.log("Error fetching data:", err)
            }
            finally {
                setLoading(false)
                setsearchData(true)
            }
        }
        fetchData()
    }, [search, filterData])
    return (
        <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <div style={{ float: "right", margin: "2%" }}>
                <Modal />
            </div>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            ) : showSearchAlert.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">영상 제목</TableCell>
                                <TableCell align="center">게시 날짜</TableCell>
                                <TableCell align="center">채널 이름</TableCell>
                                <TableCell align="center">좋아요 수</TableCell>
                                <TableCell align="center">조회수</TableCell>
                                <TableCell align="center">댓글</TableCell>
                                <TableCell align="center">이메일</TableCell>
                                <TableCell align="center">인스타그램</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showSearchAlert.map((row,index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )  }
                {!loading &&  searchData && showSearchAlert.length === 0 &&<h1 style={{ textAlign: "center" }}> NOT FOUND DATA</h1>}
        
        </div>
    );
}

