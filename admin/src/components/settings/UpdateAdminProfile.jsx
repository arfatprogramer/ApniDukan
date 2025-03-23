import React, { useContext, useState } from 'react'
import ImageConvert64 from '../../helper/ImageConvert64';
import { toast } from 'react-toastify';
import {  FaRegUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { updateAdminProfle, updateUser } from '../../common/ApiUrls';
import { ContextProvider } from '../../context';


const UpdateAdminProfile = ({ OnClose }) => {
    const { fetchUserData } = useContext(ContextProvider)
    const userData =useSelector(state=>state?.user?.user)
    const  token = useSelector((state) => state?.token?.token);
    //for password filed
    const [Data, setData] = useState(userData)
    const [uploadProfile, setUploadProfile] = useState(Data?.profile); 

    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('profile', uploadProfile);
        const formdata = await Object.fromEntries(formData);
     

        // api to insert data into database
        let serverResponse = await fetch(updateAdminProfle.url, {
            method: updateAdminProfle.method,
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({formdata,userToken:token}),
        })
        serverResponse = await serverResponse.json()
        if (serverResponse.success) {
            toast.success(serverResponse.message);
            fetchUserData()
            OnClose()
        } else {
            toast.error(serverResponse.message);
        }

    }

    const handelOnChange = (e) => {
        setData({
            ...Data,
            [e.target.name]: e.target.value
        })
    }

    const handelProfilePicture = async (e) => {
        const file = e.target.files[0];
        let data = await ImageConvert64(file);
        setUploadProfile(data);
    }

    return (
        <div className='fixed  bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 z-50'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-96  mx-auto border-2 border-black rounded-lg '>
                <div className=' relative my-2  p-2 max-w-sm  mx-auto border-2 border-black rounded-lg' >
                    <button onClick={OnClose} className='text-2xl absolute right-1 w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                    <div className='w-28 h-28 mx-auto pt-3 flex justify-center items-center py-3 relative overflow-hidden rounded-full'>
                        <div className="">
                            <img src={uploadProfile} alt="" />
                        </div>
                        <form className=" absolute bottom-0 w-full" onSubmit={handelProfilePicture}>
                            <label>
                                <p className="bg-gray-400 opacity-80 w-full py-4 px-2 text-center cursor-pointer">Upload</p>
                                <input type="file" name="profilePicture" className='hidden' onChange={handelProfilePicture} />
                            </label>
                        </form>
                    </div>

                    <form onSubmit={handelSubmit}>

                        <div className="w-full px-2 mb-2 ">
                            <label htmlFor="firstName">First Name</label>
                            <div className="flex w-full my-1 ">
                                <input type="text"
                                    name='firstName'
                                    value={Data?.firstName}
                                    placeholder='Enter your Name'
                                    onChange={handelOnChange}
                                    className='w-full outline-none py-1 px-3' required />
                                <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                            </div>
                        </div>

                        <div className="w-full px-2 mb-2 ">
                            <label htmlFor="lastName">Last Name</label>
                            <div className="flex w-full my-1 ">
                                <input type="text"
                                    name='lastName'
                                    value={Data?.lastName}
                                    onChange={handelOnChange}
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
                                    value={Data?.email}
                                    onChange={handelOnChange}
                                    className='w-full outline-none py-1 px-3' required />
                                <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                            </div>
                        </div>

                        <div className="w-full px-2 mb-2 ">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className="flex w-full my-1 ">
                                <input type="text"
                                    name='phoneNumber'
                                    value={Data?.phoneNumber}
                                    onChange={handelOnChange}
                                    placeholder='Phone Number'
                                    className='w-full outline-none py-1 px-3' required />
                                <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                            </div>
                        </div>

                        <div className="w-full px-2 mb-2 ">
                            <label htmlFor="dob">Date Of Birth</label>
                            <div className="flex w-full my-1 ">
                                <input type="date"
                                    name='dob'
                                    value={Data?.dob}
                                    onChange={handelOnChange}
                                    placeholder='Date Of Birth'
                                    className='w-full outline-none py-1 px-3' required />
                            </div>
                        </div>

                        <div className="w-full px-2 ">
                            <button type="submit" className='bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateAdminProfile
