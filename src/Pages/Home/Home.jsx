import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Package from '../../Components/Package/Package';
import About from '../../Components/About/About';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Package></Package>
        </div>
    );
};

export default Home;