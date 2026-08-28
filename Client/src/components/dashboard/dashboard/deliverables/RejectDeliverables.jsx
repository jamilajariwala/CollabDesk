import { X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const RejectDeliverables = ({setRejectBtnclick,projectId, mileId,taskId,getTaskDetail}) => {
    const [error,setError]=useState("")
    const {setUser}=useContext(AuthContext)
    const [feedback,setFeedback]=useState("")
    const submit=async(e)=>{
        e.preventDefault()
        setError("")
        try {
            await api.patch(
                `/project/${projectId}/milestone/${mileId}/task/${taskId}/reject-task`,{
                    feedback:feedback
                }
            )
            getTaskDetail()
            setRejectBtnclick(false)
        } catch (error) {
            if(error.response?.status === 401){
                 setUser(null)
                return
            }
            setError(error?.response?.data?.message || 'something went wrong')
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
                  {/* {
                     success && (
                         <p className="text-green-600 text-sm text-center max-w-sm">{success}</p>
                     )
                 } */}
                     <h2 className='font-bold text-xl mb-4'>Reject Deliverables</h2>
                     <X color='#6D8196'className='cursor-pointer absolute right-4 top-4' onClick={()=>{
                        setRejectBtnclick(false)
                      }}/>
                     <form  className='flex flex-col gap-3' onSubmit={(e)=>{
                        submit(e)
                     }} >
                        <p className='text-md text-[#6D8196]'>Please provide feedback to improve this work</p>
                        <label className='text-md'>Feedback</label>
                        <textarea className='border h-50 p-2 border-[#6D8196]/20 shadow-sm rounded-lg text-md sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Feedback'
                        value={feedback}
                        onChange={(e)=>{
                            setFeedback(e.target.value)
                        }}></textarea>
                         <div className='flex flex-row gap-3 justify-end'>
                             <button type="submit"
                            className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white transition-all duration-200 cursor-pointer'>
                               Reject
                             </button>
                             <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border cursor-pointer border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
                                setRejectBtnclick(false)
                             }}>
                                 Cancel
                             </button>
                         </div>
                     </form>
                 </div>
    </div>
  )
}

export default RejectDeliverables