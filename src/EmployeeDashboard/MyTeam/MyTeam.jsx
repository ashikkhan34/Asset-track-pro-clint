import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';

const MyTeam = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })
    return (
        <div>
            <div className='flex justify-evenly bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 p-5'>
                <h1 className='text-3xl flex '>My Team All Members:<FaUsers className=' text-5xl items-center px-2'></FaUsers> {users.length}</h1>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>image</th>
                                <th>Name</th>
                                <th>User Type/Role</th>
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
                                </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;