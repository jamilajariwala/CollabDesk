import React from 'react'
import AuthButton from '../../../authentication/AuthButton'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const InvitationCard = () => {
    const [displayinvite,setDisplayinvite]=useState({})
    const navigate=useNavigate()
    const {user,loading,setUser}=useContext(AuthContext)
    console.log(user);
    
    const {token}=useParams()
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const [error, setError]=useState("")
    const display=async()=>{
        try {
            const response=await axios.get(
                `${API_BASE_URL}/invite/${token}`
            )
            setDisplayinvite(response.data.data.invite)
        } catch (error) {
            setError(error.response?.data?.message || "something went wrong")
        }
    }
    
    useEffect(()=>{
        display()
    },[token])
    if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            Loading...
        </div>
    );
}
  return (
     <div className='flex justify-center items-center min-h-screen'>
         <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                
                    { !user ? (
                        <div className='flex flex-col justify-center items-center gap-8'>
                            <h1 className='text-3xl font-bold'>You are invited</h1>
                 <p className='text-lg'>Please log in or sign up to accept this invitation</p>
                <button type="submit" className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'
                onClick={()=>{navigate(`/login?invite=${token}`)}}> Log in</button> 
                <button type="submit" className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'
                onClick={()=>{
                    navigate(`/register?invite=${token}`)
                }}>Sign up</button>
                </div>
                    ):(
                        <div className='flex flex-col gap-3'>
                        <p className='text-lg'>You have been invited to collaborate on</p>
                        <h1 className='text-xl font-medium text-center'>{displayinvite.projectId?.title}</h1>
                       <div>
                         <p className='text-[#6D8196] text-lg'>Invited By</p>
                        <p className='text-lg'>{displayinvite.owner?.fullName}</p>
                       </div>
                        <div>
                        <p className='text-[#6D8196] text-lg'>project name</p>
                        <p className='text-lg'>{displayinvite.projectId?.title}</p>
                        </div>
                        <div>
                            <p className='text-[#6D8196] text-lg'>description</p>
                        <p className='text-lg'> {displayinvite.projectId?.description}</p>
                        </div>
                <button className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'
                onClick={async()=>{
                    try {
                        await api.patch(`/invite/${token}/accept`)
                        navigate(`/dashboard/project/${displayinvite.projectId._id}`)
                    } catch (error) {
                        if(error.response?.status===401){
                            setUser(null)
                            return
                        }
                        setError(error.response?.data?.message || "something went wrong")
                    }
                }}> accept invite</button>
                </div>
                    )}
               
            </div>
        </div>
    </div>
  )
}

export default InvitationCard