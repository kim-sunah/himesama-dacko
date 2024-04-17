import { Link, Outlet } from "react-router-dom";

export default function MainRoot() {
    return <div>
        <main>
            <Link to ="/Ranking">SEARCH</Link>
            <Link to ="/Search ">YOUTUBE</Link>
            <Outlet></Outlet>
        </main>
    </div>
}