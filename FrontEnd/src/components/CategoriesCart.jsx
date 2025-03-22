import React, { useEffect, useState } from 'react'
import { categoryApi } from '../common/apiData'
import { Link } from 'react-router-dom'

const CategoriesCart = () => {
  const [categories, seCategories] = useState([])
  const [categoryLading, setCategoryLading] = useState(false)


  const fetchCategory = async () => {
    setCategoryLading(true)
    const response = await fetch(categoryApi.url)
    const data = await response.json()
    seCategories(data.data)
    setCategoryLading(false)
  }

  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <div className='flex gap-3 items-center justify-between overflow-auto scroll-none '>
      {categoryLading ? (
        new Array(7).fill().map((el, index) => {
          return (
            <div key={index} className="w-20 h-20 flex flex-shrink-0 justify-center items-center rounded-full overflow-hidden bg-slate-400 animate-pulse"></div>
          )
        })
      ) : (

        categories?.map((el, index) => {
          return (

            <Link to={"/category?category=" + el?.productCategory} key={index} className="flex flex-col justify-center items-center cursor-pointer w-fit">
              <div className="w-20 h-20 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden bg-slate-200 ">
                <img src={el.productImage[0]} alt={el?.productCategory} className='object-scale-down mix-blend-multiply h-full hover:scale-125 ' />
              </div>
              <p className=' capitalize text-center whitespace-nowrap'>{el?.productCategory}</p>
            </Link>
          )
        })
      )}
    </div>
  )
}

export default CategoriesCart
