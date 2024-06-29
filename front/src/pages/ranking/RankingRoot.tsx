import { Link, Outlet } from "react-router-dom";
import TopChannel from "./topchannel/TopChannel";
import RankingList from "./RankingList";

export default function RankingRoot() {
    return (
        <div>
            <TopChannel></TopChannel>
            <RankingList></RankingList>
            <main>
            <Outlet></Outlet>
            </main>
       
    
        </div>
   
    )
}