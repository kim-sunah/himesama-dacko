
interface Info{
    subscriberCount  : string
    videoCount : string
    viewCount : string
}
export default function Body({subscriberCount,videoCount,viewCount} : Info){
    
    return (
        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[610px] " style={{marginTop:"30%"}}> 
            <p>{subscriberCount}</p>
            <p>{videoCount}</p>
            <p>{viewCount}</p>
        </div>
        
    )
}