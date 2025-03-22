
import React from 'react'
import { useState } from 'react';
import { toast } from "react-toastify";

const DeleteConfirmBox = ({ title, onClose, text, deleteData,reloadData }) => {
    const [disable,setDisable]=useState(false)

const handelOnSubmit=async(e)=>{
    e.preventDefault()
    setDisable(true) 
    const req=await fetch(deleteData.url.url,{
        method:deleteData.url.method,
        credentials:"include",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({_id:deleteData._id})
    })
    const res=await req.json()
    if (res.success) {
        toast.success(res.message)
        reloadData()
        setDisable(false)
        onClose()  
    }
    if (res.error) {
        toast.error(res.message) 
        setDisable(false)
    }
    
}

    return (
        <div className='fixed  bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 '>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-96  mx-auto border-2 border-black rounded-lg' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl">{title}</h1>
                </div>
                <form onSubmit={handelOnSubmit}>
                    <h1 className='text-2xl pb-3 text-center'>{text}</h1>
                    <div className="flex gap-2 w-full px-2 ">
                        <button disabled={disable} type="submit" className='bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Confirm</button>
                        <button disabled={disable} onClick={onClose} type="button" className='bg-red-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-red-700 transition-all'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteConfirmBox
