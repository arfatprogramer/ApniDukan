import React, { useState, useEffect } from 'react';

// The base URL of your API (replace with your actual API endpoint)

const ViewOrderDetail = ({ orderId, onClose,viewOrderData }) => {
  const [orderData, setOrderData] = useState(null);
  const [disable, setDisable] = useState(false);
  // Fetch order data from the server by orderId
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        
        const response = await fetch(viewOrderData.url.url,{
            method: viewOrderData.url.method,
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({_id:viewOrderData._id})
        });
        if (response.ok) {
          const data = await response.json();
    
          setOrderData(data.data[0]); // Save the fetched data into state
        } else {
          console.error('Failed to fetch order data');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData(); // Fetch the data if orderId is provided
    if (orderId) {
    }
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50">
        <div className="bg-white p-6 w-full max-w-4xl mx-auto border-2 border-black rounded-lg max-h-screen overflow-y-auto">
          <h2>Loading order details...</h2>
        </div>
      </div>
    );
  }

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50 overflow-y-auto z-50">
      <div className="bg-white p-6 w-full max-w-4xl mx-auto border-2 border-black rounded-lg max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center pb-4">
          <h1 className="font-bold text-2xl text-black">Order Details</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            Close
          </button>
        </div>

        <form onSubmit={handelOnSubmit}>
          {/* Product Section */}
          <div className="space-y-6">
            <div className="flex justify-center flex-col items-center mb-6">
              <img
                src={orderData?.productId?.productImage[0]}
                alt={orderData?.productId?.productName}
                className=" h-72 object-cover rounded-lg"
              />
              <h2 className="font-semibold text-xl mt-4 text-black">{orderData?.productId?.productName}</h2>
              <p className="text-gray-700 text-center">{orderData?.productId?.Description}</p>
              <p className="font-bold text-xl mt-2 text-black">{orderData?.productId?.selling} INR</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <p className="font-semibold text-black">Brand:</p>
                <p className="text-black">{orderData?.productId?.brandName}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Category:</p>
                <p className="text-black">{orderData?.productId?.productCategory}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Color:</p>
                <p className="text-black">{orderData?.productId?.productColor}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Quantity:</p>
                <p className="text-black">{orderData?.quantity}</p>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-black">Vendor Information</h3>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Name:</p>
                <p className="text-black">{orderData?.venderId?.firstName} {orderData?.venderId?.lastName}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Phone:</p>
                <p className="text-black">{orderData?.venderId?.phoneNumber}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Email:</p>
                <p className="text-black">{orderData?.venderId?.email}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-black">User Information</h3>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Name:</p>
                <p className="text-black">{orderData?.userId?.firstName} {orderData.userId.lastName}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Phone:</p>
                <p className="text-black">{orderData?.userId?.phoneNumber}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Email:</p>
                <p className="text-black">{orderData?.userId?.email}</p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-black">Delivery Information</h3>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Address:</p>
                <p className="text-black">{orderData?.deliveryAddress?.line1}, {orderData?.deliveryAddress?.line2}, {orderData?.deliveryAddress?.city}, {orderData?.deliveryAddress?.state} - {orderData?.deliveryAddress?.pinCode}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-black">Phone:</p>
                <p className="text-black">{orderData?.deliveryAddress?.number}</p>
              </div>
            </div>

            {/* Delivery Status */}
            <div className="flex justify-between mt-6">
              <p className="font-semibold text-black">Delivery Status:</p>
              <p className={` p-1 rounded ${orderData?.deliveryStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : orderData?.deliveryStatus === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : orderData.deliveryStatus === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              } font-bold`}>{orderData?.deliveryStatus}</p>
            </div>

            {/* Cancellation Reason */}
            {orderData.resion && (
              <div className="flex justify-between mt-4">
                <p className="font-semibold text-black">Cancellation Reason:</p>
                <p className="text-black">{orderData?.resion}</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              disabled={disable}
              onClick={onClose}
              className="w-full bg-blue-600 px-3 py-2 border-2 rounded-full text-white hover:scale-105 hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
