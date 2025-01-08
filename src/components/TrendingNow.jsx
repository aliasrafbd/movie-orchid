import React, { useContext, useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const TrendingNow = ({trendingMovies}) => {

    return (
        <>
            <h2 className='text-3xl mt-28 mb-16 font-extrabold text-center'>Trending Movies</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                {
                    trendingMovies.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                }
            </div>
        </>

    );
};

export default TrendingNow;