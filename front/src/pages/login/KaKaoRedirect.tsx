import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userNameState, userEmailState, userLoggedInState } from "../../store/auth";
import { useRecoilState } from "recoil";

export default function KakaoRedirect() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const navigate = useNavigate()
   

    const [userName, setUserName] = useRecoilState(userNameState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoggedInState);
    useEffect(() => {
        fetch(`https://kauth.kakao.com/oauth/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}`, })
            .then(res => res.json())
            .then(resData => fetch("https://kapi.kakao.com/v2/user/me", { method: "GET", headers: { "Authorization": "Bearer " + resData.access_token } })
                .then(res => res.json())
                .then(resData => {
                    fetch(`${process.env.REACT_APP_BACKEND_API}/auth/Kakao`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: 'include', body: JSON.stringify({ email: resData.kakao_account.email, nickname: resData.kakao_account.profile.nickname }) })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP error! status: ${res.status}`);
                            }
                            if (res.status === 201) {
                                navigate("/")
                             
                            }
                        })
                      
                }))
            .catch(err => console.log(err))
    }, [])

    return <></>
}