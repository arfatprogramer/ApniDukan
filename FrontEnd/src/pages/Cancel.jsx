import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="bg-red-100 p-6 rounded-xl shadow-lg max-w-md w-full flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
        <span className='text-4xl text-white font-bold'><IoCloseSharp /></span>
        </div>
        <p className="text-red-600 font-semibold text-2xl text-center mb-4">Order Canceled</p>
        <p className="text-gray-600 text-lg text-center mb-8">
          We're sorry to hear that you canceled your order. If you have any issues or questions, feel free to contact us.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white hover:bg-red-700 py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
