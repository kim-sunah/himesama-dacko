import { Outlet } from "react-router-dom";
import { Mainheader } from "./main/header/Mainheader";


export default function Root() {
    return (
        <div>
            <Mainheader></Mainheader>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
    

    )
}