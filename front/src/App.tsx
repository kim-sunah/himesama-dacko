import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"

import Header from './component/header/Header';
import Main from './component/main/Main';
import ChannelList from './component/channellist/ChannelList';
import Headers from './component/header/Headers';
import Root from './component/Root';
import Subscriber_Rankings from './component/subscriber/Subscriber_Rankings';
import ViewRanking from './component/view/View_Ranking';
import CategoryRankings from './component/category/Category_Rankings';
import CategoryRankingsList from './component/category/Category_RankingList';

function App() {
  const router = createBrowserRouter([
    {path:"",element:<Root></Root>, children:[
      {index:true , element : <Main></Main>},
      {path : "Subscriber_Rankings", element :<Subscriber_Rankings></Subscriber_Rankings>},
      {path : "View_Rankings" , element : <ViewRanking></ViewRanking>},
      {path : "Category_Rankings", element: <CategoryRankings></CategoryRankings>, children:[
        {path : ":Categoryid" , element : <CategoryRankingsList></CategoryRankingsList>  }
      ]}
    ]} 
  ])
  return (
    
       <RouterProvider router={router}></RouterProvider>
  
   
  );
}

export default App;
