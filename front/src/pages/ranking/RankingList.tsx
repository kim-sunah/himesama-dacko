

import { useState,  useEffect, useRef,  } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from "../../component/v0/dropdown-menu"
import { Button } from "../../component/v0/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Postmethod from "../../http/Post_method"
import { channeInfo } from "../../enum/ChannelInfo"
import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs"
import { formatNumberUS } from "../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import SubcriberChart from "./list/Subcriber_chart"
import ViewChart from "./list/View_chat"
import { formatNumber } from "../../function/formatNumber"
import { Filter } from "../../function/catetoryfilter"


export default function RankingList() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterCategory, setFilterCategory] = useState(location.pathname.split("/")[3])
  const [Channel, setChannel] = useState<channeInfo[]>([]);
  const [page , setpage] = useState(1);


  console.log(location)
  console.log(filterCategory)
  const [sortBy, setSortBy] = useState(location.pathname.split("/")[2])
  const navigate = useNavigate()
  useEffect(() => {
    
    setpage(1);
    const fetchData = async () => {
      let response;
      if(filterCategory.includes("|")){
         response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, { sort: sortBy.split("|")[0], filter: filterCategory , page : page })
       
      }
      else{
         response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, { sort: sortBy.split("|")[0], filter: filterCategory , page : page })
        
      
      }
      if (sortOrder === "asc") {
        setChannel([...response].reverse());
      }
      else if (sortOrder === "desc") {
        setChannel(response)
      }
     
     
    }
    fetchData()
  }, [sortBy, sortOrder, filterCategory])

  const [selectedTabs, setSelectedTabs] = useState<Record<string, string>>({});

  const handleTabChange = (channelId: string, value: string) => {
    setSelectedTabs(prevState => ({
      ...prevState,
      [channelId]: value
    }));
  };


  const [lastChannel, setLastChannel] = useState<HTMLDivElement | null>(null);
  const ScorllData = async () => {
   
      const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, { sort: sortBy.split("|")[0], filter:filterCategory , page : page+1 })
      if (sortOrder === "asc") {
        setChannel(preventDefault => { return [...preventDefault, ...[...response].reverse()];});
      }
      else if (sortOrder === "desc") {
        setChannel(preventDefault => { return [...preventDefault, ...response];});
      }
      setpage(page+1);
    

 
  
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ScorllData()
    
        }
      },
      { threshold: 0.1 } 
    );
    if (lastChannel) {
      observer.observe(lastChannel);
    }
    return () => {
      if (lastChannel) {
        observer.unobserve(lastChannel);
      }
    };
  }, [lastChannel]);

  const LocationHandler = (Id : string) => {
      
    navigate(`/${Id}`);

}


  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8"  ref={containerRef}>
      <div className="flex items-center justify-between mb-6" >
    <div className="flex items-center gap-4" >
      <DropdownMenu >
        <DropdownMenuTrigger asChild  >
          <Button variant="outline" >
            Sort by: {sortBy.split("|")[1] === undefined ? location.pathname.split("/")[2] === "subscribers" ? "구독자 수" : location.pathname.split("/")[2] === "videos" ? "동영상 수" : location.pathname.split("/")[2] === "views" ? "조회수" : location.pathname.split("/")[2] === "increase-subscribers" ? "일일 구독자 상승률" : location.pathname.split("/")[2] === "increase-views" ? "일 조회수 상승률" : location.pathname.split("/")[2] === "week-increase-subscribers" ?  "이번주 구독자 상승률" : location.pathname.split("/")[2] === "week-increase-views"  ? "이번주 조회수 상승률" : null : sortBy.split("|")[1]}
       
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" >
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy} >
            <DropdownMenuRadioItem value="subscribers|구독자 수">구독자 수</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="videos|동영상 수 ">동영상 수</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="views|조회수">조회수 </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="increase-subscribers|일일 구독자 상승률">일일 구독자 상승률</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="increase-views|일일 조회수 상승률">일일 조회수 상승률</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="week-increase-subscribers|주 구독자 상승률"> 이번주 구독자 증가량</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="week-increase-views|주 조회수 상승률"> 이번주 조회수 증가량</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
            <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Filter by: {Filter(Number(filterCategory))}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 grid grid-cols-2 gap-1 p-2">
          <DropdownMenuRadioGroup value={filterCategory} onValueChange={setFilterCategory} className="contents">
            <DropdownMenuRadioItem value="0">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">애니메이션 영화</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">자동차</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="10">음악</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="15">애완동물</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="17">운동</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="18">짧은 영화</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="19 ">여행 </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="20">게임</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="21">비디오블로깅</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="22">피플 & 블로그</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="23">코미디</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="24">오락</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="25">뉴스</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="26">스타일</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="27">교육</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="28">과학</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="30">영화</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="31">애니</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="32">액</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="33">클래식</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="35">다큐멘터리</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="36">드라마</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="37">가족</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="38">외국인</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="39">공포</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="40">공상과학/판타지</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="41">스릴러</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="42">숏츠</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="43">쇼</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="44">트레일러</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 " >
        {Channel.map((channel,index) => (
          <div key={channel.Channel_Id} className="bg-card  rounded-lg"   ref={index === Channel.length - 1 ? setLastChannel : null}>
            <div className="flex items-center mb-4">
              <img src={channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
              <h3 className="text-lg font-medium truncate flex-1">{channel.Channel_nickname}</h3>
            </div>
            <div >
            <div className="flex items-center justify-center mt-2"> <span className="mt-2 text-xs whitespace-nowrap"  > 구독자 :{formatNumber(Number(channel.subscriberCount))}명</span></div>
            <div className="flex items-center justify-center mt-2"> <span className="mt-2  text-xs whitespace-nowrap"> 조회수 : {formatNumber(Number(channel.viewCount))}회</span></div>
            <div className="flex items-center justify-center mt-2">
                <span className="mt-2 text-xs whitespace-nowrap"> 구독자 전일 대비 : <span style={{
                      color: Number(channel.subscriberCount_percentageincrease) > 0
                        ? "blue"
                        : Number(channel.subscriberCount_percentageincrease) < 0
                          ? "red"
                          : "grey"
                    }}>
                      {Number(channel.subscriberCount_percentageincrease).toFixed(2)}%
                    </span></span>
              </div> 
              <div className="flex items-center justify-center mt-2">
                <span className="mt-2 text-xs whitespace-nowrap"> 구독자 전주 대비 : <span style={{
                      color: Number(channel.week_subscriberCount_percentageincrease) > 0
                        ? "blue"
                        : Number(channel.week_subscriberCount_percentageincrease) < 0
                          ? "red"
                          : "grey"
                    }}>
                      {Number(channel.week_subscriberCount_percentageincrease).toFixed(2)}%
                    </span></span>
              </div> 
            </div>
            {/* <Tabs
              defaultValue="구독자"
              className="mt-4"
              onValueChange={(value) => handleTabChange(channel.Channel_Id, value)}
            >
              <TabsList>
                <TabsTrigger value="구독자">구독자</TabsTrigger>
                <TabsTrigger value="조회수">조회수</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="block text-sm" style={{ height: "40%" }}>
              {selectedTabs[channel.Channel_Id] === '조회수' ? (
                <ViewChart channelId={channel.Channel_Id} />
              ) : (
                <SubcriberChart channelId={channel.Channel_Id} />
              )}
            </div> */}
            <Button variant="outline" className="w-full mt-4 "  onClick={() => {navigate(`/${channel.Channel_Id}`)}} style={{fontSize:"0.75rem"}}>채널 상세</Button>

            
           

          </div>
        ))}
     
      </div>
   
    </div>
  )
}

