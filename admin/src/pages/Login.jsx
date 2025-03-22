import React, { useContext, useState, useCallback, useEffect } from "react";
import userAnimato from "../assets/signin.gif";
import { FaEyeSlash, FaRegUser, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../common/ApiUrls";
import { toast, ToastContainer } from "react-toastify";
import { ContextProvider } from "../context/index";
import { useSelector } from "react-redux";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.user);
  const { fetchUserData } = useContext(ContextProvider);

  // Redirect if already logged in
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      let serverResponse = await fetch(login.url, {
        method: login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      serverResponse = await serverResponse.json();

      if (serverResponse.success) {
        toast.success(serverResponse.message);
        setTimeout(async () => {
          await fetchUserData();
          navigate("/");
        }, 2000);
      } else {
        toast.error(serverResponse.message);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong");
    }
  }, [fetchUserData, navigate]);

  return (
    <>
      <ToastContainer />
      <div className="py-20">
        <form
          className="my-2 p-4 max-w-sm mx-auto border-2 border-white bg-gray-700 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="w-1/2 h-1/2 mx-auto flex justify-center py-3">
            <img className="rounded-full" width={100} src={userAnimato} alt="User Animation" />
          </div>
          <div className="w-full px-2">
            <label htmlFor="username">Username</label>
            <div className="flex w-full my-3">
              <input
                type="email"
                name="username"
                placeholder="Username or Email"
                className="w-full outline-none py-1 px-3 text-black"
                required
              />
              <div className="flex items-center justify-center bg-white px-3 text-black">
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
                className="w-full outline-none py-1 px-3 text-black"
                required
              />
              <div
                onClick={() => setShow((prev) => !prev)}
                className="flex items-center justify-center text-black bg-white px-3 cursor-pointer"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="w-full px-2">
            <button
              type="submit"
              className="bg-green-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-green-700 transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
