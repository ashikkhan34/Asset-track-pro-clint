import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../assets/b1.jpg'
import banner2 from '../../assets/b2.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel className='text-center'>
                <div className='relative'>
                    <img src={banner1} />
                    <button className=' btn btn-primary'>Join as an Employee</button>
                </div>
                <div>
                    <img src={banner2} />
                    <button className=' btn btn-primary '>Join as HR Manager</button>

                </div>
            </Carousel>
        </div>
    );
};

export default Banner;