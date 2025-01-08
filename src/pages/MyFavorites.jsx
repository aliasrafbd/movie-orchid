import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useLoaderData, useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyFavorites = () => {

    const { user } = useContext(AuthContext)
    const [currentUserEmail, setcurrentUserEmail] = useState(user?.email);

    // const loadedFavoriteMovies = useLoaderData();
    const [favoriteMovies, setFavoriteMovies] = useState()

    const { pathname } = useLocation();

    const handleToDeleteFav = (_id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://movie-portal-server-three.vercel.app/favoritemovies/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "A Movie is removed from Favorite",
                                icon: "success"
                            });
                            const remaining = favoriteMovies.filter(movie => movie._id != _id);
                            setFavoriteMovies(remaining);
                            // navigate("/allmovies")
                        }
                    })
            }
        });
    }


    useEffect(() => {
        // fetch(`https://movie-portal-server-three.vercel.app/favoritemovies?currEmail=${currentUserEmail}`)
        //     .then(res => res.json())
        //     .then(data => {
        //     setFavoriteMovies(data);
        // })

        axios.get(`https://movie-portal-server-three.vercel.app/favoritemovies?currEmail=${currentUserEmail}`, { withCredentials: true })
            .then(res => {
                setFavoriteMovies(res.data)
            })

    }, [currentUserEmail])

    return (
        <>
            <div className='max-w-7xl mt-8 mx-auto px-8 flex flex-col justify-center overflow-x-auto lg:overflow-x-hidden bg-red-200'>
                <table className="table text-center">

                    <thead className='font-extrabold hover:text-red-400'>
                        <tr>
                            <th></th>
                            <th>Movie Img</th>
                            <th>Movie Title</th>
                            <th>Movie Duration</th>
                            <th>Release Year </th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {

                            favoriteMovies?.map((movie, idx) => <>
                                <tr className="hover"></tr>
                                <th>{idx + 1}</th>
                                <td className='flex justify-center items-center'><img className='h-16 w-16 rounded-full' src={movie.moviePoster} alt="not valid" /></td>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.releaseYear}</td>
                                <td>{movie.genre}</td>
                                <td><button className='btn btn-error' onClick={() => handleToDeleteFav(movie._id)}>
                                         Delete Favorite
                                    </button></td>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyFavorites;