import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';

const merchant = () => {
    const userData=useSelector((state)=>state?.user?.user)
    
  return (
    <>
    <div className=" flex justify-center items-center h-[calc(100vh-400px)] sm:hidden">
        <h1 className='text-xl font-semibold'>No Admin Panel Form Mobile Version</h1>
    </div>
    <div className='flex gap-3 h-[calc(100vh-100px)] max-sm:hidden'>
        <aside className='flex h-full flex-col  bg-white p-2'>
            <div className='mx-5 mb-4'>
                <div className='h-40 w-40 border-4 overflow-hidden  rounded-full flex items-center justify-center'>
                <img className='w-full' src={userData?.profile}  alt="Profile Image"/>

                </div>
                <h1 className='text-2xl  text-center'>{userData?.firstName} {userData?.lastName}</h1>
            </div>
            <div className='grid gap-2 p-2'>
                <Link className=' bg-gray-200 w-full block text-md p-2' to={"all-product"}>All Product</Link>
                <Link className=' bg-gray-200 w-full block text-md p-2' to={"all-Orders"}>All Orders</Link>
                <Link className=' bg-gray-200 w-full block text-md p-2' to={"canced-Orders"}>Canced Orders</Link>
            </div>
            
        </aside>
        <main className='h-full bg-gray-200 w-full p-3 overflow-auto'>
            <Outlet /> 
        </main>
     
    </div>
    </>
  )
}

export default merchant
