import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../providers/AuthProvider';
import { Rating } from 'react-simple-star-rating'

const AddMovie = () => {

    const { user } = useContext(AuthContext);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index); 

    const [selectedYear, setSelectedYear] = useState(currentYear); 

    const [rating, setRating] = useState(0);

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");


    const handleRating = (rate) => {
        setRating(rate);
    }


    const [selectedGenre, setSelectedGenre] = useState("");

    const genres = ["Comedy", "Drama", "Horror", "Action", "Science-Fiction", "Fantasy"];



    const handleURLChange = (e) => {
        setUrl(e.target.value);
        setError(""); // Clear error message on input
    };

    const handleChange = (event) => {
        setSelectedGenre(event.target.value);
    };


    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };


    const handleTextAreaChange = (e) => {
        setText(e.target.value);
        setError(""); // Clear error message as user types
    };

    const handleAddAMovie = (e) => {
        e.preventDefault();

        const form = e.target;
        const moviePoster = form.movieposter.value;
        const movieTitle = form.movietitle.value;
        const genre = selectedGenre;
        const duration = form.duration.value;
        const releaseYear = selectedYear;
        const summary = text;

        const userEmail = user.email;

        const addMovieDetails = { moviePoster, movieTitle, genre, duration, releaseYear, rating, summary}
        const addMovieWithEmail = { moviePoster, movieTitle, genre, duration, releaseYear, rating, summary, userEmail }

        if (url.trim() === "") {
            setError("Link cannot be empty.");
            return;
        }
        else {
            setError(""); // Clear error
        }

        if (movieTitle.trim() === "") {
            setError("Movile Title cannot be empty.");
            return;
        } else if (movieTitle.length < 2) {
            setError("Movile Title must be at least 02 characters long.");
            return;
        } else {
            setError(""); // Clear error
        }

        if (duration == "" || parseInt(duration) <= 60) {
            setError("Duration must be greater than 60", error)
            return;
        }
        else {
            setError(""); // Clear error
        }

        if (!rating) {
            setError("Should select a rating at least", error)
            return;
        }
        else {
            setError(""); // Clear error
        }

        if (text.trim() === "") {
            setError("Summary cannot be empty.");
            return;
        } else if (text.length < 10) {
            setError("Summary must be at least 10 characters long.");
            return;
        } else {
            setError(""); // Clear error
        }

        // send data to the server
        fetch('https://movie-portal-server-three.vercel.app/movies', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addMovieDetails)
        })
            .then(res => res.json())
            .then(data => { 
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added a movie',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    return (
        <div className='my-16 p-8 mx-auto max-w-5xl'>
            <form className='' onSubmit={handleAddAMovie}>
            <div className='flex justify-center text-3xl mb-12'><button className="btn btn-warning">Add a Movie</button></div>
                <div className='block md:grid space-y-4 md:space-y-0 grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8'>
                    <div className='flex flex-col space-y-2'>
                        <p className="font-semibold">Movie Poster</p>
                        <input className="input input-bordered w-full" type='url' 
                        id="urlInput"
                        value={url}
                        onChange={handleURLChange}
                        name='movieposter' placeholder="Movie Poster" />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className="font-semibold">Movie Title</p>
                        <input className="input input-bordered w-full" type='text' name='movietitle' placeholder="Movie Title" />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className="font-semibold">Genre</p>
                        <select
                            id="genre"
                            name="genre"
                            value={selectedGenre}
                            onChange={handleChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>
                                Choose a genre
                            </option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre.toLowerCase()}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className="font-semibold">Duration</p>
                        <input className="input input-bordered w-full" type='number' name='duration' placeholder="Duration" />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className="font-semibold">Release Year</p>
                        <select
                            id="year"
                            name="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className="font-semibold">Rating: </p>
                        {/* Add a wrapper with enforced horizontal layout */}
                        <div className="flex flex-row items-center justify-center gap-2 rating-container">
                            <Rating
                                onClick={handleRating}
                                ratingValue={rating}
                                size={40} // Size of the stars
                                fillColor="gold" // Filled star color
                                emptyColor="gray" // Empty star color
                            />
                        </div>
                    </div>
                    <div className='flex col-span-2 flex-col space-y-2'>
                        <p className="font-semibold">Summary</p>
                        <textarea className="textarea textarea:lg textarea-bordered"
                            id="text"
                            value={text}
                            name='text'
                            onChange={handleTextAreaChange}
                            rows={5} placeholder="Summary"></textarea>
                        <p>{error && <p className="text-red-500 text-sm mt-2">{error}</p>}</p>
                    </div>

                </div>
                <div className="flex justify-center items-center form-control mt-6">
                    <button className="btn btn-warning">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddMovie;