import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../common/ApiUrls';
import { toast } from 'react-toastify';
import UserUpdate from '../components/UserUpdate';
import DeleteConfirmBox from "../components/DeleteConfirmBox";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import Title from '../components/Title';
import { useSelector } from 'react-redux';



const Users = () => {
    const [userAllData, setUsersAllData] = useState([])
    const [showUserUpdate, setUserUpdate] = useState(false)
    const [openDeleteBox, setOpenDeleteBox] = useState(false)
    const [userUpdateData, setUserUpdateData] = useState({})
    const [deleteData, setDeleteData] = useState({})
    const  token = useSelector((state) => state?.token?.token);
    console.log(token);
    
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        newUsersToday: 243,
        activeUsers: 98520,
        churnRate: "2.4%",
    })


    const getAllUsersData = async () => {
        const serverResponse = await fetch(getAllUsers.url, {
            method: getAllUsers.method,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({userToken:token}),
            
        })
        const serverResponseData = await serverResponse.json()
        if (serverResponseData.success) {
            setUsersAllData(serverResponseData.data)

        } else {
            toast.error(serverResponseData.message)
        }

    }

    useEffect(() => {
        getAllUsersData()
    }, [])


    useEffect(() => {
        const getCurrentDate = () => new Date();

        const isActive = (updatedAt) => {
            const currentDate = getCurrentDate();
            const lastUpdated = new Date(updatedAt);
            const timeDiff = currentDate - lastUpdated;
            const daysDiff = timeDiff / (1000 * 3600 * 24); // Difference in days
            return daysDiff <= 30;
        };

        // Helper function to calculate if the user is new (created in the last 30 days)
        const isNewUser = (createdAt) => {
            const currentDate = getCurrentDate();
            const accountCreated = new Date(createdAt);
            const timeDiff = currentDate - accountCreated;
            const daysDiff = timeDiff / (1000 * 3600 *24 ); // Difference in days
            return daysDiff <= 1;
        };

        // Calculate the required metrics
        const calculateMetrics = (userAllData) => {
            let totalUsers = userAllData.length;
            let newUsers = 0;
            let activeUsers = 0;
            let churnedUsers = 0;

            // Loop through the users and calculate metrics
            userAllData.forEach((user) => {
                if (isNewUser(user.createdAt)) {
                    newUsers++;
                }
                if (isActive(user.updatedAt)) {
                    activeUsers++;
                } else {
                    churnedUsers++;
                }
            });
            // Calculate Churn Rate (percentage of churned users)
            const churnRate = totalUsers > 0 ? (churnedUsers / totalUsers) * 100 : 0;

            setUserStats({
                totalUsers: totalUsers,
                newUsersToday: newUsers,
                activeUsers: activeUsers,
                churnRate:churnRate,
            }) 
        };

        calculateMetrics(userAllData)

    }, [userAllData])


    return (
        <div>
            <Title title='All Users' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name='Total Users'
                        icon={UsersIcon}
                        value={userStats?.totalUsers.toLocaleString()}
                        color='#6366F1'
                    />
                    <StatCard
                        name='New Users Today'
                        icon={UserPlus}
                        value={userStats?.newUsersToday} color='#10B981' />
                    <StatCard
                        name='Active Users'
                        icon={UserCheck}
                        value={userStats?.activeUsers.toLocaleString()}
                        color='#F59E0B'
                    />
                    <StatCard name='Churn Rate' icon={UserX} value={Math.ceil(userStats.churnRate) +"%"} color='#EF4444' />
                </motion.div>

                <UsersTable
                    userData={userAllData}
                    setOpenDeleteBox={setOpenDeleteBox}
                    setUserUpdate={setUserUpdate}
                    setUserUpdateData={setUserUpdateData}
                    setDeleteData={setDeleteData} />

                {/* USER CHARTS */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
                    {/* <UserGrowthChart userAllData={userAllData} />
                    <UserActivityHeatmap />
                    <UserDemographicsChart /> */}
                </div>
            </main>

            {
                openDeleteBox && <DeleteConfirmBox 
                title="Delete User" 
                deleteData={deleteData} 
                onClose={() => setOpenDeleteBox(false)} 
                reloadData={getAllUsersData }
                text={"Are you sure delete the user?"} />
            }

            {showUserUpdate && <UserUpdate
                onClose={() => setUserUpdate(false)}
                state={userUpdateData}
                getAllUsersData={getAllUsersData}
            />}


        </div>
    )
}

export default Users
