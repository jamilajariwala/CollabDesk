import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import InputField from './InputField'
import AuthButton from './AuthButton'
import { ShieldCheck } from 'lucide-react'
import axios from 'axios'

const VerifyOtpCard = () => {

    const location=useLocation()
    const email=location.state?.email
    const [otp,setOtp]=useState("")
    const [error,setError]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const navigate=useNavigate()
    const [success,setSuccess]=useState("")

    const onchange=(e)=>{
        setOtp(e.target.value)
    }
    const onsubmit=async(e)=>{
        e.preventDefault()
        setError("")
       try {
         const response=await axios.post(
            `${API_BASE_URL}/user/verify-otp`,
            {
                email:email,
                otp:otp
            }
        )
        setSuccess(
            response.data?.message || "OTP verified successfully"
        )
        setTimeout(()=>{
            navigate(
            '/resetpassword',
            {
                state:{
                    email
                },
                replace:true
            }
        )
        },2000)
       } catch (e) {
        setError(e.response?.data?.message || "something went wrong")
       }
    }
  
    const resendOtp=async()=>{
        setError("")
        setSuccess("")
        try {
            const response=await axios.post(
                `${API_BASE_URL}/user/resend-otp`,
                {
                    email:email
                }
            )
            setSuccess(response.data?.message || 'OTP sent check your email')
        } catch (e) {
            setError(e.response?.data?.message || "Something went while resending OTP")
        }
    }
      useEffect(()=>{
        if(!email){
            navigate(
                '/forgotpassword'
            )
        }
    },[email,navigate])
  return (
    <div>
         <div className='border w-full max-w-lg bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Verify your email</h2>
                    <p className='text-base text-[#6D8196]'>Enter 6 digit code sent to {email}</p>
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
                    onsubmit(e)
                }} className='flex flex-col gap-4'>
                <InputField 
                type="text"
                label="Verify OTP"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                change={onchange}
                auto="off"
                logo={<ShieldCheck color='#6D8196' size={20} className='absolute left-3'/>}
                />
                <div className='text-center'>
                    <p className='text-base'>Didn't receive the code?<span className='text-[#0A66C2] cursor-pointer' onClick={resendOtp}> Resend OTP</span></p>
                </div>                
                <AuthButton button="Verify OTP"/>
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

export default VerifyOtpCard