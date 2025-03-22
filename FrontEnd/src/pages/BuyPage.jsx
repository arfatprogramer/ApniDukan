import React, { useState } from 'react'
import Stage1 from '../components/checkOut/Stage1'
import Stage3 from '../components/checkOut/Stage3'
import { setConfirmProduct } from '../redux/confirmProducts'
import { useDispatch, useSelector } from 'react-redux'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { MdOutlineDoneOutline } from 'react-icons/md'
import displayCurrency from '../helper/displayCurrency'
import calculateDiscount from '../helper/calculateDiscount'
import { setAmount } from '../redux/finalAmount'
import { toast } from 'react-toastify'

const BuyPage = () => {
    const dispatch=useDispatch()
    const confirmProduct = useSelector((state) => state?.confirmProduct.product) 
    const buyProduct = useSelector((state) => state?.buyProduct.buy)   
    const [data, setData] = useState([buyProduct])
    const address = useSelector(state => state?.confirmAddressSlicer?.confirmAddress)
    let totalPrice = 0
    let finalPrice = 0

    const handelConfirmProduct=()=>{
        dispatch(setConfirmProduct(data))
        dispatch(setAmount({totalPrice,finalPrice}))
        
    }

  return (
    <>
    <div className="md:max-w-[70%] md:mx-auto flex flex-col gap-2">
      <Stage1 />
      
        {/* <div className=" md:flex w-full p-2  "> */}
        {
          confirmProduct === "" ? (
            <div className=" w-full ">
              <div className='bg-blue-600 text-white h-10  flex items-center p-2 gap-2'>
                <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>2</span> <p className='text-lg font-semibold'>Product Details</p>
              </div>
  
  
              {
                data && data?.map((el, index) => {
                  totalPrice += (el?.productId?.productPrice )
                  finalPrice += (el?.productId?.selling)
                 
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
                     
                    </div>
                  )
                })
              }
              <div className="w-full bg-white h-20 px-3  border-b-2 flex items-center justify-end ">
                {
                  address.length==0?(
                    <button type='button' onClick={()=>toast.error("Please add Address")} className='bg-blue-700  text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-lg '>Confirm</button>
  
                  ):(
  
                    <button onClick={handelConfirmProduct} className='bg-blue-700  text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-lg '>Confirm</button>
                  )
                }
              </div>
  
            </div>
          ) : (
            <div className="bg-blue-600 flex justify-between w-full ">
              <div className="">
                <div className=' text-white h-10  flex items-center p-2 gap-2'>
                  <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>2</span> <p className='text-lg font-semibold'>Product Derails</p><MdOutlineDoneOutline />
                </div>
  
  
              </div>
              <div className='p-2 flex items-center justify-center'>
                <button onClick={() => {dispatch(setConfirmProduct(""))
                                        dispatch(setAmount(""))}} className='p-1 bg-white text-blue-600 font-semibold rounded-sm'>Change</button>
              </div>
            </div>
          )
        }
  
      

      <Stage3 />
    </div>
  </>
  )
}

export default BuyPage
