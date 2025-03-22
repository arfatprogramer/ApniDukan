import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../common/apiData';
import { toast } from 'react-toastify';
import UpdateUserProfile from '../components/UpdateUserProfile';
import { ContextProvider } from '../context/index';
import { setUserState } from '../redux/userSlicer';

const userProfile = () => {
  const userData = useSelector((state) => state?.user?.user)
  const dispatch=useDispatch();
  const context=useContext(ContextProvider)
  const navigate=useNavigate()
  const [openUpdatePage,setOpenUpdatePage]=useState(false)

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
      navigate('/')
    }
    if (responseDate.error) {
      toast.error("logout field")
    }
  }


  return (
    <div className="flex min-h-[300px]">
      <div className="w-64 bg-white border-r relative">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="text-gray-500">Manage your account info.</p>
        </div>
        <nav className="mt-6">
          <Link to={'/MyProfile'} className="flex items-center px-6 py-3 text-gray-900 bg-gray-100" >
            <span className="mr-3"><i className="fas fa-user"></i></span>
            Profile
          </Link>
          <Link to={'/MyOrder'} className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <span className="mr-3"><i className="fas fa-lock"></i></span>
            My Orders
          </Link>

        </nav>
        <div className="absolute w-full bottom-0  ">
          <div onClick={() => handelLogout()} className="flex items-center px-6 py-3 font-semibold text-red-600 hover:bg-gray-100" href="#">
            <span className="mr-3"><i className="fas fa-lock"></i></span>
            Logout
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Profile details</h2>
          <div className="flex items-center mb-6">
            {
              userData?.profile !=="undefined" ? (
                <img alt="Profile Image" className="w-12 h-12 rounded-full mr-4" src={userData?.profile} />
              ):(
                <div className='h-12 w-12 mx-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{userData?.firstName?.charAt(0)}
											</div>
              )
            }
            <div>
              <h3 className="text-lg font-semibold">{userData?.firstName} {userData?.lastName}</h3>
              <button onClick={()=>setOpenUpdatePage(true)} className="text-blue-500">Edit profile</button>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Email addresses</h3>
            <ul>
              <li className="flex items-center justify-between mb-2">
                <span>{userData?.email}</span>
                <span className="text-gray-500 text-sm">Primary</span>
              </li>
              <li className="flex items-center justify-between mb-2">
                {/* <span> Email Verified : {userData?.email_verified===true?"True":"false"}</span> */}

              </li>

            </ul>

          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Phone number</h3>
            <ul>
              <li className="flex items-center justify-between mb-2">
                <span>{userData?.phoneNumber}</span>
                <span className="text-gray-500 text-sm">Primary</span>
              </li>
            </ul>

          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Accounts Actions</h3>
            <ul>
              <li className="flex items-center justify-center mb-2">
                <Link to="/AddressPage" className='bg-blue-500 p-3 rounded-lg text-white'>Add New Address</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {
       openUpdatePage && <UpdateUserProfile userData={userData} OnClose={()=>setOpenUpdatePage(false)}  />
      }
    </div>

  );
};

export default userProfile
