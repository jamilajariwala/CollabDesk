import React, { useState } from 'react'
import PasswordInputField from '../../authentication/PasswordInputField'
import AuthButton from '../../authentication/AuthButton'
import axios from 'axios'

const ChangePassword = () => {
    const [formData, setFormData]=useState({
        current:"",
        new:"",
        confirm:""
    })
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const change=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        }
        )        
    }
    const validatedata=()=>{
        if(formData.new != formData.confirm){
            setError("confirm password do not match")
            return false
        }
         if(formData.new.length <8){
            setError("Password must be at least 8 character")
            return false
        }
        return true
    }
    const onsubmit=async(e)=>{
        e.preventDefault()
        setError("")
        setSuccess("")
        if(!validatedata()) return
        try {
            const res=await axios.patch(
                `${API_BASE_URL}/user/change-password`,
                {
                    oldpassword:formData.current,
                    newpassword:formData.new,
                    confirmpassword:formData.confirm
                },
                {
                    withCredentials:true
                }
            )
            setFormData(
                {
                    current:"",
                    new:"",
                    confirm:""
                }
            )
            setSuccess(res.data?.message || "Password changes successfully")
        } catch (error) {
            setError(error.response?.data?.message || "something went wrong" )
        }
    }
  return (
    <div className=' flex justify-center items-center'>
            <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-8 w-full'>
                 <p className='font-medium text-xl md:text-2xl'>Change Password</p>
                 {
                    error && (
                         <p className="text-red-500 text-sm text-center">
                        {error}
                        </p>
                    )
                 }
                 {
                    success && (
                        <p className="text-green-500 text-sm text-center">
                        {success}
                        </p>
                    )
                 }
                <form onSubmit={(e)=>{
                    onsubmit(e)
                }}
                className='flex flex-col gap-6'>
                    <PasswordInputField  
                    label="Current Password" 
                    placeholder="Enter your current password"
                    name="current"
                    value={formData.current}
                    change={change}/>
                    <PasswordInputField  
                    label="New Password" 
                    placeholder="Enter new password"
                    name="new"
                    value={formData.new}
                    change={change}/>
                    <PasswordInputField  
                    label="Confirm Password" 
                    placeholder="Confirm password"
                    name="confirm"
                    value={formData.value}
                    change={change}/>
                <AuthButton button="Update Password"/>
                </form>
            </div>
        </div>
       
    </div>
  )
}

export default ChangePassword