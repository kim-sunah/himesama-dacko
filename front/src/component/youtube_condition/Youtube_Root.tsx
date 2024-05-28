import { Outlet } from "react-router-dom";
import YoutubeConditionHeader from "./Youtube_Condition_header";

export default function YoutubeRoot(){
    return <>
       <YoutubeConditionHeader></YoutubeConditionHeader>
        <main>
        
            <Outlet></Outlet>
        </main>
        
    </>
}