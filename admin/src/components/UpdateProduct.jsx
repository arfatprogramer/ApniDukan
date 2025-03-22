import React, { useState } from 'react'
import userAnimato from '../assets/signin.gif'
import { FaEyeSlash, FaRegUser, FaEye } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
// import ImageConvert64 from '../helper/ImageConvert64';
// import { signup } from '../common/apiData.jsx'
import { toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
import { updateProductBackend } from '../common/ApiUrls';
import productCategory from '../helper/productCategory'
import uploadProductImage from '../helper/uploadProductImage';
import color from '../helper/color';



const UpdateProduct = ({ onClose,allProductData,updateProduct }) => {

    const [uploadProduct, setUploadProduct] = useState(updateProduct)

    const [uploadImageName, setUploadImageName] = useState()

    const handelChange = (e) => {
        setUploadProduct({
            ...uploadProduct,
            [e.target.name]: e.target.value
        })
    }

    // this will be use for upload image on cloudinary add add url
    const handelImageUpload = async (e) => {
        const image = e.target.files[0];
        setUploadImageName(image.name);
        const uploadImageCloudinary = await uploadProductImage(image);
        setUploadProduct((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }

    // for remove uploaded image
    const handelDeleteImage=async (index)=>{
        const images=[...uploadProduct.productImage]
        images.splice(index,1)

        setUploadProduct((prev) => {
            return {
                ...prev,
                productImage: [...images ]
            }
        })
        
        
    }
    const handelOnSubmit = async (e) => {
        e.preventDefault()
        console.log(uploadProduct);

        const serverResponse = await fetch(updateProductBackend.url, {
            method: "put",
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body:JSON.stringify(uploadProduct)
        })

        const serverResponseData = await serverResponse.json()
        if (serverResponseData.success) {
            toast.success(serverResponseData.message)
            onClose()          // it close the form it get from props
            allProductData() // it reload the all product it is get from props

        }
        if (serverResponseData.error) {
            toast.error(serverResponseData.message)
        }



    }

    return (

        <div className='fixed max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px] h-[650px]  mx-auto border-2 border-black rounded-lg overflow-auto' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl">Update Product</h1>
                    <button onClick={onClose} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                </div>
                <form onSubmit={handelOnSubmit}>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="productName">Product Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='productName'
                                id='productName'
                                placeholder='Product Name'
                                value={uploadProduct.productName}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="brandName">Brand Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='brandName'
                                id='brandName'
                                value={uploadProduct.brandName}
                                onChange={handelChange}
                                placeholder='Brand Name'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="productCategory">Category</label>
                        <div className="flex w-full my-1 ">
                            <select
                                name='productCategory'
                                id='productCategory'
                                placeholder='Product Category'
                                value={uploadProduct.productCategory}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required >
                                <option value="">Select Category</option>
                                {productCategory.map((el) => {
                                    return (
                                        <option key={el.id} value={el.value}>{el.label}</option>

                                    )
                                })}

                            </select>
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="productColor">Color</label>
                        <div className="flex w-full my-1 ">
                            <select
                                name='productColor'
                                id='productColor'
                                placeholder='select color'
                                value={uploadProduct.productColor}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required >
                                <option value="">select color</option>
                                {color.map((el) => {
                                    return (
                                        <option key={el.id} value={el.value}>{el.label}</option>

                                    )
                                })}

                            </select>
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2  ">
                        <label htmlFor="productImage">Product Image</label>
                        <label htmlFor="productImage">
                            <div className="w-full text-gray-500 outline-none py-1 px-3 bg-gray-200 flex flex-col justify-center items-center h-24">
                                <span className=' text-6xl'><FaCloudUploadAlt /></span>
                                <p>Upload Product Image</p>
                                <input type="file" name="productImage" id="productImage" className='hidden' onChange={handelImageUpload} />
                            </div>
                        </label>
                        <div className="  p-2 w-full bg-gray-200 my-2 flex">
                            {uploadProduct?.productImage?.[0] ? (uploadProduct.productImage.map((src, index) => {
                                return (
                                    <div key={index} className=" relative">
                                        <img key={index} src={src} alt="" className='w-20 h-20 border-2 bg-white mx-1 group' />
                                        <span key={index+1} onClick={()=>handelDeleteImage(index)} className='absolute top-0 right-1 bg-red-500 p-1 text-white rounded  group-hover:block hover:scale-110'><MdDeleteForever/> </span>
                                    </div>
                                )

                            })) : (<h1 className='text-red-500 text-center w-full'>*Please upload images</h1>)
                            }

                        </div>

                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="Description">Description</label>
                        <div className="flex w-full my-1 ">
                            <textarea rows={5} type="text"
                                name='Description'
                                placeholder='Description'
                                id='Description'
                                value={uploadProduct.Description}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="productPrice">Product Price</label>
                        <div className="flex w-full my-1 ">
                            <input type="number"
                                name='productPrice'
                                id='productPrice'
                                placeholder='Product Price'
                                value={uploadProduct.productPrice}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            {/* <div className=" flex items-center justify-center bg-white px-3"></div> */}
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="selling">Selling Price</label>
                        <div className="flex w-full my-1 ">
                            <input type="numberS"
                                name='selling'
                                placeholder='Selling Price'
                                id='selling'
                                value={uploadProduct.selling}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                            {/* <div className=" flex items-center justify-center bg-white px-3"></div> */}
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="selling">stock</label>
                        <div className="flex w-full my-1 ">
                            <input type="number"
                                name='stock'
                                placeholder='Selling Price'
                                id='stock'
                                value={uploadProduct.stock}
                                onChange={handelChange}
                                className='w-full outline-none py-1 px-3' required />
                        </div>
                    </div>

                    <div className="w-full px-2 py-3 ">
                        <button type="submit" className='bg-blue-600 px-3 py-2  border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all'>Update</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct
