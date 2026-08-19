import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import {ArrowLeft } from 'lucide-react'
import api from '../../../service/api'
import ProjectDetailCard from './ProjectDetailCard'
import EditProject from './EditProject'
import DeleteProject from './DeleteProject'

const ProjectDetail = () => {
   const statusColors = {
      Planning: "bg-gray-200 text-gray-700",
      In_Progress: "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700"
}
const inviteColor = {
      not_invited: "bg-slate-300 text-slate-700",
      Invited: "bg-violet-100 text-violet-700",
      Accepted: "bg-teal-100 text-teal-700"
}
  const {id}=useParams()
  const [projectdetail,setProjectDetail]=useState(null)
  const [error,setError]=useState("")
  const {setUser}=useContext(AuthContext)
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  const updateProjectStatusUI=(projectId,newstatus)=>{
    setProjectDetail((prev)=>prev._id==projectId?{
      ...prev,projectStatus:newstatus
    }:prev)
  }
  const updateProjectClientInviteUI=(projectId,status)=>{
    setProjectDetail((prev)=>prev._id == projectId?{
      ...prev,inviteStatus:status
    }:prev)
  }
  const fetchDetail=async()=>{
    try {
      setLoading(true)
   const respone= await api.get(`/project/${id}`)
   setProjectDetail(respone.data.data.project)
  } catch (error) {
    if(error.response?.status===401){
      setUser(null)
      return
    }
    setError(error?.response?.data?.message || "something went wrong")
  }finally{
    setLoading(false)
  }
}
const [editbtnclick,setEditBtnclick]=useState(false)
const [deletebtnclick,setDeleteBtnclick]=useState(false)
useEffect(()=>{
  fetchDetail()
},[id])

if (loading) return <div className="p-6">Loading project details...</div>
  return (
    <div className='flex flex-col gap-8'>
      <button className='hover:-translate-x-1 transition-all duration-200'
      onClick={()=>{
        navigate('/dashboard')
      }}>
      <ArrowLeft/>
      </button>
      <div className='flex justify-between items-center flex-wrap gap-3'>
        <h1 className='text-4xl font-bold'>{projectdetail.title}</h1>
        <div className='flex gap-4'>
          <button type="button" className='bg-[#6D8196] px-6 py-2 text-md  rounded-lg text-white hover:bg-[#5C7087] hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
            setEditBtnclick(true)
          }}>Edit Project</button>
          <button type='button' className='bg-white/80 px-6 py-2 text-md  rounded-lg text-red-600 border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
            setDeleteBtnclick(true)
          }}>Delete Project</button>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <ProjectDetailCard title="Project Status" detail={projectdetail.projectStatus} statusColors={statusColors[projectdetail.projectStatus]}/>
        <ProjectDetailCard title="Start Date" detail={projectdetail.startDate.split('T')[0]} start={'bg-sky-100 text-sky-700'}/>
        <ProjectDetailCard title="End Date" detail={projectdetail.endDate.split('T')[0]} end={'bg-orange-100 text-orange-700'}/>
        <ProjectDetailCard title="Inivitation Status" detail={projectdetail.inviteStatus} inviteColor={inviteColor[projectdetail.inviteStatus]}/>
      </div>

      <div>
        <ul className='flex list-none gap-20 pb-4 text-lg tracking-wide'>
          {/* <li className='cursor-pointer transition-all duration-200 hover:[text-shadow:_0.5px_0_0_currentColor]'>Overview</li> */}
          <li className='cursor-pointer transition-all duration-200 hover:[text-shadow:_0.5px_0_0_currentColor]'><Link to={`/dashboard/project/${id}/milestone`}>Milestones</Link></li>
          <li className='cursor-pointer transition-all duration-200 hover:[text-shadow:_0.5px_0_0_currentColor]'><Link to={`/dashboard/project/${id}/client`}>Client</Link></li>
        </ul>
        <hr className='text-[#4A4A4A]/40' />
      </div>
      <div>
        <Outlet context={{updateProjectStatusUI,updateProjectClientInviteUI}}/>
      </div>
      {
        editbtnclick && (
         <EditProject prjtId={id} project={projectdetail} fetchdata={()=>{
          fetchDetail()}} close={()=>{
          setEditBtnclick(false)
         }}/>
        )
      }
      {
        deletebtnclick && (
          <DeleteProject prjtId={id} close={()=>{
            setDeleteBtnclick(false)
          }}/>
        )
      }
    </div>
  )
}

export default ProjectDetail