import {  ShoppingCart, } from "lucide-react";
import React from 'react'
import { Link, useNavigate} from 'react-router-dom'

import { TbLogout } from "react-icons/tb";
import userImage from "../assets/images.png";
import { MdDashboard } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../common/ApiUrls';
import { toast } from 'react-toastify';
import { setUserDetails } from "../redux/userDataSlicer";
import { GiHandTruck } from "react-icons/gi";
import { setNavBarDisplay } from "../redux/navBarWithSlicer";
import { setTokenDetails } from "../redux/tokenSlicer";

const Header = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const navbarWidth = useSelector(state=>state.navbarWidth.value.width)
   const navbarHideAndShow =useSelector(state=>state.navbarWidth.value.display)
   const userData =useSelector(state=>state?.user?.user) 
   const  token = useSelector((state) => state?.token?.token);
 
   const handelLogout = async () => {
    const serverResponse = await fetch(logOut.url, {
      method: logOut.method,
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({userToken:token})
    })
    const responseDate = await serverResponse.json()
    if (responseDate.success) {
      toast.success(responseDate.message)
      dispatch(setUserDetails(null))
      dispatch(setTokenDetails(null))
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }
    if (responseDate.error) {
      toast.error(responseDate.message)
      navigate('/login')
    }
  }

  const hidemenu=()=>{
    dispatch(setNavBarDisplay("hidden"))
    
    
  }

  return (
    < >
      <p className="hidden w-52 "></p>
      <nav className={`sm:h-[90vh] w-${navbarWidth} flex flex-col justify-between  ml-2 overflow-hidden bg-gray-700 max-sm:w-full max-sm:mx-0 max-sm:absolute max-sm:border-x-8 z-50 border-black max-sm:${navbarHideAndShow} `}>
        <div >
          <ul className=''>
            <Link onClick={hidemenu} to="./">
              <li className='h-14 text-2xl md:text-lg sm:text-sm sm:px-3 flex items-center px-3 gap-6 border-b-4  border-black hover:bg-green-700 active:bg-violet-700 cursor-pointer'>
                <i className="text-2xl"><MdDashboard /></i>
                <span className='' >Dashboard</span>
              </li>
            </Link>

            <Link onClick={hidemenu} to="./Users">
              <li className='h-14 text-2xl md:text-lg sm:text-sm sm:px-3 flex items-center px-3 gap-6 border-b-4  border-black hover:bg-green-700 active:bg-violet-700 cursor-pointer'>
                <i className="text-2xl text-blue-600"><FaUsers /></i>
                <span className='' >Users</span>
              </li>
            </Link>

            <Link onClick={hidemenu} to="./Products">
              <li className='h-14 text-2xl md:text-lg sm:text-sm sm:px-3 flex items-center px-3 gap-6 border-b-4  border-black hover:bg-green-700 active:bg-violet-700 cursor-pointer'>
                <i className="text-2xl"><GiHandTruck /></i>
                <span className='' >Products</span>
              </li>
            </Link>

            <Link onClick={hidemenu} to="./Orders">
              <li className='h-14 text-2xl md:text-lg sm:text-sm sm:px-3 flex items-center px-3 gap-6 border-b-4  border-black hover:bg-green-700 active:bg-violet-700 cursor-pointer'>
                <i className="text-2xl"><ShoppingCart size={20} style={{ color:"#F59E0B", minWidth: "28px" }} /></i>
                <span className='' >Orders</span>
              </li>
            </Link>
            
            <Link onClick={hidemenu} to="./MessagesPage">
              <li className='h-14 text-2xl md:text-lg sm:text-sm sm:px-3 flex items-center px-3 gap-6 border-b-4  border-black hover:bg-green-700 active:bg-violet-700 cursor-pointer'>
                <i className="text-2xl  text-blue-600 "><MdOutlineEmail size={20} style={{ minWidth: "28px" }} /></i>
                <span className='' >Messages</span>
              </li>
            </Link>

          </ul>

        </div>
        <div className=" w-full flex items-center justify-between text-xl border-y-2 border-black cursor-pointer  md:text-lg sm:text-sm">
          <Link onClick={hidemenu} to={"./UsersPage"} className="h-20 w-14 flex flex-shrink-0 items-center justify-center "><img className='rounded-full w-10 h-10 sm:14'  src={userData?.profile?userData?.profile:userImage} alt="" /></Link>
          <Link onClick={hidemenu} to={"./UsersPage"}  className='whitespace-nowrap'>{userData?.firstName}</Link>
          <i onClick={handelLogout} className='pr-2 sm:text-xl md:text-2xl'><TbLogout/></i>
        </div>
          
      </nav>
    </>

  )
}

export default Header
