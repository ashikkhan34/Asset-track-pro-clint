import React, { useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import Lottie from 'lottie-react';
import signUpLottie from '../../src/assets/signup.json'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleLogin from '../Shared/GoogleLogin/GoogleLogin';

const EmployeeLogin = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
        const {createUser,updateUserProfile} = useAuth()
    
    const [showPass, setShowPass] = useState()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
                createUser(data.email,data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser)
                    updateUserProfile(data.name,data.PhotoURL )
                        .then(() => {
                            //create user entry in the database
                            const employeeInfo = {
                                name: data.name,
                                email: data.email,
                                status:'pending',
                                role:'employee'

                            }
                            axiosPublic.post('/users', employeeInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset()
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Employee Create Successful",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        
                                    }
                                })
                                navigate('/employee-dashboard')
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Birth</span>
                                </label>
                                <input {...register("birth", { required: true })} type="text" placeholder="Date of Birth" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Join as Employee</button>
                            </div>
                            <div className='divider'></div>
                            <GoogleLogin></GoogleLogin>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;