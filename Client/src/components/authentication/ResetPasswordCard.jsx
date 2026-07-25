import React from 'react'
import PasswordInputField from './PasswordInputField'
import AuthButton from './AuthButton'
import { useState } from 'react'
import axios from 'axios'
import { Link,useLocation, useNavigate } from 'react-router-dom'

const ResetPasswordCard = () => {
    const [formdata,setFormData]=useState({
        password:"",
        cfmpassword:""
    })
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const location=useLocation()
    const email=location.state?.email
    const navigate=useNavigate()

    const onChange=(e)=>{
        setFormData({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        
        
        try {
            const response=await axios.patch(
            `${API_BASE_URL}/user/reset-password`,
            {
                email:email,
                newpassword:formdata.password,
                confirmpassword:formdata.cfmpassword
            }
        )

        setSuccess(response.data?.message || "password reset successfully")
        setTimeout(()=>{
            navigate(
            '/login',
            {
                replace:true
            }
        )
        },2000)
        } catch (e) {
            setError(e.response.data?.message || "something went wrong")
        }
    }
  return (
        <div>
         <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Reset your password</h2>
                    <p className='text-base text-[#6D8196]'>Create new password for your account</p>
                </div>
                {
                    error && (
                        <p className='text-red-500 text-sm text-center'>
                            {error}
                        </p>
                    )
                }
                {
                    success && (
                        <p className='text-green-500 text-sm text-center'>
                            {success}
                        </p>
                    )
                }
                <form onSubmit={(e)=>{
                    onSubmit(e)
                }}
                className='flex flex-col gap-4'>
                <PasswordInputField
                label="New Password"
                placeholder="Enter new Password"
                name="password"
                value={formdata.password}
                change={onChange}/>
                <PasswordInputField
                label="Confirm Password"
                placeholder="Confirm Password"
                name="cfmpassword"
                value={formdata.cfmpassword}
                change={onChange}/>               
                <AuthButton button="Reset Password"/>
                </form>
                <div className='text-center'>
                    <p className='text-base'>Back to<span className='text-[#0A66C2]'><Link to="/login"> Log in</Link></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordCard