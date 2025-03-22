import React from 'react'
import { CiCircleMinus } from 'react-icons/ci'
import displayCurrency from '../helper/displayCurrency'
import calculateDiscount from '../helper/calculateDiscount'
import { Link } from 'react-router-dom'

const SearchCart = ({ loading, data = [] }) => {
  return (
    <>
      {/* product cart */}
      {
        data && data?.map((el, index) => {



          return (
            <Link to={"/product/" + el?._id} key={index} className="flex gap-4 w-full bg-white h-32 sm:h-52 px-6 py-5 border-b-2" >
              {/* product details */}
              <div className="h-full w-fit md:w-[210px] overflow-hidden shrink-0">
                <img className='h-full w-full object-scale-down mix-blend-multiply ' src={el?.productImage?.[0]} />
              </div>
              <div className="flex gap-6 w-full md:h-[118px] text-sm overflow-hidden">
                <div className=" grid md:gap-2 p-2 w-96">
                  <div>
                    <h1 className='text-ellipsis line-clamp-1  md:text-lg'>{el?.productName}</h1>
                    <p className="text-sm text-slate-500">{el?.brandName}</p>
                  </div>
                  <p className="text-sm text-slate-500">{el?.productColor}</p>
                  <div className=" flex gap-3">
                    <p className='text-slate-500 line-through'>{displayCurrency(el?.productPrice)}</p>
                    <p className='text-red-600 font-medium md:text-lg'>{displayCurrency(el?.selling)}</p>
                    <p className='text-green-600 font-medium md:text-md'>{calculateDiscount(el?.productPrice, el?.selling)}% Off</p>
                  </div>
                </div>
                <div className="p-2 text-sm hidden md:block">
                  <p>Delivery by Tue Dec 31 | Free</p>
                </div>
              </div>
              {/* Button dive */}
              {/* <div className=" flex items-center gap-6">
                            <div className=" flex gap-2">
                              <button className='text-[30px] font-semibold  '><CiCircleMinus /></button>
                              <p className='text-sm flex items-center justify-center border-2 px-5  w-7 h-7'>1</p>
                              <button className='text-[30px] font-semibold  '><CiCirclePlus /></button>
                            </div>
                            <div className="hover:text-blue-600">ORDER NOW</div>
                            <div className="hover:text-blue-600">REMOVE</div>
                          </div> */}
            </Link>
          )
        })
      }
    </>
  )
}

export default SearchCart
