import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth()
    console.log(user)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const links = <>
        <NavLink to='/'><li><a>Home</a></li></NavLink>
        <NavLink to='/employeeLogin'><li><a>Join as Employee</a></li></NavLink>
        <NavLink to='/managerLogin'><li><a>Join as HR Manager</a></li></NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 fixed z-10 bg-opacity-30">
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
                    <Link><img className='w-20' src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
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

export default Navbar;