import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Category, { mainLoader } from './pages/main/Category';
import Root from './pages/Root';
import CategoryRankings from './other/category/Category_Rankings';
import CategoryRankingsList from './other/category/Category_RankingList';
import { Provider } from 'react-redux';
import { store } from "./store/store"
import VideoListHeader from './pages/seachvideo/header';
import VideSearchList from './pages/seachvideo/VideosearchList';
import List from './pages/seachvideo/List';
import Error from "./pages/error/Error"

import ConditionRoot from './pages/condition/db/ConditionRoot';
import ConditionInfluencerFilterBody from './pages/condition/db/Condition_InfluencerFilter_body';
import ConditionVideoFilterBody from './pages/condition/db/Condition_VideoFilter_body';
import YoutubeRoot from './pages/condition/youtube/Youtube_Root';
import YoutubeConditionInfluencer from './pages/condition/youtube/Youtube_Condition_Influencer';
import YoutubeConditionVideo from './pages/condition/youtube/Youtube_Condition_Video';
import IntroductionWebsite from './pages/introduction_website/IntroductionWebsite';
import LiveRoot from './pages/Live/LiveRoot';
import ChannelRoot from './pages/channel_detail/ChannelRoot';
import RankingList from "./pages/ranking/RankingList";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import Channel_Datail_Video_Root from "./pages/channel_detail/video/Root";
import Header_SideBar from "./pages/main/header/Header_Sidebar";
import KakaoRedirect from "./pages/login/KaKaoRedirect";
import MainRoot from "./pages/main/MainRoot";


function App() {
  const router = createBrowserRouter([

    {
      path: "", element: <MainRoot></MainRoot>, errorElement: <Error></Error>, children: [
        { index: true, element: <Category></Category>, loader: mainLoader },
        { path: "Introduction", element: <IntroductionWebsite></IntroductionWebsite> },
        { path: "Live", element: <LiveRoot></LiveRoot> },
        {
          path: ":ChannelId", children: [
            { index: true, element: <ChannelRoot></ChannelRoot> },
            { path: ":videoId", element: <Channel_Datail_Video_Root></Channel_Datail_Video_Root> }
          ]
        },
        {
          path: "Ranking", children: [
            { path: ":sort/:filter", element: <RankingList></RankingList> },
          ]
        },
        {
          path: "Category_Rankings", element: <CategoryRankings></CategoryRankings>, children: [
            { path: ":Categoryid", element: <CategoryRankingsList></CategoryRankingsList> }
          ]
        },
        {
          path: "seachlist/:search", element: <VideoListHeader></VideoListHeader>, children: [
            { index: true, element: <List></List> },
            { path: ":filter", element: <VideSearchList></VideSearchList> }
          ]
        },
        {
          path: "Condition_Search", element: <ConditionRoot></ConditionRoot>, children: [
            { path: "InfluencerFilter/:pagenumber", element: <ConditionInfluencerFilterBody></ConditionInfluencerFilterBody> },
            { path: "VideoFilter/:pagenumber", element: <ConditionVideoFilterBody></ConditionVideoFilterBody> }
          ]
        },
        {
          path: "YoutubeCondition", element: <YoutubeRoot></YoutubeRoot>, children: [
            { path: "InfluencerFilter", element: <YoutubeConditionInfluencer></YoutubeConditionInfluencer> },
            { path: "VideoFilter", element: <YoutubeConditionVideo></YoutubeConditionVideo> }
          ]
        },
        {
          path: "*",
          element: <Error />
        }
      ]
    },
    { path: 'Login/kakao', element: <KakaoRedirect></KakaoRedirect> },
  ])
  return (
    <RecoilRoot>
      <CookiesProvider>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </CookiesProvider>
    </RecoilRoot>



  );
}

export default App;
