import { Link, Outlet } from "react-router-dom";
import TopChannel from "./topchannel/TopChannel";
import RankingList from "./RankingList";
import Ranking from "./Ranking";
import Header from "./Header";

export default function RankingRoot() {
    return (
        <div>
            <Header></Header>
            <div>

<TopChannel></TopChannel>
{/* <RankingList></RankingList> */}
{/* <Ranking></Ranking> */}
<main>
<Outlet></Outlet>
</main>


</div>
        </div>
       
   
    )
}