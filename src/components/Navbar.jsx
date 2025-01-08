import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import siteLogo from '../../src/assets/logo-movie.png';
import { BsToggle2On } from "react-icons/bs";

const Navbar = () => {

    const { loading, setLoading, user, setUser, logOut } = useContext(AuthContext);


    const { pathname } = useLocation();

    const { handleNavigation, isDarkTheme, setIsDarkTheme } = useContext(AuthContext);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem('homeTheme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const Links = (<>


        <NavLink to="/"><button onClick={() => handleNavigation()}><li className='py-1 px-3 font-semibold'>Home</li></button></NavLink>
        <NavLink to="/allmovies"><button onClick={() => handleNavigation()}><li className='py-1 px-3 font-semibold'>All Movies</li></button></NavLink>

        {user && <NavLink to="/addmovie"><button><li className='py-1 px-3 font-semibold'>Add Movie</li></button></NavLink>}
        {user && <NavLink to="/favoritemovies"><button onClick={() => handleNavigation()}><li className='py-1 px-3 font-semibold'>Favorite Movies</li></button></NavLink>}

        <NavLink to="/aboutus"><button onClick={() => handleNavigation()}><li className='py-1 px-3 font-semibold'>About Us</li></button></NavLink>

        {
            !user && (<NavLink to="/login"><li className='py-1 px-3 font-semibold'>Login</li></NavLink>)
        }
        {
            !user && (<NavLink to="/register"><li className='py-1 px-3 font-semibold'>Register</li></NavLink>)
        }

    </>)

    return (
        <div className={`app sticky z-50 top-0 ${(isDarkTheme) && (pathname == "/") ? 'dark' : 'light'}`}>
            <div className="navbar-bg w-full">
                <div className="navbar mx-auto max-w-7xl px-4 md:px-16 py-2" >
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {Links}
                            </ul>
                        </div>
                        <img className='h-24 w-24' src={siteLogo} alt="" />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {Links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {
                            user ?
                                (
                                    <div className='flex gap-2 justify-center items-center'>

                                        <div className='tooltip tooltip-bottom text-2xl' data-tip={user?.displayName}>
                                            <img className='h-8 w-8 rounded-full' src={user?.photoURL} alt="" />
                                        </div>
                                        <Link><button onClick={logOut}>Logout</button></Link>
                                    </div>
                                ) : <Link to="/login">Login</Link>
                        }
                    </div>
                </div>
            </div>
            
            <div className={`${pathname == "/" ? 'absolute top-8 right-28' : 'hidden'}`}>
                <button
                    data-aos="fade-down" data-aos-delay="200" data-aos-duration="1000"
                    onClick={toggleTheme}
                    className="p-2 bg-gray-50 rounded-lg text-xl mt-2 transition-colors hover:bg-gray-400"
                >
                    <BsToggle2On className='text-black'></BsToggle2On>
                </button>
            </div>
        </div>
    );
};

export default Navbar;