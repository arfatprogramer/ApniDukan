import React, { useContext, useState } from 'react'
import { addAddress } from '../common/apiData'
import {toast} from "react-toastify"
import { ContextProvider } from '../context/index.jsx';
import {  useNavigate } from 'react-router-dom';


const AddressPage = () => {

    const [address, setAddress] = useState({})
    const{fetchAddress}=useContext(ContextProvider)
    const navigate=useNavigate()
    



    const handelOnSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(addAddress.url, {
            method: addAddress.method,
            credentials: 'include',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({ address })
        })
        const data = await response.json()
        if (data.success) {
            toast.success('Address Added Successfully')
            await fetchAddress()
            navigate('/')
            
        }



    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
    }
    return (
        <div className='flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px] h-[650px]  mx-auto border-2 border-black rounded-lg overflow-auto' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl"> New Address</h1>
                </div>
                <form onSubmit={handelOnSubmit}>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="name">Full Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='name'
                                id='name'
                                placeholder='Enter your name'
                                value={address.name}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="number">Mobile Number</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='number'
                                id='number'
                                value={address.number}
                                onChange={handelChange}
                                placeholder='Phone Number'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="line1">Address Line 1</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='line1'
                                id='line1'
                                value={address.line1}
                                onChange={handelChange}
                                placeholder='Flat Number, building name,'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="line2">Address Line 2</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='line2'
                                id='line2'
                                value={address.line2}
                                onChange={handelChange}
                                placeholder='Street, road,'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="city">City / Village/ district</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='city'
                                id='city'
                                value={address.city}
                                onChange={handelChange}
                                placeholder='City / Village/ district,'
                                className='w-full outline-none py-1 px-3' />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>
                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="landmark">Land Mark</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='landmark'
                                id='landmark'
                                value={address.landmark}
                                onChange={handelChange}
                                placeholder='land mark'
                                className='w-full outline-none py-1 px-3' />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="state">State</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='state'
                                id='state'
                                value={address.state}
                                onChange={handelChange}
                                placeholder='Street, road,'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>



                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="pinCode">Pin Code</label>
                        <div className="flex w-full my-1 ">
                            <input type="number"
                                name='pinCode'
                                id='pinCode'
                                placeholder='Product Price'
                                value={address.pinCode}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            {/* <div className=" flex items-center justify-center bg-white px-3"></div> */}
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="number2">Alternative Phone Number</label>
                        <div className="flex w-full my-1 ">
                            <input type="number"
                                name='number2'
                                placeholder='Optional'
                                id='number2'
                                value={address.number2}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' />
                            {/* <div className=" flex items-center justify-center bg-white px-3"></div> */}
                        </div>
                    </div>

                    <div className="w-full px-2 py-3 ">
                        <button type="submit" className='bg-blue-600 px-3 py-2  border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Add</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressPage
