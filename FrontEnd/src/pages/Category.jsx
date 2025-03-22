import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import productCategory from '../helper/productCategory';
import { filterProducts } from '../common/apiData';
import SearchCart from '../components/SearchCart';
import { IoFilterSharp,IoCloseSharp } from "react-icons/io5";


const Category = () => {
  const param = useParams()
  const navigate = useNavigate()

  const location = useLocation()
  const url = new URLSearchParams(location.search)
  const categoryArray = url.getAll('category')
  const categoryObject = {}
  categoryArray.forEach(e => {
    categoryObject[e] = true
  })


  const [selectCategory, setSelectCategory] = useState(categoryObject)
  const [filtersCategory, setFilterCategory] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('asc')
  const [showFilterMobile, setShowFilterMobile] = useState(false)



const handleSelectCategory = (e) => {
    const { value, name, checked } = e.target
    setSelectCategory(pre => {
      return { ...pre, [value]: checked }
    })
  }

const fetchProduct = async () => {
    setLoading(true);
    setProducts([]); // Clear previous products
    setLoading(true)
    const response = await fetch(filterProducts.url, {
      method: filterProducts.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category: filtersCategory })
    })
    const responseData = await response.json()
    if (responseData.success) {
      setProducts(responseData.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    const categoryOf = Object.keys(selectCategory).map(category => {
      if (selectCategory[category]) {
        return category
      }
      return null

    }).filter(el => el)
  
    setFilterCategory(categoryOf)
    
    const urlFormat = categoryOf.map((e, index) => {
      if ((categoryOf.length - 1) === index) {
        return `category=${e}`
      }
      return `category=${e}&&`
    })
    navigate("/category?" + urlFormat.join(""))


  }, [selectCategory])

  useEffect(() => {
    fetchProduct()
  }, [filtersCategory])

  const handelChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    if (value === 'asc') {
      setProducts(pre => pre.sort((a, b) => a.selling - b.selling))
    }
    if (value === 'desc') {
      setProducts(pre => pre.sort((a, b) => b.selling - a.selling))
    }

  }



  return (
    <div className='container mx-auto p-4'>
      {/* for mobile version */}
      <span onClick={()=>setShowFilterMobile(!showFilterMobile)} 
      className='bg-white  w-fit flex items-center justify-center gap-4 p-2 rounded-lg lg:hidden relative '>Filter<IoFilterSharp/></span>
       
       {
        showFilterMobile &&   <div className=" bg-white p-2 pl-10 h-full w-full absolute z-50 left-0 right-0 top-0 bottom-0 ">
          <div className="">
            <h3 className='text-lg font-medium text-gray-500 border-b-2 pb-1 border-slate-300 uppercase '>Sort by</h3>
            <button onClick={()=>setShowFilterMobile(!showFilterMobile)} className='text-2xl w-7 hover:scale-125 hover:text-red-500 absolute top-2 right-2'><IoCloseSharp /></button>
            <form className='flex flex-col gap-2 py-2' >
              <div className='flex gap-2 items-center'>
                <input type="radio" name="sortBy"
                  value={"asc"}
                  checked={sortBy === 'asc'}
                  onChange={handelChangeSortBy} />
                <label htmlFor="sort">Prise-Low to High</label>
              </div>

              <div className='flex gap-2'>
                <input type="radio" name="sortBy"
                  value={"desc"}
                  checked={sortBy === 'desc'}
                  onChange={handelChangeSortBy} />
                <label htmlFor="sort">Prise-High to Low</label>
              </div>
            </form>

            <h3 className='text-lg font-medium text-gray-500 border-b-2 pb-1 border-slate-300 uppercase '>Category</h3>
            <form className='flex flex-col gap-2 py-2' >
              {
                productCategory.map((Category) => {
                  return (
                    <div className='flex gap-2' key={Category.id}>
                      <input onChange={handleSelectCategory}
                        type="checkbox"
                        value={Category.value}
                        checked={selectCategory[Category.value]}
                        name={Category.value} />
                      <label htmlFor={Category.id}>{Category.label}</label>
                    </div>
                  )
                })
              }
            </form>

          </div>
        </div>
        }
        {/* for desktop version version */}
      <div className="gap-3 lg:grid grid-cols-[240px,1fr]">
        {/* left side */}
        <div className=" bg-white p-2 min-h-[calc(100vh-200px)] hidden lg:block">
          <div className="">
            <h3 className='text-lg font-medium text-gray-500 border-b-2 pb-1 border-slate-300 uppercase '>Sort by</h3>
            <form className='flex flex-col gap-2 py-2' >
              <div className='flex gap-2 items-center'>
                <input type="radio" name="sortBy"
                  value={"asc"}
                  checked={sortBy === 'asc'}
                  onChange={handelChangeSortBy} />
                <label htmlFor="sort">Prise-Low to High</label>
              </div>

              <div className='flex gap-2'>
                <input type="radio" name="sortBy"
                  value={"desc"}
                  checked={sortBy === 'desc'}
                  onChange={handelChangeSortBy} />
                <label htmlFor="sort">Prise-High to Low</label>
              </div>
            </form>

            <h3 className='text-lg font-medium text-gray-500 border-b-2 pb-1 border-slate-300 uppercase '>Category</h3>
            <form className='flex flex-col gap-2 py-2' >
              {
                productCategory.map((Category) => {
                  return (
                    <div className='flex gap-2' key={Category.id}>
                      <input onChange={handleSelectCategory}
                        type="checkbox"
                        value={Category.value}
                        checked={selectCategory[Category.value]}
                        name={Category.value} />
                      <label htmlFor={Category.id}>{Category.label}</label>
                    </div>
                  )
                })
              }
            </form>

          </div>
        </div>

        {/* Right side */}
        <div className="">
          <p>Search Results : {products.length}</p>

          {
            products.length === 0 && !loading && (
              <p className="text-lg text-center p-4 bg-white">No Data Found...</p>
            )
          }

          {
            products.length > 0 && !loading && (
              <SearchCart loading={loading} data={products} />
            )
          }
        </div>
      </div>
      <h1>{param.category}</h1>
    </div>
  )
}

export default Category
