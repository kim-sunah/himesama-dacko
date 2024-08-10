import { Outlet } from "react-router-dom";
import Header_SideBar from "./header/Header_Sidebar";
import { useEffect, useState } from "react";
import Getmethod from "../../http/Get_method";
import { useRecoilState } from "recoil";
import { userNameState, userEmailState, userLoggedInState, userIdState } from "../../store/auth";
import ErrorPage from "../error/Error";
interface RouterError {
    status: number;
    message: string;
  }
export default function MainRoot() {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoggedInState);
    const [userId, setuserId] = useRecoilState(userIdState); 
    const [error, setError] = useState<RouterError | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/auth/getsession`)
                console.log(response)
                setuserId(response.user.userId)
                setUserName(response.user.nickname);
                setUserEmail(response.user.email);
                setIsLoggedIn(true);
            }
            catch (error) {
            }
        }
        fetchData()

    }, [])

    

    return <div>
        <Header_SideBar></Header_SideBar>
        
    </div>
}