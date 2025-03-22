import React, { useContext, useEffect, useState } from 'react'
import userAnimato from '../assets/signin.gif'
import { FaEyeSlash, FaRegUser, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../common/ApiUrls';
import { toast, ToastContainer } from 'react-toastify';
import { ContextProvider } from "../context/index";
import { useSelector } from 'react-redux';


const Login = () => {
  const [show, setShow] = useState(false);
  const navigate=useNavigate();
  const userData=useSelector((state)=>state?.user?.user)
  const {fetchUserData} = useContext(ContextProvider)
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {  
    // //fetch data form server
    let serverResponse = await fetch(login.url, {
      method:login.method,
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(data),
    })
    serverResponse = await serverResponse.json()
    
    if (serverResponse.success) {
      toast.success(serverResponse.message);
      setTimeout(async() => {
        await fetchUserData()  // this is coming from context
        navigate('/')
      },3000);

    } else {
      toast.error(serverResponse.message);
    }

    } catch (err) {
      console.log(err.message);
      toast.error("Something went Wrong")
      
    }



  }

 

  return (
    <>
    
    <ToastContainer />
    <div className='py-20 '>
      <form className=' my-2p-2 max-w-sm  mx-auto border-2 border-white bg-gray-700 rounded-lg' onSubmit={handelSubmit}>
        <div className='w-1/2 h-1/2 mx-auto flex justify-center py-3'>
          <img className='rounded-full' width={100} src={userAnimato} alt="" />
        </div>
        <div className="w-full px-2 ">
          <label htmlFor="username">Username</label>
          <div className="flex w-full my-3">
            <input type="email"
              name='username'
              placeholder='Username Or Gmail'
              className='w-full outline-none py-1 px-3  text-black' required />
            <div className=" flex items-center justify-center bg-white px-3 text-black"><span><FaRegUser /></span></div>
          </div>
        </div>
        <div className="w-full px-2 mb-3 ">
          <label htmlFor="password">Password</label>
          <div className="flex w-full mt-3 relative">
            <input type={show ? "text" : "password"}
              name='password'
              placeholder='Password'
              className='w-full outline-none  py-1 px-3  text-black' required />
            <div onClick={() => { show ? setShow(false) : setShow(true) }}
              className=" flex items-center justify-center text-black  bg-white px-3 "><span>{show ? <FaEye /> : <FaEyeSlash />}</span></div>
          </div>
          {/* <Link to={'/forgotPassword'} className='text-red-500 text-end block' >Forgot Password?</Link> */}
        </div>
        <div className="w-full px-2 ">
          <button type="submit" className='bg-green-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-green-700 transition-all'>Login</button>

        </div>
        <div className="w-full px-2 py-3 ">
          
        </div>
      </form>
      </div>
      </>
  )
}

export default Login
