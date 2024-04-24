import { FormEvent, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit';




export default function Modal() {
    const [centredModal, setCentredModal] = useState(false);
    const toggleOpen = () => {
       
        setCentredModal(!centredModal);
    }
    return (
        <div>
            <BsFilterLeft size="40" onClick={toggleOpen}/>
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
                                    <MDBModalTitle style={{whiteSpace:"nowrap", fontSize:"0.8rem"}}> 업로드 날짜</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "15%", marginRight: "10%" }}>
                                        지난 1시간
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        오늘
                                    </li >
                                    <li style={{ marginTop: "15%" }}>
                                        이번주
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        이번 달 
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        올해
                                    </li>
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle style={{whiteSpace:"nowrap", fontSize:"0.8rem"}}>구분</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "15%", marginRight: "10%" }}>
                                        동영상
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        채널 
                                    </li >
                                    <li style={{ marginTop: "15%" }}>
                                        재생목록
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        영화
                                    </li>
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle style={{whiteSpace:"nowrap", fontSize:"0.8rem"}}>길이</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "15%", marginRight: "10%" }}>
                                        4분 미만
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        4~20분
                                    </li >
                                    <li style={{ marginTop: "15%" }}>
                                        20분 초과
                                    </li>
                                   
                                </ul>
                            </MDBModalBody>
                            <MDBModalBody>
                                <MDBModalHeader >
                                    <MDBModalTitle style={{whiteSpace:"nowrap", fontSize:"0.8rem"}}>검색필터</MDBModalTitle>
                                </MDBModalHeader>
                                <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                    <li style={{ marginTop: "15%", marginRight: "10%" }}>
                                        관련성
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        업로드 날짜
                                    </li >
                                    <li style={{ marginTop: "15%" }}>
                                        조회수
                                    </li>
                                    <li style={{ marginTop: "15%" }}>
                                        평점
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