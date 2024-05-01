import { FormEvent, MouseEventHandler, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit';
import { useDispatch } from "react-redux";
import { channelActions } from "../../store/channel-slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";




export default function Modal() {
    const [centredModal, setCentredModal] = useState(false);
    const { search } = useParams();
    const toggleOpen = () => {setCentredModal(!centredModal);}
    const filterSubmit = (selectedOption: string) => {
        window.location.href = `/seachlist/${search}/${selectedOption}`
    }
    

    return (
        <>
            <BsFilterLeft size="40" onClick={toggleOpen} />
            {centredModal && <div>
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
                                        <MDBModalTitle style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}> 업로드 날짜</MDBModalTitle>
                                    </MDBModalHeader>
                                    <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                      <li style={{ cursor: "pointer", marginTop: "15%", } } onClick={() => filterSubmit("1Hour_ago")}>
                                            지난 1시간
                                        </li>
                                       
                                        <li style={{ cursor: "pointer", marginTop: "15%",}} onClick={() => filterSubmit("Today")}>
                                            오늘
                                        </li>
                                       
                                        <li style={{ cursor: "pointer", marginTop: "15%", }} onClick={() => filterSubmit("Month")}>
                                            이번 달
                                        </li>
                                        
                                    </ul>
                                </MDBModalBody>
                                <MDBModalBody>
                                    <MDBModalHeader >
                                        <MDBModalTitle style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>길이</MDBModalTitle>
                                    </MDBModalHeader>
                                    <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                        <li style={{ cursor: "pointer", marginTop: "15%", }} onClick={() => filterSubmit("short")}>
                                            4분 미만
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%",  }} onClick={() => filterSubmit("medium")}>
                                            4~20분
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%", }} onClick={() => filterSubmit("long")}>
                                            20분 초과
                                        </li>
                                    </ul>
                                </MDBModalBody>
                                <MDBModalBody>
                                    <MDBModalHeader >
                                        <MDBModalTitle style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>검색필터</MDBModalTitle>
                                    </MDBModalHeader>
                                    <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                        <li style={{ cursor: "pointer", marginTop: "15%",  }} onClick={() => filterSubmit("date")}>
                                            최근순
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%",  }} onClick={() => filterSubmit("relevance")}>
                                            관련성
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%", }} onClick={() => filterSubmit("title")}>
                                            제목 순
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%", }} onClick={() => filterSubmit("videoCount")}>
                                            동영상 수에 따른 채널
                                        </li>
                                        <li style={{ cursor: "pointer", marginTop: "15%",  }} onClick={() => filterSubmit("viewCount")}>
                                            조회수 순
                                        </li>
                                    </ul>
                                </MDBModalBody>
                            </div>
                        
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>

            </div>}
        </>

    )
}