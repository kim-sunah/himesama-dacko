import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TimeAgo from 'react-timeago';
import { AiOutlineLike } from "react-icons/ai";
import Getmethod from "../../../http/Get_method";
import { Comment } from "../../../enum/Comment";
import CommentText from "./CommentText";

export default function Comments() {
    const location = useLocation();
    const [comment, setComment] = useState<Comment[] | null>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(location.pathname.split("/")[2]);
            try {
                const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&videoId=${location.pathname.split("/")[2]}&key=${process.env.REACT_APP_Youtube_API}`);
                setComment(response.items);
                setError(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError(true);
            }
        };
        fetchData();
    }, [location.pathname]);

    if (error) {
        return <div className="text-black mt-4 " style={{textAlign:"center"}}>댓글이 사용 중지 되었습니다</div>;
    }

    return (
        <div className="text-black mt-10">
            <div className="space-y-4">
                {comment && comment.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} 
                             alt="Author" 
                             style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <div>
                            <div className="flex items-center space-x-4">
                                <span className="font-bold">{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
                                <span className="text-muted-foreground">
                                    <TimeAgo
                                        date={comment?.snippet.topLevelComment.snippet.publishedAt ? new Date(comment?.snippet.topLevelComment.snippet.publishedAt).toISOString() : ''}
                                    />
                                </span>
                            </div>
                            <p>
                                <CommentText text={comment.snippet.topLevelComment.snippet.textOriginal} />
                            </p>
                            <div className="flex items-center space-x-2 ">
                                <AiOutlineLike />
                                <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}