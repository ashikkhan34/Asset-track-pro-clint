import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Chart from '../Chart/Chart';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
import image from '../../assets/2.jpg'

const ManagerHome = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allRequests = [] } = useQuery({
        queryKey: ['request_asset'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request_asset')
            return res.data
        }
    })

    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/jwkPxvn/3.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Manager Home</h1>
                        <p className="mb-5">
                            List of Team Members: Displays a table or grid view of employees with their roles, tasks, and current statuses (e.g., active, on leave).
                            Quick Actions: Options like View Profile, Assign Task, or Remove from Team directly from the list.Current Team Size: Displays the total number of team members under the manager.
                            Active Projects: Number of ongoing projects being handled by the team.
                            Performance Stats: A quick view of team productivity, such as completed tasks, deadlines met, and overall project progress.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto mt-7 max-w-7xl mx-auto">
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
                            </tr>
                        </thead>
                        <tbody>
                            {allRequests?.slice(0, 5).map((user) => <tr key={user._id} className='hover'>
                                <td>{user.req_name}</td>
                                <td>{user.req_email}</td>
                                <td>{user.name}</td>
                                <td>{user.type}</td>
                                <td>{user.publishedDate}</td>
                                <td className='text-red-500'>{user.status}</td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Chart></Chart>
            </div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={image}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Asset Management System</h1>
                        <p className="py-6">
                            1. Asset Tracking
                            Asset Categories: Ability to categorize assets (e.g., IT equipment, machinery, vehicles, etc.).
                            Unique Identification: Each asset should have a unique ID or barcode.
                            Location Tracking: Record where each asset is located.
                            Ownership Details: Associate assets with employees, departments, or branches.
                            2. Asset Lifecycle Management
                            Procurement: Track when and from whom the asset was acquired.
                            Deployment: Monitor where and how the asset is being used.
                            Maintenance: Schedule regular maintenance and record service history.
                            Disposal: Manage assets that are retired or disposed of.
                            3. Asset Details
                            Name, type, and category of the asset.
                            Purchase date and warranty information.
                            Vendor or supplier details.
                            Current status: Active, Maintenance, Retired.
                            4. Reporting and Analytics
                            Asset Reports: Generate reports on asset usage, condition, and distribution.
                            Maintenance Logs: View maintenance history for specific assets.
                            Depreciation Reports: Automatically calculate asset depreciation over time.
                            Utilization Reports: Analyze asset utilization rates to identify underused or overused assets.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerHome;