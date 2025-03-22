import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { googleSignup } from '../common/apiData'
import { toast } from "react-toastify";

const SignupOption = () => {
    const prams=useParams()
    const navigate=useNavigate()

    const handelSuccess = async(credentialResponse) => {
        const response= await  fetch(googleSignup.url,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(
                {token:credentialResponse.credential,
                    userType:prams.type
                }
            )
        })
        const serverResponse= await response.json()
        if (serverResponse.success) {
            toast.success(serverResponse.message)
            navigate("/login")
        }
        if (serverResponse.error) {
            toast.error(serverResponse.message)
            navigate("/login")
        }
    }
    const handelFailed = () => {
        toast.error("Login With google is Failed.")
    }
  return (
    <div className='py-20 '>
    <div className=' my-2  p-2 max-w-sm  mx-auto border-2 border-black rounded-lg'>
        <div className="w-full px-2 py-4 grid gap-3 ">
            <h1 className='text-2xl font-bold text-center'>Chose Option  for signUp</h1>
            <GoogleOAuthProvider  clientId="943659125938-bk1drn680vpq5cg562seq728un7qsql3.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={handelSuccess}
                        onError={handelFailed}
                        
                    />
                </GoogleOAuthProvider>
            <Link to={"/signup/customer"}  className='bg-blue-600 px-3 py-2 text-center border-2  w-full mx-auto block text-white  hover:bg-blue-700 transition-all'>Signin with Gmail Or Phone number</Link>
        </div>

    </div>
</div>
  )
}

export default SignupOption
