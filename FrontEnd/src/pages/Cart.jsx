import React, { useContext, useEffect, useState } from 'react'
import { cartItem, productQuantity } from '../common/apiData'
import { ContextProvider } from "../context/index";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import displayCurrency from '../helper/displayCurrency';
import calculateDiscount from '../helper/calculateDiscount';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Address from '../components/Address';
import { setAddress } from '../redux/addressSlicer'
import { setConfirmAddress, setUserSelectedAddressIndex } from '../redux/confirmAddressSlicer'
import { useDispatch, useSelector } from 'react-redux';
import ChangeSelectedAddress from '../components/ChangeSelectedAddress';


const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  // const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const { cartItemCount } = useContext(ContextProvider)
  const box = new Array(cartItemCount).fill(null)
  const confirmAddress = useSelector(state => state?.confirmAddressSlicer?.confirmAddress)
  const userSelectedAddressIndex = useSelector(state => state?.confirmAddressSlicer?.userSelectedAddressIndex)
  const userAddress = useSelector(state => state?.address?.address)
  const dispatch = useDispatch()
  let totalPrice = 0
  let discount = 0
  let finalPrice = 0

  const [newAddress, setNewAddress] = useState(false)
  const [openChangeAddress, setOpenChangeAddress] = useState(false)

  // import context
  const { fetchCartData } = useContext(ContextProvider)

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(cartItem.url, {
      method: cartItem.method,
      credentials: 'include',
      headers: { "content-type": "application/json" }
    })

    const data = await response.json()
    if (data.success) {
      setData(data.data)
    }
    if (data.error) {
      setData(0)
    }
    setLoading(false)

  }


  /** for handling cart items like remove pluse minus**/
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

  const handelConfirmAddress = () => {
    if (userAddress.length != 0) {
      dispatch(setConfirmAddress(userAddress[userSelectedAddressIndex]))
    }
  }


  useEffect(() => {
    fetchData();
    handelConfirmAddress();
  }, [])

  return (
    <div className='w-full lg:container lg:mx-auto'>

      {/***  when cart is empty   **/}
      <div className="text-center text-lg my-2">
        {
          data.length === 0 && !loading && (
            <div className="bg-white py-5">No Data</div>
          )
        }
      </div>

      {/*** cart display items  **/}
      {data.length !== 0 && !loading && <div className="w-full ">
        {
          loading ? (
            box.map((el, index) => {
              return (<div key={index} className="w-full bg-slate-200 rounded h-32 my-2 border border-slate-300 animate-pulse">

              </div>)
            })

          ) : (
            <div className=" md:flex w-full p-2  ">
              {/* <div className=" flex gap-2 w-full "> */}

              <div className="w-full md:w-[70%] p-3 ">
                {/* address section */}

                {
                  userAddress.length != 0 ? (
                    <div className=" flex justify-between p-2 px-4 items-center  w-full bg-white h-20 max-sm:text-sm">
                      <div className="text-slate-500 max-sm:w-1/2">
                        <p className='text-black text-sm'>Deliver to : <span className='font-semibold text-base'>{confirmAddress?.name}, {confirmAddress?.pinCode}</span>  </p>
                        <p className='text-ellipsis line-clamp-1 text-sm'>{confirmAddress?.line1}, {confirmAddress?.line2}, {confirmAddress?.landmark}{confirmAddress?.landmark && ","} {confirmAddress?.city}, {confirmAddress?.state}, {confirmAddress?.pinCode}</p>
                      </div>
                      <button onClick={() => setOpenChangeAddress(true)} className='text-blue-500  text-2xl py-2 px-6 border-2  font-semibold rounded-sm '>Change</button>
                      {openChangeAddress && <ChangeSelectedAddress userAddress={userAddress} onclose={() => setOpenChangeAddress(false)} />}
                      {newAddress && <Address onclose={() => setNewAddress(false)} />}
                    </div>
                  ) : (
                    <div className=" flex justify-between p-2 px-4 items-center  w-full bg-white h-20 max-sm:text-sm">
                      <div className="text-slate-500 max-sm:w-1/2">
                        <p className='text-black text-sm'>Deliver to : <span className='font-semibold text-base'>No Address is available, Please add Address</span>  </p>
                      </div>
                      <button onClick={() => setNewAddress(true)} className='text-blue-500 whitespace-nowrap  text-2xl py-2 px-6 border-2  font-semibold rounded-sm '>Add Address</button>
                      {newAddress && <Address onclose={() => setNewAddress(false)} />}
                    </div>
                  )
                }


                <div className=" relative w-full my-2 bg-white ">

                  {/* product cart */}
                  {
                    data && data?.map((el, index) => {
                      totalPrice += el?.productId?.productPrice
                      finalPrice += el?.productId?.selling

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
                            {/* <div className="p-2 text-sm hidden md:block">
                              <p>Delivery by Tue Dec 31 | Free</p>
                            </div> */}
                          </div>
                          {/* Button dive */}
                          <div className=" flex items-center gap-6 max-sm:text-sm">
                            <div className=" flex gap-2">
                              <button onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "min")} className='text-[30px] font-semibold  '><CiCircleMinus /></button>
                              <p className='text-sm flex items-center justify-center border-2 px-5  w-7 h-7'>{el?.quantity}</p>
                              <button onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "pluse")} className='text-[30px] font-semibold  '><CiCirclePlus /></button>
                            </div>
                            <div className="hover:text-blue-600">ORDER NOW</div>
                            <div onClick={() => handleCartItems(el?.productId?._id, el?.quantity, "remove")} className="hover:text-blue-600">REMOVE</div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="w-full bg-white h-20 p-6 border-b-2 hidden md:block ">

                  </div>
                  {/* Place order section */}
                  <div className="md:flex items-center justify-end p-2 px-4 absolute -bottom-2 w-full my-2 bg-white h-20 shadow-2xl hidden  ">
                    {userAddress.length === 0 ? (
                      <button type='button' onClick={() =>{ toast.error("Pease Add Address")
                                                          setNewAddress(true)
                      }} className='bg-orange-500 text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-sm '>Place Order</button>

                    ) : (

                      <Link to={"/checkout"} className='bg-orange-500 text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-sm '>Place Order</Link>
                    )
                    }
                  </div>
                </div>
              </div>

              {/* it display odder summery in desktop mode */}
              <div className="w-full md:w-[30%]  p-3 ">
                <div className="bg-white  p-2">
                  <h1 className='uppercase text-slate-400 border-b-2 p-3 py-2 font-semibold'>Price details</h1>
                  <div className='border-y-2'>
                    <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Price ( {cartItemCount} Items)</h1><p>{displayCurrency(totalPrice)}</p></div>
                    <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Discount</h1><p className='text-green-600'>{displayCurrency((totalPrice - finalPrice))}</p></div>
                    <div className="flex justify-between px-4 py-2 text-md text-slate-700 font-medium"><h1>Delivery Charges</h1><p className='text-green-600'><span className='text-slate-500 line-through'>{displayCurrency(50)} </span>  Free</p></div>
                  </div>
                  <div className="flex justify-between text-xl p-4 font-semibold">
                    <h1 className="">Total Amount</h1>
                    <h1 className="">{displayCurrency(finalPrice)}</h1>
                  </div>
                  <p className="px-4 text-green-600 border-t-2 py-1">You will save {displayCurrency((totalPrice - finalPrice))} on this order</p>
                </div>
                <div className="w-full bg-white h-20 p-6 border-b-2 flex justify-center items-center border-y-2 md:hidden ">
                  {userAddress.length === 0 ? (
                    <button type='button' onClick={() => {toast.error("Pease Add Address") 
                      setNewAddress(true)}} className='bg-orange-500 text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-sm '>Place Order</button>

                  ) : (

                    <Link to={"/checkout"} className='bg-orange-500 text-white text-2xl py-2 sm:px-8 px-3 border-2  font-semibold rounded-sm '>Place Order</Link>
                  )
                  }
                </div>
              </div>

            </div>
          )
        }
      </div>}
    </div>
  )
}

export default Cart
