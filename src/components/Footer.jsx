import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import siteLogo from '../../src/assets/logo-movie.png';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {



    const { pathname } = useLocation();

    const { isDarkTheme, setIsDarkTheme } = useContext(AuthContext);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem('homeTheme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    return (
        <div className={`app ${(isDarkTheme) && (pathname == "/") ? 'dark' : 'light'}`}>
            <footer className="md:ml-0 py-4 footer-bg footer p-2 mt-0 mb-0 mx-auto">
                <aside data-aos="zoom-in" className='ml-24 md:ml-0 lg:w-full mx-auto flex flex-col gap-3 justify-center items-center'>
                    <img className='h-36 w-36' src={siteLogo} alt="" />
                </aside>
                <nav className='mx-0 md:mx-5 lg:mx-0'>
                    <h6 className="footer-title">Activity</h6>
                    <div className='flex flex-row md:flex-col gap-4'>
                        <a href='/' className="link link-hover">Home</a>
                        <a href='/register' className="link link-hover">Register</a>
                        <a href='/login' className="link link-hover">Login</a>
                    </div>
                </nav>
                <nav className='mr-5'>
                    <h6 className="footer-title">Company</h6>
                    <div className='flex flex-row md:flex-col gap-4'>
                        <a href='/aboutus' className="link link-hover">About us</a>
                    </div>
                </nav>
                <nav className=''>
                    <h6 className="footer-title">Social</h6>
                    <div className='flex flex-row gap-4'>
                        <a href='https://www.facebook.com/aliasraf15' className="link text-3xl link-hover"><FaFacebook></FaFacebook></a>
                        <a href='https://x.com/asrafali_bd' className="link text-3xl link-hover"><FaXTwitter />
                        </a>
                        <a href='https://www.instagram.com/asraf_ali24/' className="link text-3xl link-hover"><FaInstagramSquare />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;