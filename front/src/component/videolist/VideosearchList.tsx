import { Link, Outlet, useNavigate, useParams } from "react-router-dom"

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MDBInput, MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';
import { BsFilterLeft } from "react-icons/bs";
import Getmethod from "../../http/Get_method";
import { channelActions } from "../../store/channel-slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import "./video.css"
import { useChannelSelector } from "../../store/hooks";
import Postmethod from "../../http/Post_method";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




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
}

export default function VideSearchList(){
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
                    if (filter ==="1Hour_ago" || filter ==="Today" || filter ==="Month") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/UploadDate/${search}`, {upload : filter});
                        console.log(response)
                        if (response) {
                            setShowSearchAlert(response);
                        }
                    }
                    else if (filter ==="short" || filter ==="medium" || filter ==="long") {
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/Duration/${search}`,{videoDuration : filter});
                        console.log(response)
                        if (response) {
                            setShowSearchAlert(response);
                        }
                    }
                    else if(filter ==="date" || filter ==="relevance" || filter ==="title" || filter ==="videoCount" || filter ==="viewCount" ){
                        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/filter/order/${search}`, {order : filter});
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

    return(
        <div className="flex gap-4 p-4 md:gap-8 md:p-6 justify-center">
        <div className="border shadow-sm rounded-lg p-4 w-full md:w-2/3">
            <div style={{ float: "right", margin: "2%" }}>
                        <Modal />
                    </div>
            {loading ? (<Box sx={{ display: 'flex', justifyContent:"center" }}>
                <CircularProgress />
                </Box>) : showSearchAlert.length > 0 ? (
                <div>
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "10px 20px" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>동영상</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>영상 제목</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>채널 이름</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>좋아요 수</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>조회수</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>댓글 수</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>이메일</th>
                                <th style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>인스타그램</th>
                            </tr>
                        </thead>
                        {showSearchAlert.map((item, index) => (
                            <tbody className="table-spacing" key={index}>
                                <tr>
                                    <td className="font-medium" style={{ textAlign: "center", fontWeight: "bold" }}><Link to={`https://www.youtube.com/watch?v=${item.videoId}`}><img src={item.thumbnails} alt="thumbnail" /></Link></td>
                                    <td style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>
                                        <span className="px-2 py-1 rounded-md">
                                            {item.videotitle.length > 15 ? `${item.videotitle.slice(0, 15)}...` : item.videotitle}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold", whiteSpace: "nowrap" }}>
                                        <Link to={`/${item.Channel_Url_Id}`} style={{ color: "black" }}>
                                            <div className="flex items-center space-x-2 justify-center">
                                                <img src={item.Channel_Img} alt="YouTube Channel" className="h-10 w-10 rounded-full" />
                                                <span style={{ fontWeight: "bold" }}>{item.channelTitle}</span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {item.videolikecount !== null && item.videolikecount !== undefined && <span className="px-2 py-1 rounded-md">{(item.videolikecount).toLocaleString('en')}</span>}
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {item.videoviewcount !== null && item.videoviewcount !== undefined && <span className="px-2 py-1 rounded-md">{item.videoviewcount.toLocaleString("en")}</span>}
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {item.videocommentcount !== null && item.videocommentcount !== undefined && <span className="px-2 py-1 rounded-md">{item.videocommentcount.toLocaleString("en")}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>) : null}
            {!loading && showSearchAlert.length === 0 && searchData && (
                <h1 style={{ textAlign: "center" }}> NOT FOUND DATA</h1>
            )}

        </div>

    </div>
    )
}