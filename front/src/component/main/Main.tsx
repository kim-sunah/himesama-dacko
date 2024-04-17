
import { useChannelSelector } from "../../store/hooks";
import Body from "../body/Body";

import Headers from "../header/Headers";
import Popularsubscriber from "../popular/Popular_subscriber";
import Popularvideo from "../popular/Popular_video";
import Popularview from "../popular/Popular_view";

export default function Main() {
    const ChannelInfo = useChannelSelector((state) => state.channel.items)

    return (

        <div>
            <header>
                <Headers />
                {/* {ChannelInfo.length > 0 && <Body></Body>} */}
                {ChannelInfo.length === 0 && <Popularvideo></Popularvideo>}
                {ChannelInfo.length === 0 && <Popularsubscriber></Popularsubscriber>}
                {ChannelInfo.length === 0 && <Popularview></Popularview>}
                
            </header>
           

        </div>


    )
}