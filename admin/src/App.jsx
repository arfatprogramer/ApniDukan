import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AdminNav from "./components/AdminNav";
import { useContext, useEffect } from "react";
import { ContextProvider } from "./context/index";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { fetchUserData } = useContext(ContextProvider);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.user);
  const  token = useSelector((state) => state?.token?.token);
  
  useEffect(() => {
    fetchUserData(); // Fetch user data once when the app loads
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token,navigate]);

  return (
    <>
      <AdminNav />
      <ToastContainer />
      <div className="flex relative h-[90vh]">
        <Header />
        <main className="w-full h-full overflow-auto scroll-none p-4 bg-gray-700 mx-2 sm:mr-2">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
