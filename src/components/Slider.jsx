import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider_one from "../assets/slider-01.jpg";
import slider_two from "../assets/slider-02.jpg";
import slider_three from "../assets/slider-03.jpg";
import { AuthContext } from '../providers/AuthProvider';

const Slider = () => {

    const { isDarkTheme, setIsDarkTheme } = useContext(AuthContext);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

        useEffect(() => {
            localStorage.setItem('homeTheme', isDarkTheme ? 'dark' : 'light');
        }, [isDarkTheme]);

    return (
        <>
            <div className=''>
                <div className='mx-auto'>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]} // Enable desired features
                        spaceBetween={30} // Space between slides in pixels
                        slidesPerView={1} // Number of slides visible at once
                        //navigation // Show navigation arrows
                        pagination={{ clickable: true }} // Show pagination bullets

                    >
                        <SwiperSlide>
                            <div className=''>
                                <img className='h-[400px] md:h-[440px] w-[90%] mx-auto md:w-full' src={slider_one} alt="Slide 1" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=''>
                                <img className='h-[400px] md:h-[440px] w-[90%] mx-auto md:w-full' src={slider_two} alt="Slide 2" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=''>
                                <img className='h-[400px] md:h-[440px] w-[90%] mx-auto md:w-full' src={slider_three} alt="Slide 3" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </>
    );
};

export default Slider;