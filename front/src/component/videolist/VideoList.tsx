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
import { upload } from "@testing-library/user-event/dist/upload";
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
export default function VideoList() {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const filterData = useChannelSelector(state => state.channel.items);
    const [showSearchAlert, setShowSearchAlert] = useState<VideoInfo[]>([]);
    const { search } = useParams();
    const [loading, setLoading] = useState<boolean>(false)
    const [searchData, setsearchData] = useState<boolean>(false)
  

    const submithandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchRef.current?.value) {
            navigate(`/seachlist/${searchRef.current?.value}`);
        }

        (event.target as HTMLFormElement).reset();
    }
    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "2.5%" }}>
                <Link to="/"> HOME</Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "0px", padding: "0px" }}>
                <form onSubmit={submithandler} className="flex md:gap-8 md:p-6 justify-center" style={{ width: "100%", margin: "0px auto" }}>
                    <MDBInput label='Search' ref={searchRef} />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
                    </MDBBtn>
                </form>
            </div>
            <main>
                <Outlet></Outlet>
            </main>

        </div>
    )
}


