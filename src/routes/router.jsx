import {
    createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import MyFavorites from "../pages/MyFavorites";
import MovieDetails from "../pages/MovieDetails";
import UpdateAMovie from "../pages/UpdateAMovie";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: async () => {
                    const featuredMoviesRes = await fetch("https://movie-portal-server-three.vercel.app/featured/movies");
                    const featuredMovies = await featuredMoviesRes.json();

                    const trendingMoviesRes = await fetch("https://movie-portal-server-three.vercel.app/trending/movies");
                    const trendingMovies = await trendingMoviesRes.json();

                    return { featuredMovies, trendingMovies }
                },
            },
            {
                path: "/allmovies",
                element: <AllMovies></AllMovies>,
                loader: () => fetch("http://localhost:4000"),
            },
            {
                path: "/addmovie",
                element: <PrivateRoute><AddMovie></AddMovie></PrivateRoute>
            },
            {
                path: "/updatemovie/:id",
                element: <PrivateRoute><UpdateAMovie></UpdateAMovie></PrivateRoute>,
            },
            
            {
                path: "/favoritemovies",
                element: <PrivateRoute><MyFavorites></MyFavorites></PrivateRoute>,
                loader: () => fetch("https://movie-portal-server-three.vercel.app/favoritemovies"),
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/aboutus",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/moviedetails/:id",
                element: <PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>,
                loader:  ({params}) => fetch("http://localhost:4000"),
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    },
]);

export default router;
