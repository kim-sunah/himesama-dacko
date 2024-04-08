import { useSelector } from "react-redux"
import { useChannelSelector } from "../../store/hooks"
interface Info {
  subscriberCount: string
  videoCount: string
  viewCount: string
}
export default function Body() {
  const ChannelInfo = useChannelSelector((state) => state.channel.items)
  



  return (
    <section className="mt-10 bg-white rounded-lg max-w-6xl shadow px-6 py-4 " style={{ textAlign: "center", margin: "0px auto", marginTop: "2rem" }}>
      <img src={ChannelInfo[0].channelInfo.Channel_img} style={{ display: 'block', margin: 'auto', width: "10rem", borderRadius: "50%" }}></img>
      <p style={{ marginTop: "3%", fontWeight: "bold" }}>{ChannelInfo[0].channelInfo.Channel_nickname}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div>
          <h3 className="text-lg font-semibold">구독자 수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo[0].channelInfo.subscriberCount).toLocaleString('en')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">총 조회수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo[0].channelInfo.viewCount).toLocaleString('en')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">총 동영상 수</h3>
          <p className="text-3xl font-bold text-[#1e0a3c]">{parseInt(ChannelInfo[0].channelInfo.videoCount).toLocaleString('en')}</p>
        </div>
      </div>

    </section>

  )
}