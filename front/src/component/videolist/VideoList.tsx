import { Link, useNavigate, useParams } from "react-router-dom"

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
import { upload } from "@testing-library/user-event/dist/upload";


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
export default function VideoList() {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const filterData = useChannelSelector(state => state.channel.items);
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[] | undefined>([]);
    const { search } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            if(filterData.length === 0 ){
                const response = await Getmethod(`http://localhost:4000/channellist/channel/${search}`);
                if (response) {
                    setShowSearchAlert(response);
                }
            }
            else if(filterData.length > 0 ){
                console.log(filterData[0].upload)
                const response = await  Postmethod(`http://localhost:4000/filter/${search}`,  filterData[0]);
                if (response) {
                    setShowSearchAlert(response);
                }
                
            }
         
        }
        fetchData()
    }, [search,filterData])

    const submithandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchRef.current?.value) {
            navigate(`/seachlist/${searchRef.current?.value}`);
        }

        (event.target as HTMLFormElement).reset();
    }

    const HOMEBUTTON = (event: React.MouseEvent) => {
        
        navigate("/")
       
    }
    return (
        <div>
            <div style={{textAlign:"center", marginTop:"2.5%"}}>
            {/* <h2 onClick={HOMEBUTTON}> Home </h2> */}
            <Link to ="/"> HOME</Link>

            </div>
            <div style={{ display: "flex", margin: "0px"}}>
               
                <form onSubmit={submithandler} className="flex md:gap-8 md:p-6 justify-center " style={{ width: "50%", margin: "0px auto" }}>
                    
                    <MDBInput label='Search' ref={searchRef} />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
                    </MDBBtn>
                    {/* <BsFilterLeft size="40" onClick={toggleOpen} /> */}
                </form>
            </div>
            <div className="flex gap-4 p-4 md:gap-8 md:p-6 justify-center" >

                <div className="border shadow-sm rounded-lg p-4 w-2/2">
                    <div style={{ float: "right", margin: "2%" }}>
                        <Modal />
                    </div>
                    <table style={{ borderCollapse: "separate", borderSpacing: "10px 20px" }}>
                        <thead>
                            <tr>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>동영상</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>영상 제목</th>

                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>채널 이름</th>
                                {/* <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>구독자 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>조회수</th>*/}

                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>좋아요 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>조회수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>댓글 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>이메일</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>인스타그램</th>
                            </tr>
                        </thead>
                        {showSearchAlert && showSearchAlert.map((item, index) => (
                            <tbody className="table-spacing" key={index} >
                                <tr >
                                    <td className="font-medium" style={{ textAlign: "center", fontWeight: "bold" }} ><Link to={`https://www.youtube.com/watch?v=${item.videoId}`}><img src={item.thumbnails} ></img></Link></td>
                                    <td style={{ textAlign: "center", fontWeight: "bold", margin: "100px", whiteSpace: "nowrap" }}>
                                        <span className="px-2 py-1 rounded-md">
                                            {item.videotitle.length > 15 ? `${item.videotitle.slice(0, 15)}...` : item.videotitle}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        <Link to={`http://localhost:3000/${item.Channel_Url_Id}`} style={{ color: "black" }}>
                                            <div className="flex items-center space-x-2 justify-center" >
                                                <img src={item.Channel_Img} alt="YouTube Channel" className="h-10 w-10" style={{ borderRadius: "50%" }} />
                                                <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>{item.channelTitle}</span>
                                            </div>
                                        </Link>
                                    </td>

                                    <td style={{ textAlign: "center", fontWeight: "bold", margin: "100px", whiteSpace: "none" }}>
                                        {item.videolikecount !== null && item.videolikecount !== undefined && <span className="px-2 py-1 rounded-md" >{(item.videolikecount).toLocaleString('en')} </span>}

                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {item.videoviewcount !== null && item.videoviewcount !== undefined && <span className="px-2 py-1 rounded-md" >{item.videoviewcount.toLocaleString("en")}</span>}

                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {item.videocommentcount !== null && item.videocommentcount !== undefined && <span className="px-2 py-1 rounded-md">{item.videocommentcount.toLocaleString("en")} </span>}

                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}