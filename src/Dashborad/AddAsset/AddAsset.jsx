import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddAsset = () => {
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        console.log(data)
        const assetItem = {
            name: data.name,
            quantity: data.quantity,
            type: data.type,
            publishedDate: new Date()
        }
        const AssetRes = await axiosSecure.post('/assets',assetItem)
            console.log(AssetRes.data)
            if(AssetRes.data.insertedId){
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
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="name" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Quantity</span>
                        </label>
                        <input {...register("quantity", { required: true })} min={10} type="number" placeholder="Product Quantity" className="input input-bordered" required />
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
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Asset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;