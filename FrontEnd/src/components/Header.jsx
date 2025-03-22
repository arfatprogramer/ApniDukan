import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import LoginCart from './LoginCart'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



const Header = () => {

  const userDate = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams()
  const [search, setSearch] = useState(urlSearch.get('q') || '');
  // const [search,setSearch]=useState(location.search?.split('=')[1])

  const handelSearch = (e) => {
    e.preventDefault();
    const value = e.target.value
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)

    } else {
      navigate('/search')
    }
  }

  return (
    <header className='fixed w-full h-16 z-50'>
      <nav className=' p-2 bg-blue-700 sm:px-3 sm:grid sm:grid-cols-3 sticky'>
        <div className="h-full flex justify-between  items-center sm:px-6">
          <Link to={'/'}><img src={logo} alt="logo" className='rounded-md w-24 sm:w-32 ' /></Link>
          <div className="sm:hidden pr-1 text-xl flex justify-center items-center"><LoginCart /></div>
        </div>
        <form onSubmit={e => e.preventDefault()} className="bg-white rounded-full px-4 h-9 mt-1 flex items-center sm:grid-cols-2  border-red-700 ">
          <input type="text"
            placeholder="Search..."
            className='bg-transparent w-full outline-none'
            onChange={handelSearch}
            value={search}
          />
          <button className='border-l-2 pl-2 border-gray-400'>Search</button>
        </form>
        <div className="max-sm:hidden  flex justify-end items-center"><LoginCart /></div>
      </nav>
    </header>
  )
}

export default Header
