import React, { useContext, useEffect, useState } from 'react'
import fetchSingleCategory from '../helper/fetchSingleCategory'
import displayCurrency  from "../helper/displayCurrency";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import { ContextProvider } from '../context';

const SingleCategoryCart = ({ category, heading }) => {
  const [data, setDate] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    setLoading(true)
    const data = await fetchSingleCategory(category)
    if (data.success) {
      setDate(data.data[0])    
    }
    setLoading(false)
  }
  const { fetchCartData } = useContext(ContextProvider)
  const handelAddToCart=async (e,id)=>{
     await addToCart(e,id)
     fetchCartData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className=' mx-ato px-4 my-6'>
      <h1 className='text-2xl py-4 font-semibold'>{heading}</h1>
      <div className="flex gap-4 overflow-auto scroll-none">
        {
          loading ? (
            new Array(15).fill(null).map((item, index) => {
              return (
                <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex animate-pulse">
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-2-[145px]">
                    <img src="" alt="" />
                  </div>
                  <div className="p-2 w-full">
                  <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 h-6 bg-slate-200'></h1>
                    <p className=" bg-slate-200 h-2 w-20 my-2 py-2"></p>
                    <div className=" flex gap-3">
                      <p className='bg-slate-200 h-2 w-1/2 my-2 py-2'></p>
                      <p className='bg-slate-200 h-2 w-1/2 my-2 py-2'></p>
                     
                    </div>
                    <button className='bg-slate-200 w-44 px-3 py-4 rounded-full'></button>
                  </div>

                </div>)
            })
          ) : (
            data?.map((item, index) => {
              return (
                <Link to={"/product/"+item?._id} key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[420px] h-36 bg-white rounded-sm shadow flex overflow-hidden">
                  <div className="bg-slate-200 h-full p-2 w-[400px] max-w-[120px] md:max-w-[145px] overflow-hidden">
                    <img className='object-scale-down h-full w-full mix-blend-multiply hover:scale-125 transition-all' src={item?.productImage[0]} alt="" />
                  </div>
                  <div className="p-4 grid ">
                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{item?.productName}</h1>
                    <p className="capitalize text-slate-500 ">{item?.productCategory}</p>
                    <div className=" flex gap-3">
                      <p className='text-red-600 font-medium'>{displayCurrency(item?.selling)}</p>
                      <p className='text-slate-500 line-through'>{displayCurrency(item?.productPrice)}</p>
                    </div>
                    <button onClick={(e)=>handelAddToCart(e,item?._id)} className=' text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-0.5 ph-3 rounded-full'>Add to Cart</button>
                  </div>

                </Link>)
            })
          )
        }

      </div>

    </div>
  )
}

export default SingleCategoryCart
