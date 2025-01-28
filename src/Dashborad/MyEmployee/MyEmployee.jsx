import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaOutdent, FaUsers } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyEmployee = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] ,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
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
                        axiosSecure.delete(`/users/${user._id}`)
                            .then(res => {
                                if (res.data.deletedCount > 0) {
                                    refetch()
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: `${user.name} has been deleted`,
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
                <h1 className='text-3xl flex '>My Employee List:<FaUsers className=' text-5xl items-center px-2'></FaUsers> {users.length}</h1>
            </div>
            <div>

                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>image</th>
                                    <th>Name</th>
                                    <th>User Type/Role</th>
                                    <th>Delete from Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => <tr key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user.companyLogo}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td><button onClick={() => handleDeleteUser(user)}><MdAutoDelete className='text-2xl text-red-500' /></button></td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEmployee;