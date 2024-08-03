import { Outlet } from "react-router-dom";
import { Mainheader } from "./main/header/Mainheader";
import RootModal from "./RootModal";
import {Cookies} from 'react-cookie';
import Comment from "./main/comment/Comment";




export default function Root() {
    const cookies = new Cookies();
    return (
        <div>
            {cookies.get("START_MODAL") === undefined&&  <RootModal></RootModal>}
        <main>
            <Outlet></Outlet>
        </main>
    </div>
    

    )
}