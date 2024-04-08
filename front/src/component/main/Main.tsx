
import { useChannelSelector } from "../../store/hooks";
import Body from "../body/Body";
import Header from "../header/Header";
import Headers from "../header/Headers";

export default function Main() {
    const ChannelInfo = useChannelSelector((state) => state.channel.items)

    return (

        <div>
            <header>
                <Headers />
                {ChannelInfo.length > 0 && <Body></Body>}
                
            </header>
           

        </div>


    )
}