import React from 'react'
import InputField from '../../../authentication/InputField'
import AuthButton from '../../../authentication/AuthButton'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'
import { useParams } from 'react-router-dom'

const InviteClient = () => {
  const [email,setEmail]=useState("")
  const {id}=useParams()
  const change=(e)=>{
    setEmail(e.target.value)
  }
  const {setUser}=useContext(AuthContext)
  const [error, setError]=useState("")
  const [success,setSuccess]=useState("")
  const submit=async(e)=>{
    e.preventDefault()
    try {
      const response=await api.post(
      `/invite/${id}`,
      {
        email:email
      }
      )
      setEmail("")
      setSuccess(response.data.data.message)

    } catch (error) {
      if(error.response?.status===401){
        setUser(null)
        return
      }
      setError(error.response?.data.message || "something went wrong")
    }
  }
  return (
    <div className='flex justify-center items-center'>
         <div className='border w-fit bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex flex-col gap-6'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-medium text-xl md:text-2xl'>Invite Client</h2>
                </div>
                {
                  error && (
                      <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
                  )
                }
                {
                  success && (
                    <p className="text-green-600 text-sm text-center max-w-sm">{success}</p>
                  )
                }
                <form onSubmit={ (e)=>
                  submit(e)
                } className='flex flex-col gap-4'>
                <InputField
                label="Client Email" 
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                change={change}
                logo={<Mail color='#6D8196' size={20} className='absolute left-3'/>}
                />               
                <AuthButton button="Send Invite"/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default InviteClient