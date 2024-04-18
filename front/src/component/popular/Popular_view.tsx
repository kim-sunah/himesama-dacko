import { useEffect, useState } from "react"
import Getmethod from "../../http/Get_method";
import { Link } from "react-router-dom";

interface channelData {
    channelId: string
    channelimg: string
    channelnickname: string

}

export default function Popularview() {
    const [channelData, setchannelData] = useState<channelData[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Getmethod("http://localhost:4000/ranking/increaseview")
                console.log(response)
                setchannelData(response)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, [])
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginTop: "2%" }}>조회수 증가 상위 TOP 5</h1>
            <div style={{ display: "flex", gap: "2.3%" ,marginTop:"2%", justifyContent:"center" }}>
                {channelData && channelData.map((items, index) => (
                    <Link  to ={`https://www.youtube.com/${items.channelId}`} key={index}>
                        <img src={items.channelimg} style={{ borderRadius: "50%", width: "100%"}} />
                        <p style={{fontWeight:"bold", color:"black", fontSize:"70%", textAlign:"center"}}>{items.channelnickname}</p>
                    </Link>
                ))}

            </div>

        </div>
    )
}