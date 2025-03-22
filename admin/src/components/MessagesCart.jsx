import React from 'react'

const MessagesCart = ({data}) => {   
    return (
        <>
        {
        data.map((message)=>{
            return(
            <div className=" p-4 w-64  rounded-lg text-black bg-white">
                <h1 className='text-ellipsis line-clamp-2 text-gray-600'>Sender Name : </h1>
                <p className='ml-4 '>{message.name}</p>
                <p className=' text-gray-600'>Sender Email : </p>
                <p className='ml-4'> {message.email}</p>
                <p className=' text-gray-600'>Message : </p>
                    <div className='ml-4 h-40 border p-1 mb-2 '>
                    <p > {message.message}</p>
                    </div>
                <div className="flex justify-end">
                    <button className='p-2 text-white  rounded-full bg-green-500 text-center hover:scale-110'
                        onClick={() => { }}
                    ></button>
                </div>
            </div>)
              })
            }
        </>
    )
}

export default MessagesCart
