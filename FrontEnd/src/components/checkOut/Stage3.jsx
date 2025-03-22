import { Link } from "react-router-dom"
import displayCurrency from "../../helper/displayCurrency"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Stage3 = () => {
    const amount = useSelector((state) => state.conformAmount.amount)
    
    const cartItemCount = 3
    
    return (
      <>
        {/* it display odder summery in desktop mode */}
        {
          amount === "" ? (
  
            <div className='bg-gray-500 text-white h-10  flex items-center p-2 gap-2'>
            <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>3</span> <p className='text-lg font-semibold'>Order summery</p>
          </div>
  
          ):(
            <div className="w-full ">
          <div className='bg-blue-600 text-white h-10  flex items-center p-2 gap-2'>
            <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>3</span> <p className='text-lg font-semibold'>Order summery</p>
          </div>
          <div className="bg-white  p-2">
            {/* <h1 className='uppercase text-slate-400 border-b-2 p-3 py-2 font-semibold'>Price details</h1> */}
            <div className='border-y-2'>
              <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Price ( {cartItemCount} Items)</h1><p>{displayCurrency(amount?.totalPrice)}</p></div>
              <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Discount</h1><p className='text-green-600'>{displayCurrency((amount?.totalPrice - amount?.finalPrice))}</p></div>
              <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Delivery Charges</h1><p className='text-green-600'><span className='text-slate-500 line-through'>{displayCurrency(50)} </span>  Free</p></div>
            </div>
            <div className="flex justify-between text-xl p-4 font-semibold">
              <h1 className="">Total Amount</h1>
              <h1 className="">{displayCurrency(amount?.finalPrice)}</h1>
            </div>
            <p className="px-4 text-green-600 border-t-2 py-1">You will save {displayCurrency((amount?.totalPrice - amount?.finalPrice))} on this order</p>
          </div>
          <div className="w-full bg-white h-20 p-6 border-b-2 flex justify-center items-center border-y-2  ">
            <Link to={"/Payment"} className='bg-orange-500 text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-sm '>Place Order</Link>
  
          </div>
        </div>
          )
        }
       
      </>
    )
  }

  export default Stage3