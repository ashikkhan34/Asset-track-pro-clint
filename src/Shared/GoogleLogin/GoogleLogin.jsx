import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const GoogleLogin = () => {
    const {googleLogin} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleLogin = () =>{
        googleLogin()
        .then(result => {
            console.log(result.data)
            const userInfo = {
                email : result.user?.email,
                name : result.user?.displayName,
                role:'employee',
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
                console.log(res.data)
            })
            toast.success('login successful')
        })
        navigate('/employee-dashboard')
     }

    return (
        <div>
            <button onClick={handleGoogleLogin} className='btn bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 w-full'> <FaGoogle></FaGoogle> Continue with Google</button>
        </div>
    );
};

export default GoogleLogin;