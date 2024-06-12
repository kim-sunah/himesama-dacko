

import Footer from "../footer/Footer";

import Headers from "./header/Headers";
import Popularsubscriber from "./popular/Popular_subscriber";
import Popularvideo from "./popular/Popular_video";
import Popularview from "./popular/Popular_view";

export default function Main() {
    return (

        <div>
            <header>
                <Headers />
                {/* {ChannelInfo.length > 0 && <Body></Body>} */}
                <Popularvideo></Popularvideo>
                <Popularsubscriber></Popularsubscriber>
                <Popularview></Popularview>
                
            </header>
            <Footer></Footer>
           

        </div>


    )
}