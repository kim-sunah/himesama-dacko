import { Outlet } from "react-router-dom";

import RootModal from "./RootModal";
import {Cookies} from 'react-cookie';





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