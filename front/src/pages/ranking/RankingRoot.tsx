import { Link, Outlet, useLocation } from "react-router-dom";
import TopChannel from "./daytopchannel/TopChannel";
import RankingList from "./RankingList";

import Header from "./Header";
import WeekTopChannel from "./WeekTopchannel/TopChannel";

export default function RankingRoot() {
    const location = useLocation();
    console.log(location.search)
    return (
        <div>
            <Header></Header>
            <div>
                {location.search === "?today" && <TopChannel></TopChannel>}
                {location.search === "?week" && <WeekTopChannel></WeekTopChannel>}


{/* <RankingList></RankingList> */}
{/* <Ranking></Ranking> */}
<main>
<Outlet></Outlet>
</main>


</div>
        </div>
       
   
    )
}