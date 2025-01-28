import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UpdateAsset = () => {
    const { name, type, quantity,_id } = useLoaderData()
    console.log(name,type,quantity)
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const updateItems = {
            
            name: data.name,
            quantity: data.quantity,
            type: data.type,
            updatedDate: new Date()
        }
        const AssetRes = await axiosSecure.patch(`/assets/${_id}`, updateItems)
        console.log(AssetRes.data)
        if (AssetRes.data.modifiedCount > 0) {
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is modified to the Asset`,
                showConfirmButton: false,
                timer: 1500
            });

        }
    }
    return (
        <div>
            <div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-7 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" defaultValue={name} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <input {...register("quantity", { required: true })} min={10} type="number" placeholder="Product Quantity" className="input input-bordered" defaultValue={quantity} required />
                        </div>
                        <div className='form-control'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Product Type</span>
                                </div>
                                <select
                                    defaultValue={type}
                                    {...register('type', { required: true })}
                                    className="select select-ghost w-full ">
                                    <option disabled selected value='default'>Select Product Type</option>
                                    <option value='returnable'>returnable</option>
                                    <option value='non-returnable'>non-returnable</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Asset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UpdateAsset;