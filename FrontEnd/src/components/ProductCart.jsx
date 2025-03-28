import React, { useEffect, useState } from 'react'
import fetchSingleCategory from '../helper/fetchSingleCategory'
import displayCurrency  from "../helper/displayCurrency";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';

const ProductCart = ({ category, heading }) => {
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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className=' mx-ato px-4 my-6'>
      <h1 className='text-2xl py-4 font-semibold'>{heading}</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between  gap-5 overflow-auto scroll-none">
        {
          loading ? (
            new Array(15).fill(null).map((item, index) => {
              return (
                <div key={index} className="w-full  h-96 bg-white rounded-sm shadow  overflow-hidden animate-pulse">
                  <div className="bg-slate-200 h-52 p-2 max-w-full overflow-hidden">
                    <img src="" alt="" />
                  </div>
                  <div className=" grid gap-2 p-2 w-full">
                  <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 h-6 bg-slate-200'></h1>
                    <p className=" bg-slate-200 h-2 w-20 my-2 py-2"></p>
                    <div className=" flex gap-3">
                      <p className='bg-slate-200 h-2 w-1/2 my-2 py-2'></p>
                      <p className='bg-slate-200 h-2 w-1/2 my-2 py-2'></p>
                     
                    </div>
                    <button className='bg-slate-200 w-full px-3 py-4 rounded-full'></button>
                  </div>

                </div>)
            })
          ) : (
            data?.map((item, index) => {
              return (
                <Link to={"/product/"+item?._id} key={index} className="w-full min-w-[280px] md:min-w-[220px] max-w-[100px] md:max-w-[120px] h-96 bg-white rounded-sm shadow  overflow-hidden hover:scale-105 transition-all hover:shadow-xl">
                  <div className="bg-slate-200 h-52 p-2 max-w-full overflow-hidden">
                    <img className='object-scale-down h-full w-full mix-blend-multiply hover:scale-110 transition-all' src={item?.productImage[0]} alt="" />
                  </div>
                  <div className="p-4 grid gap-2 ">
                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{item?.productName}</h1>
                    <p className="capitalize text-slate-500 ">{item?.productCategory}</p>
                    <div className=" flex gap-3">
                      <p className='text-red-600 font-medium'>{displayCurrency(item?.selling)}</p>
                      <p className='text-slate-500 line-through'>{displayCurrency(item?.productPrice)}</p>
                    </div>
                    <button onClick={(e)=>addToCart(e,item?._id)} className=' text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-2 ph-3 rounded-full'>Add to Cart</button>
                  </div>

                </Link>)
            })
          )
        }

      </div>

    </div>
  )
}

export default ProductCart
