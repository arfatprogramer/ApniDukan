import React, { useState, useContext } from 'react';
import { FaEyeSlash, FaRegUser, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../common/apiData';
import { toast } from 'react-toastify';
import {ContextProvider} from "../context/index"; // Updated import for the context
import userAnimato from '../assets/signin.gif';
import { useDispatch } from 'react-redux';
import { setTokenDetails } from "../redux/tokenSlicer";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  
  const {fetchUserData, fetchCartData, fetchAddress } = useContext(ContextProvider); // Corrected to use Context

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // Fetch data from the server
      let serverResponse = await fetch(login.url, {
        method: login.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      serverResponse = await serverResponse.json();
      if (serverResponse.success) {
        toast.success(serverResponse.message);
        dispatch(setTokenDetails(serverResponse.token))
          setTimeout(() => {
           fetchUserData();  // Get user data
           fetchCartData();  // Get the cart item count
           fetchAddress();   // Get user address
           navigate('/');
          }, 3000);
      } else {
        toast.error(serverResponse.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err); // Log the error for debugging
    }
  };

  return (
    <div className='py-20'>
      <form className='my-2 p-2 max-w-sm mx-auto border-2 border-black rounded-lg' onSubmit={handleSubmit}>
        <div className='w-1/2 h-1/2 mx-auto flex justify-center py-3'>
          <img width={100} src={userAnimato} alt="User Animation" />
        </div>
        <div className="w-full px-2">
          <label htmlFor="username">Username</label>
          <div className="flex w-full my-3">
            <input 
              type="email"
              name="username"
              placeholder="Username or Gmail"
              className="w-full outline-none py-1 px-3"
              required
            />
            <div className="flex items-center justify-center bg-white px-3">
              <FaRegUser />
            </div>
          </div>
        </div>
        <div className="w-full px-2 mb-3">
          <label htmlFor="password">Password</label>
          <div className="flex w-full mt-3 relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full outline-none py-1 px-3"
              required
            />
            <div
              onClick={() => setShow(prev => !prev)} // Toggle password visibility
              className="flex items-center justify-center bg-white px-3"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <Link to="/forgotPassword" className="text-red-700 text-end block">Forgot Password?</Link>
        </div>
        <div className="w-full px-2">
          <button 
            type="submit"
            className="bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </div>
        <div className="w-full px-2 py-3">
          <Link to="/SignupType">Don't have an account? <span className="text-red-700 underline">SignUp.</span></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
