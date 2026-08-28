import { X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const DeleteDeliverables = ({setDeleteBtnclick,deliverableselected,fetchDeliverables}) => {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const {setUser}=useContext(AuthContext)
    const submit=async(e)=>{
      e.preventDefault()
      setError("")
      try {
        setLoading(true)
        await api.delete(
          `project/${deliverableselected.projectId}/milestone/${deliverableselected.mileId}/task/${deliverableselected.taskId}/deliverables/${deliverableselected._id}`
        )
        fetchDeliverables()
        setDeleteBtnclick(false)
      } catch (error) {
        if(error.response?.status === 401){
          setUser(null)
          return
        }
        setError(error.response?.data?.message || "Something went wrong")
      }finally{
        setLoading(false)
      }
    }
  return (
    <div className='bg-white rounded-lg border border-gray-200 w-sm max-w-md max-h-3/4 p-6 overflow-y-auto relative'>
              {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
         <X color='#6D8196'className='cursor-pointer absolute right-4 top-2' onClick={()=>{
                setDeleteBtnclick(false)
              }}/>
             <div className='mb-3 text-center'>
                <h2 className='font-bold text-xl md:text-2xl text-red-400'>Delete {deliverableselected.title}</h2>
                <p className='text-base text-[#6D8196]'>Are your sure you want to delete {deliverableselected.title} ?</p>
             </div>
             <form className='flex flex-col gap-2' onSubmit={(e)=>{
              submit(e)
             }}>
                  <button type="submit" disabled={loading} className='bg-[#6D8196] cursor-pointer px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'>
                    {loading ? 'Deleting' : 'Delete'}
                </button>
                <button type="button" className='bg-white px-6 py-2 text-md cursor-pointer w-full border border-[6D8196] sm:max-w-sm rounded-lg text-[#6D8196] hover:bg-[#6D8196] hover:shadow-md hover:text-white transition-all duration-200 active:scale-95' onClick={()=>{
                    setDeleteBtnclick(false)
                    }}>
                    Cancle
                 </button>
             </form>
         </div>
  )
}

export default DeleteDeliverables