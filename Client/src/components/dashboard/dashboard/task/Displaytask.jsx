import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { useState } from 'react'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import api from '../../../../service/api'
import { AuthContext } from '../../../../context/AuthContext'

const Displaytask = ({item,fetchTask,updateTaskStatusInUI,updateMilestoneStatusUI,updateProjectStatusUI}) => {
    const statusColors = {
      todo: "bg-gray-200 text-gray-700",
      in_progress: "bg-blue-100 text-blue-700",
      in_review: "bg-yellow-100 text-yellow-700",
      completed: "bg-green-100 text-green-700"
}
    const [dotsclick,setDotsclick]=useState(false)
    const [editbtn,setEditbtn]=useState(false)
    const [delbtn,setDelbtn]=useState(false)
    const {setUser}=useContext(AuthContext)
    const [error,setError]=useState("")
    const prjtId=item.projectId
    const mileId=item.milestoneId
    const taskId=item._id
    const change=async(e)=>{
      const newstatus=e.target.value
      setError("")
      try {
        const response=await api.patch(
          `/project/${prjtId}/milestone/${mileId}/task/${taskId}/update-status`,
          {
            newstatus:newstatus
          }
        )
        const { task, updatemilestone,updateproject } = response.data.data
        updateTaskStatusInUI(task._id,task.status)
        updateMilestoneStatusUI(updatemilestone._id,updatemilestone.status)
        updateProjectStatusUI(updateproject._id,updateproject.projectStatus)
      } catch (error) {
        console.log("Status update error:", error)
  console.log("Response:", error.response?.data)
  console.log("Message:", error.message)
        if(error.response?.status === 401){
                setUser(null)
                return
            }
        setError(error.response?.data?.message || "Something went wrong")
      }
    }
  return (
    <>
    <div className='py-2 px-2 rounded-lg transition-all duration-200 flex flex-col gap-2'>
       {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
            <div className='flex justify-between items-center gap-2'>
              <div className='flex items-center justify-center gap-2'>
                <h2 className='text-lg font-bold text-[#4a4a4a] '>{item.title}</h2>
                <p className={`text-md px-4 py-1 rounded-full font-medium ${statusColors[item.status]}`}>{item.status}</p>
                 <select name="status" value={item.status} onChange={(e)=>{
                change(e)
              }} className='cursor-pointer rounded-lg border border-[#CBCBCB] bg-white px-3 py-1.5 text-sm font-medium text-[#4A4A4A] shadow-sm outline-none transition-all duration-200 hover:border-[#6D8196] focus:border-[#6D8196] focus:ring-2 focus:ring-[#6D8196]/20' >
                <option value="todo">todo</option>
                <option value="in_progress">in_progress</option>
                <option value="in_review">in_review</option>
                <option value="completed">completed</option>
              </select>
              </div>
            <div>
                <Ellipsis onClick={()=>{
                setDotsclick((prev)=>!prev)
            }}/>
            {
                dotsclick &&(
                <div className='absolute right-0 w-32 bg-white rounded-md shadow-lg py-1'>
              <button 
                className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                onClick={()=>{
                    setDotsclick(false)
                    setEditbtn(true)
                }}
              >
                <Pencil size={14} />
                Edit
              </button>
              <button 
                className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                onClick={()=>{
                    setDotsclick(false)
                    setDelbtn(true)
                }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
                )
            }
            </div>    
            </div>
            <p className='text-md text-[#6D8196]'>{item.description}</p>
            <p className='text-[#6D8196] text-md font-medium'>Due date: {item.dueDate.split('T')[0]}</p>
            <div>
              <p className='text-md'>Approval: <span className='text-md px-4 py-1 w-fit rounded-full bg-[#fdde8d] '>{item.approval.status}</span></p>
              <p className='text-md text-[#6D8196]'>{item.approval.requestedAt}</p>
            </div>
        </div>
        {
            editbtn && (
                <EditTask editbtn={setEditbtn} task={item} fetchTask={fetchTask}/>
            )
        }
        {
          delbtn && (
            <DeleteTask delbtn={setDelbtn} fetchTask={fetchTask} task={item}/>
          )
        }
        </>
  )
}

export default Displaytask