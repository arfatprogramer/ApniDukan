import { useDispatch, useSelector } from "react-redux";
import { cartItem, productQuantity } from "../../common/apiData";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context";
import { setConfirmProduct } from "../../redux/confirmProducts";
import { setAmount } from "../../redux/finalAmount";
import displayCurrency from "../../helper/displayCurrency";
import calculateDiscount from "../../helper/calculateDiscount";
import { MdOutlineDoneOutline } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";

//for product Section
const Stage2 = () => {

    const [data, setData] = useState([])
    const despatch = useDispatch();
    const address = useSelector(state => state?.confirmAddressSlicer?.confirmAddress)
    const confirmProduct = useSelector((state) => state?.confirmProduct.product) 
    let totalPrice = 0
    let finalPrice = 0
    
    const fetchData = async () => {
      const response = await fetch(cartItem.url, {
        method: cartItem.method,
        credentials: 'include',
        headers: { "content-type": "application/json" }
      })
  
      const data = await response.json()
      if (data.success) {
        setData(data.data)
        despatch(setConfirmProduct(""))
        
      }
      if (data.error) {
        setData([])
      }
    }
  
    const { fetchCartData } = useContext(ContextProvider)

    const handleCartItems = async (_id, quantity, action) => {
      if (quantity <= 1 && action === 'min') {
        toast.error("Minimum 1 should be ");
        return
      }
      if (quantity >= 5 && action === 'pluse') {
        toast.error("Maximum 5 Product ");
        return
      }
      const response = await fetch(productQuantity.url, {
        method: productQuantity.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id, quantity, action })
      })
      const responseData = await response.json()
      if (responseData.success) {
        toast.success("Update")
        fetchData();
        if (action === 'remove') {
          fetchCartData()
        }
      }
  
    }
  
    const handelCartItems=() =>{
      despatch(setConfirmProduct(data))
      despatch(setAmount({totalPrice,finalPrice}))
    } 
    useEffect(() => {
      fetchData()
    }, [])
    return (
      <>
        {/* <div className=" md:flex w-full p-2  "> */}
        {
          confirmProduct === "" ? (
            <div className=" w-full ">
              <div className='bg-blue-600 text-white h-10  flex items-center p-2 gap-2'>
                <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>2</span> <p className='text-lg font-semibold'>Product Details</p>
              </div>
  
  
              {
                data && data?.map((el, index) => {
                  totalPrice += (el?.productId?.productPrice * el?.quantity)
                  finalPrice += (el?.productId?.selling *  el?.quantity)
                 
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
                      <div className=" flex items-center gap-6 max-sm:text-sm">
                        <div className=" flex gap-2">
                          <button onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "min")} className='text-[30px] font-semibold  '><CiCircleMinus /></button>
                          <p className='text-sm flex items-center justify-center border-2 px-5  w-7 h-7'>{el?.quantity}</p>
                          <button onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "pluse")} className='text-[30px] font-semibold  '><CiCirclePlus /></button>
                        </div>
  
                        <div onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "remove")} className="hover:text-blue-600">REMOVE</div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="w-full bg-white h-20 px-3  border-b-2 flex items-center justify-end ">
                {
                  address.length==0?(
                    <button type='button' onClick={()=>toast.error("Please add Address")} className='bg-blue-700  text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-lg '>Confirm</button>
  
                  ):(
  
                    <button onClick={handelCartItems} className='bg-blue-700  text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-lg '>Confirm</button>
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
                <button onClick={() => {despatch(setConfirmProduct(""))
                                        despatch(setAmount(""))}} className='p-1 bg-white text-blue-600 font-semibold rounded-sm'>Change</button>
              </div>
            </div>
          )
        }
  
      </>
    )
  }

  export default Stage2