import React, { useState } from 'react'
import userAnimato from '../assets/signin.gif'
import { FaEyeSlash, FaRegUser, FaEye } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageConvert64 from '../helper/ImageConvert64';
import { signup } from '../common/apiData.jsx'
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup = () => {

    const [show, setShow] = useState(false);    //for password filed
    const [show2, setShow2] = useState(false); //for password filed
    const [uploadProfile, setUploadProfile] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [disableButton, setDisableButton] = useState(false)
    const navigate = useNavigate();
    const prams=useParams() 
    
    const validateForm = (formdata) => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        const minAge = 18;
        const dob = new Date(formdata.dob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        setDisableButton(false)
        if (!emailRegex.test(formdata.email)) {
            errors.email = 'Invalid email format';
        }
        if (!phoneRegex.test(formdata.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!passwordRegex.test(formdata.password)) {
            errors.password = 'Password must be at least 6 characters long and contain letters and numbers';
        }
        if (formdata.password !== formdata.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }
        if (!dobRegex.test(formdata.dob) || age < minAge) {
            errors.dob = 'You must be at least 18 years old';
        }
        
        return errors;
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setDisableButton(true)
        
        const formData = new FormData(e.target);
        formData.append('profile', uploadProfile);
        formData.append('userType', prams.type);
        const formdata = await Object.fromEntries(formData);
        const errors = validateForm(formdata);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            let serverResponse = await fetch(signup.url, {
                method: signup.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata),
            });
            serverResponse = await serverResponse.json();

            if (serverResponse.success) {
                toast.success(serverResponse.message);
                navigate('/login');
            } else {
                toast.error(serverResponse.message);
            }
        }else{

            setDisableButton(false);
        }


    }

    const handelProfilePicture = async (e) => {
        const file = e.target.files[0];
        let data = await ImageConvert64(file);
        setUploadProfile(data);
    }


    return (
        <div className='py-20 '>
            <div className=' my-2  p-2 max-w-sm  mx-auto border-2 border-black rounded-lg' >

                <div className='w-28 h-28 mx-auto pt-3 flex justify-center items-center py-3 relative overflow-hidden rounded-full'>
                    <div className="">
                        <img src={uploadProfile || userAnimato} alt="" />
                    </div>
                    <form className=" absolute bottom-0 w-full" onSubmit={handelProfilePicture}>
                        <label>
                            <p className="bg-gray-400 opacity-80 w-full py-4 px-2 text-center cursor-pointer">Upload</p>
                            <input type="file" name="profilePicture" className='hidden' onChange={handelProfilePicture} />
                        </label>
                    </form>
                </div>

                <form onSubmit={handelSubmit}>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="firstName">First Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='firstName'
                                placeholder='Enter your Name'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="lastName">Last Name</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='lastName'
                                placeholder='Enter your Surname'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="email">Gmail</label>
                        <div className="flex w-full my-1 ">
                            <input type="email"
                                name='email'
                                placeholder='gmail'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                        {formErrors.email && <p className='text-red-600'>{formErrors.email}</p>}
                    </div>

                    <div className="w-full px-2 mb-2 ">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="flex w-full my-1 ">
                            <input type="text"
                                name='phoneNumber'
                                placeholder='Phone Number'
                                className='w-full outline-none py-1 px-3' required />
                            <div className=" flex items-center justify-center bg-white px-3"><span><FaRegUser /></span></div>
                        </div>
                        {formErrors.phoneNumber && <p className='text-red-600'>{formErrors.phoneNumber}</p>}
                    </div>

                    <div className="w-full px-2 mb-2 ">
                            <label htmlFor="dob">Date Of Birth</label>
                            <div className="flex w-full my-1 ">
                                <input type="date"
                                    name='dob'
                                    placeholder='Date Of Birth'
                                    className='w-full outline-none py-1 px-3' required />
                            </div>
                            {formErrors.dob && <p className='text-red-600'>{formErrors.dob}</p>}
                        </div>

                    <div className="w-full px-2 mb-3 ">
                        <label htmlFor="password">Password</label>
                        <div className="flex w-full my-1 relative">
                            <input type={show ? "text" : "password"}
                                name='password'
                                placeholder='Password'
                                className='w-full outline-none  py-1 px-3' required />
                            <div onClick={() => { show ? setShow(false) : setShow(true) }}
                                className=" flex items-center justify-center  bg-white px-3 "><span>{show ? <FaEye /> : <FaEyeSlash />}</span></div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-3 ">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="flex w-full my-1 relative">
                            <input type={show2 ? "text" : "password"}
                                name='confirmPassword'
                                placeholder='confirmPassword'
                                className='w-full outline-none  py-1 px-3' required />
                            <div onClick={() => { show2 ? setShow2(false) : setShow2(true) }}
                                className=" flex items-center justify-center  bg-white px-3 "><span>{show2 ? <FaEye /> : <FaEyeSlash />}</span></div>
                        </div>
                        {formErrors.confirmPassword && <p className='text-red-600'>{formErrors.confirmPassword}</p>}
                    </div>

                    <div className="w-full px-2 ">
                        <button disabled={disableButton} type="submit" className='bg-blue-600 px-3 py-2 border-2 rounded-full w-1/2 mx-auto block text-white hover:scale-105 hover:bg-blue-700 transition-all  disabled:bg-gray-300'>SignUp</button>

                    </div>
                    <div className="w-full px-2 py-3 ">
                        <Link to={'/login'}> Already have Account? <span className='text-red-700 underline'>Login</span></Link>
                    </div>
                </form>                

            </div>
        </div>
    )
}

export default Signup
