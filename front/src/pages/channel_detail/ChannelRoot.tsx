import { Outlet } from "react-router-dom";
import Header from "./Header";
import RecentUpload from "./RecentUpload";
import PopularVideo from "./PopularVideo";

export default function ChannelRoot() {
    return <div className="w-full min-h-screen bg-background text-foreground">
        
        <Header></Header>

        <main className="container mx-auto py-8 px-4 block">
            <RecentUpload></RecentUpload>
            <PopularVideo></PopularVideo>

        </main>
    </div>
}