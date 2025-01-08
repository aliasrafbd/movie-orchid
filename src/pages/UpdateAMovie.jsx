import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Rating } from 'react-simple-star-rating';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateAMovie = () => {


    const { user, allMovies } = useContext(AuthContext);
    const { id } = useParams();

    const singleMovie = allMovies?.find(movie => movie._id == id);

    const {
        _id,
        moviePoster: prevPoster,
        movieTitle: prevTitle,
        genre: prevGenre,
        duration: prevDuration,
        releaseYear: prevReleaseYear,
        summary: prevSummary,
        rating: prevRating,
    } = singleMovie;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const [url, setUrl] = useState(prevPoster || "");
    const [title, setTitle] = useState(prevTitle || "");
    const [selectedGenre, setSelectedGenre] = useState(prevGenre || "");
    const [duration, setDuration] = useState(prevDuration || "");
    const [selectedYear, setSelectedYear] = useState(prevReleaseYear || currentYear);
    const [text, setText] = useState(prevSummary || "");
    const [rating, setRating] = useState(""); // Initialize rating correctly
    const [error, setError] = useState("");

    const genres = ["Comedy", "Drama", "Horror", "Action", "Science-Fiction", "Fantasy"];

    const isValidURL = (string) => {
        const regex = new RegExp(
            "^(https?:\\/\\/)?" +
            "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
            "localhost|" +
            "\\d{1,3}(\\.\\d{1,3}){3})" +
            "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$",
            "i"
        );
        return regex.test(string);
    };

    const handleUpdateMovie = (e) => {
        e.preventDefault();

        if (!url.trim()) {
            setError("Link cannot be empty.");
            return;
        } else if (!isValidURL(url)) {
            setError("Please enter a valid URL.");
            return;
        }

        if (title.trim().length < 2) {
            setError("Movie Title must be at least 2 characters long.");
            return;
        }

        if (!selectedGenre) {
            setError("Genre must be selected.");
            return;
        }

        if (!duration || parseInt(duration) <= 60) {
            setError("Duration must be greater than 60 minutes.");
            return;
        }

        if (!rating) {
            setError("Rating must be selected.");
            return;
        }

        if (text.trim().length < 10) {
            setError("Summary must be at least 10 characters long.");
            return;
        }

        setError("");

        const updatedMovieDetails = {
            moviePoster: url,
            movieTitle: title,
            genre: selectedGenre,
            duration,
            releaseYear: selectedYear,
            rating,
            summary: text,
        };

        fetch(`https://movie-portal-server-three.vercel.app/movies/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovieDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Movie Updated Successfully",
                        icon: "success",
                        confirmButtonText: "Close",
                    });
                }
            });
    };

    return (
        <div className="my-16 p-8 mx-auto max-w-5xl">
            <form onSubmit={handleUpdateMovie}>
            <div className='flex justify-center text-3xl mb-12'><button className="btn btn-warning">Update Movie</button></div>
                <div className="block md:grid space-y-4 md:space-y-0 grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Movie Poster</p>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Movie Title</p>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Genre</p>
                        <select
                            className="input input-bordered w-full"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="" disabled>
                                Choose a genre
                            </option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Duration</p>
                        <input
                            className="input input-bordered w-full"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Release Year</p>
                        <select
                            className="input input-bordered w-full"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-semibold">Rating:</p>
                        <Rating
                            onClick={(rate) => {
                                setRating(rate); 
                                if (error == "Rating must be selected.") setError("");
                            }}
                            ratingValue={rating * 20}
                            size={40}
                            fillColor="gold"
                            emptyColor="gray"
                        />
                    </div>
                    <div className="flex flex-col space-y-2 col-span-2">
                        <p className="font-semibold">Summary</p>
                        <textarea
                            className="textarea textarea-bordered"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={5}
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                <div className="flex justify-center items-center form-control mt-6">
                    <input type="submit" value="Update" className="btn btn-warning" />
                </div>
            </form>
        </div>
    );

};

export default UpdateAMovie;