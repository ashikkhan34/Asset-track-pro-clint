import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';


const Chart = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allRequests = [] } = useQuery({
        queryKey: ['request_asset'],
        queryFn: async () => {
            const res = await axiosPublic.get('/request_asset')
            return res.data
        }
    })
    // const types = allRequests.map(data => {
    //     console.log(data.type)
    //     return { value: data.type }
    // })


    return (
        <div className="w-1/2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={allRequests}>
                    <Bar dataKey={allRequests.map(data => data.type)}fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;