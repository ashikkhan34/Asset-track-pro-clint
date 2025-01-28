import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FcApprove } from 'react-icons/fc';
import { useLoaderData } from 'react-router-dom';

const AllRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allRequests = [] ,refetch} = useQuery({
        queryKey: ['request_asset'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request_asset')
            return res.data
        }
    })

    //delete a request user
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
                axiosSecure.delete(`/request_asset/${user._id}`)
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
                <h1 className='text-3xl flex '>All Requested Users:<FaUsers className=' text-5xl items-center px-2'></FaUsers> {allRequests.length}</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-slate-200'>
                            <tr>
                                <th>Req_Name</th>
                                <th>Req_Email</th>
                                <th>Asset Name</th>
                                <th>Type</th>
                                <th>Req_Date</th>
                                <th>Status</th>
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRequests?.map((user) => <tr key={user._id} className='hover'>
                                <td>{user.req_name}</td>
                                <td>{user.req_email}</td>
                                <td>{user.name}</td>
                                <td>{user.type}</td>
                                <td>{user.publishedDate}</td>
                                <td>{user.status}</td>
                                <td className='btn'>Approve</td>
                                <td><button onClick={() => handleDeleteUser(user)} ><MdOutlineDeleteSweep className='text-red-700 text-2xl' /></button></td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllRequest;