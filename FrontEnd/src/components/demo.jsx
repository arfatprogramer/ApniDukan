import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { addAddress, updateAddress } from '../common/apiData';
import { toast } from 'react-toastify';

const UpdateAddress = ({ onclose, data }) => {
    const [address, setAddress] = useState(data);

    const handelOnSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        const response = await fetch(updateAddress.url, {
            method: updateAddress.method,
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ address }),
        });

        const ResponseData = await response.json();
        if (ResponseData.success) {
            console.log(ResponseData);
            toast.success('Address Added Successfully');
            onclose(); // Close the modal or perform any other action
        }
        console.log(addAddress); // This seems unnecessary if not used elsewhere
    };

    const handelChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    return (
        <div className="fixed z-50 max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden">
            <div className=" bg-gray-100 shadow-lg text-black  p-2 w-[600px] h-[650px]  mx-auto border-2 border-black rounded-lg overflow-auto">
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl"> Update Address</h1>
                    <button onClick={onclose} className="text-2xl w-7 hover:scale-125 hover:text-red-500">
                        <IoCloseSharp />
                    </button>
                </div>
                <form onSubmit={handelOnSubmit}>
                    <div className="w-full px-2 mb-2">
                        <label htmlFor="name">Full Name</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                value={address.name}
                                onChange={handelChange}
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="number">Mobile Number</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="number"
                                id="number"
                                value={address.number}
                                onChange={handelChange}
                                placeholder="Phone Number"
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="line1">Address Line 1</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="line1"
                                id="line1"
                                value={address.line1}
                                onChange={handelChange}
                                placeholder="Flat Number, building name,"
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="line2">Address Line 2</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="line2"
                                id="line2"
                                value={address.line2}
                                onChange={handelChange}
                                placeholder="Street, road,"
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="city">City / Village/ district</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={address.city}
                                onChange={handelChange}
                                placeholder="City / Village/ district,"
                                className="w-full outline-none py-1 px-3"
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="landmark">Land Mark</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="landmark"
                                id="landmark"
                                value={address.landmark}
                                onChange={handelChange}
                                placeholder="land mark"
                                className="w-full outline-none py-1 px-3"
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="state">State</label>
                        <div className="flex w-full my-1">
                            <input
                                type="text"
                                name="state"
                                id="state"
                                value={address.state}
                                onChange={handelChange}
                                placeholder="Street, road,"
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="pinCode">Pin Code</label>
                        <div className="flex w-full my-1">
                            <input
                                type="number"
                                name="pinCode"
                                id="pinCode"
                                placeholder="Product Price"
                                value={address.pinCode}
                                onChange={handelChange}
                                className="w-full outline-none py-1 px-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2">
                        <label htmlFor="number2">Alternative Phone Number</label>
                        <div className="flex w-full my-1">
                            <input
                                type="number"
                                name="number2"
                                placeholder="Optional"
                                id="number2"
                                value={address.number2}
                                onChange={handelChange}
                                className="w-full outline-none py-1 px-3"
                            />
                        </div>
                    </div>

                    <div className="w-full px-2 py-3">
                        <button className="bg-blue-600 px-3 py-2 border-2 w-full mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAddress;
