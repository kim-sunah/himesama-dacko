import { Outlet } from "react-router-dom";

import Header from "../Header";


export default function ConditionRoot (){
    return (
        <main>
            <Header></Header>
            
            <Outlet></Outlet>
        </main>
    )
}