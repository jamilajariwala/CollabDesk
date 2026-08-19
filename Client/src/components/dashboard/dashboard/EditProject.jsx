import React, { use, useContext, useEffect, useState } from 'react'
import api from '../../../service/api'
import { AuthContext } from '../../../context/AuthContext'

const EditProject = ({prjtId,project,fetchdata,close}) => {
    const {setUser}=useContext(AuthContext)
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState(false)
    const [formdata,setFormdata]=useState({
        title:"",
        desc:"",
        start:"",
        end:""
    })
const change=(e)=>{
    setFormdata({
        ...formdata,[e.target.name] : e.target.value
    })
    console.log(formdata);
    
}
const submit=async(e)=>{
    e.preventDefault()
    setLoading(true)

    try {
        const res=await api.patch(
            `/project/${prjtId}`,
            {
                title:formdata.title,
                desc:formdata.desc,
                start:formdata.start,
                end:formdata.end
            }
        )
        
        setSuccess("project created successfully")
        close()
        await fetchdata()
        
    } catch (error) {
        if(error.response?.status === 401){
            setUser(null)
            return
        }
        setError(error.response?.data?.message || "something went wrong")
    }finally{
        setLoading(false)
    }
}
useEffect(()=>{
    if(project){
        setFormdata({
            title:project.title,
            desc:project.description,
            start:project.startDate.split('T')[0],
            end:project.endDate.split('T')[0]
        })
    }
},[project])
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center'>
        <div className='bg-white p-6 rounded-lg'>
             <h2 className='font-bold text-xl my-4'>Edit Project</h2>
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
             <form onSubmit={(e)=>{
                submit(e)
             }} className='flex flex-col gap-6'>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Project Name</label>
                     <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Project Name' 
                     name="title"
                     value={formdata.title}
                     onChange={(e)=>{
                        change(e)
                     }}/>
                 </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Description</label>
                
                 <textarea className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter description'
                 name='desc'
                 value={formdata.desc}
                 onChange={(e)=>{
                    change(e)
                 }}></textarea>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label className='text-md' >Start Date</label>
                         <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' 
                         name="start"
                         value={formdata.start}
                         onChange={(e)=>{
                            change(e)
                         }}/>
                 </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Deadline</label>
                         <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500'
                         name='end'
                         value={formdata.end}
                         onChange={(e)=>{
                            change(e)
                         }} />
                 </div>
                 <div className='flex flex-row gap-3 justify-end'>
                     <button type="submit" className={`bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95 ${
                         loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#5C7087] hover:shadow-md active:scale-95"

                     }`}>
                        {loading ? "updating...":"Edit Project"}
                     </button>
                     <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95'
                     onClick={()=>{
                        close()
                        setError("")
                        setSuccess("")
                     }} >
                         Cancel
                     </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProject