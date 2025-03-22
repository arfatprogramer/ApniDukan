import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../common/apiData';
import { toast } from 'react-toastify';
import { setUserState } from '../redux/userSlicer';
import { ContextProvider } from '../context/index';

const LoginCart = () => {
  const userData = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)
  const context=useContext(ContextProvider)
  const navigate=useNavigate()

  const handelLogout = async () => {
    const serverResponse = await fetch(logout.url, {
      method: logout.method,
      credentials: 'include',
      headers: { "Content-Type": "application/json" }
    })

    const responseDate = await serverResponse.json()
    if (responseDate.success) {
      toast.success("logout Success full")
      context.fetchCartData();
      dispatch(setUserState(null))
      navigate("/")
    }
    if (responseDate.error) {
      toast.error("logout field")
    }
  }

  return (
    <div className="flex sm:text-xl ">
      <div className="text-white  px-4 relative flex items-center justify-center cursor-pointer">
        {userData?._id ? (
          <div className=" flex justify-center items-center">
            <div className='flex items-center justify-center relative' onClick={()=>setShowMenu(pre=>!pre)}>
              {userData?.profile != "undefined" ? (<img className='w-9 h-9 rounded-full' src={userData?.profile} alt={userData.firstName} />) : (<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{userData?.firstName?.charAt(0)}
											</div>)}
            </div>
            {showMenu && <div className="absolute top-10 bg-gray-300 text-black whitespace-nowrap text-sm sm:text-lg p-2 rounded">
                          <Link onClick={()=>setShowMenu(false)} className='px-1 rounded hover:text-blue-500 block border-b-2' to={'/MyProfile'}>My Profile</Link>
                          <Link onClick={()=>setShowMenu(false)} className='px-1 rounded hover:text-blue-500 block border-b-2' to={'/MyOrder'}>My Orders</Link>
                          {
                            userData?.userType==="vender" && <Link onClick={()=>setShowMenu(false)} className='px-1 rounded hover:text-blue-500 block border-b-2' to={'merchant/all-product'}>Admin</Link>

                          }
                          <div onClick={() => {
                            handelLogout()
                            setShowMenu(false)

                          }} className='px-1 rounded hover:text-blue-500 block border-b-2' >Logout</div>
                      </div>
            }
          </div>
        ) : (

          <Link to={'/login'} className='flex items-center justify-center'>
            <FaRegUserCircle />
            <span className='pl-1'>Login </span>
            <RiArrowDropDownLine />
          </Link>
        )}
      </div>
      <Link to={'/myCart'} className="text-white sm:2xl  sm:px-4 relative cursor-pointer flex items-center justify-center">
        <FaShoppingCart />
        <div className="bg-red-600 flex items-center justify-center w-4 h-4 rounded-full absolute -top-1 left-2 sm:left-8"><span className='text-sm'>{context?.cartItemCount}</span></div>
      </Link>
      {/* {userData?._id && <div  className="text-white  px-4 max-sm:pr-0  relative flex items-center justify-center cursor-pointer">
        <button className='rounded-full bg-white text-blue-600 text-sm py-1 px-3 sm:py-1 font-bold' >Logout</button>
      </div>} */}
    </div>
  )
}

export default LoginCart
