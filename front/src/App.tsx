import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"


import Main from './component/main/Main';


import Root from './component/Root';
import Subscriber_Rankings from './component/subscriber/Rankings';
import ViewRanking from './component/view/View_Ranking';
import CategoryRankings from './component/category/Category_Rankings';
import CategoryRankingsList from './component/category/Category_RankingList';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import VideoListHeader from './component/videolist/header';
import Body from './component/body/Body';
import VideSearchList from './component/videolist/VideosearchList';
import List from './component/videolist/List';
import Error from "./component/error/Error"
import RankingRoot from './component/ranking/RankingRoot';
import ConditionSearch from './component/condition/Condition_Search_header';
import ConditionRoot from './component/condition/db/ConditionRoot';
import ConditionInfluencerFilterBody from './component/condition/db/Condition_InfluencerFilter_body';
import ConditionVideoFilterBody from './component/condition/db/Condition_VideoFilter_body';
import ConditionVideoFilterHeader from './component/condition/db/Condition_VideoFilter_header';
import YoutubeRoot from './component/condition/youtube/Youtube_Root';
import YoutubeConditionInfluencer from './component/condition/youtube/Youtube_Condition_Influencer';


function App() {
  const router = createBrowserRouter([
    
    {path:"",element:<Root></Root>, errorElement:<Error></Error>, children:[
      {index: true , element : <Main></Main>},
      {path : ":Id" , element: <Body></Body>},
      {path: "Ranking", element:<RankingRoot></RankingRoot>, children :[
        {path : ":pagenumber", element :<Subscriber_Rankings></Subscriber_Rankings>},
        // {path : "View_Rankings/:pagenumber" , element : <ViewRanking></ViewRanking>},
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
       { path : "InfluencerFilter" ,element : <YoutubeConditionInfluencer></YoutubeConditionInfluencer>}
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
