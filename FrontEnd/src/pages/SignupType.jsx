import React from 'react'
import { Link } from 'react-router-dom'

const SignupType = () => {
    return (
        <div className='py-20 '>
            <div className=' my-2  p-2 max-w-sm  mx-auto border-2 border-black rounded-lg'>
                <div className="w-full px-2 py-4 grid gap-3 ">
                    <h1 className='text-2xl font-bold text-center'>Chose Option  for signUp</h1>
                    <Link to={"/SignupOption/customer"}  className='bg-blue-600 px-3 py-4 text-center border-2 rounded-full w-full mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Customer</Link>
                    <Link to={"/SignupVender/vender"}  className='bg-blue-600 px-3 py-4 text-center border-2 rounded-full w-full mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Vender</Link>
                </div>

            </div>
        </div>
    )
}

export default SignupType
