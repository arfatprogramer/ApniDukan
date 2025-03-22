import React, { useState } from 'react'
import displayCurrency from "../helper/displayCurrency";
import calculateDiscount from "../helper/calculateDiscount";
import CancelProduct from './CancelProduct';

const OrderCardDisplay = ({data, setOpenviewOrder, url, setViewOrderData }) => {
  const [openCancelForm,setOpenCancelForm]=useState(false)
      
  return (
    <div className=" relative w-full my-2 bg-white ">

    {/* product cart */}
    {
      data && data?.map((el, index) => {
       
        return (
          <div key={index} className="grid ga-6 w-full bg-white h-52 px-6 py-5 border-b-2">
            {/* product details */}
            <div className="flex gap-6 w-full h-[118px] overflow-hidden">
              <div className="h-full w-[110px] overflow-hidden">
                <img className='h-full w-full object-scale-down mix-blend-multiply  ' src={el?.productId?.productImage?.[0]} />
              </div>
              <div className=" grid gap-2 p-2 w-96">
                <div>
                  <h1 className='text-ellipsis line-clamp-1 text-lg'>{el?.productId?.productName}</h1>
                  <p className="text-sm text-slate-500">{el?.productId?.brandName}</p>
                </div>
                <p className="text-sm text-slate-500">{el?.productId?.productColor}</p>
                <div className=" flex gap-3">
                  <p className='text-slate-500 line-through'>{displayCurrency(el?.productId?.productPrice)}</p>
                  <p className='text-red-600 font-medium text-lg'>{displayCurrency(el?.productId?.selling)}</p>
                  <p className='text-green-600 font-medium text-md'>{calculateDiscount(el?.productId?.productPrice, el?.productId?.selling)}% Off</p>
                </div>
              </div>
              
            </div>
            {/* Button dive */}
            <div className=" flex items-center gap-6 max-sm:text-sm">
              <div className=" flex gap-2">
                <p className='text-sm flex items-center justify-center border-2 px-5  w-7 h-7'>{el?.quantity}</p>
              </div>

              <div className="hover:text-blue-600">Status: <span className={`text-green-600 rounded p-1 ${el.deliveryStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : el.deliveryStatus === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : el.deliveryStatus === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              } `}>{el.deliveryStatus}</span></div>
              <button onClick={()=>setOpenCancelForm(true)} className="hover:text-blue-600 text-red-600">Cancel</button>
              <button onClick={(e)=>{
            e.stopPropagation(); // Stop bubbling
            setViewOrderData({
              _id:el._id,
              url:url
            })
            setOpenviewOrder(true)
          }
          }  className="hover:text-blue-600 text-blue-600">View Details</button>
            </div>
            {
              openCancelForm && <CancelProduct data={el} onClose={()=>setOpenCancelForm(false)}/>
            }
          </div>
        )
      })
    }
   
  </div>
  )
}

export default OrderCardDisplay
