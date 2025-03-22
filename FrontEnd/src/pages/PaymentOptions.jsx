import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { payment, razwePayPayment, razwePayPaymentDone, sendOtp } from '../common/apiData'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../context";
import OtpInput from '../components/OtpInput';
import { loadStripe } from '@stripe/stripe-js';



const PaymentOptions = () => {
  const productDetails = useSelector((state) => state?.confirmProduct?.product)
  const DeliveryAddress = useSelector((state) => state?.confirmAddressSlicer?.confirmAddress)
  const TotalAmount = useSelector((state) => state?.conformAmount?.amount)
  const [paymentOption, setPaymentOption] = useState(0)
  const [disableButton, setDisableButton] = useState(true)
  const navigate = useNavigate()
  const context = useContext(ContextProvider)
  const [openEnterOtp, setOpenEnterOtp] = useState(false)
  const [payload, setPayload] = useState({
    productDetails,
    DeliveryAddress,
    TotalAmount,
    PaymentType: "Cash On Delivery",
    PaymentStatus: 0
  })

  const cashOnDelivery = async () => {
    // Request OTP when selecting Cash On Delivery
    const Otp = await fetch(sendOtp.url, {
      method: sendOtp.method,
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await Otp.json()

    if (response.success) {
      toast.success(response.message)
      setPayload({ ...payload, otpId: response.otpId })
      setOpenEnterOtp(true)
    }
  }
  const handleOnChange = async (e) => {
    if (!productDetails) {
      toast.error("Please select a product");
      setDisableButton(true)
    }else{
    setPaymentOption(e.target.value)
    setDisableButton(false)
    }
    console.log(payload);

  }

  const handelRazerPay = async () => {

    const response = await fetch(razwePayPayment.url, {
      method: razwePayPayment.method,
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const responseData = await response.json()
    setDisableButton(false)
    if (responseData.success) {
      let order = responseData.data.order
      console.log(order);
      console.log("Key id :", import.meta.env.VITE_RAZOR_PAY_KEY);


      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_KEY, // Correct key property
        amount:order.amount, // Amount in paise
        currency: 'INR',
        name: 'ApniDukan',
        description: 'Test Transaction',
        order_id: order.id, // Ensure this is defined
        handler: function (response) 
        {   
          const data={
            response,
            orderData:responseData.data
          }
          console.log('Payment Successful:', data);
          UpdatePaymentStatus(data)
          window.location.href = `http://localhost:5173/success` // Redirect on success
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#43A047',
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          toast.error('Payment failed. Please try again.');  
          console.error('Payment Failed:', response.error);
        });

        rzp.open();
      } else {
        console.error('Razorpay SDK not loaded.');
      }
    }
    if (responseData.error) {
      toast.error("somtnig went wrong Please try Again later")
      navigate("/")
    }
  }

  const UpdatePaymentStatus=async (data)=>{
    const response = await fetch(razwePayPaymentDone.url, {
      method: razwePayPaymentDone.method,
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   

      setDisableButton(true)
      if (paymentOption == 1) {
        cashOnDelivery()
      }
      if (paymentOption == 2) {
        handelRazerPay()
      }
    
  }

  useEffect(() => {

  }, [payload])

  return (
    <div className="h-[400px] flex justify-center items-center bg-gray-50">
      <form className="border-2 w-[400px] bg-white p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="font-semibold border-b-2 p-2">Payment</div>
        <div className="p-2">
          <h1 className="text-gray-500 text-2xl mb-4">How would you like to Pay?</h1>

          {/* Cash On Delivery */}
          <div className="border-b-2 p-4">
            <input onChange={handleOnChange} value="1" className="" type="radio" id="CashOnDelivery" name="payment" />
            <label htmlFor="CashOnDelivery" className="ml-2">Cash On Delivery</label>
          </div>

          {/* RazerPay*/}
          <div className="border-b-2 p-4">
            <input onChange={handleOnChange} value="2" id="RazerPay" type="radio" name="payment" />
            <label htmlFor="RazerPay" className="ml-2">Online Payment</label>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={disableButton}
            className="bg-blue-600 text-white p-2 mt-4 w-full rounded-lg disabled:bg-gray-300"
          >
            Place Order
          </button>
        </div>
      </form>

      {/* OTP Input Modal */}
      {openEnterOtp && <OtpInput payload={payload} setPayload={setPayload} onClose={() => setOpenEnterOtp(false)} />}
    </div>
  )
}

export default PaymentOptions
