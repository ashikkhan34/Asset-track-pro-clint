import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const AssetRequest = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const assetRequest = {
            req_name: user.displayName,
            req_email: user.email,
            name: data.name,
            type:data.type,
            quantity: data.quantity,
            availability: data.availability,
            publishedDate: new Date(),
            status: "pending"
        }
        const AssetRes = await axiosPublic.post('/requestedAsset', assetRequest)
        console.log(AssetRes.data)
        if (AssetRes.data.insertedId) {
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the Asset`,
                showConfirmButton: false,
                timer: 1500
            });

        }
    }
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-7 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asset Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className='form-control'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Product Type</span>
                            </div>
                            <select
                                defaultValue='default'
                                {...register('type', { required: true })}
                                className="select select-ghost w-full ">
                                <option disabled selected value='default'>Select Product Type</option>
                                <option value='returnable'>returnable</option>
                                <option value='non-returnable'>non-returnable</option>
                            </select>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Availability</span>
                            </div>
                            <select
                                defaultValue='default'
                                {...register('availability', { required: true })}
                                className="select select-ghost w-full ">
                                <option disabled selected value='default'>Availability</option>
                                <option value='Available'>Available</option>
                                <option value='Out of stock'>Out of stock</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value="Request" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssetRequest;