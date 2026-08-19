import { ChevronRight,Ellipsis,Pencil,Trash2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import Editmilestone from './Editmilestone'
import Deletemilestone from './Deletemilestone'

const Displaymilestone = ({item,prjtId,fetchMilestone,onselectedmilestone,selectedMilestone,fetchTask}) => {
    const statusColors = {
      pending: "bg-gray-200 text-grey-700",
      in_progress: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700"
}
    const [dotsclick,setDotsclick]=useState(false)
    const [editbtnclick,setEditBtnclick]=useState(false)
    const [deletebtnclick,setDeleteBtnclick]=useState(false)
  return (
    <>
        <div className={`py-2 px-2 rounded-lg transition-all duration-200 cursor-pointer flex flex-col gap-2 ${
        selectedMilestone?._id === item._id
          ? 'bg-[#dec942]/30'
          : 'hover:bg-[#dec942]/20'
       }`}
       onClick={()=>{
          onselectedmilestone(item)
        }}>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-bold text-[#4a4a4a] '>{item.title}</h2>
            <div>
                <Ellipsis onClick={(e)=>{
                  e.stopPropagation()
                setDotsclick((prev)=>!prev)
            }}/>
            {
                dotsclick &&(
                <div className='absolute right-0 w-32 bg-white rounded-md shadow-lg py-1'>
              <button 
                className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                onClick={()=>{
                    setDotsclick(false)
                    setEditBtnclick(true)
                }}
              >
                <Pencil size={14} />
                Edit
              </button>
              <button 
                className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                onClick={()=>{
                    setDotsclick(false)
                    setDeleteBtnclick(true)
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
            <div className='flex justify-between items-center'>
                <p className={`text-md px-4 py-1 rounded-full font-medium ${statusColors[item.status]}`}>{item.status}</p>
            <p className='text-[#6D8196] text-md font-medium'>{item.dueDate.split('T')[0]}</p>
            </div>
        </div>
        {
            editbtnclick && (
                   <Editmilestone editbtn={()=>{
                    setEditBtnclick(false)
                   }} id={item._id} prjtId={prjtId} fetchMilestone={fetchMilestone}/>
                )
        }
        {
          deletebtnclick && (
            <Deletemilestone delbtn={()=>{
              setDeleteBtnclick(false)
            }} prjtId={prjtId} id={item._id} fetchTask={fetchTask} fetchMilestone={fetchMilestone} nm={item.title}/>
          )
        }
            </>
  )
}

export default Displaymilestone