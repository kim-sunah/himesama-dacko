import React from 'react';
import {  Input, Select } from '@chakra-ui/react';

import { Link, Outlet } from 'react-router-dom';


const YourComponent: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
            <header className="flex justify-between items-center py-6">
                <div className="flex space-x-4">
                    <Link to="Cars_Vehicles" style={{ whiteSpace: 'nowrap'}}>Cars & Vehicles</Link >
                    <Link to="Film_Animation" style={{ whiteSpace: 'nowrap'}}>Film & Animation</Link >
                    <Link to="Music" style={{ whiteSpace: 'nowrap'}}>Music</Link >
                    <Link to="Pets_Animals" style={{ whiteSpace: 'nowrap'}}>Pets & Animals</Link >
                    <Link to="Sports" style={{ whiteSpace: 'nowrap'}}>Sports</Link >
                    <Link to="Short_Movies" style={{ whiteSpace: 'nowrap'}}>Short Movies</Link >
                    <Link to="Travel_Events" style={{ whiteSpace: 'nowrap'}}>Travel & Events</Link >
                    <Link to="Gaming" style={{ whiteSpace: 'nowrap'}}>Gaming</Link >
                    <Link to="Videoblogging" style={{ whiteSpace: 'nowrap'}}>Videoblogging</Link >
                    <Link to="People_Blogs" style={{ whiteSpace: 'nowrap'}}>People & Blogs</Link >
                    <Link to="Comedy" style={{ whiteSpace: 'nowrap'}}>Comedy</Link >
                    <Link to="Entertainment" style={{ whiteSpace: 'nowrap'}}>Entertainment</Link >
                </div>
            </header>
            <div className="flex space-x-4 mt-2">
                <Link to="News_Politics" style={{ whiteSpace: 'nowrap'}}>News & Politics</Link >
                <Link to="How_to_Style" style={{ whiteSpace: 'nowrap'}}>How-to & Style</Link >
                <Link to="Education" style={{ whiteSpace: 'nowrap'}}>Education</Link >
                <Link to="Science_Technology" style={{ whiteSpace: 'nowrap'}}>Science & Technology</Link >
                <Link to="Non_profits_Activism" style={{ whiteSpace: 'nowrap'}}>Non-profits & Activism</Link >
                <Link to="Movies" style={{ whiteSpace: 'nowrap'}}>Movies</Link >
                <Link to="AnimeAnimation" style={{ whiteSpace: 'nowrap'}}>AnimeAnimation</Link >
                <Link to="ActionAdventure" style={{ whiteSpace: 'nowrap'}}>ActionAdventure</Link >
                <Link to="Classics" style={{ whiteSpace: 'nowrap'}}>Classics</Link >
                <Link to="Documentary" style={{ whiteSpace: 'nowrap'}}>Documentary</Link >
                <Link to="Drama" style={{ whiteSpace: 'nowrap'}}>Drama</Link >
                <Link to="Family" style={{ whiteSpace: 'nowrap'}}>Family</Link >
                
            </div>
            <div className="flex space-x-4 mt-8">
                <Link to="Foreign" style={{ whiteSpace: 'nowrap'}}>Foreign</Link >
                <Link to="Horror" style={{ whiteSpace: 'nowrap'}}>Horror</Link >
                <Link to="Sci_Fi_Fantasy" style={{ whiteSpace: 'nowrap'}}>Sci-FiFantasy</Link >
                <Link to="Thriller" style={{ whiteSpace: 'nowrap'}}>Thriller</Link >
                <Link to="Shorts" style={{ whiteSpace: 'nowrap'}}>Shorts</Link >
                <Link to="Shows" style={{ whiteSpace: 'nowrap'}}>Shows</Link >
                <Link to="Trailers"style={{ whiteSpace: 'nowrap'}}>Trailers</Link >
                <Link to="none"style={{ whiteSpace: 'nowrap'}}>그 외</Link >
            </div>
            <main>
                <Outlet></Outlet>
                </main>
        </div>

    );
};

export default YourComponent;
