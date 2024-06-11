import { Outlet } from "react-router-dom";

import ConditionSearch from "../Condition_Search_header";
import Header from "../Header";

export default function YoutubeRoot(){
    return <>
    
        <Header></Header>
        <main>
            <Outlet></Outlet>
        </main>
        
    </>
}