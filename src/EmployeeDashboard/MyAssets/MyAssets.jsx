import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from '../../Hooks/useAxiosPublic';

const MyAssets = () => {
    const axiosPublic = useAxiosPublic()
    const { data: requestedAsset = [] } = useQuery({
        queryKey: ['request_asset'],
        queryFn: async () => {
            const res = await axiosPublic.get('/request_asset')
            return res.data
        }
    })
    return (
        <>
            <div className='w-2/3 mx-auto bg-teal-100 p-4 rounded-2xl mt-3'>
                <div className='md:flex justify-between'>
                    <div >
                        <input type="search" name="search by name" className='border p-3 rounded-xl w-full' placeholder='search by name' />
                    </div>
                    <div className='flex gap-3'>
                        <select className='btn btn-outline'>
                            <option value="available" disabled>Availability</option>
                            <option value="available">available</option>
                            <option value="out of stock">out of stock</option>
                        </select>
                        <select className='btn btn-outline'>
                            <option value="Status" disabled>Status</option>
                            <option value="pending">Pending</option>
                            <option value="approve">Approve</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl text-center text-blue-700 p-3">My Requested Assets: ({requestedAsset.length})</h1>
            </div>
            <div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table max-w-7xl mx-auto rounded-lg">
                            {/* head */}
                            <thead className='bg-slate-200'>
                                <tr>
                                    <th>No.</th>
                                    <th>Asset Name</th>
                                    <th>Asset Type</th>
                                    <th>Status</th>
                                    <th>Request Date</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {requestedAsset?.map((asset, index) => <tr key={asset._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{asset.name}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.status}</td>
                                    <td>{asset.publishedDate}</td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyAssets;