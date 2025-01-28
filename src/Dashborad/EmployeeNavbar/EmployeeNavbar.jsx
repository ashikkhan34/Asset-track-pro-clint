import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import logo from '../../assets/el.jpg'

const EmployeeNavbar = () => {
    const {user,logOut} = useAuth()
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const employeeLinks = <>

        <NavLink to='/employee-dashboard'> <li><a>Home</a></li></NavLink>
        <NavLink to='/employee-dashboard/myAssets'> <li><a>My Assets</a></li></NavLink>
        <NavLink to='/employee-dashboard/myTeam'> <li><a>My Team</a></li></NavLink>
        <NavLink to='/employee-dashboard/assetRequest'> <li><a>Request for an Asset</a></li></NavLink>

    </>
    return (
        <div>
            <div className="navbar bg-base-200">
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
                           {employeeLinks}
                        </ul>
                    </div>
                    <Link to='/employee-dashboard'><img className='w-10' src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {employeeLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                {
                        user ? <>
                            <p className='mt-2 font-serif md:text-xl '>{user?.displayName}</p>
                            <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" />
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

export default EmployeeNavbar;