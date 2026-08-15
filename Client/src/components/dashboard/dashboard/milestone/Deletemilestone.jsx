import { X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const Deletemilestone = ({delbtn,prjtId,id,fetchMilestone,nm}) => {
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const {setUser}=useContext(AuthContext)
    const submit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            await api.delete(
                `/project/${prjtId}/milestone/${id}`
            )
            await fetchMilestone()
            delbtn()
        } catch (error) {
            if(error.response?.status ===401){
                setUser(null)
                return
            }
            setError(error.response?.data?.message || "Somehting went wrong")
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center overflow-y-auto'>
        <div className='bg-white rounded-lg border border-gray-200 w-sm max-w-md max-h-3/4 p-6 overflow-y-auto relative'>
              {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
         <X color='#6D8196'className='cursor-pointer absolute right-4 top-2' onClick={()=>{
                delbtn()
              }}/>
             <div className='mb-3 text-center'>
                <h2 className='font-bold text-xl md:text-2xl text-red-400'>Delete {nm}</h2>
                <p className='text-base text-[#6D8196]'>Are your sure you want to delete {nm} ?</p>
             </div>
             <form className='flex flex-col gap-2' onSubmit={(e)=>{
                submit(e)
             }}>
                  <button type="submit" className={`bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95 ${ loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#5C7087] hover:shadow-md active:scale-95"
                    }`}>
                    {loading?"deleting...":"Delete"}
                </button>
                <button type="button" className='bg-white px-6 py-2 text-md w-full border border-[6D8196] sm:max-w-sm rounded-lg text-[#6D8196] hover:bg-[#6D8196] hover:shadow-md hover:text-white transition-all duration-200 active:scale-95' onClick={()=>{
                    delbtn()
                    }}>
                    Cancle
                 </button>
             </form>
         </div>
    </div>
  )
}

export default Deletemilestone