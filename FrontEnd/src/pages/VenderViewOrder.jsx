import React, { useEffect, useState } from 'react'
import { updateOrderStatus, VenderOrderDetails, viewSingleProduct } from '../common/apiData'
import OrderCardDisplay from '../components/OrderCardDisplay'
import { toast } from "react-toastify";
import CancelProduct from '../components/CancelProduct';
import displayCurrency from '../helper/displayCurrency';
import calculateDiscount from '../helper/calculateDiscount';
import ViewOrderDetail from '../components/ViewOrderDetail';

const VenderViewOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [openCancelForm, setOpenCancelForm] = useState(false);
  const [openviewOrder, setOpenviewOrder] = useState(false);
  const [viewOrderData, setViewOrderData] = useState({});

  const getOrderDetails = async () => {
    const data = await fetch(VenderOrderDetails.url, {
      method: VenderOrderDetails.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await data.json();
    if (response.success) {
      setOrderData(response.data);
    }
    if (response.error) {
      toast.error(response.message);
    }
  };

  const handleStatusChange = async (e, id) => {
    const value = e.target.value;
    const OrderId = id;
    const data = { OrderId, value };
    const Response = await fetch(updateOrderStatus.url, {
      method: updateOrderStatus.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const response = await Response.json();
    if (response.success) {
      getOrderDetails();
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleViewOrderDetails = (el, e) => {
    e.stopPropagation(); // Stop bubbling
    setViewOrderData({
      _id: el._id,
      url: viewSingleProduct 
    });
    setOpenviewOrder(true);
  }

  const handleCancelOrder = (e) => {
    e.stopPropagation(); // Stop bubbling
    setOpenCancelForm(true);
  }

  return (
    <>
      <div className="flex items-center justify-between p-2 mb-3 shadow-2xl bg-white">
        <h1 className='font-bold text-2xl'>All Orders</h1>
      </div>
      <div className="flex-1 p-8">
        <div className="bg-white p-2 rounded-lg shadow-md">
          {
            orderData.length === 0 ? (
              <div className="bg-white py-5 font-bold text-center">No Data</div>
            ) : (
              <div className="relative w-full my-2 bg-white">
                {/* product card */}
                {
                  orderData.map((el, index) => (
                    <div key={index} className="grid gap-6 w-full bg-white h-52 px-6 py-5 border-b-2">
                      {/* product details */}
                      <div
                        onClick={(e) => handleViewOrderDetails(el, e)} // Trigger onClick for View Order Details
                        className="flex gap-6 w-full h-[118px] overflow-hidden cursor-pointer"
                      >
                        <div className="h-full w-[110px] overflow-hidden">
                          <img className='h-full w-full object-scale-down mix-blend-multiply' src={el?.productId?.productImage?.[0]} />
                        </div>
                        <div className="grid gap-2 p-2 w-96">
                          <div>
                            <h1 className='text-ellipsis line-clamp-1 text-lg'>{el?.productId?.productName}</h1>
                            <p className="text-sm text-slate-500">{el?.productId?.brandName}</p>
                          </div>
                          <p className="text-sm text-slate-500">{el?.productId?.productColor}</p>
                          <div className="flex gap-3">
                            <p className='text-slate-500 line-through'>{displayCurrency(el?.productId?.productPrice)}</p>
                            <p className='text-red-600 font-medium text-lg'>{displayCurrency(el?.productId?.selling)}</p>
                            <p className='text-green-600 font-medium text-md'>{calculateDiscount(el?.productId?.productPrice, el?.productId?.selling)}% Off</p>
                          </div>
                        </div>
                      </div>
                      {/* Button dive */}
                      <div className="flex items-center gap-6 max-sm:text-sm">
                        <div className="flex gap-2">
                          <p className='text-sm flex items-center justify-center border-2 px-5 w-7 h-7'>{el?.quantity}</p>
                        </div>

                        <div className="hover:text-blue-600">
                          Status:
                          <select
                            className={`bg-white border-2 p-1 w-24 text-sm ${el.deliveryStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : el.deliveryStatus === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : el.deliveryStatus === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            value={el?.deliveryStatus}
                            onChange={(e) => handleStatusChange(e, el?._id)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>

                        <button
                          type='button'
                          onClick={handleCancelOrder} // Trigger onClick for Cancel
                          className="hover:text-blue-600 text-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                      {
                        openCancelForm && <CancelProduct data={el} onClose={() => setOpenCancelForm(false)} />
                      }
                      {
                        openviewOrder && <ViewOrderDetail viewOrderData={viewOrderData} onClose={() => setOpenviewOrder(false)} />
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default VenderViewOrder;
