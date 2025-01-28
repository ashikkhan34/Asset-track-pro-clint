import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdBrowserUpdated, MdOutlineDeleteSweep } from 'react-icons/md';
import { FaUpload, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { GrResources } from 'react-icons/gr';


const AssetList = () => {
    const axiosSecure = useAxiosSecure()
    const { data: assetLists = [],refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/assets')
            return res.data
        }
    })

     const handleDeleteUser = (user) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert dis!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/assets/${user._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        }
    return (
        <div>
                    <div className='flex justify-evenly bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 p-5'>
                        <h1 className='text-3xl flex '>Assets List:<GrResources className='text-3xl items-center m-2' /> {assetLists.length}</h1>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className='bg-slate-200'>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Published Date</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetLists?.map((user, index) => <tr key={user._id} className='hover'>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.type}</td>
                                        <td>{user.quantity}</td>
                                        <td>{user.publishedDate}</td>
                                        <td>
                                        <Link to={`/dashboards/updateAsset/${user._id}`}><MdBrowserUpdated className='text-2xl'/></Link>
                                        </td>
                                        <td><button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"><MdOutlineDeleteSweep className='text-red-700 text-2xl' /></button></td>
                                    </tr>)}
        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
};

export default AssetList;