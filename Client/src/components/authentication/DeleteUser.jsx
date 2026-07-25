import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DeleteUser=({close})=>{
    const [error,setError]=useState("")
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const navigate=useNavigate()
    const {setUser}=useContext(AuthContext)
    const cancle=()=>{
        close()
    }
    const onsubmit=async(e)=>{
        e.preventDefault()
        setError("")
        try {
            await axios.delete(
                `${API_BASE_URL}/user/delete-user`,
                {
                    withCredentials:true
                }
            )

            setUser(null)
        } catch (error) {
            setError(error.response?.data?.message || "something went wrong")
        }
    }
    return(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm">
                        <div className="flex justify-center items-center h-full">
                            <div className='w-fit bg-white rounded-lg shadow-md my-5'>
                                <div className=' px-6 py-4 flex justify-center items-center flex-col gap-4 w-full'>
                                    <div className="text-center">
                                        <p className='font-medium text-xl md:text-2xl text-red-400'>Delete your account</p>
                                    <p className='text-base text-[#6D8196]'>Are your sure you want to deletet account?</p>
                                    </div>
                                <form onSubmit={(e)=>{
                                          onsubmit(e)
                                }}
                                className='flex flex-col gap-6'>
                    
                                 <button type="submit" className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'>
                                    Delete
                                 </button>
                                <button type="button" className='bg-white px-6 py-2 text-md w-full border border-[6D8196] sm:max-w-sm rounded-lg text-[#6D8196] hover:bg-[#6D8196] hover:shadow-md hover:text-white transition-all duration-200 active:scale-95' onClick={cancle}>
                                    Cancle
                                 </button>
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>   
    )
}

export default DeleteUser