


import { useLoaderData } from "react-router-dom";
import { ChannelInfo } from "../../enum/ChannelInfo";
import Postmethod from "../../http/Post_method";
import Leaderboard from "./Leaderboard";
import Topclick from "./Topclick";
import { useRecoilValue } from "recoil";
import { userEmailState, userIdState, userLoggedInState } from "../../store/auth";
import Getmethod from "../../http/Get_method";
import { ChannelClick } from "../../enum/ChannelClick";
import TOP from "./TopSubscriber";
import RecommandVideo from "./RecommandVideo";

const leaderboardData = [
  { title: "1|애니메이션영화", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/socalguitarist_8300729ad8a3c13c665a47677d9e2427_image.png" },
  { title: "2|자동차", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/image.png" },
  { title: "10|음악", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/2dff18b474c53b278cd515763ad54e4a_cpvtdgde878c738knqvg_image.png" },
  { title: "15|애완동물", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/1a8ce568d69255df91c02c359d516d8b_co7doo5e878c738otcl0_image.png" },
  { title: "17|운동", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/cffa7eccdb74dcb60e28af45aa38ef30_cjosqj14msb2hpudpr20_image.png" },
  { title: "19|여행", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/1afa1fa8b7c173d686dc45ee06456715_cq1k10de878c73eba3s0_image.png" },
  { title: "20|게임", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/40f8cb48c0a1772d61ce6992bd6404aa_ck4h1gh4msb1r47qsro0_image.png" },
  { title: "23|코미디", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/376dc5ca40bae30b5caae60e6306eaa4_cjk8mah4msbbo3p3eu30_image.png" },
  { title: "24|오락", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/45f614fec0a475ade88f05c3e41f619a_cq4u4cle878c73aip6tg_image.png" },
  { title: "26|스타일", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/94a74c230b8e195507866d914758caf7_cqme45le878c73ch7s00_image.png" },
  { title: "27|교육", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/78ca5b642c772148ab818ce9cfd3aace_cjpcqp94msbb8k8ic0l0_image.png" },
  { title: "28|과학", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/5ea203b4788b7bb34251823efc8a79cb_co6kn35e878c73dh8if0_image.png" },
  { title: "30|영화", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/socalguitarist_8300729ad8a3c13c665a47677d9e2427_image.png" },
  { title: "31|애니", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/53e4d937ed409c5ba95b1827bb0d8afe_cl42nb14msba1rs35dgg_image.png" },
  { title: "32|액션 및 모험", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/46f1b6b8d28ef00dcb057e7f3e160a7a_2d30bcc5c70b46bd808dbddd3ff6b05c_image.png" },
  { title: "35|다큐멘터리", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/ae16c8a66fdd521bb3db408a0d6570b4_88cf6d14ba4191debc2ff082a93c584a_image.png" },
  { title: "36|드라마", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/927ad7a12f31deb8c0fe042c2d8c27cb_cko5r114msb0vq4f4m90_image.png" },
  { title: "37|가족", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/8c6c35a59dbd3398a4e9e3aae1994317_cjgpvip4msbfctjun090_image.png" },
  { title: "39|공포", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/28b49fe63f9e762c6d416b288e5ce6dc_4ee2a1e4354c66c8f0c4e908cb56bd4a_image.png" },
  { title: "40|공상과학/판타지", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/05232d948cd6f2ce8314fb3806b62353_6d7553705a169ca51a4316a0147d7dd0_image.png" },
  { title: "41|스릴러", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/XRYCJ_c5c7b9b7ac50fb84b10b4ff02ea7ef59_image.png" },
  { title: "43|쇼", img: "https://wqdsdsf.s3.ap-northeast-2.amazonaws.com/Main_Img/4aebfd75031299b6d807d3c7c5e64bcb_ck41pe14msb0ugeiiqd0_image.png" },
];



interface RankingItem {
  title: string;
  img: string;
  rankings: ChannelInfo[];
}
interface LoaderData {
  filteredRankingData: RankingItem[];
  TopSubscriber : ChannelInfo[]
  TopView : ChannelInfo[]
  TopClick : ChannelInfo[]
  

}
export default function Category() {
  const data = useLoaderData() as LoaderData;
  const { filteredRankingData,TopSubscriber,TopView,TopClick } = data;

  const isLoggedIn = useRecoilValue(userLoggedInState);
 
  return (
    <div>
      <div>
        <div className="flex h-full mb-6 ">
          <div className="m-auto">
            <div className="ml-4 mb-1"> 순위 </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8" >
              <Topclick channel={TopClick}></Topclick>
              <TOP channel={TopSubscriber} title={"구독자 순위"}></TOP>
              <TOP channel={TopView} title={"조회수 순위"}></TOP>


            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full mb-6">
        <div className="">
          <div className="ml-4 mb-1" > 추천 영상 </div>
          {isLoggedIn ? <div className="" >
            <RecommandVideo></RecommandVideo>
          </div> : <span className="ml-4 flex justify-center" > 로그인이 필요한 서비스입니다 </span>}


        </div>
      </div>
      <hr className="ml-4"></hr>
      <div className="flex h-full">
        <div className="m-auto">
          <div className="ml-4 mb-1"> 카테코리 순위 </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8" >
            {filteredRankingData && filteredRankingData.map((channel, index) => (
              <Leaderboard key={index} img={channel.img} title={channel.title} rankings={channel.rankings}></Leaderboard>
            ))}
          </div>
        </div>
      </div>
      <hr className="ml-4"></hr>
 
    </div>
  )
}

export async function mainLoader() {



  const rankingData = await Promise.all(leaderboardData.map(async (item) => {
    const filter = item.title.split("|")[0];
    const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/RankingSort`, {
      sort: "subscribers",
      filter: filter,
      page: 1,
      ohter : "MAIN"
    });
    if (response && response.length > 0) {
      return { ...item, rankings: response };
    } else {
      return null;
    }
  }));
  const TopSubscriber = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/SubscriberTop`)
  const TopView = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/ViewTop`)
  const TopClick = await Getmethod(`${process.env.REACT_APP_BACKEND_API}/channellist/click/GetTopClickedChannel`)

 

  const filteredRankingData = rankingData.filter(item => item !== null);
  return { filteredRankingData , TopSubscriber, TopView, TopClick};
}