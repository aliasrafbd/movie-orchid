import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import MovieCard from './MovieCard';

const FeaturedMovies = ({featuredMovies}) => {

    return (
        <>
            <h2 className='text-3xl my-12 font-extrabold text-center'>Featured Movies</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                {
                    featuredMovies.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                }
            </div>
            <div>
                <Link className='btn my-2 mx-auto flex justify-center max-w-[200px] items-center block btn-warning' to={`/allmovies`}>See all movies</Link>
            </div>
        </>

    );
};

export default FeaturedMovies;