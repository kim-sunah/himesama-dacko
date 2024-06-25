import RecentUpload from "./RecentUpload";
import PopularVideo from "./PopularVideo";
import Detail from "./Detail";

export default function ChannelRoot() {
    return (
    <div>
        <Detail></Detail>
             <main className="container mx-auto py-8 px-4 block">
             <RecentUpload></RecentUpload>
             <PopularVideo></PopularVideo>
         </main>
    </div>
    )

    
    // <div className="w-full min-h-screen bg-background text-foreground">
        
    //     <Header></Header>

    //     <main className="container mx-auto py-8 px-4 block">
    //         <Trend></Trend>
    //         <RecentUpload></RecentUpload>
    //         <PopularVideo></PopularVideo>

    //     </main>
    // </div>
}