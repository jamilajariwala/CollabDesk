import React, { useState } from 'react'
import InputField from './InputField'
import AuthButton from './AuthButton'
import PasswordInputField from './PasswordInputField'
import { CircleUser,Mail,UserRound  } from 'lucide-react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const AuthCard = () => {

    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const [formData, setformData]=useState({
        usernm:"",
        fullnm:"",
        email:"",
        password:"",
        cfmpassword:""
    })
    const [error ,setError]=useState("")
    const [success,setSuccess]=useState("")
    const navigate=useNavigate()
    const onChange=(e)=>{
        setformData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const validData=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.test(formData.email)){
            setError("Invalid email")
            return false
        }
        if(formData.password.length <8){
            setError("Password must be at least 8 character")
            return false
        }
        if(formData.password != formData.cfmpassword){
            setError("Confirm password do not match the orignal password")
            return false
        }
        return true
    }

    const onSubmit=async(e)=>{
        e.preventDefault()

        setError("")
        setSuccess("")

        if (! validData()) return 

        try{
            const reponse=await axios.post(
                `${API_BASE_URL}/user/register`,
                {
                    username:formData.usernm,
                    fullname:formData.fullnm,
                    email:formData.email,
                    password:formData.password,
                    confirmpassword:formData.cfmpassword
                }
            )

            setSuccess(reponse.data?.message || "operation completed successfully")

            setformData({
                usernm:"",
                fullnm:"",
                email:"",
                password:"",
                cfmpassword:""
            })

            setTimeout(()=>{
                navigate(
                    '/login'
                )
            },1000)
        }catch(e){
             setError(
            e.response?.data?.message ||
            "Something went wrong"
        )
        }

    }
  return (
        <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Create your account</h2>
                    <p className='text-base text-[#6D8196]'>Join CollabDesk and start collaborating</p>
                </div>
                   {error && (
                        <p className="text-red-500 text-sm text-center">
                        {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm text-center">
                            {success}
                        </p>
                    )}
                <form onSubmit={(e)=>{
                    onSubmit(e)
                }} className='flex flex-col gap-4'>
               <InputField
                type="text"
                label="User Name"
                name="usernm"
                value={formData.usernm}
                change={onChange}
                placeholder="Enter user name"
                logo={<CircleUser color='#6D8196' size={20} className='absolute left-3'/>}/>
                <InputField
                type="text"
                label="Full Name"
                name="fullnm"
                value={formData.fullnm}
                change={onChange}
                placeholder="Enter full name"
                logo={<UserRound  color='#6D8196' size={20} className='absolute left-3'/>}/>
                 <InputField
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                change={onChange}
                placeholder="Enter email"
                logo={<Mail color='#6D8196' size={20} className='absolute left-3'/>}
                />
               <PasswordInputField
                label="Password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                change={onChange}
               />
               <PasswordInputField
                label="Confirm Password"
                placeholder="confrim password"
                name="cfmpassword"
                value={formData.cfmpassword}
                change={onChange}
               />
                <AuthButton button="Sign Up"/>
                </form>
                <div className='text-center'>
                    <p className='text-base'>Already have an account?<span className='text-[#0A66C2] cursor-pointer'><Link to="/login"> Log in</Link></span>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default AuthCard