import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout, OrderDetails, viewSingleProduct } from '../common/apiData';
import { toast } from 'react-toastify';
import { ContextProvider } from '../context/index';
import { setUserState } from '../redux/userSlicer';
import OrderCardDisplay from '../components/OrderCardDisplay';
import ViewOrderDetail from '../components/ViewOrderDetail';

const MyOrder = () => {
  
  const userData = useSelector((state) => state?.user?.user)
  const orderData = useSelector((state) => state?.MyOrder?.MyOrder)
  
  const dispatch = useDispatch();
  const context = useContext(ContextProvider)
  const navigate = useNavigate()
  const [openUpdatePage, setOpenUpdatePage] = useState(false)
  const [openviewOrder,setOpenviewOrder]=useState(false)
	const [viewOrderData,setViewOrderData]=useState({})
  

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

  useEffect(() => {
    context.getOrderDetails()
  }, [])

  return (
    <div className="flex min-h-[488px]">
      <div className="w-64 bg-white border-r relative">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="text-gray-500">Manage your account info.</p>
        </div>
        <nav className="mt-6">
          <Link to={'/MyProfile'} className="flex items-center px-6 py-3  text-gray-600 hover:bg-gray-100" >
            <span className="mr-3"><i className="fas fa-user"></i></span>
            Profile
          </Link>
          <Link to={'/MyProfile'} className="flex items-center px-6 py-3 text-gray-900 bg-gray-100">
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
          <h2 className="text-2xl font-semibold mb-6">Order details</h2>
          <OrderCardDisplay data={orderData} setOpenviewOrder={setOpenviewOrder} setViewOrderData={setViewOrderData}  url={viewSingleProduct}/>

        </div>
      </div>
      {
				openviewOrder && <ViewOrderDetail  viewOrderData={viewOrderData} onClose={() => setOpenviewOrder(false)} />
			}
    </div>

  );
};

export default MyOrder
