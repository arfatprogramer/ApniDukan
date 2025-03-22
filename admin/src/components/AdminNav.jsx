import React from 'react'
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from 'react-redux'
import { IoMenu } from "react-icons/io5";
import { setNavBarWith, setNavBarDisplay } from "../redux/navBarWithSlicer";

const AdminNav = () => {
  const dispatch = useDispatch()
  const navbarWidth = useSelector(state => state.navbarWidth.value.width)
  const navbarHideAndShow = useSelector(state => state.navbarWidth.value.display)
  const handleNavBarWidth = () => {
    if (navbarWidth == 14) {
      dispatch(setNavBarWith(52))
    } else {
      dispatch(setNavBarWith(14))
    }
  }

  const handleNavBarHideAndShow = () => {
    if (navbarHideAndShow == "hidden") {
      dispatch(setNavBarDisplay(""))
    } else {
      dispatch(setNavBarDisplay("hidden"))
    }
  }
  return (
    <>
      <nav className='bg-gray-700 h-14 m-2  flex items-center '><i onClick={handleNavBarWidth} className='text-4xl px-3 max-sm:hidden '><IoMenu /></i><i onClick={handleNavBarHideAndShow} className='text-4xl px-3 sm:hidden '><IoMenu /></i><img className='rounded-lg ' width={110} src={logo} /></nav>
    </>
  )
}

export default AdminNav
