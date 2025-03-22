import React, { useContext, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { CancelOrder } from '../common/apiData'
import { toast } from "react-toastify";
import {ContextProvider  } from "../context/index";
import { useNavigate } from 'react-router-dom';

const CancelProduct = ({data, onClose}) => {
const [resion,setResion]=useState("");
const contex=useContext(ContextProvider)
const navigate=useNavigate()


const handelOnSubmit=async(e)=>{
    e.preventDefault();
    const payload={
        resion,
        Orderid:data._id,
        Status:"cancel"
    }
    const serverResponse=await fetch(CancelOrder.url,{
        method:CancelOrder.method,
        headers:{"content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify(payload)
    })
    const response=await serverResponse.json()
    if (response.success) {
        toast.success(response.message)
        contex.getOrderDetails()
        onClose();
        // navigate("/cancel")
    }
    if (response.error) {
        toast.error(response.message)
    }
    
    
}

const handelChange=(e)=>{   
    setResion(e.target.value)
}

  return (
    <div className='fixed max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden z-50'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px]   mx-auto border-2 border-black rounded-lg overflow-auto' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl w-full text-center">Cancel Product Form</h1>
                    <button onClick={onClose} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                </div>
                <form onSubmit={handelOnSubmit}>
                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="Description">Resion</label>
                        <div className="flex w-full my-1 ">
                            <textarea rows={5} type="text"
                                name='Description'
                                placeholder='Description'
                                id='Description'
                                value={resion}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>
                    <div className="w-full px-2 py-3 ">
                        <button type="submit" className='bg-red-600 px-3 py-2  border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-red-600 transition-all'>Submit</button>

                    </div>
                </form>
            </div>
        </div>
  )
}

export default CancelProduct
