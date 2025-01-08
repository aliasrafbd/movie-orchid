import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const AllMovies = () => {

    // const loadedAllMovies = useLoaderData();
    const { allMovies, setAllMovies } = useContext(AuthContext);
    const [searchMovies, setSearchMovies] = useState("");
    const [sortedByMovieTitle, setSortedByMovieTitle] = useState(null);


    // setAllMovies(loadedAllMovies);

    useEffect(() => {
        axios.get(`https://movie-portal-server-three.vercel.app/movies`)
            .then(res => {
                setAllMovies(res.data);
            })
    }, [])

    console.log(allMovies);

    const [search, setSearch] = useState("")

    useEffect(() => {
        // fetch(`http://localhost:4000?searchParams=${search}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setSearchMovies(data);
        //     })

        axios.get(`https://movie-portal-server-three.vercel.app/movies/?searchParams=${search}`)
            .then(res => {
                setSearchMovies(res.data);
            })

    }, [search])


    const sortByMovieTitle = () => {
        const sortedMovies = [...allMovies].sort((a, b) => {
            return a.movieTitle.trim().toLowerCase().localeCompare(b.movieTitle.trim().toLowerCase());
        });
        setSortedByMovieTitle(sortedMovies);
    };

    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-end'>
                    <div className='w-[370px] md:w-[400px] mt-6 mr-0 mx-auto mb-4'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            name='search'
                            placeholder='search'
                            className='input input-bordered w-full'
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button onClick={sortByMovieTitle} className='btn btn-success my-4'>Sort by Movie Title</button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        search ? searchMovies?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>) : sortedByMovieTitle ? sortedByMovieTitle?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>) : allMovies?.map((movie, idx) => <MovieCard key={idx} movie={movie}></MovieCard>)
                    }
                </div>
            </div>
        </>
    );
};

export default AllMovies;