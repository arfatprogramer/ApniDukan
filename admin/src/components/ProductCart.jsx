import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import UpdateProduct from './UpdateProduct'
import displayCurrency from '../helper/DisplayCurrency'

const ProductCart = ({ product,allProductData }) => {
    const [openUpdate,setOpenUpdate]=useState(false) //// it use for open and close update Product form
     const [updateProduct,setUpdateProduct]=useState("")

    return (
        <>
            <div className=" p-4 w-52  rounded-lg text-black bg-white">
                <div className="w-32 h-32 mx-auto flex justify-center items-center">
                    <img  src={product.productImage[0]} alt="" className='h-full object-fill mx-auto ' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{product.productName}</h1>
                <p>Price {displayCurrency(product.selling)}</p>
                <div className="flex justify-end">
                    <button className='p-2 text-white  rounded-full bg-green-500 text-center hover:scale-110'
                            onClick={()=>{
                                setOpenUpdate(true)
                                setUpdateProduct(product)
                      }} 
                    ><FaRegEdit /></button>
                </div>
            </div>
            {openUpdate && <UpdateProduct
                onClose={() => setOpenUpdate(false)}
                allProductData={allProductData}
                updateProduct={updateProduct}
            />
            }


        </>
    )
}

export default ProductCart
