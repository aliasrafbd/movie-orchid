import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import MovieCard from './MovieCard';
import axios from 'axios';

const MovieCategories = () => {

    const { allMovies, setAllMovies } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://movie-portal-server-three.vercel.app/movies`)
            .then(res => {
                setAllMovies(res.data);
            })
    }, [])


    const movieDrama = allMovies?.filter(movie => movie.genre == "drama");
    const movieHorror = allMovies?.filter(movie => movie.genre == "horror");
    const movieFantasy = allMovies?.filter(movie => movie.genre == "fantasy");
    const movieAction = allMovies?.filter(movie => movie.genre == "action");


    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl my-12 font-extrabold text-center'>Movie Categories</h2>
                <h3 className='font-bold text-xl'>DRAMA</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        movieDrama?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                    }
                </div>
                <h3 className='font-bold text-xl'>HORROR</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        movieHorror?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                    }
                </div>
                <h3 className='font-bold text-xl'>FANTASY</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        movieFantasy?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                    }
                </div>
                <h3 className='font-bold text-xl'>ACTION</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        movieAction?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                    }
                </div>
            </div>

        </>

    );
};

export default MovieCategories;