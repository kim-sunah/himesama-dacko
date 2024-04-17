import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { BsFilterLeft } from "react-icons/bs";
import Getmethod from "../../http/Get_method";
import { channelActions } from "../../store/channel-slice";
import { useDispatch } from "react-redux";

interface VideoInfo {
    nextPageToken: string;
    prevPageToken?: string;
    videoId: string;
    Channel_Img : string
    channelTitle: string;
    thumbnails: string;
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
    Channel_Url_Id : string;
    Channel_Id : string,
    videoviewcount : number
    videolikecount : number
    videocommentcount : number


}
export default function VideoList() {
    const dispatch = useDispatch()
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[] | undefined>([]);
    const { search } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`http://localhost:4000/channellist/channel/${search}`);
            if (response) {
                console.log(response)
                setShowSearchAlert(response);
            }
        }
        fetchData()
    }, [search])

    return (
        <div>
            <div style={{ display: "flex" }}>
                <MDBInputGroup className="flex md:gap-8 md:p-6 justify-center " style={{ width: "50%", margin: "0px auto" }}>
                    <MDBInput label='Search' />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
                    </MDBBtn>
                    <BsFilterLeft size="40" />
                </MDBInputGroup>
            </div>
            <div className="flex gap-4 p-4 md:gap-8 md:p-6 justify-center" >
                <div className="border shadow-sm rounded-lg p-4 w-2/2">
                    <table>
                        <thead>
                            <tr>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>동영상</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>채널 이름</th>
                                {/* <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>구독자 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>조회수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>평군 조회수</th> */}
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>좋아요 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>조회수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>댓글 수</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>이메일</th>
                                <th className="min-w-[150px]" style={{ textAlign: "center", fontWeight: "bold" }}>인스타그램</th>
                            </tr>
                        </thead>
                        {showSearchAlert && showSearchAlert.map((item, index) => (
                            <tbody className="table-spacing" key={index}>
                                <tr>
                                    <td className="font-medium" style={{ textAlign: "center", fontWeight: "bold" }} ><Link to={`https://www.youtube.com/watch?v=${item.videoId}`}><img src={item.thumbnails} ></img></Link></td>
                                  
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                        <Link to={`http://localhost:3000/${item.Channel_Url_Id}`}  style={{color:"black"}}>
                                        <div className="flex items-center space-x-2 justify-center" >
                                            <img src={item.Channel_Img} alt="YouTube Channel" className="h-10 w-10"  style={{borderRadius:"50%"}}/>
                                            <span style={{ fontWeight: "bold" }}>{item.channelTitle}</span>
                                        </div>
                                        </Link>
                                    </td>
                                     <td style={{ textAlign: "center", fontWeight: "bold" }}>

                                        <span className="px-2 py-1 rounded-md" >{(item.videolikecount).toLocaleString('en')} </span>
                                        
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>

                                        <span className="px-2 py-1 rounded-md" >{item.viewCount.toLocaleString("en")}</span>
                                    </td>
                                    <td style={{ textAlign: "center", fontWeight: "bold" }}>

                                        <span className="px-2 py-1 rounded-md">{item.videocommentcount.toLocaleString("en")} </span>
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