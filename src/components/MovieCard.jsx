import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaStar } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AuthContext } from '../providers/AuthProvider';

const MovieCard = ({ movie, pathname }) => {

    const { _id, moviePoster, movieTitle, genre, duration, releaseYear, rating, summary, userEmail } = movie;

    const { isDarkTheme, setIsDarkTheme } = useContext(AuthContext);

        const toggleTheme = () => {
            setIsDarkTheme((prevTheme) => !prevTheme);
        };
    
        useEffect(() => {
            localStorage.setItem('homeTheme', isDarkTheme ? 'dark' : 'light');
        }, [isDarkTheme]);


    return (
        <div>
            <div className='gap-3 mx-auto w-[95%] lg:w-full bg-gray-100 shadow-3xl' data-aos="zoom-in">
                <div className='w-full'>
                    <img className='h-[200px] w-full shadow-xl' src={moviePoster} alt="" />
                </div>
                <div className='flex flex-col text-slate-900 p-2 w-full'>
                    <div className='flex-grow'>
                        <h1 className='text-xl mb-1 font-bold'> {movieTitle}</h1>
                        <p>It's a <span className='uppercase font-bold bg-slate-400 text-sm'>{genre}</span> movie. </p>
                        <p>{duration} minute</p>
                        <p><FaRegCalendarAlt className='inline mr-1' />  {releaseYear}</p>
                        <p><FaStar className='inline text-orange-600'/> {rating}</p>
                    </div>
                    {
                        pathname == "/favoritemovies" ? "" : (<Link className='border-b-2 mt-2 w-28 flex justify-center text-blue-600 hover:border-b-red-600 mx-auto text-center' to={`/moviedetails/${_id}`}>See Details...</Link>)
                    }
                </div>

            </div>
        </div>
    );
};

export default MovieCard;