import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"


import Main from './component/main/Main';
import ChannelList from './component/channellist/ChannelList';
import Headers from './component/header/Headers';
import Root from './component/Root';
import Subscriber_Rankings from './component/subscriber/Rankings';
import ViewRanking from './component/view/View_Ranking';
import CategoryRankings from './component/category/Category_Rankings';
import CategoryRankingsList from './component/category/Category_RankingList';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import VideoList from './component/videolist/header';
import Body from './component/body/Body';
import VideSearchList from './component/videolist/VideosearchList';
import List from './component/videolist/List';
import Error from "./component/error/Error"
import RankingRoot from './component/ranking/RankingRoot';
import ConditionSearch from './component/condition/Condition_Search_header';
import ConditionRoot from './component/condition/ConditionRoot';
import ConditionSearchBody from './component/condition/Condition_search_body';

function App() {
  const router = createBrowserRouter([
    
    {path:"",element:<Root></Root>, errorElement:<Error></Error>, children:[
      {index: true , element : <Main></Main>},
      {path : ":Id" , element: <Body></Body>},
      {path: "Ranking", element:<RankingRoot></RankingRoot>, children :[
        {path : "Subscriber_Rankings/:pagenumber", element :<Subscriber_Rankings></Subscriber_Rankings>},
        // {path : "View_Rankings/:pagenumber" , element : <ViewRanking></ViewRanking>},
      ]},
      {path : "Category_Rankings", element: <CategoryRankings></CategoryRankings>, children:[
        {path : ":Categoryid" , element : <CategoryRankingsList></CategoryRankingsList>  }
      ]},
      {path :"seachlist/:search", element :<VideoList></VideoList>, children: [
        {index: true, element :<List></List>},
        {path : ":filter", element: <VideSearchList></VideSearchList>}
      ]},
      {path :"Condition_Search", element:<ConditionRoot></ConditionRoot>,children:[
        {path : ":pagenumber", element:<ConditionSearchBody></ConditionSearchBody>}
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
