import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Main from './pages/main/Main';
import Root from './pages/Root';
import CategoryRankings from './other/category/Category_Rankings';
import CategoryRankingsList from './other/category/Category_RankingList';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import VideoListHeader from './pages/seachvideo/header';
import VideSearchList from './pages/seachvideo/VideosearchList';
import List from './pages/seachvideo/List';
import Error from "./pages/error/Error"
import RankingRoot from './pages/ranking/RankingRoot';
import ConditionRoot from './pages/condition/db/ConditionRoot';
import ConditionInfluencerFilterBody from './pages/condition/db/Condition_InfluencerFilter_body';
import ConditionVideoFilterBody from './pages/condition/db/Condition_VideoFilter_body';
import YoutubeRoot from './pages/condition/youtube/Youtube_Root';
import YoutubeConditionInfluencer from './pages/condition/youtube/Youtube_Condition_Influencer';
import YoutubeConditionVideo from './pages/condition/youtube/Youtube_Condition_Video';
import Ranking from './pages/ranking/Ranking';
import IntroductionWebsite from './pages/introduction_website/IntroductionWebsite';
import LiveRoot from './pages/Live/LiveRoot';
import ChannelRoot from './pages/channel_detail/ChannelRoot';


function App() {
  const router = createBrowserRouter([
    
    {path:"",element:<Root></Root>, errorElement:<Error></Error>, children:[
      {index: true , element : <Main></Main>},
      {path :"Introduction", element:<IntroductionWebsite></IntroductionWebsite>},
      {path :"Live", element:<LiveRoot></LiveRoot>},
      {path : ":ChannelId" , element: <ChannelRoot></ChannelRoot>},
      {path: "Ranking", element:<RankingRoot></RankingRoot>, children :[
        // {path : ":pagenumber", element :<Ranking></Ranking>},
      ]},
      {path : "Category_Rankings", element: <CategoryRankings></CategoryRankings>, children:[
        {path : ":Categoryid" , element : <CategoryRankingsList></CategoryRankingsList>  }
      ]},
      {path :"seachlist/:search", element :<VideoListHeader></VideoListHeader>, children: [
        {index: true, element :<List></List>},
        {path : ":filter", element: <VideSearchList></VideSearchList>}
      ]},
      {path :"Condition_Search", element:<ConditionRoot></ConditionRoot>,children:[
        {path : "InfluencerFilter/:pagenumber", element:<ConditionInfluencerFilterBody></ConditionInfluencerFilterBody>},
        {path: "VideoFilter/:pagenumber", element:<ConditionVideoFilterBody></ConditionVideoFilterBody>}
      ]},
      {path :"YoutubeCondition", element:<YoutubeRoot></YoutubeRoot>,children:[
       { path : "InfluencerFilter" ,element : <YoutubeConditionInfluencer></YoutubeConditionInfluencer>},
       {path :"VideoFilter" ,element :<YoutubeConditionVideo></YoutubeConditionVideo>}
      ]}
      
    ]} 
  ])
  return (
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
  );
}

export default App;
