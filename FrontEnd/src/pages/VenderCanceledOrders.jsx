import React, { useEffect, useState } from 'react'
import {  viewCancelOrder, viewCancelSingleProduct } from '../common/apiData'
import { toast } from "react-toastify";
import CancelProduct from '../components/CancelProduct';
import displayCurrency from '../helper/displayCurrency';
import calculateDiscount from '../helper/calculateDiscount';
import ViewOrderDetail from '../components/ViewOrderDetail';

const VenderCanceledOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [openCancelForm, setOpenCancelForm] = useState(false);
  const [openviewOrder, setOpenviewOrder] = useState(false);
  const [viewOrderData, setViewOrderData] = useState({});

  const getOrderDetails = async () => {
    const data = await fetch(viewCancelOrder.url, {
      method: viewCancelOrder.method,
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

  
  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleViewOrderDetails = (el, e) => {
    e.stopPropagation(); // Stop bubbling
    setViewOrderData({
      _id: el._id,
      url: viewCancelSingleProduct 
    });
    setOpenviewOrder(true);
  }

  return (
    <>
      <div className="flex items-center justify-between p-2 mb-3 shadow-2xl bg-white">
        <h1 className='font-bold text-2xl'>All Canceled Orders</h1>
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

                        <h1  className={`p-1  text-md bg-red-100 text-red-800`}>Status : {el?.deliveryStatus}</h1>

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

export default VenderCanceledOrders;
