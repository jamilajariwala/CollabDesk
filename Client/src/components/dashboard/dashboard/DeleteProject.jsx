import React, { useContext, useState } from 'react'
import api from '../../../service/api'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DeleteProject = ({close,prjtId}) => {
    const {setUser}=useContext(AuthContext)
    const [error, setError]=useState("")
    const [success, setSuccess]=useState("")
    const [loading,setloading]=useState(false)
    const navigate=useNavigate()
    const onsubmit=async(e)=>{
        e.preventDefault()
        setloading(true)
        try {
        await api.delete(
            `/project/${prjtId}`
        )
        setSuccess("project deleted")
        navigate('/dashboard')
    } catch (error) {
        if(error.response?.status === 401){
            setUser(null)
            return
        }
        setError(error.response?.data?.message || "something went wrong")
    }finally{
        setloading(false)
    }
}
  return (
<div className='bg-black/40 fixed inset-0 flex justify-center items-center'>
    <div className="flex justify-center items-center h-full">
        <div className='w-fit bg-white rounded-lg shadow-md my-5'>
            <div className=' px-6 py-4 flex justify-center items-center flex-col gap-4 w-full'>
                <div className="text-center">
                    <p className='font-medium text-xl md:text-2xl text-red-400'>Delete your project</p>
                <p className='text-base text-[#6D8196]'>Are your sure you want to delete project?</p>
                </div>
                {
                    error && (
                        <p className='text-sm text-red-500 text-center'>
                            {error}
                        </p>
                    )
                }
                {
                    success && (
                        <p className='text-sm text-green-500 text-center'>
                            {success}
                        </p>
                    )
                }
            <form onSubmit={(e)=>{
                      onsubmit(e)
            }}
            className='flex flex-col gap-6'>

             <button type="submit" className={`bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95 ${loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#5C7087] hover:shadow-md active:scale-95"}`}>
                {loading ? "deleting.......":"delete"}
             </button>
            <button type="button" className='bg-white px-6 py-2 text-md w-full border border-[6D8196] sm:max-w-sm rounded-lg text-[#6D8196] hover:bg-[#6D8196] hover:shadow-md hover:text-white transition-all duration-200 active:scale-95' onClick={()=>{
                close()
                }}>
                Cancle
             </button>
            </form>
        </div>
        </div>
    </div> 
</div>
  )
}

export default DeleteProject