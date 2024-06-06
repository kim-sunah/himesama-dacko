
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


import "../../../styles/ranking.css"
import { Link, useLocation, useNavigate, } from 'react-router-dom';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import Postmethod from '../../../http/Post_method';
import Row from '../../../component/table/Youtube_Condition_InfluencerRow';



interface Channel {
    Channel_Id: string;
    Channel_Url_Id: string;
    channel_img: string;
    Channel_nickname: string;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;

}


export default function YoutubeConditionInfluencer() {
    const [loading, setLoading] = useState<boolean>(false)
    const [Ranking, setRanking] = useState<Channel[]>([]);
    const [accurate_search , setaccurate_search] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isDescending, setIsDescending] = useState(true);
    const [isDescendingvideo, setIsDescendingvideo] = useState(true);
    const [isDescendingview, setIsDescendingview] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
    const search = queryParams.get('search');
    const PageToken = queryParams.get("PageToken")
   


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/YoutubeChannelApi/${search}`, {
                subscriberMin: queryParams.get("SubscriberMin") || null,
                subscriberMax: queryParams.get("SubscriberMax") || null,
                viewMin: queryParams.get("ViewMin") || null,
                viewMax: queryParams.get("ViewMax") || null,
                videoMin: queryParams.get("VideoMin") || null,
                videoMax: queryParams.get("VideoMax") || null
            })
            setRanking(response)
            setaccurate_search(false);

            setLoading(false)
        }
        if (search && !select) {
            fetchData()
        }

    }, [select, search, PageToken, location.search])

    const accurate_searchhandler = async() => {

        setLoading(true)
        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/YoutubeChannelApi/${search}`, {
            subscriberMin: queryParams.get("SubscriberMin") || null,
            subscriberMax: queryParams.get("SubscriberMax") || null,
            viewMin: queryParams.get("ViewMin") || null,
            viewMax: queryParams.get("ViewMax") || null,
            videoMin: queryParams.get("VideoMin") || null,
            videoMax: queryParams.get("VideoMax") || null,
            accurate_search : true
            
        })
        setRanking(response)
        setaccurate_search(true);
        setLoading(false)

    }

    const videohandleClick = () => {
        if (isDescendingvideo) {
            navigate(`${location.pathname}?search=${search}&select=High_Videocount`);
            Ranking.sort((a, b) => (b.videoCount > a.videoCount ? 1 : -1));
        } else {
            navigate(`${location.pathname}?search=${search}&select=Low_Videocount`);
            Ranking.sort((a, b) => (a.videoCount > b.videoCount ? 1 : -1));
        }
        setIsDescendingvideo(!isDescendingvideo);
    };

    const ViewhandleClick = () => {
        if (isDescendingview) {
            navigate(`${location.pathname}?search=${search}&select=High_View`);
            Ranking.sort((a, b) => (b.viewCount > a.viewCount ? 1 : -1));
        } else {
            navigate(`${location.pathname}?search=${search}&select=Low_View`);
            Ranking.sort((a, b) => (a.viewCount > b.viewCount ? 1 : -1));
        }
        setIsDescendingview(!isDescendingview);
    };

    const SubscriberhandleClick = () => {
        if (isDescending) {
            navigate(`${location.pathname}?search=${search}&select=High_Subscriber`);
            Ranking.sort((a, b) => (b.subscriberCount > a.subscriberCount ? 1 : -1));
        } else {
            navigate(`${location.pathname}?search=${search}&select=Low_Subscriber`);
            Ranking.sort((a, b) => (a.subscriberCount > b.subscriberCount ? 1 : -1));
        }
        setIsDescending(!isDescending);
    };


    return (

        <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            {loading ? (
                <div style={{ textAlign: "center", display: "block" }}>
                    <Box >
                        <CircularProgress />
                    </Box>
                    {!accurate_search && <span style={{ marginTop: "20%" }}>"{search}" 관련된 정보를 가져오고 있습니다 <br></br>20초정도의 시간이 소요됩니다....</span>}
                    {accurate_search &&  <span style={{ marginTop: "20%" }}>보다 더 확실한 데이터를 가져오고있습니다. 많은 소요시간이 소모될수있습니다.</span>}
                </div>
            ) : Ranking.length > 5 ? (
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table " >
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>채널 이름</span>

                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>구독자 수</span>
                                        <button onClick={SubscriberhandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>조회수</span>
                                        <button onClick={ViewhandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>영상 수</span>
                                        <button onClick={videohandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Ranking.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>

            ) : <div style={{ textAlign: "center", display: "block" }}>

                {search !== null && Ranking.length > 0 &&
                    <div>
                          <TableContainer component={Paper}>
                    <Table aria-label="collapsible table " >
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>채널 이름</span>

                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>구독자 수</span>
                                        <button onClick={SubscriberhandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>조회수</span>
                                        <button onClick={ViewhandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="header-cell">
                                        <span>영상 수</span>
                                        <button onClick={videohandleClick}>
                                            <CgArrowsExchangeAltV size={20} className="header-icon" />
                                        </button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Ranking.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
                        {!accurate_search  && <Stack spacing={2} direction="row" style={{display:"flex", justifyContent:"center", marginTop:"2%",}}>
                            <Button onClick ={accurate_searchhandler} variant="outlined">시간이 오래걸리지만 더 정확한 검색</Button>
                            <Button variant="outlined">새로고침</Button>
                        </Stack>}
                    </div>}
               {search !== null && Ranking.length === 0 && <div>
                        <span style={{ marginTop: "20%" }}>"{search}" 관련된 정보가 현재 조회되지 않았습니다.</span>
                        {!accurate_search  && <Stack spacing={2} direction="row" style={{display:"flex", justifyContent:"center", marginTop:"2%",}}>
                            <Button onClick ={accurate_searchhandler} variant="outlined">시간이 오래걸리지만 더 정확한 검색</Button>
                            <Button variant="outlined">새로고침</Button>
                        </Stack>}</div>} 
            </div>}



        </div>
    );
}
