import { Outlet } from "react-router-dom";

import ConditionSearch from "../Condition_Search_header";

export default function YoutubeRoot(){
    return <>
    
        <ConditionSearch></ConditionSearch>
        <main>
            <Outlet></Outlet>
        </main>
        
    </>
}