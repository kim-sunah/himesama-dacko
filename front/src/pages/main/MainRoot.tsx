import { Outlet } from "react-router-dom";
import Header_SideBar from "./header/Header_Sidebar";
import { useEffect } from "react";
import Getmethod from "../../http/Get_method";
import { useRecoilState } from "recoil";
import { userNameState, userEmailState, userLoggedInState } from "../../store/auth";

export default function MainRoot() {

    const [userName, setUserName] = useRecoilState(userNameState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoggedInState);
    useEffect(() => {

        const fetchData = async () => {
            try {
            
                const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/auth/getsession`)
                console.log(response.user)
                setUserName(response.user.nickname);
                setUserEmail(response.user.email);
                setIsLoggedIn(true);
            }
            catch (error) {
                console.log("EEE")

            }

        }
        fetchData()

    }, [])

    return <div>
        <Header_SideBar></Header_SideBar>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
}