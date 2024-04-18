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