

import { useState, useMemo, useEffect } from "react"
import { Input } from "../../component/v0/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from "../../component/v0/dropdown-menu"
import { Button } from "../../component/v0/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../component/v0/card"
import { BsCameraVideo } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"
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
  const [sortBy, setSortBy] = useState("subscribers")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterCategory, setFilterCategory] = useState("all")
  const [Channel,  setChannel] = useState<channeInfo[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`?sort=${sortBy}`)
    const fetchData = async() => {
        
        const response = await Postmethod("http://localhost:4000/ranking/RankingSort", {sort : sortBy})
        console.log(response)
        if(sortOrder === "asc"){
            setChannel([...response].reverse());
        }
        else if(sortOrder === "desc"){
            setChannel(response)

        }
     
    }
    fetchData()
 
 

  },[sortBy,sortOrder])

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">YouTube Channel Popularity</h1>
        <div className="flex items-center gap-4">
          {/* <Input
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <Button variant="outline" >
                Sort by: {sortBy}
                <BsCameraVideo className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" style={{backgroundColor:"white"}}>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
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
                Filter by: {filterCategory === "all" ? "All" : filterCategory}
                <BsCameraVideo className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={filterCategory} onValueChange={setFilterCategory}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Technology">Technology</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Entertainment">Entertainment</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Food">Food</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Education">Education</DropdownMenuRadioItem>
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
                                           <div className="flex items-center">
                                               <FcAreaChart className="h-5 w-5 text-gray-700 mr-1" /> 
                                           {formatNumberUS(Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount))}</div>
                                           <div className="flex items-center">
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) > 0 && <FcBullish className="h-6 w-6" />}
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) < 0 && <FcBearish className="h-6 w-6" />}
                                               {Number(Channel.subscriberCount) - Number(Channel.previous_subscriberCount) === 0 && <FcNeutralTrading className="h-6 w-6" />}
                                           </div>
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

