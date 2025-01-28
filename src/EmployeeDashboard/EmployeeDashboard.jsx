import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import EmployeeNavbar from '../Dashborad/EmployeeNavbar/EmployeeNavbar';

const EmployeeDashboard = () => {
    return (
        <div>
            <EmployeeNavbar></EmployeeNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default EmployeeDashboard;