import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import UpdateAddress from './UpdateAddress'
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmAddress,setUserSelectedAddressIndex } from '../redux/confirmAddressSlicer'
import { toast } from 'react-toastify'
import Address from './Address'

const ChangeSelectedAddress = ({ onclose }) => {
    const address = useSelector(state => state?.confirmAddressSlicer?.confirmAddress)
    const dispatch = useDispatch();
    const userAddress = useSelector(state => state?.address?.address)
    const userSelectedAddressIndex = useSelector(state => state?.confirmAddressSlicer?.userSelectedAddressIndex) 
    
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false)
    const [newAddress, setNewAddress] = useState(false) 
    const handelCheck=(e)=>{  
        dispatch(setUserSelectedAddressIndex(e.target.value))
    }
    const handelAddress = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formdata = await Object.fromEntries(formData);
        if (formdata.address) {
            dispatch(setConfirmAddress(userAddress[formdata.address]))
            onclose()
        } else {
            toast.error("Please select your address")
        }
    }
    return (
        <div className='fixed z-50 max-sm:mx-4 bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-gray-300 bg-opacity-25 overflow-hidden'>
            <div className=' bg-gray-100 shadow-lg text-black  p-2 w-[600px]   mx-auto border-2 border-black rounded-lg overflow-auto' >
                <div className="flex justify-between p-2 pb-4">
                    <h1 className="font-bold text-2xl"> Select New Address</h1>
                    <button onClick={onclose} className='text-2xl w-7 hover:scale-125 hover:text-red-500'><IoCloseSharp /></button>
                </div>
                <form onSubmit={handelAddress} className='w-full bg-white '>


                    {
                        userAddress?.map((element, index) => {
                            return (
                                <div key={index} className='flex items-start p-3'>
                                    <input className='mt-6 w-4 h-4'
                                        type="radio"
                                        name='address'
                                        checked={index==userSelectedAddressIndex}
                                        onChange={handelCheck}
                                        value={index}
                                    />
                                    <label htmlFor='address' className="p-4">
                                        <p className='text-slate-500'>Name : <span className='text-black '>{element?.name}</span></p>
                                        <p className='text-slate-500'>phone Number : <span className='text-black '>{element?.number}</span></p>
                                        <p className='text-slate-500'>address: <span className='text-black'>{element?.line1}, {element?.line2}, {element?.landmark}{element?.landmark && ","} {element?.city}, {element?.state}, {element?.code}</span></p>
                                        {element?.number2 && <p className='text-slate-500'>Alternative Number : <span className='text-black '>{element?.number2}</span></p>}
                                        <div onClick={() => setOpenUpdateAddress(true)} className='text-blue-600'>Edit</div>
                                    </label>
                                    {openUpdateAddress && <UpdateAddress onclose={() => setOpenUpdateAddress(false)} data={element} />}
                                </div>
                            )
                        })
                    }
                    <div className="flex justify-center items-center p-2">
                        <button className='p-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700'>confirm</button>
                    </div>
                </form>

                 <button onClick={() => setNewAddress(true)} className='p-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Add New Address</button>
            </div>
            {newAddress && <Address onclose={() => setNewAddress(false)} />}
        </div>
    )
}

export default ChangeSelectedAddress
