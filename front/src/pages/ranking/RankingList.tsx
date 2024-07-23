

import { useState, useMemo, useEffect } from "react"
import { Input } from "../../component/v0/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from "../../component/v0/dropdown-menu"
import { Button } from "../../component/v0/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../component/v0/card"
import { BsCameraVideo } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom"
import Postmethod from "../../http/Post_method"
import { channeInfo } from "../../enum/ChannelInfo"
import { FcLineChart } from "react-icons/fc";


import { formatNumberUS } from "../../function/formatNumberUS";
import { FcManager } from "react-icons/fc";
import { BiLogoYoutube } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import { FcAreaChart } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcNeutralTrading } from "react-icons/fc";

export default function RankingList() {
  const [searchTerm, setSearchTerm] = useState("")
 
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterCategory, setFilterCategory] = useState("0|All")
  const [Channel,  setChannel] = useState<channeInfo[]>([]);
  const location = useLocation();
  const [sortBy, setSortBy] = useState(location.pathname.split("/")[2])

  const navigate = useNavigate()

  
  

  useEffect(() => {
    
    navigate(`/Ranking/${sortBy}/${filterCategory.split("|")[0]}`)
    const fetchData = async() => {
      
        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, {sort : sortBy ,filter: filterCategory.split("|")[0]})
        if(sortOrder === "asc"){
            setChannel([...response].reverse());
        }
        else if(sortOrder === "desc"){
          console.log(response)
            setChannel(response)
        }
    }
    fetchData()
  },[sortBy,sortOrder,filterCategory])

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8" >
      <div className="flex items-center justify-between mb-6">
       
        <div className="flex items-center gap-4" >
          {/* <Input
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          /> */}
          <DropdownMenu >
            <DropdownMenuTrigger asChild  >
              <Button variant="outline" >
                Sort by: {sortBy}
                <BsCameraVideo className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" >
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy} >
                <DropdownMenuRadioItem value="subscribers">subscribers</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="videos">videos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="views">views</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="increase-subscribers">increase-subscribers</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="increase-views">increase-views</DropdownMenuRadioItem>
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
                Filter by: {filterCategory === "0" ? "All" : filterCategory.split("|")[1]}
                <BsCameraVideo className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 grid grid-cols-2 gap-1 p-2">
              <DropdownMenuRadioGroup value={filterCategory} onValueChange={setFilterCategory} className="contents">
                <DropdownMenuRadioItem value="0|All">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1|영화 & 애니메이션">영화 & 애니메이션</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2|자동차 및 차량">자동차 및 차량</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10|음악">음악</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15|애완동물">애완동물</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="17|운동">운동</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="18|짧은 영화">짧은 영화</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="19|여향 및 이벤트">여향 및 이벤트</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20|게임">게임</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="21|비디오블로깅">비디오블로깅</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="22|피플 & 블로그">피플 & 블로그</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="23|코미디">코미디</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="24|오락">오락</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="25|뉴스">뉴스</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="26|스타일">스타일</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="27|교육">교육</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="28|과학">과학</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30|영화">영화</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="31|애니">애니</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="32|액션 및 모험">액션 및 모험</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="33|클래식">클래식</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="35|다큐멘터리">다큐멘터리</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="36|드라마">드라마</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="37|가족">가족</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="38|외국인">외국인</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="39|공포">공포</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="40|공상과학/판타지">공상과학/판타지</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="41|스릴러">스릴러</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="42|숏츠">숏츠</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="43|쇼">쇼</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="44|트레일러">트레일러</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Channel!.map(Channel => (
                                       <div key={Channel.Channel_Id} className="bg-card p-4 rounded-lg   ">
                                       <div className="flex items-center mb-4">
                                           <img src={Channel.channel_img} alt="Thumbnail" className="w-16 h-16 rounded-full object-cover mr-4" />
                                           <h3 className="text-lg font-medium truncate flex-1">{Channel.Channel_nickname}</h3>
                                       </div>
                                       <div className="grid grid-cols-3 gap-2 text-sm">
                                           <div className="flex items-center"><BiLogoYoutube className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.subscriberCount))}</div>
                                           <div className="flex items-center"><AiFillVideoCamera className="h-5 w-5 text-gray-700 mr-1" /> {formatNumberUS(Number(Channel.videoCount))}</div>
                                           <div className="flex items-center"><FcManager className="h-5 w-5 text-red-500 mr-1" /> {formatNumberUS(Number(Channel.viewCount))}</div>
                                       </div>
                                       <div className="grid grid-cols-3 gap-2 text-sm mt-10">
                                           <div className="flex items-center">
                                               <FcLineChart className="h-6 w-6 text-red-500" />
                                               <span>{Number(Channel.subscriberCount_percentageincrease).toFixed(2)}%</span>
                                           </div>
                                           {/* <div className="flex items-center">
                                               <FcAreaChart className="h-5 w-5 text-gray-700 mr-1" /> 
                                           {formatNumberUS(Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount))}</div>
                                           <div className="flex items-center">
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) > 0 && <FcBullish className="h-6 w-6" />}
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) < 0 && <FcBearish className="h-6 w-6" />}
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) === 0 && <FcNeutralTrading className="h-6 w-6" />}
                                           </div> */}
                                       </div>
                                       <Link to={`${process.env.REACT_APP_FRONT_API}/${Channel.Channel_Id}`} className="block mt-4">
                                           <Button variant="outline" className="w-full">View Channel</Button>
                                       </Link>
                                   </div>

        ))}
    
        
       
      </div>
    </div>
  )
}

