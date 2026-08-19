import React from "react";
import { Plus } from "lucide-react";
import { useState } from "react";
import api from "../../../../service/api";
import { useEffect } from "react";
import Displaytask from "./Displaytask";

const TaskCard=({oncreattaskbtnclick,taskloading,displaytask,fetchTask,updateMilestoneStatusUI,updateTaskStatusInUI,updateProjectStatusUI})=>{
    const [error,setError]=useState("")
    if(taskloading) return <div className="p-6">Loading task....</div>
    return (
    <div className='bg-white/60 p-5 rounded-lg shadow-lg backdrop-blur-lg border-gray-200 w-full md:w-1/2 self-start flex flex-col gap-8'>
        <div className='flex justify-between items-center gap-3 md:flex-col lg:flex-row'>
            <div> 
                <h2 className='text-xl font-medium tracking-wide'>Tasks</h2>
            </div>
            <div> 
                <button className='text-white text-md bg-[#6D8196] px-4 py-2 rounded-lg flex flex-row gap-2 justify-center items-center hover:bg-[#5C7087] transition-all duration-200 cursor-pointer active:scale-95'
                onClick={()=>{
                    oncreattaskbtnclick(true)
                }} >
                    <Plus size={18}  /> Create Task
                </button>
            </div>
        </div>
        <div>
            {
                displaytask.map((task)=>{
                    return <Displaytask item={task} key={task._id} fetchTask={fetchTask} updateTaskStatusInUI={updateTaskStatusInUI} updateMilestoneStatusUI={updateMilestoneStatusUI} updateProjectStatusUI={updateProjectStatusUI}/>
                })
            }
        </div>
   </div>
)}

export default TaskCard