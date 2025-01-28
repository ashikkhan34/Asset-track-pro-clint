import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import signUpLottie from '../../assets/signup.json'
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

//IMAGE HOSTING
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const ManagerLogin = () => {
    const { createUser ,updateUserProfile} = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPass, setShowPass] = useState()
    // const from = location.state?.pathname || '/dashboards';
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        //image upload to imgbb and then get an url
        const imageFile = { image: data.companyLogo[0] }
        // const imageFile2 = { image: data.userPhoto[1] }
        const res = await axios.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        createUser(data.email, data.password, data.photoURL)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.PhotoURL)
                    .then(() => {
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            company: data.company,
                            email: data.email,
                            price: parseInt(data.category),
                            birthday: data.birth,
                            role: 'manager',
                            requested_date: new Date(),
                            companyLogo: res.data.data.display_url,
                            // userPhoto: res.data.data.display_url,
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
                                    
                                }
                                
                            })
                            navigate('/login')

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
                    <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl my-16">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full-Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Company Name</span>
                                    </label>
                                    <input {...register("company", { required: true })} type="name" placeholder="company name" className="input input-bordered" required />
                                </div>
                            </div>
                            <div>
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
                                    <button onClick={() => setShowPass(!showPass)} className='absolute ml-[260px] md:ml-[480px] mt-14'>
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
                            </div>
                            <div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date of Birth</span>
                                    </label>
                                    <input {...register("birth", { required: true })} type="text" placeholder="Date of Birth" className="input input-bordered" required />
                                </div>
                                <div className='form-control'>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Category*</span>
                                        </div>
                                        <select
                                            defaultValue='default'
                                            {...register('category', { required: true })}
                                            className="select select-ghost w-full ">
                                            <option disabled selected value='default'>Select a Category</option>
                                            <option value='5'>5 Members for $5</option>
                                            <option value='8'>10 Members for $8</option>
                                            <option value='15'>20 Members for $15</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div >
                                <div className='mt-3'>
                                    <label className="label">
                                        <span className="label-text">Company logo</span>
                                    </label>
                                    <input
                                        {...register('companyLogo', { required: true })}
                                        type="file"
                                        className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Join as Manager</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerLogin;