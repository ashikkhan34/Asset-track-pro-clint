import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import './managerNavbar.css'

const ManagerNavbar = () => {
    const {user,logOut} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: allUsers = [] ,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    console.log(allUsers)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const links = <>
    <NavLink to='/dashboards'><li><a>Home</a></li></NavLink>
    <NavLink to='/dashboards/assetList'><li><a>Asset List</a></li></NavLink>
    <NavLink to='/dashboards/addAsset'><li><a>Add an Asset</a></li></NavLink>
    <NavLink to='/dashboards/allRequest'><li><a>All Requests</a></li></NavLink>
    <NavLink to='/dashboards/myEmployee'><li><a>My Employee List</a></li></NavLink>
    <NavLink to='/dashboards/addEmployee'><li><a>Add an Employee</a></li></NavLink>
    <NavLink to='/dashboards/managerProfile'><li><a>Profile</a></li></NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-200 px-5 mx-auto">
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
                           
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                       Asset Management
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                {
                        user ? <>
                            <p className='mt-2 font-serif md:text-xl mr-3 '>{user?.displayName}</p>
                            <button onClick={handleLogOut} className='btn btn-primary'>Logout</button>
                        </> : <>
                            <Link to='/login'> <a className="btn">Login</a></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManagerNavbar;