

import Footer from "../footer/Footer";

import Headers from "./header/Headers";
import Popularsubscriber from "./popular/Popular_subscriber";
import Popularvideo from "./popular/Popular_video";
import Popularview from "./popular/Popular_view";
import classes from "../../styles/footer.module.css"
import Comment from "./comment/Comment";

export default function Main() {
    return (

        <div>
            <header >
                <Headers />
                {/* {ChannelInfo.length > 0 && <Body></Body>} */}
                {/* <Popularvideo></Popularvideo>
                <Popularsubscriber></Popularsubscriber>
                <Popularview></Popularview> */}
            </header>
            <div className={`flex flex-col min-h-screen ${classes.wrapper}`}>
                <div className="flex-grow">
                    <Comment></Comment>
                    {/* 여기에 다른 콘텐츠를 추가할 수 있습니다 */}
                </div>
                {/* <Footer></Footer> */}
            </div>
        </div>
    )
}