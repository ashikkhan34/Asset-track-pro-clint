import React from 'react';
import ManagerNavbar from './ManagerNavbar/ManagerNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const Dashborad = () => {
    return (
        <div>
            <div>
                <ManagerNavbar></ManagerNavbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashborad;