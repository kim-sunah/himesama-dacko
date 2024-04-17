import { useEffect } from "react"
import Getmethod from "../../http/Get_method";

export default function Popularsubscriber(){
    useEffect(() => {
        const fetchData = async () => {
           
        };
        fetchData();
    }, []);
    
    return(
        <h1 style={{textAlign:"center", fontSize:"2rem", fontWeight:"bold",marginTop:"2%"}}>구독자 수 증가 상위 TOP 5</h1>
    )
}