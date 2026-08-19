import React from 'react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Createmilestone from './Createmilestone'
import { useOutletContext, useParams } from 'react-router-dom'
import api from '../../../../service/api'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import Displaymilestone from './Displaymilestone'
import TaskCard from '../task/TaskCard'
import CreateTask from '../task/CreateTask'

const Milestone = () => {
    const {updateProjectStatusUI}=useOutletContext()
    const [btnclick,setBtnclick]=useState(false)
    const [creattaskbtnclick,setcreattaskbtnclick]=useState(false)
    const {id}=useParams()
    const {setUser}=useContext(AuthContext)
    const [loading,setLoading]=useState(true)
    const [error, setError] = useState("")
    const [displaymilestone,setDisplaymilestone]=useState([])
    const [selectedmilestone,setSelectedmilestone]=useState(null)

    const [displaytask,setDisplaytask]=useState([])
    const [taskloading,setTaskloading]=useState(false)
    const fetchTask=async(mileId)=>{
        try {
            setTaskloading(true)
            const response=await api.get(
                `project/${id}/milestone/${mileId}/task`
            )
            setDisplaytask(response?.data?.data?.tasks)
            console.log(response.data?.data?.tasks);
            
        } catch (error) {
            if(error.response?.status === 401){
                setUser(null)
                return
            }
            setError(error.response?.data?.message || "Something went wrong")
        }finally{
            setTaskloading(false)
        }
    }
    const updateTaskStatusInUI = (taskId, newStatus) => {
    setDisplaytask((prevTasks) =>
        prevTasks.map((task) =>
            task._id === taskId
                ? { ...task, status: newStatus }
                : task
        )
    )
}


    const fetchMilestone=async()=>{
        try {
            setLoading(true)
            const response=await api.get(
                `project/${id}/milestone/`
            )
            
            setDisplaymilestone(response?.data?.data?.milestones || [])
        } catch (error) {
             if (error.response?.status === 401) {
                setUser(null)
                return
            }
            setError(error?.response?.data?.message || "something went wrong")
        }finally{
            setLoading(false)
        }
    }
    const updateMilestoneStatusUI=(updatemilestoneId,newstatus)=>{
        setDisplaymilestone((prevmilestone)=>
        prevmilestone.map((milestone)=>
            milestone._id == updatemilestoneId
            ?{...milestone,status:newstatus}
            :milestone
        ))
    }

    useEffect(()=>{
        fetchMilestone()
    },[id])

    useEffect(()=>{
        if(selectedmilestone){
            fetchTask(selectedmilestone._id)
        }
},[selectedmilestone])
    
if (loading) return <div className="p-6">Loading....</div>

  return (
    <div className='flex flex-col md:flex-row gap-5'>
        <div className='bg-white/60 p-5 flex flex-col gap-8 rounded-lg shadow-lg backdrop-blur-lg border-gray-200 w-full md:w-1/2'>
        <div className='flex justify-between items-center gap-3 md:flex-col lg:flex-row'>
            <div> 
                <h2 className='text-xl font-medium tracking-wide'>Milestones</h2>
            </div>
            <div> 
                <button className='text-white text-md bg-[#6D8196] px-4 py-2 rounded-lg flex flex-row gap-2 justify-center items-center hover:bg-[#5C7087] transition-all duration-200 cursor-pointer active:scale-95' onClick={()=>{
                    setBtnclick(true)
                }}>
                    <Plus size={18}  /> Create Milestone
                </button>
            </div>
        </div>
        <div className='gap-2 flex flex-col'>
            {
                displaymilestone?.map((milestone)=>{
                    return <Displaymilestone item={milestone} key={milestone._id} prjtId={id} fetchMilestone={()=>{
                    fetchMilestone()
                }} onselectedmilestone={setSelectedmilestone} selectedMilestone={selectedmilestone} fetchTask={fetchTask}></Displaymilestone>
                })
            }
            </div>
        </div>

        {
            selectedmilestone ? (    
            <TaskCard oncreattaskbtnclick={setcreattaskbtnclick} displaytask={displaytask} taskloading={taskloading} fetchTask={fetchTask} updateTaskStatusInUI={updateTaskStatusInUI} updateMilestoneStatusUI={updateMilestoneStatusUI} updateProjectStatusUI={updateProjectStatusUI}/>
            ):(
        <div className='h-full flex justify-center items-center text-[#6D8196]'>
          Select a milestone to create and view its tasks 
        </div>
            )
        }

        {
            btnclick && (
                <Createmilestone closecard={()=>{
                    setBtnclick(false)
                }} id={id} fetchMilestone={()=>{
                    fetchMilestone()
                }} />
            )
        }
        
        {
            creattaskbtnclick && (
                <CreateTask creattaskbtnclick={setcreattaskbtnclick} prjtId={selectedmilestone.projectId} mileId={selectedmilestone._id} fetchTask={fetchTask}/>
            )
        }
    </div>
  )
}

export default Milestone