import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const Createmilestone = ({closecard,id,fetchMilestone}) => {
    const [formdata,setFormdata]=useState({
        title:"",
        desc:"",
        due:""
    })
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const {setUser}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)

    const change=(e)=>{
        setFormdata({
            ...formdata,[e.target.name]:e.target.value
        })      
    }
    const formsubmit=async(e)=>{
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)
        try {
            const reponse= await api.post(
                `/project/${id}/milestone/`,
                {
                    title:formdata.title,
                    desc:formdata.desc,
                    due:formdata.due
                }
            )
            setSuccess("Milestone created successfully")
            await fetchMilestone()
            closecard()
        } catch (error) {
            if(error.response?.status===401)
            {
                setUser(null)
                return
            }
            setError(error.response?.data?.message || "something went wrong")
        }finally{
            setLoading(false)
        }
    }
    
if (loading) return <div className="p-6">Loading project details...</div>
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center'>
         
         <div className='bg-white p-6 rounded-lg'>
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
             <h2 className='font-bold text-xl my-4'>Create Milestone</h2>
             <form onSubmit={(e)=>{
                 formsubmit(e)
             }} className='flex flex-col gap-6'>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Milestone Name</label>
                     <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Milestone Name'
                     name="title"
                     value={formdata.title}
                     onChange={(e)=>{
                        change(e)
                     }}/>
                 </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Description</label>
                
                 <textarea className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter description'
                  name="desc"
                    value={formdata.desc}
                    onChange={(e)=>{
                       change(e)
                    }}></textarea>
                  </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Deadline</label>
                         <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500'
                          name="due"
                            value={formdata.due}
                            onChange={(e)=>{
                            change(e)
                     }} />
                 </div>
                 <div className='flex flex-row gap-3 justify-end'>
                     <button type="submit" disabled={loading}
                    className={`bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white transition-all duration-200 ${
                    loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-[#5C7087] hover:shadow-md active:scale-95"
                    }`}>
                        {loading ? "Creating..." : "Create Milestone"}
                     </button>
                     <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95'
                     onClick={()=>{
                        closecard()
                     }}>
                         Cancel
                     </button>
                 </div>
             </form>
         </div>
    </div>
  )
}

export default Createmilestone