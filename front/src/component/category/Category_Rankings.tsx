import React from 'react';
import { Input, Select, Table } from '@chakra-ui/react';

import { Link, Outlet } from 'react-router-dom';
import "./Category.css"


const YourComponent: React.FC = () => {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 " >
                <div className="flex flex-col gap-2"  style={{height:"100%"}}>
                <div className="flex h-[60px] items-center justify-center px-6" >
                            {/* <Package2Icon className="h-6 w-6" /> */}
                            <span style={{fontWeight : "bold"}}>카테고리</span>
                    </div>
                    <div className="flex-1 overflow-auto "  id="scrollbar" >
                        <nav className="grid items-start px-4 text-sm font-medium " style={{ gap: "2%", fontWeight : "bold" }}>
                            <Link to="News_Politics" style={{ whiteSpace: 'nowrap' }}>News & Politics</Link >
                            <Link to="Cars_Vehicles" style={{ whiteSpace: 'nowrap' }}>Cars & Vehicles</Link >
                            <Link to="Film_Animation" style={{ whiteSpace: 'nowrap' }}>Film & Animation</Link >
                            <Link to="Music" style={{ whiteSpace: 'nowrap' }}>Music</Link >
                            <Link to="Pets_Animals" style={{ whiteSpace: 'nowrap' }}>Pets & Animals</Link >
                            <Link to="Sports" style={{ whiteSpace: 'nowrap' }}>Sports</Link >
                            <Link to="Short_Movies" style={{ whiteSpace: 'nowrap' }}>Short Movies</Link >
                            <Link to="Travel_Events" style={{ whiteSpace: 'nowrap' }}>Travel & Events</Link >
                            <Link to="Gaming" style={{ whiteSpace: 'nowrap' }}>Gaming</Link >
                            <Link to="Videoblogging" style={{ whiteSpace: 'nowrap' }}>Videoblogging</Link >
                            <Link to="People_Blogs" style={{ whiteSpace: 'nowrap' }}>People & Blogs</Link >
                            <Link to="Comedy" style={{ whiteSpace: 'nowrap' }}>Comedy</Link >
                            <Link to="Entertainment" style={{ whiteSpace: 'nowrap' }}>Entertainment</Link >
                            <Link to="News_Politics" style={{ whiteSpace: 'nowrap' }}>News & Politics</Link >
                            <Link to="How_to_Style" style={{ whiteSpace: 'nowrap' }}>How-to & Style</Link >
                            <Link to="Education" style={{ whiteSpace: 'nowrap' }}>Education</Link >
                            <Link to="Science_Technology" style={{ whiteSpace: 'nowrap' }}>Science & Technology</Link >
                            <Link to="Non_profits_Activism" style={{ whiteSpace: 'nowrap' }}>Non-profits & Activism</Link >
                            <Link to="Movies" style={{ whiteSpace: 'nowrap' }}>Movies</Link >
                            <Link to="AnimeAnimation" style={{ whiteSpace: 'nowrap' }}>AnimeAnimation</Link >
                            <Link to="ActionAdventure" style={{ whiteSpace: 'nowrap' }}>ActionAdventure</Link >
                            <Link to="Classics" style={{ whiteSpace: 'nowrap' }}>Classics</Link >
                            <Link to="Documentary" style={{ whiteSpace: 'nowrap' }}>Documentary</Link >
                            <Link to="Drama" style={{ whiteSpace: 'nowrap' }}>Drama</Link >
                            <Link to="Family" style={{ whiteSpace: 'nowrap' }}>Family</Link >
                            <Link to="Foreign" style={{ whiteSpace: 'nowrap' }}>Foreign</Link >
                            <Link to="Horror" style={{ whiteSpace: 'nowrap' }}>Horror</Link >
                            <Link to="Sci_Fi_Fantasy" style={{ whiteSpace: 'nowrap' }}>Sci-FiFantasy</Link >
                            <Link to="Thriller" style={{ whiteSpace: 'nowrap' }}>Thriller</Link >
                            <Link to="Shorts" style={{ whiteSpace: 'nowrap' }}>Shorts</Link >
                            <Link to="Shows" style={{ whiteSpace: 'nowrap' }}>Shows</Link >
                            <Link to="Trailers" style={{ whiteSpace: 'nowrap' }}>Trailers</Link >
                            <Link to="none" style={{ whiteSpace: 'nowrap' }}>그 외</Link >
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <div className="w-full">
                        <h1 className="font-semibold text-lg">카테고리별 순위</h1>
                    </div>
                </header>

                <Outlet></Outlet>
            

            </div>
         

        </div>

    );
};

export default YourComponent;
