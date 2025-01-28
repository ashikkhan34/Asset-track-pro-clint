import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const ManagerProfile = () => {
    const { user } = useAuth()
    return (
        <div className='relative'>
            <div className='h-72 bg-cover w-2/3 mx-auto' style={{
                backgroundImage: "url(https://i.ibb.co.com/jwkPxvn/3.jpg)",
            }}>
            </div>

            <div className="avatar online ml-72 -mt-10">
                <div className="w-24 rounded-full">
                    {
                        user ? <>
                            <img src={user.photoURL} alt="" />
                        </> : <></>
                    }
                </div>

            </div>
            <div className='ml-72'>
                {
                    user ? <>
                        <p className='font-bold'>{user.displayName}</p>
                        <p className='font-semibold'>{user.email}</p>
                        <Link to={`/dashboards/updateProfile/${user._id}`}>
                <button className='btn btn-primary my-10'>Update Profile</button>
            </Link>
                    </> : <></>
                }
            </div>
            
        </div>
    );
};

export default ManagerProfile;