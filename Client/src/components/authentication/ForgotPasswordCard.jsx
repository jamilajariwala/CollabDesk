import React, { useState } from 'react'
import AuthButton from './AuthButton'
import InputField from './InputField'
import { Mail} from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"

const ForgotPasswordCard = () => {
    const [email,setEmail]=useState("")
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const navigate=useNavigate()
    const onChange=(e)=>{
        setEmail(e.target.value)
    }
    const onSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        try {
            const response=await axios.post(
                `${API_BASE_URL}/user/forgot-password`,
                {
                    email:email
                }
            )
            setSuccess(response.data?.message || "OTP sent check your email")
            setTimeout(()=>{
                navigate(
                "/verifyOtp",
            {
                state:{
                    email
                }
            })
            },2000)
            
        } catch (e) {
            setError(e.response?.data?.message || "Something went wrong")
        }
    }

  return (
    <div>
         <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Forgot your password</h2>
                    <p className='text-base text-[#6D8196]'>No worries! Enter your email and we'll send you a code</p>
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
                }} className='flex flex-col gap-4'>
                <InputField
                type="email"
                label="Email"
                placeholder="Enter email"
                logo={<Mail color='#6D8196' size={20} className='absolute left-3'/>}
                name="email"
                value={email}
                change={onChange}
                />
                <AuthButton button="Send OTP"/>
                </form>
                <div className='text-center'>
                    <p className='text-base'>Remember your password?<span className='text-[#0A66C2] cursor-pointer'><Link to="/login"> Log in</Link></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPasswordCard