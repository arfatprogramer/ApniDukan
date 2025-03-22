import React, { useContext, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { ContextProvider } from "../context/index";
import { login, placeOrder, sendOtp } from '../common/apiData';
import { useDispatch } from 'react-redux';
import { setConfirmProduct } from '../redux/confirmProducts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OtpInput = ({ onClose,payload, setPayload }) => {
    
    const [Disable, setDisable] = useState(false)
    const [DisableReSend, setDisableReSend] = useState(true)
    const [timer, setTimer] = useState(10)
    const context=useContext(ContextProvider)
    const dispatch=useDispatch()
    const [otp, setOpt]=useState("")
    const navigate = useNavigate()

const handelSubmit= async(e)=>{
    e.preventDefault()
    setDisable(true) 
    handelOrderPlacement(payload) 

}
 const handelOrderPlacement = async (payload) => {
    const serverResponse = await fetch(placeOrder.url, {
      method: placeOrder.method,
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const responseData = await serverResponse.json()
    if (responseData.success) {
      toast.success(responseData.message)
      dispatch(setConfirmProduct({}))
      context.fetchCartData()
      context.getOrderDetails()
      navigate("/success")
      
    }
    if (responseData.error) {
      toast.error(responseData.message)
      setDisable(false)
    }
  }

  const handelOnChange=(e)=>{
    setOpt(e.target.value)
    setPayload({...payload,otp:e.target.value})
    

}

// to make resend button enabe when tim is up
const ResendOtpTimer=()=>{
    let timeOut=setTimeout(() => {
        setTimer(timer-1)
    }, 1000);
    
    if (timer==0) {
        clearTimeout(timeOut);
        setDisableReSend(false) 
    }    
}

const reSend=async()=>{
    console.log("hello");
    setDisableReSend(true) 
     const Otp = await fetch(sendOtp.url, {
            method: sendOtp.method,
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
          })
          const response = await Otp.json()
          if (response.success) {
            toast.success(response.message)
            setPayload({...payload,otpId:response.otpId})
            setTimer(60)
          }
}

useEffect(()=>{
    ResendOtpTimer()
})


    return (

        <div className='fixed max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-50 overflow-hidden'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px]   mx-auto border-2 border-black rounded-lg overflow-auto' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl w-full text-center">Verify Order</h1>
                    <button onClick={onClose} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="phoneNumber">Enter OTP</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='otp'
                                value={otp}
                                onChange={handelOnChange}
                                placeholder='Enter OTP'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className=" p-2 w-full my-1 ">
                    <p className='py-2'>OTP hase been send on Your Rigister Email Address </p>
                   
                    </div>

                    <div className="w-full px-2 py-3 ">
                        <button disabled={Disable} type="submit" className='bg-red-600 px-3 py-2  border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-red-600 transition-all'>Place Order</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default OtpInput
