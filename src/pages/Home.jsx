import React, { useContext, useEffect } from 'react';
import Slider from '../components/Slider';
import FeaturedMovies from '../components/FeaturedMovies';
import PurchaseTicket from '../components/PurchaseTicket';
import TrendingNow from '../components/TrendingNow';
import { useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';
import MovieCategories from '../components/MovieCategories';




const Home = () => {

    const { pathname } = useLocation();

    const { loading } = useContext(AuthContext)


    const { featuredMovies, trendingMovies } = useLoaderData();

    const { isDarkTheme, setIsDarkTheme } = useContext(AuthContext);


    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem('homeTheme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    return (
        loading ? <Loading></Loading> : (


            <div
                className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
   
                <Slider></Slider>
                <MovieCategories></MovieCategories>
                <FeaturedMovies featuredMovies={featuredMovies}></FeaturedMovies>
                <TrendingNow trendingMovies={trendingMovies}></TrendingNow>
                <PurchaseTicket></PurchaseTicket>
            </div>)
    );
};

export default Home;