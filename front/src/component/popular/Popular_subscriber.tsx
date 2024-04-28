import React, { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { Link } from "react-router-dom";
import "./popular.css";

interface channelData {
    channelId: string;
    channelimg: string;
    channelnickname: string;
}

export default function Popularsubscriber() {
    const [channelData, setchannelData] = useState<channelData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Getmethod("https://port-0-himesama-dacko-16yzlb2alrh4xa0h.sel5.cloudtype.app/ranking/increaseSubscriber");
                console.log(response);
                setchannelData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Duplicate the first element for seamless scrolling
    const duplicatedContent = channelData.slice(0);
    const updatedChannelData = [...channelData, ...duplicatedContent];
   

    return (
        <div style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
            <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginTop: "2%" ,marginBottom:"2%"}}>구독자 증가 상위</h1>
            <div className="slider-container">
                {updatedChannelData.map((items, index) => (
                    <Link to={`https://www.youtube.com/${items.channelId}`} key={index} className="slider-item">
                        <img src={items.channelimg} alt={items.channelnickname} className="slider-item-img" />
                        <p className="slider-item-text">{items.channelnickname}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
