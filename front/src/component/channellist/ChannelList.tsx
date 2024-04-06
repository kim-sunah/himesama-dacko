import { useState, useEffect } from "react"
import axios from 'axios';

interface Channel {
    id: string;
    snippet: {
        thumbnails: {
            default: {
                url: string;
            };
        };
        title: string;
    };
    statistics: {
        subscriberCount: number;
    };
}

export default function ChannelList() {
    useEffect(() =>{
        fetch("http://localhost:4000/subscriber/top-channels",{method : "GET", headers:{"Content-Type" : "application/json"}}).then(res=>res.json()).then(resData=>console.log(resData)).catch(err=>console.log(err))
        //fetch("http://localhost:4000/subscriber/Honey_Churros",{method : "GET", headers:{"Content-Type" : "application/json"}}).then(res=>res.json()).then(resData=>console.log(resData)).catch(err=>console.log(err))

    },[])
   return (
    <h1>asdsad</h1>
   )
    
};