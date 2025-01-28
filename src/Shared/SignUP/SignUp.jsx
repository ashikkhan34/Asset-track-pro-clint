import React, { useContext, useState } from 'react';
import signUpLottie from '../../assets/signup.json'
import Lottie from 'lottie-react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';


//IMAGE HOSTING
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [showPass, setShowPass] = useState()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        //image upload to imgbb and then get an url
        const imageFile = { image: data.photoURL[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        createUser(data.email, data.password,data.photoURL)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.PhotoURL)
                    .then((result) => {
                        console.log(result.data)
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: res.data.data.photoURL
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Create Successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })

    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={signUpLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full-Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", {
                                        required: true, minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,}$/
                                    })}
                                    type={showPass ? 'text' : 'password'} placeholder="password" className="input input-bordered" required />
                                <button onClick={() => setShowPass(!showPass)} className='absolute ml-[280px] mt-14'>
                                    {
                                        showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </button>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                {errors.password?.type === "required" && (
                                    <p className='text-red-500'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-500'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-500'>Password must be 1 uppercase 1 lowercase 1 special character and 1 number</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-500'>Password less then 20 characters</p>
                                )}
                            </div>
                            <div className='mt-3'>
                            <label className="label">
                                    <span className="label-text">Choose Your Photo</span>
                                </label>
                                <input
                                    {...register('photoURL', { required: true })}
                                    type="file"
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            <p>Already have an account.Please <Link className='text-red-700 underline font-bold' to='/login'>Login</Link></p>

                            <div className='divider'></div>
                            <GoogleLogin></GoogleLogin>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;