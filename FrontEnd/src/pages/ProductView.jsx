import React, { useContext, useEffect, useRef, useState } from 'react'
import { getProductById } from '../common/apiData';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import displayCurrency from '../helper/displayCurrency';
import SingleCategoryCart from '../components/SingleCategoryCart';
import HorizontalCart from '../components/HorizontalCart';
import ProductCart from '../components/ProductCart';
import scrollTop from '../helper/scrollerTop';
import addToCart from '../helper/addToCart';
import { ContextProvider } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { buyProduct } from '../redux/buyProductSlicer';
import { setConfirmProduct } from '../redux/confirmProducts';

const ProductView = () => {
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false);
    const [activeImage, setActiveImage] = useState('')
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
    const [zoomContainer, setZoomContainer] = useState(false)
    const navigate=useNavigate()
    const params = useParams()
    const dispatch=useDispatch()
    const  token = useSelector((state) => state?.token?.token);
    

    const fetchGetProductById = async () => {
        setLoading(true);
        const response = await fetch(getProductById.url, {
            method: getProductById.method,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ _id: params.id })
        })
        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data)
            setActiveImage(responseData.data?.productImage?.[0])
        }
        if (responseData.error) {
            alert("data Not found")
        }
        setLoading(false)
        
        
    }

    const handelZoomImage = (e) => {
        setZoomContainer(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x =Math.floor(( (e.clientX - left) / width)*100)
        const y =Math.floor(( (e.clientY - top) / height)*100)
        setZoomImageCoordinate({ x, y })
        
    }

    // handel add to cart
    const { fetchCartData } = useContext(ContextProvider)
    const handelAddToCart=async(e,id)=>{
        await addToCart(e,id,token)
        fetchCartData()
    }

    //handle Buy button
    const handelBuyButton=()=>{
        dispatch(setConfirmProduct(""))
        dispatch(buyProduct({productId:data,
            quantity:1,
        }))
        navigate("/Buy")
    }

    useEffect(() => {
        
        fetchGetProductById();
    }, [params])
    return (
        <>
        <div className=" mx-auto ">

            {/* image container  */}
            <div className=' min-h-[200px] gap-4 flex flex-col lg:flex-row'>

                {/* product image */}
                <div className="h-96 flex gap-3 flex-col lg:flex-row-reverse">

                    <div className=" relative h-[300px] w-[300px] mx-auto lg:h-96 lg:w-96 bg-slate-200">
                        <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseLeave={()=>setZoomContainer(false)} onMouseMove={handelZoomImage} />
                        {
                            zoomContainer && <div className="absolute hidden x-10 lg:block min-w-[700px] min-h-[700px] bg-slate-200 p-1 -right-[710px] top-0 overflow-hidden">
                                <div className="w-full h-full min-w-[400px] min-h-[400px]  mix-blend-multiply scale-115 "
                                    style={{
                                        backgroundImage: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`
                                    }}></div>
                            </div>
                        }

                    </div>

                    <div className=" ">
                        {
                            loading ? (

                                <div className=" flex gap-2 lg:flex-col overflow-scroll scroll-none h-full">
                                    {
                                        new Array(4).fill(null).map((i, index) => {
                                            return (
                                                <div key={index} className="h-20 w-20 bg-slate-200 rounded flex-shrink-0 animate-pulse">

                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className=" flex gap-2 lg:flex-col overflow-scroll scroll-none h-full">
                                    {
                                        data.productImage?.map((image, index) => {
                                            return (
                                                <div key={index} className="h-20 w-20 bg-slate-200 rounded flex-shrink-0">
                                                    <img src={image} className='h-full w-full mix-blend-multiply object-scale-down cursor-pointer' onMouseEnter={() => setActiveImage(image)} onClick={() => setActiveImage(image)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>


                {/* Product details */}
                {
                    loading ? (
                        <div className="flex flex-col w-full gap-2">
                            <p className=' h-6  bg-slate-200 rounded-full w-full animate-pulse'></p>
                            <h2 className="text-2xl h-10 bg-slate-200 my-1 lg:text-4xl font-medium animate-pulse"></h2>
                            <p className="capitalize text-slate-400 bg-slate-200 h-4 w-1/2"></p>

                            <div className="flex items-center gap-2 text-red-600 h-4 w-1/2 bg-slate-200 my-1">

                            </div>
                            <div className="flex items-center gap-2 my-3 ">
                                <p className='text-red-600 bg-slate-200 h-5 w-32'></p>
                                <p className='text-slate-600 line-through bg-slate-200 h-5 w-32'></p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <button className='h-10 bg-slate-200 w-32 rounded-full'></button>
                                <button className='h-10 bg-slate-200 w-32 rounded-full'></button>
                            </div>
                            <div className="h-32 my-3 bg-slate-200 w-full">

                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <p className='text-red-600 px-2 bg-red-300 rounded-full w-fit'>{data?.brandName}</p>
                            <h1 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h1>
                            <p className="capitalize text-slate-400">{data?.productCategory}</p>

                            <div className="flex items-center gap-2 text-red-600">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-medium text-red-600 my-3">
                                <p className='text-red-600'>{displayCurrency(data?.selling)}</p>
                                <p className='text-slate-600 line-through'>{displayCurrency(data?.productPrice)}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <button className='border-2 rounded border-red-600 px-3 py-2 text-red-500 font-medium min-w-[120px] hover:bg-red-600 hover:text-white'onClick={handelBuyButton} >Buy</button>
                                <button className='border-2 rounded border-red-600 px-3 py-2 text-white bg-red-600 font-medium min-w-[120px] hover:bg-white hover:text-red-600'onClick={e=>handelAddToCart(e,data._id)} >Add to Cart</button>
                            </div>
                            <div className="">
                                <h1 className="text-slate-600 font-medium my-1">Description:</h1>
                                <p className="">{data?.Description}</p>
                            </div>
                        </div>
                    )
                }

            </div>




            
        </div>



        {
            data && <div className="">
                <ProductCart category={data?.productCategory} heading={"Recommended Products"} onClick={scrollTop()} />
                <SingleCategoryCart category={"membranes"} heading={"Top Selling Products"} onClick={scrollTop()} />
                <HorizontalCart category={data?.productCategory} heading={"Recommended Products"} onClick={scrollTop()} />
            </div>
        }

       </>         
    )
}

export default ProductView
