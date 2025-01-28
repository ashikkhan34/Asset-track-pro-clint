import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdBusAlert } from 'react-icons/md';
// import photo from '../../assets/banner1.jpg'


const EmployeeHome = () => {
    const axiosPublic = useAxiosPublic()
    const { data: requestedAsset = [] } = useQuery({
        queryKey: ['request_asset'],
        queryFn: async () => {
            const res = await axiosPublic.get('/request_asset')
            return res.data
        }
    })
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/tsTJvX9/1.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">My Assets</h1>
                        <p className="mb-5">
                        An asset management website is a platform designed to help businesses and organizations efficiently track, monitor, and manage their assets. It enables users to maintain detailed records of assets, including information such as purchase dates, current value, maintenance schedules, and ownership details. By providing tools for real-time tracking and updates, these websites improve operational efficiency and reduce manual efforts.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl text-center text-blue-700 p-3">My Requested Assets: ({requestedAsset.length})</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table rounded-lg">
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
            <h1 className="text-3xl text-purple-800 p-8 text-center items-center justify-center flex">Some Rules of this Website  <MdBusAlert className='ml-2 text-red-700' /></h1>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">1. Maintain Accurate and Up-to-Date Asset Records</div>
                <div className="collapse-content">
                    <p>#--Ensure all assets (physical, financial, or digital) are accurately documented and updated in real-time.
                        #--Include critical details such as asset name, type, purchase date, cost, current value, and owner.
                        #--Use unique identifiers like asset IDs or QR codes for easy tracking.</p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">2. Role-Based Access Control (RBAC)</div>
                <div className="collapse-content">
                    <p>#--Restrict access to sensitive data based on user roles (e.g., admin, manager, or employee).
                        #--Admins should have full access, while regular users only view or #--manage assets they are authorized for.
                        #--Ensure login and session security using authentication methods like JWT or OAuth.</p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">3. Audit Trails and History Tracking</div>
                <div className="collapse-content">
                    <p>#--Keep a detailed log of all actions performed on the system (e.g., who added, updated, or deleted an asset).
                        #--Include timestamps for all asset modifications to track changes #--over time.
                        #--Allow admins to review and filter logs to detect anomalies or unauthorized activities.</p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">4. Automated Notifications and Alerts</div>
                <div className="collapse-content">
                    <p>#--Send automated reminders for critical asset events, such as:
                        #--Warranty expirations
                        #--Maintenance schedules
                        #--Contract renewals or asset depreciation
                       #-- Notify admins or relevant users if an asset is about to expire or requires urgent attention.</p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">5. Secure Data Backup and Recovery</div>
                <div className="collapse-content">
                    <p>* Regularly back up asset records to prevent data loss in case of system failures or cyberattacks.
                        * Implement disaster recovery mechanisms to restore data quickly.
                        * Encrypt sensitive asset data both in transit and at rest to *ensure compliance with data protection regulations.</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHome;