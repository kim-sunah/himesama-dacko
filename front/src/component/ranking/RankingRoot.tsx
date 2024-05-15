import { Link, Outlet } from "react-router-dom";

export default function RankingRoot() {
    return (
        <div>
                 <main className="bg-gray-100 py-6 px-4 " >
            <div className="container grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 " style={{marginLeft:"17.5%"}}>
            
            <Link to="Subscriber_Rankings" className="bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 px-4 py-2 rounded-full" style={{color:"white" ,textAlign:"center" ,width:"65%"}}>
                구독자
            </Link>
            <Link to="View_Rankings/1" className="bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 px-4 py-2  rounded-full" style={{color:"white" ,textAlign:"center",width:"65%"}}>
                조회수
            </Link>
            
            <button className="bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 px-4 py-2  rounded-full" style={{color:"white",width:"65%"}}>Focus</button>
            <button className="bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 px-4 py-2  rounded-full" style={{color:"white",width:"65%"}} >Focus</button>

            </div>
        </main>
        <Outlet></Outlet>
        

        </div>
   
    )
}