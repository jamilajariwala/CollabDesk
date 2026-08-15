import React, { useContext, useState } from "react";
import AuthButton from "./AuthButton";
import InputField from "./InputField";
import PasswordInputField from "./PasswordInputField";
import { CircleUser } from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginCard=()=>{
    const [formData,setFormData]=useState({
        usernm:"",
        password:""
    })
    const {setUser}=useContext(AuthContext)
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const navigate=useNavigate()
    const [search]=useSearchParams()
    const inviteToken=search.get("invite")
    const onChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const onsubmit=async(e)=>{
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const res=await axios.post(
                `${API_BASE_URL}/user/login`,
                {
                    username:formData.usernm,
                    password:formData.password
                },
                {
                    withCredentials:true
                }
            )

            setSuccess(res?.data?.message || "logged in successfully")

            setFormData({
                usernm:"",
                password:""
            })
            setUser(res?.data?.data)   
            if(inviteToken){
                navigate(`/invite/${inviteToken}`)
            }else{
            navigate(
                '/dashboard'
            )}
        } catch (e) {
            setError(e?.response?.data?.message || "something went wrong")
            if (e.response?.data?.message == "user does not exist"){
            setTimeout(() => {
                if(inviteToken){
                    navigate(`/register?invite=${inviteToken}`)
                }else{
                navigate(
                    '/register'
                )}
            }, 2000);
        }
        }
    }
    return (
        <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Welcome back</h2>
                    <p className='text-base text-[#6D8196]'>Log in to your account</p>
                </div>
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
                }} className='flex flex-col gap-4'>
                <InputField 
                type="text"
                placeholder="Enter user name"
                label="User Name"
                name="usernm"
                value={formData.usernm}
                change={onChange}
                logo={<CircleUser color='#6D8196' size={20} className='absolute left-3'/>}/>
                <PasswordInputField
                 type="password"
                placeholder="Enter password"
                label="Password"
                name="password"
                value={formData.password}
                change={onChange}/>
                <p className="text-base text-[#6D8196]"><Link to="/forgotpassword">Forgot Password?</Link></p>
                <AuthButton button="Log In"/>
                </form>
                {
                    !inviteToken && (
                        <div className='text-center'>
                    <p className='text-base'>Don't have an account?<span className='text-[#0A66C2] cursor-pointer'><Link to="/register"> Sign up</Link></span>
                    </p>
                </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoginCard