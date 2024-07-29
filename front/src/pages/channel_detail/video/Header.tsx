import { Link, useLocation } from "react-router-dom"
import { Button } from "../../../component/v0/button"
import { Label } from "../../../component/v0/label"
import { Input } from "../../../component/v0/input"
import { Textarea } from "../../../component/v0/textarea"
import { useEffect, useState } from "react"
import Getmethod from "../../../http/Get_method"
import { YouTubeSearchResult } from "../../../enum/Search_Item_Interface"
import { Youtube_Video } from "../../../enum/Youtbe_video"


export default function Header() {
    const location = useLocation();

    const [video, setVideo] = useState<Youtube_Video | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${location.pathname.split("/")[2]}&maxResults=1&key=${process.env.REACT_APP_Youtube_API}`)
            setVideo(response.items[0])
        }
        fetchData()
    }, [location.pathname.split("/")[2]])

    return (
        <div>
            <div className="aspect-w-16 aspect-h-9 mb-8" style={{ display: "flex", justifyContent: "center" }}>
                <iframe
                    width="860"
                    height="415"
                    src={`https://www.youtube.com/embed/${video?.id}`}

                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                ></iframe>
            </div>
        </div>
    )
}