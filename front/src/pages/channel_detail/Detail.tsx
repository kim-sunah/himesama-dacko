import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Getmethod from "../../http/Get_method";
import { formatNumberUS } from "../../function/formatNumberUS";
import { channeInfo } from "../../enum/ChannelInfo";
import { formatNumber } from "../../function/formatNumber";
import ViewChart from "../ranking/list/View_chat";
import styled from "@emotion/styled";

export default function Detail() {
  const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.25rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`;

  const [ChannelInfo, setChannelInfo] = useState<channeInfo | null>();
  const { ChannelId } = useParams();
  const [ChannelDescription, setChannelDescripthon] = useState<String>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/${ChannelId}`)
      setChannelInfo(response);
    }
    fetchData()
  }, [ChannelId]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${ChannelId}&key=${process.env.REACT_APP_Youtube_API}`)
      setChannelDescripthon(response.items[0].snippet.description)
    }
    fetchData()
  }, [ChannelId]);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
        <div className="flex flex-col items-center gap-4 mr-8" style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <div className="rounded-full w-24 h-24 md:w-32 md:h-32 overflow-hidden">
            <img
              src={ChannelInfo?.channel_img}
              alt="Channel Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center" >
            <div className="text-xl md:text-2xl font-bold">{ChannelInfo?.Channel_nickname}</div>
          </div>
        </div>
        <div className="grid gap-4 md:gap-6 ">
          <GridContainer >

            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">{formatNumber(Number(ChannelInfo?.videoCount))}개</div>
              <div className="text-sm text-muted-foreground ">동영상 게시수</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center ">{formatNumber(Number(ChannelInfo?.viewCount))}회</div>
              <div className="text-sm text-muted-foreground ">총 조회수</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">{formatNumber(Number(ChannelInfo?.viewCount) / Number(ChannelInfo?.videoCount))}회</div>
              <div className="text-sm text-muted-foreground ">영상 당 평균 조회수</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">{formatNumber(Number(ChannelInfo?.subscriberCount))}명</div>
              <div className="text-sm text-muted-foreground ">구독자 수</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">{(Math.floor((Number(ChannelInfo?.viewCount) / Number(ChannelInfo?.videoCount)) / Number(ChannelInfo?.subscriberCount) * 10000) / 100).toLocaleString('en')}%</div>
              <div className="text-sm text-muted-foreground ">구독자 대비 조회수 비율</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">  {Number(ChannelInfo?.viewCount_percentageincrease)}%</div>
              <div className="text-sm text-muted-foreground ">전주 대비 조회수 상승률</div>
            </div>
            <div className="bg-muted rounded-lg p-4" style={{ backgroundColor: "gainsboro" }}>
              <div className="flex text-2xl md:text-3xl font-bold mt-2  whitespace-nowrap justify-center">{Number(ChannelInfo?.subscriberCount_percentageincrease)}%</div>
              <div className="text-sm text-muted-foreground ">전주 대비 구독자 상승률</div>
            </div>


          </GridContainer>
          <div className="grid gap-2">
            <div className="text-lg md:text-xl font-bold">채널 설명</div>
            <div className="text-sm md:text-base text-muted-foreground">
              {ChannelDescription}

            </div>

          </div>
        </div>



      </div>

    </div>

  )
}