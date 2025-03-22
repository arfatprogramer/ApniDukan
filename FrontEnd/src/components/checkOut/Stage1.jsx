import { useDispatch, useSelector } from "react-redux";
import { setConfirmAddress, setUserSelectedAddressIndex } from "../../redux/confirmAddressSlicer";
import { useState } from "react";
import Address from "../Address";
import { MdOutlineDoneOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Stage1 = () => {
    const address = useSelector(state => state?.confirmAddressSlicer?.confirmAddress)
    const dispatch = useDispatch();
    const userAddress = useSelector(state => state?.address?.address)
    const userSelectedAddressIndex = useSelector(state => state?.confirmAddressSlicer?.userSelectedAddressIndex)
    
    const handelCheck = (e) => {
        dispatch(setUserSelectedAddressIndex(e.target.value))
    }

    const handelAddress = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formdata = await Object.fromEntries(formData);
        if (formdata.address) {
            dispatch(setConfirmAddress(userAddress[formdata.address]))
        } else {
            toast.error("Please select your address")
        }
    }

    return (
        <>
            {
                address === "" ? (
                    <form onSubmit={handelAddress} className='w-full bg-white '>
                        <div className='bg-blue-600 text-white h-10  flex items-center p-2 gap-2'>
                            <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>1</span> <p className='text-lg font-semibold'>Address</p>
                        </div>
                        
                        {
                            userAddress?.map((element, index) => {
                                return (
                                    <div key={index} className='flex items-start p-3'>
                                        <input className='mt-6 w-4 h-4'
                                            type="radio"
                                            name='address'
                                            id={"address"+index}
                                            checked={index == userSelectedAddressIndex}
                                            onChange={handelCheck}
                                            value={index}
                                        />
                                        <label htmlFor={"address"+index} className="p-4">
                                            <p className='text-slate-500'>Name : <span className='text-black '>{element?.name}</span></p>
                                            <p className='text-slate-500'>phone Number : <span className='text-black '>{element?.number}</span></p>
                                            <p className='text-slate-500'>address: <span className='text-black'>{element?.line1}, {element?.line2}, {element?.landmark}{element?.landmark && ","} {element?.city}, {element?.state}, {element?.code}</span></p>
                                            {element?.number2 && <p className='text-slate-500'>Alternative Number : <span className='text-black '>{element?.number2}</span></p>}
                                            
                                        </label>
                                        

                                    </div>
                                )
                            })
                        }
                        <div className="flex justify-center items-center p-2">
                            {
                                userAddress.length == 0 ? (
                                    <Link to='/AddressPage'  className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Add Address</Link>
                                ) : (<div className="flex gap-10">
                                    <button className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Delver Here</button>
                                    <Link to='/AddressPage' className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Add New Address</Link>
                                </div>
                                )
                            }
                        </div>
                    </form>
                ) : (
                    <div className="bg-blue-600 flex justify-between w-full ">
                        <div className="">
                            <div className=' text-white h-10  flex items-center p-2 gap-2'>
                                <span className='w-6 h-6 bg-white text-black flex items-center justify-center'>1</span> <p className='text-lg font-semibold'>Address</p><MdOutlineDoneOutline />

                            </div>
                            <p className='px-2 text-white'>Name : <span className=' '>{address.name}</span></p>
                            <p className='px-2 text-white'>Number : <span className=''>{address.number}</span></p>

                        </div>
                        <div className='p-2 flex items-center justify-center'>
                            <button onClick={() => dispatch(setConfirmAddress(""))} className='p-1 bg-white text-blue-600 font-semibold rounded-sm'>Change</button>
                        </div>
                    </div>
                )}

        </>
    )
}

export default Stage1