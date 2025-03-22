import React, { useState } from 'react'
import userAnimato from '../assets/signin.gif'
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ForgetPassword, ResetPassword } from '../common/apiData';
import { toast } from 'react-toastify';
import { IoCloseSharp } from 'react-icons/io5';


const ForgotPassword = () => {

  const [openResetPassword, setOpenResetPassword] = useState(false)
  const [show, setShow] = useState(false);    //for password filed
  const [show2, setShow2] = useState(false); //for password filed
  const [Disable,setDisable]=useState(false)
  const [otpId,setOtpId]=useState(0)
  const navigate=useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    const formData = new FormData(e.target);
    const data = await Object.fromEntries(formData);
    const response = await fetch(ForgetPassword.url, {
      method: ForgetPassword.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
    const result = await response.json();
    if (result.success) {
      toast.success(result.message)
      setOpenResetPassword(true)
      setDisable(false)
      setOtpId(result.data)
    }
    if (result.error) {
      toast.error(result.message)
      setDisable(false)
    }
  }

  const handelOnOtpSubmit = async (e) => {
    e.preventDefault();
    setDisable(true) 
    const formData=new FormData(e.target)
    formData.append("otpId",otpId )
    const data = await Object.fromEntries(formData);


    

    if (data.password === data.confirmPassword) {
      
    
    const serverResponse=await fetch(ResetPassword.url,{
        method:ResetPassword.method,
        headers:{"content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify(data)
    })
    const response=await serverResponse.json()
    if (response.success) {
        toast.success(response.message) 
        setDisable(false)  
        navigate("/login")
    }
    if (response.error) {
        toast.error(response.message)
        setDisable(false)
    }
  }else{
    toast.error("Password Not match")
    setDisable(false) 
  }
  }

  return (
    <div className='py-20 '>
      <form className=' my-2  p-2 max-w-sm  mx-auto border-2 border-black rounded-lg' onSubmit={handelSubmit}>
        <div className='w-1/2 h-1/2 mx-auto flex justify-center py-3'>
          <img width={100} src={userAnimato} alt="" />
        </div>
        <div className="w-full px-2 ">
          <label htmlFor="username">Username Or Gmail</label>
          <div className="flex w-full my-3">
            <input type="email"
              name='username'
              placeholder='Username'
              className='w-full outline-none py-1 px-3' required />
            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
          </div>
        </div>

        <div className="w-full px-2 ">
          <button disabled={Disable} type="submit" className='bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Find</button>

        </div>
        <div className="w-full px-2 py-3 ">
          <Link to={'/SignupType'}> Already have Account? <span className='text-red-700 underline'>SignUp.</span></Link>
        </div>
      </form>

      {
        openResetPassword &&
        <div className='fixed max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden'>
          <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px]   mx-auto border-2 border-black rounded-lg overflow-auto' >
            <div className="flex justify-between p-2 pb-4">
              <h1 className="font-bold text-2xl w-full text-center">Password Reset</h1>
              <button onClick={() => setOpenResetPassword(false)} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
            </div>
            <form onSubmit={handelOnOtpSubmit}>
              <div className="w-full px-2 mb-2 ">
                <label htmlFor="phoneNumber">Enter OTP</label>
                <div className="flex w-full my-1 ">
                  <input type="text"
                    name='otp'
                    placeholder='Enter OTP'
                    className='w-full outline-none py-1 px-3' required />
                  <div className=" flex items-center justify-center bg-white px-3"></div>
                </div>
              </div>

              <div className="w-full px-2 mb-3 ">
                <label htmlFor="password">New Password</label>
                <div className="flex w-full my-1 relative">
                  <input type={show ? "text" : "password"}
                    name='password'
                    placeholder='Password'
                    className='w-full outline-none  py-1 px-3' required />
                  <div onClick={() => { show ? setShow(false) : setShow(true) }}
                    className=" flex items-center justify-center  bg-white px-3 "><span>{show ? <FaEye /> : <FaEyeSlash />}</span></div>
                </div>
              </div>

              <div className="w-full px-2 mb-3 ">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="flex w-full my-1 relative">
                  <input type={show2 ? "text" : "password"}
                    name='confirmPassword'
                    placeholder='confirmPassword'
                    className='w-full outline-none  py-1 px-3' required />
                  <div onClick={() => { show2 ? setShow2(false) : setShow2(true) }}
                    className=" flex items-center justify-center  bg-white px-3 "><span>{show2 ? <FaEye /> : <FaEyeSlash />}</span></div>
                </div>
              </div>
              <div className="w-full px-2 py-3 ">
                <button disabled={Disable} type="submit" className='bg-red-600 px-3 py-2  border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-red-600 transition-all'>Submit</button>

              </div>
            </form>
          </div>
        </div>
      }

    </div>
  )
}

export default ForgotPassword
