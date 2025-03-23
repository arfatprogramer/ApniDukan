import React, { useState } from 'react'
import userAnimato from '../assets/signin.gif'
import { FaEyeSlash, FaRegUser, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import ImageConvert64 from '../helper/ImageConvert64';
// import { signup } from '../common/apiData.jsx'
import { toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
import { updateUser } from '../common/ApiUrls';
import { useSelector } from "react-redux";


const UserUpdate = ({ onClose, state,getAllUsersData }) => {

    const [updateUserData, setUpdateUserData] = useState(state)
    const  token = useSelector((state) => state?.token?.token);

    const handelChange = (e) => {
        setUpdateUserData({
            ...updateUserData,
            [e.target.name]: e.target.value
        })
    }

    const handelOnSubmit = async (e) => {
        e.preventDefault()
       
        const serverResponse = await fetch(updateUser.url, {
            method: updateUser.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body:JSON.stringify({userToken:token,updateUserData:updateUserData})
            
        })

        const serverResponseData = await serverResponse.json()
        if (serverResponseData.success) {
            toast.success(serverResponseData.message)
            onClose()
            getAllUsersData()   

        }
        if (serverResponseData.error) {
            toast.error(serverResponseData.message)
        }
        
    }

    return (

        <div className='fixed  bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 '>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-96  mx-auto border-2 border-black rounded-lg' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl">Update User</h1>
                    <button onClick={onClose} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                </div>
                <form onSubmit={handelOnSubmit}>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="firstName">First Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='firstName'
                                placeholder='Enter your Name'
                                value={updateUserData.firstName}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="lastName">Last Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='lastName'
                                value={updateUserData.lastName}
                                onChange={handelChange}
                                placeholder='Enter your Surname'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="email">Gmail</label>
                        <div className="flex w-full my-1 ">
                            <input type="email"
                                name='email'
                                placeholder='gmail'
                                value={updateUserData.email}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='phoneNumber'
                                placeholder='Phone Number'
                                value={updateUserData.phoneNumber}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 ">
                        <button type="submit" className='bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Update</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserUpdate
