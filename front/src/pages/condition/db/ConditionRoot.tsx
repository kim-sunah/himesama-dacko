import { Outlet } from "react-router-dom";
import ConditionSearch from "../Condition_Search_header";


export default function ConditionRoot (){
    return (
        <main>
            <ConditionSearch></ConditionSearch>
            
            <Outlet></Outlet>
        </main>
    )
}