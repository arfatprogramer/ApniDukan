import React, { useContext, useEffect } from 'react';
import Headers from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  //for alerts
import 'react-toastify/dist/ReactToastify.css';  //for alerts
import './App.css'
import { ContextProvider } from './context/index.jsx';
import { useSelector } from 'react-redux';



const App = () => {
  const { fetchUserData,fetchCartData,fetchAddress } = useContext(ContextProvider)
  const  token = useSelector((state) => state?.token?.token);
  useEffect(() => {
    fetchUserData();
    fetchCartData();
    fetchAddress();
  }, [token])

  return (
    <>

      <ToastContainer position="top-center" />
      <Headers />
      <main className='p-2 pt-28 sm:pt-20 sm:px-8'>
        <Outlet />
      </main>
      <Footer />
      {/* </Context.Provider> */}
    </>
  )
}

export default App
