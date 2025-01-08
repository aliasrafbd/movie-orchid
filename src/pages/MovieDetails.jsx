import React, { useContext, useEffect } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";



const MovieDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user, allMovies, setAllMovies } = useContext(AuthContext);

    const userEmail = user.email;

    useEffect(() => {
        axios.get(`https://movie-portal-server-three.vercel.app/movies`)
        .then(res => {
            setAllMovies(res.data);
        })
    }, [])

    const singleMovie = allMovies?.find(movie => movie._id == id);

    const { _id, moviePoster, movieTitle, genre, duration, releaseYear, rating, summary } = singleMovie;
    const singleMovieWithoutId = { moviePoster, movieTitle, genre, duration, releaseYear, rating, summary }

    const handleAddToFav = () => {
        
        // send data to the server
        fetch('https://movie-portal-server-three.vercel.app/favoritemovies', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ...singleMovieWithoutId, userEmail })
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added a movie on Favorites',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    const handleDeleteAMovie = (id) => {
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
                

                fetch(`https://movie-portal-server-three.vercel.app/movies/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "A Movie is deleted.",
                                icon: "success"
                            });
                            const remaining = allMovies?.filter(movie => movie._id !== id);
                            setAllMovies(remaining);
                            navigate("/allmovies")
                        }
                    })
            }
        });
    }

    return (
        <>
            <div className='block lg:flex mx-auto max-w-7xl my-12 gap-6'>
                <div className='w-[80%] text-center mx-auto md:w-1/3'>
                    <img className='w-[90%] h-[500px] mx-auto drop-shadow-xl' src={moviePoster} alt="" />
                </div>
                <div className=' p-8 block md:flex gap-12 md:w-2/3 justify-between'>
                    <div className='md:w-[60%] w-full'>
                        <div className='my-4 text-3xl md:text-5xl font-extrabold'>{movieTitle}</div>
                        <div className='grid grid-cols-2'>
                            <h2 className='text-md my-2'><span className='font-bold'></span><FaStar className='inline text-orange-600'/> {rating}</h2>
                            <h2 className='text-md my-2'><span className='font-bold'></span> It's a <span className='font-bold uppercase'>{genre}</span> movie </h2>
                            <h2 className='text-md my-2'><span className='font-bold'></span> {duration} minute</h2>
                            <h2 className='text-md my-2'><span className='font-bold'></span> <FaRegCalendarAlt className='inline mr-1' /> 
                             {releaseYear}</h2>
                        </div>
                        <h1 className='bg-red-700 p-2 text-white rounded-lg text-center w-[150px] my-4 font-bold'>Summary</h1>
                        <div className='text-justify'>{summary}</div>
                    </div>
                    <div className='flex flex-col md:mt-0 mt-12 justify-center'>
                        <Link className='btn mr-4 my-2 btn-warning' to={`/addmovie`}>Add a new Movie</Link>
                        <Link className='btn mr-4 my-2 btn-secondary' to={`/updatemovie/${_id}`}>Update This Movie</Link>
                        <button onClick={() => handleDeleteAMovie(_id)} className='btn my-2 mr-4 bg-red-500 text-white'>Delete This Movie</button>
                        <button onClick={() => handleAddToFav()} className='btn my-2 mr-4 bg-red-500 text-white'>Add to Favorites</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MovieDetails;