import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

//IMAGE HOSTING
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateProfile = () => {
    const {email} = useLoaderData()
    console.log(email)
    const {user,_id} = useAuth()
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        //image upload to imgbb and then get an url
        const imageFile = { image: data.photoURL[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            //now send the menu item data to the server with the image url
            const userItem = {
                name: data.name,
                email:data.email,
                photoURL: res.data.data.display_url
            }
            const userRes = await axiosPublic.patch(`/users/${_id}`, userItem)
            console.log(userRes.data)
            if (userRes.data.modifiedCount > 0) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        }
        console.log(res.data)
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full-Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" defaultValue={user.displayName} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" value={user.email} required />
                            </div>
                            {/* <div className="form-control">
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
                            </div> */}
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
                                <button className="btn btn-primary">Update Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;