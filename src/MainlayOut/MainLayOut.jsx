import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../Shared/Footer/Footer';

const MainLayOut = () => {
    return (
        <div>
            <Toaster></Toaster>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;