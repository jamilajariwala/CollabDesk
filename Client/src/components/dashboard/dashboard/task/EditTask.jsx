import { X } from 'lucide-react'
import React, { useContext } from 'react'
import { useState } from 'react'
import api from '../../../../service/api'
import { AuthContext } from '../../../../context/AuthContext'

const EditTask = ({editbtn,task,fetchTask}) => {
    const [error,setError]=useState("")
    const {setUser}=useContext(AuthContext)
    const [formdata,setFormdata]=useState(
        {
            title:task.title,
            desc:task.description,
            due:task.dueDate.split('T')[0]
        }
    )
    const prjtId=task.projectId
    const mileId=task.milestoneId
    const taskId=task._id
    const change=(e)=>{
        setFormdata({
            ...formdata,[e.target.name]:e.target.value
        })
        console.log(formdata); 
    }
    const submit=async(e)=>{
        e.preventDefault()
        setError("")
        try {
            await api.patch(
                `/project/${prjtId}/milestone/${mileId}/task/${taskId}`,
                {
                    title:formdata.title,
                    desc:formdata.desc,
                    due:formdata.due
                }
            )
            await fetchTask(mileId)
            editbtn(false)
        } catch (error) {
            if(error.response?.status === 401){
                setUser(null)
                return
            }
            setError(error.response?.data?.message || "Something went wrong")
        }
    }
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center overflow-y-auto'>
         <div className='bg-white rounded-lg border border-gray-200 w-full max-w-md max-h-3/4 p-6 overflow-y-auto'>
              {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
             <div className='flex justify-between items-center mb-3'>
                <h2 className='font-bold text-xl'>Edit Task</h2>
              <X color='#6D8196' onClick={()=>{
                editbtn(false)
              }} className='cursor-pointer'/>
             </div>
             <form className='flex flex-col gap-2'onSubmit={(e)=>{
                submit(e)
             }}>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Task Name</label>
                     <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Task Name'
                    name='title'
                    value={formdata.title}
                    onChange={(e)=>{
                        change(e)
                    }}
                    />  
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
                     <label className='text-md' >Deadline</label>
                         <input type='date' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500'
                        name='due'
                        value={formdata.due}
                        onChange={(e)=>{
                            change(e)
                        }}
                        />
                 </div>
                 <div className='flex flex-row gap-3 justify-end'>
                     <button type="submit" className='bg-[#6D8196] px-6 py-2 text-md w-fit rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95'>
                        Save Changes
                     </button>
                     <button type="button" className='bg-white px-6 py-2 text-md w-fit rounded-lg text-[#6D8196] border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95'
                     onClick={()=>{
                        editbtn(false)
                     }}
                    >
                         Cancel
                     </button>
                 </div>
             </form>
         </div>
    </div>
  )
}

export default EditTask