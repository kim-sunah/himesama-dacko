import { Link, useNavigate, useParams } from "react-router-dom"

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
    MDBInputGroup, MDBInput, MDBIcon, MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { BsFilterLeft } from "react-icons/bs";
import Getmethod from "../../http/Get_method";
import { channelActions } from "../../store/channel-slice";
import { useDispatch } from "react-redux";


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


}
export default function VideoList() {

    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[] | undefined>([]);
    const { search } = useParams();
    const [centredModal, setCentredModal] = useState(false);
    const toggleOpen = () => setCentredModal(!centredModal);
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

    const submithandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/seachlist/${searchRef.current?.value}`);
        (event.target as HTMLFormElement).reset();
    }
    return (
        <div>
            <div style={{ display: "flex" }}>
                <form onSubmit={submithandler} className="flex md:gap-8 md:p-6 justify-center " style={{ width: "50%", margin: "0px auto" }}>
                    <MDBInput label='Search' ref={searchRef} />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
                    </MDBBtn>
                    <BsFilterLeft size="40" onClick={toggleOpen} />
                </form>
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
                                        <Link to={`http://localhost:3000/${item.Channel_Url_Id}`} style={{ color: "black" }}>
                                            <div className="flex items-center space-x-2 justify-center" >
                                                <img src={item.Channel_Img} alt="YouTube Channel" className="h-10 w-10" style={{ borderRadius: "50%" }} />
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
            <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                <MDBModalDialog centered size="lg">
                    <MDBModalContent>
                        <MDBModalHeader >
                            <MDBModalTitle >검색필터</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <div style={{ display: "flex" }}>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle > 업로드 날짜</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "20%", marginRight: "10%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li >
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle>구분</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "20%", marginRight: "10%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li >
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle>길이</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "20%", marginRight: "10%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li >
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle>검색필터</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "20%", marginRight: "10%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li >
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "20%" }}>
                                        지난 1시간
                                    </li>
                                </ul>
                            </MDBModalBody>

                        </div>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={toggleOpen}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}