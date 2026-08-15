import React, { use, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../service/api'
import { AuthContext } from '../../../context/AuthContext'

const CreateProject = ({close,fetchProject}) => {
    const Close=()=>{
        close()
    }
     const [formdata,setFormdata]=useState({
        prjtnm:"",
        desc:"",
        start:"",
        deadline:""
    })
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState(false)
    const { setUser } = useContext(AuthContext)
    const Change=(e)=>{
        setFormdata({
            ...formdata, [e.target.name] : e.target.value
        })
    }
    const validation=()=>{
        if (formdata.prjtnm === ""){
            setError("Project name required")
            return false
        }
        if (formdata.deadline === ""){
            setError("End Date required")
            return false
        }
        return true
    }

    const navigate=useNavigate()
    const formsubmit=async(e)=>{
        e.preventDefault()
        if(!validation()) return

        setError("")
        setSuccess("")
        setLoading(true)
        try {
            const res=await api.post('/project',{
                title:formdata.prjtnm,
                desc:formdata.desc,
                start:formdata.start,
                end:formdata.deadline
            })
            setSuccess("project created successfully")
            setFormdata({
                prjtnm:"",
                desc:"",
                start:"",
                deadline:""
            })
           await fetchProject();
        close()
        } catch (error) {
            if(error.response?.status===401){
                setUser(null)
                return
            }
            setError(error.response?.data?.message || "something went wrong")
        }finally{
            setLoading(false)
        }
    }
    
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
      <h2 className='font-bold text-xl my-4'>Create Project</h2>
      <form onSubmit={(e)=>{
          formsubmit(e)
      }} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
              <label className='text-md' >Project Name</label>
              <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Project Name' value={formdata.prjtnm} onChange={(e)=>{
                  Change(e)
              }} name='prjtnm'/>
          </div>
          <div className='flex flex-col gap-1'>
              <label className='text-md' >Description</label>
         
          <textarea className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter description' value={formdata.desc} onChange={(e)=>{
              Change(e)
          }} name='desc'></textarea>
           </div>
           <div className='flex flex-col gap-1'>
              <label className='text-md' >Start Date</label>
                  <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' value={formdata.start} onChange={(e)=>{
                      Change(e)
                  }} name='start'/>
          </div>
          <div className='flex flex-col gap-1'>
              <label className='text-md' >Deadline</label>
                  <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' value={formdata.deadline} onChange={(e)=>{
                      Change(e)
                  }} name='deadline'/>
          </div>
          <div className='flex flex-row gap-3 justify-end'>
              <button type="submit" className={`bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95 ${
                 loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#5C7087] hover:shadow-md active:scale-95"

              }`}>
                  {loading ? "creating...":"Create Project"}
              </button>
              <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
                  Close()
                  setError("")
                  setSuccess("")
                  setFormdata({
                      prjtnm:"",
                      desc:"",
                      start:"",
                      deadline:""
                  })
              }}>
                  Cancel
              </button>
          </div>
      </form>
     </div>
</div>
)
}

export default CreateProject