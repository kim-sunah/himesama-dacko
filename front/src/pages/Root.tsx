import { Outlet } from "react-router-dom";
import { Mainheader } from "./main/header/Mainheader";
import RootModal from "./RootModal";
import {Cookies} from 'react-cookie';
import Comment from "./main/comment/Comment";




export default function Root() {
    const cookies = new Cookies();
    console.log(cookies.get("START_MODAL"))
    return (
        <div>
            {cookies.get("START_MODAL") === undefined&&  <RootModal></RootModal>}
           
            <Mainheader></Mainheader>
      
        <main>
            <Outlet></Outlet>
        </main>
    </div>
    

    )
}