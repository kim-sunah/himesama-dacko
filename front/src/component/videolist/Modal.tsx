import { FormEvent, MouseEventHandler, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit';
import { useDispatch } from "react-redux";
import { channelActions } from "../../store/channel-slice";




export default function Modal() {
    const dispatch = useDispatch()
    const [centredModal, setCentredModal] = useState(false);
    const toggleOpen = () => {

        setCentredModal(!centredModal);
    }

    const [filterdIndex, setfilterIndex] = useState<number | null>(null);
    const [lengthdIndex, setlengthdIndex] = useState<number | null>(null);
    const [uploadIndex, setuploadIndex] = useState<number | null>(null);

    // 클릭 이벤트를 처리하는 함수
    const filteriClick = (index: number) => {
        // 클릭된 요소의 스타일을 변경합니다.
        console.log("filter")
        setfilterIndex(index);
        // dispatch(channelActions.addTochannelInfo({ upload: "ASD" }))
        if (index === 0) {
            // dispatch(channelActions.addTochannelInfo({ upload: "ASD" }))
        }
        else if (index === 1) {

        }
        else if (index === 2) {

        }


    }
    const lengthClick = (index: number) => {
        // 클릭된 요소의 스타일을 변경합니다.
        console.log("length")
        setlengthdIndex(index);
        if (index === 0) {

        }
        else if (index === 1) {

        }
        else if (index === 2) {

        }
    }

    const uploadClick = (index: number) => {
        // 클릭된 요소의 스타일을 변경합니다.
        console.log("upload")
        console.log(index)
        setuploadIndex(index);
        // if(index === 0){
        //     dispatch(channelActions.addTochannelInfo({ upload: "1Hour_ago" }))

        // }
        // else if(index === 1){
        //     dispatch(channelActions.addTochannelInfo({ upload: "Today" }))

        // }
        // else if(index === 2){
        //     dispatch(channelActions.addTochannelInfo({ upload: "Month" }))

        // }
    }

    const Savefilter = (event: React.MouseEvent) => {
        setCentredModal(!centredModal);

        event.preventDefault()
        if (uploadIndex) {
            if (uploadIndex === 4) {

                dispatch(channelActions.addTochannelInfo({ upload: "1Hour_ago" }))
                setuploadIndex(null)

            }
            else if (uploadIndex === 1) {
                dispatch(channelActions.addTochannelInfo({ upload: "Today" }))
                setuploadIndex(null)

            }
            else if (uploadIndex === 2) {
                dispatch(channelActions.addTochannelInfo({ upload: "Month" }))
                setuploadIndex(null)

            }
        }

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
                                        <li style={{ cursor:"pointer" ,marginTop: "15%", fontWeight: uploadIndex === 4 ? 'bold' : 'normal',  }} onClick={() => uploadClick(4)}>
                                            지난 1시간
                                        </li>
                                        <li style={{cursor:"pointer" , marginTop: "15%", fontWeight: uploadIndex === 1 ? 'bold' : 'normal',  }} onClick={() => uploadClick(1)}>
                                            오늘
                                        </li>
                                        <li style={{cursor:"pointer" , marginTop: "15%", fontWeight: uploadIndex === 2 ? 'bold' : 'normal', }} onClick={() => uploadClick(2)}>
                                            이번 달
                                        </li>
                                    </ul>
                                </MDBModalBody>
                                <MDBModalBody>
                                    <MDBModalHeader >
                                        <MDBModalTitle style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>길이</MDBModalTitle>
                                    </MDBModalHeader>
                                    <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                        <li style={{ cursor:"pointer" , marginTop: "15%", fontWeight: lengthdIndex === 0 ? 'bold' : 'normal',  }} onClick={() => lengthClick(0)}>
                                            4분 미만
                                        </li>
                                        <li style={{ cursor:"pointer" , marginTop: "15%", fontWeight: lengthdIndex === 1 ? 'bold' : 'normal', }} onClick={() => lengthClick(1)}>
                                            4~20분
                                        </li>
                                        <li style={{ cursor:"pointer" , marginTop: "15%", fontWeight: lengthdIndex === 2 ? 'bold' : 'normal', }} onClick={() => lengthClick(2)}>
                                            20분 초과
                                        </li>
                                    </ul>
                                </MDBModalBody>
                                <MDBModalBody>
                                    <MDBModalHeader >
                                        <MDBModalTitle style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>검색필터</MDBModalTitle>
                                    </MDBModalHeader>
                                    <ul style={{ fontSize: "1rem", whiteSpace: "nowrap", margin: "0px auto" }}>
                                        <li style={{ cursor:"pointer" , marginTop: "15%", fontWeight: filterdIndex === 0 ? 'bold' : 'normal', }} onClick={() => filteriClick(0)}>
                                            관련성
                                        </li>
                                        <li style={{  cursor:"pointer" ,marginTop: "15%", fontWeight: filterdIndex === 1 ? 'bold' : 'normal', }} onClick={() => filteriClick(1)}>
                                            업로드 날짜
                                        </li>
                                        <li style={{ cursor:"pointer" , marginTop: "15%", fontWeight: filterdIndex === 2 ? 'bold' : 'normal', }} onClick={() => filteriClick(2)}>
                                            조회수
                                        </li>
                                    </ul>
                                </MDBModalBody>
                            </div>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={Savefilter}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>

            </div>}
        </>

    )
}