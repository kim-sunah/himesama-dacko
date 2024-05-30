import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import "../../subscriber/ranking.css"
import "../../videolist/video.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from "../../table/VideoRow";
import Postmethod from "../../../http/Post_method";
import YoutubeBasicPagenation from "../../pagenation/Youtube_BasicPagenation";


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



export default function YoutubeConditionVideo() {
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
    const [prevPageToken, setprevPageToken] = useState<string | undefined>(undefined);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    const PageToken =queryParams.get("PageToken")

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/YoutubeVideoApi/${search}`, { PageToken: queryParams.get("PageToken") || null});
          console.log(response)
          if (response) {
            setLoading(false)
            setShowSearchAlert(response);
          }

          setNextPageToken(response[0].nextPageToken)
          if (response[0].prevPageToken) {
              setprevPageToken(response[0].prevPageToken)
          }
        }
        catch (err) {
          setLoading(false)
          if (err instanceof Error) {
            throw new Error(err.message); // Throwing error to be caught by errorElement
          } else {
            throw new Error('An unknown error occurred');
          }
        }
     
      }
      if(search){
        fetchData()
      }
    
    }, [search,PageToken]);
    return (
        
      <div style={{ marginLeft: '10%', marginRight: '10%' }}>
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
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                  <div className="header-cell">채널 이름</div></TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>좋아요 수</TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>조회수</TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>댓글</TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>이메일</TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>인스타그램</TableCell>
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

            <div style={{ display: "flex", justifyContent: "center", marginTop: "3%", gap:"10%" }}>
                <YoutubeBasicPagenation nextPageToken={nextPageToken} prevPageToken={prevPageToken}></YoutubeBasicPagenation>

            </div>
      
  
      </div>
    );
  }
  
  