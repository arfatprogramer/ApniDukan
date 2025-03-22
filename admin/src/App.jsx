import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import AdminNav from "./components/AdminNav";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "./context/index";
import "./App.css"
import { useSelector } from "react-redux";

function App() {
  const { fetchUserData } = useContext(ContextProvider)
  const navigate =useNavigate()
  const userData=useSelector((state)=>state?.user?.user)
  console.log(userData);
  
  
  //for login
  const check =async ()=>{
 
  if (!userData) {
    navigate("/login")
  }
  
}

useEffect(()=>{
  fetchUserData()
  check()
},[])

  useEffect( () => {
    check()
  }, [userData])

  return (
    <>

      <AdminNav />
      <ToastContainer />
      <div className="flex relative h-[90vh]">
        <Header />
        <main className="w-full h-full overflow-auto scroll-none p-4 bg-gray-700 mx-2 sm:mr-2 ">
          <Outlet /> 
        </main>
      </div>

      <Footer />

    </>
  )
}

export default App
