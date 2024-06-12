import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function YoutubeRoot(){
    return <>
        <Header></Header>
        <main>
            <Outlet></Outlet>
        </main>
        
    </>
}