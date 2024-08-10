import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import "../../styles/video.css"
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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Stack } from "@mui/material";
import ViewChart from "./ViewChart";
import CommentChart from "./CommentChart";
import LikeChart from "./LikeChart";
import IconInButton from "../../component/button/Icon_In_Button";





interface VideoInfo {
    nextPageToken: string;
    prevPageToken?: string;
    videoId: string;
    channel_img: string
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
    viewdata: Array<any>;
    commentdata: Array<any>;
    likedata: Array<number>;
}

function Row(props: { row: VideoInfo }) {
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
                    <div style={{ display: "inline-block" }}> {/* 이미지와 링크를 감싸는 div 추가 */}
                        <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ alignItems: "center", whiteSpace: "nowrap" }}><img src={row.thumbnails} alt="thumbnail" /></Link>
                    </div>
                    <div style={{ textAlign: "center", fontWeight: "bold" }}> {/* 텍스트를 감싸는 div 추가 */}
                        <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ color: "black", whiteSpace: "nowrap" }}>
                            <span className="px-2 py-1 rounded-md">
                                {row.videotitle.length > 15 ? `${row.videotitle.slice(0, 15)}...` : row.videotitle}
                            </span>
                        </Link>
                    </div>
                </TableCell>
                <TableCell align="center">
                    <Link to={`https://www.youtube.com/watch?v=${row.videoId}`} style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        <span className="px-2 py-1 ">
                            {row.publishedAt.split("T")[0]}
                        </span>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <Link to={`/${row.Channel_Url_Id}`} style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        <div className="flex items-center  justify-center">
                            <img src={row.channel_img} alt="YouTube Channel" className="h-10 w-10 rounded-full" />
                            <span style={{ fontWeight: "bold" }}>{row.channelTitle}</span>
                        </div>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    {row.videolikecount !== null && row.videolikecount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>{(row.videolikecount).toLocaleString('en')}</span>}

                </TableCell>
                <TableCell align="center">
                    {row.videoviewcount !== null && row.videoviewcount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>{row.videoviewcount.toLocaleString("en")}</span>}

                </TableCell>
                <TableCell align="center">
                    {row.videocommentcount !== null && row.videocommentcount !== undefined && <span className="px-2 py-1 rounded-md" style={{ color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}>{row.videocommentcount.toLocaleString("en")}</span>}

                </TableCell>
             
            </TableRow>

            <TableRow>

                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Stack direction="row" spacing={2} style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                            <Button variant="outlined" onClick={() => { setview(true); setcomment(false); setlike(false); }}>조회수</Button>
                            <Button variant="outlined" onClick={() => { setview(false); setcomment(true); setlike(false); }}>댓글</Button>
                            <Button variant="outlined" onClick={() => { setview(false); setcomment(false); setlike(true); }}>좋아요</Button>
                        </Stack>
                        <Box sx={{ margin: 1, height: '400px', width: "150vh", display: "flex" }} >
                            {view && <ViewChart data={row.viewdata}></ViewChart>}
                            {comment && <CommentChart data={row.commentdata}></CommentChart>}
                            {like && <LikeChart data={row.likedata}></LikeChart>}

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
                            setLoading(false)
                            setShowSearchAlert(response);
                        }
                    }
                    else if (filter === "short" || filter === "medium" || filter === "long") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/Duration/${search}`, { videoDuration: filter });
                        console.log(response)
                        if (response) {
                            setLoading(false)
                            setShowSearchAlert(response);
                        }
                    }
                    else if (filter === "date" || filter === "relevance" || filter === "title" || filter === "videoCount" || filter === "viewCount") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/order/${search}`, { order: filter });
                        console.log(response)
                        if (response) {
                            setLoading(false)
                            setShowSearchAlert(response);
                        }
                    }
                }
            }
            catch (err) {
                console.log("Error fetching data:", err);
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
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>영상 제목</TableCell>
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>게시 날짜</TableCell>
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>채널 이름</TableCell>
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>좋아요 수</TableCell>
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>조회수</TableCell>
                                <TableCell align="center" style={{ whiteSpace: "nowrap" }}>댓글수</TableCell>
                         
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showSearchAlert.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}


        </div>
    );
}

