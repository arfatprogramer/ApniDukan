import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="bg-green-100 p-6 rounded-xl shadow-lg max-w-md w-full flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
        <span className='text-4xl text-white font-bold'><FaCheck /></span>
        </div>

        
        <p className="text-green-600 font-semibold text-2xl mb-4"> Successfully</p>

        <p className="text-gray-600 text-lg mb-8"> Thank you for your action. Your transaction has been successfully completed. Feel free to browse our products or visit our homepage.</p>
        <Link
          to="/"
          className="bg-green-600 text-white hover:bg-green-700 py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default Success
