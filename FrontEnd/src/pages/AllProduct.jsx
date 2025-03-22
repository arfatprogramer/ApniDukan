import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import { allProduct } from '../common/apiData'
import { toast } from 'react-toastify'
import VenderProductCart from '../components/VenderProductCart'

const AllProduct = () => {

  const [addProduct, setAddProduct] = useState(false) // it use for open and close addProduct form
  const [products, setProducts] = useState(false)  // it store all product details
  


  const allProductData = async () => {
    const response = await fetch(allProduct.url,{
      method: 'get',
      credentials:"include"
    })
    const data = await response.json()
    if (data.success) { 
      setProducts(data?.data || [])
    }
    if (data.error) {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    allProductData()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between p-2 mb-3 shadow-2xl bg-white">
        <h1 className='font-bold text-2xl'> All Product</h1>
        <button onClick={() => setAddProduct(true)} className='py-2 px-5 border-2 bg-green-700 rounded-lg hover:bg-blue-700'>Add New</button>
      </div>

   
      <div className='w-full flex gap-3  flex-wrap '>


        {
          products && products.map((product, index) => {  
            return (

              <VenderProductCart product={product} key={index} allProductData={allProductData} />

            )
          })

        }
        {addProduct && <AddProduct
          onClose={() => setAddProduct(false)}
          allProductData={allProductData} />
        }
      </div >
      
    </ >
  )
}




export default AllProduct
