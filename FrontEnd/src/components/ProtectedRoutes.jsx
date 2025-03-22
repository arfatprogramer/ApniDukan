import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoutes = ({children}) => {
    const isLogin=useSelector(state=>state?.user?.user)
    console.log(isLogin);
    
    const navigate=useNavigate()
    useEffect(()=>{
        if (!isLogin) {
            toast.error("Please Login")
            navigate("/")
        }
    },[])
  return (
    
      children
    
  )
}

export default ProtectedRoutes
