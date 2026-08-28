import { Check, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const ApproveDeliverables = ({setApproveBtnclick,projectId,mileId,taskId,getTaskDetail}) => {
  const [error,setError]=useState("")
  const {setUser}=useContext(AuthContext)
  const submit=async(e)=>{
    e.preventDefault()
    setError("")
    try {
      const response=await api.patch(
        `/project/${projectId}/milestone/${mileId}/task/${taskId}/approve-task`
      )
      getTaskDetail()
      setApproveBtnclick(false)
    } catch (error) {
      if(error.response?.status === 401){
        setUser(null)
        return 
      }
      setError(error.response?.data?.message || "something went wrong")
    }
  }
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-lg relative'>
                    {
                     error && (
                         <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
                     )
                 }
                     <h2 className='font-bold text-xl mb-4'>Approve Deliverables</h2>
                     <X color='#6D8196'className='cursor-pointer absolute right-4 top-4' onClick={()=>{
                        setApproveBtnclick(false)
                      }}/>
                     <form  className='flex flex-col gap-5' onSubmit={(e)=>{
                      submit(e)
                     }}>
                      <div className='flex justify-center items-center flex-col gap-4'>
                        <div className='border p-6 rounded-full bg-green-200 border-gray-100'><Check className='text-green-700'/></div>
                        <p className='text-xl text-[#6D8196]'>Are you sure you want to approve this task?</p>
                      </div>
                         <div className='flex flex-row gap-3 justify-end'>
                             <button type="submit"
                            className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white transition-all duration-200 cursor-pointer'>
                               Approve
                             </button>
                             <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border cursor-pointer border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
                                setApproveBtnclick(false)
                             }}>
                                 Cancel
                             </button>
                         </div>
                     </form>
                 </div>
    </div>
  )
}

export default ApproveDeliverables