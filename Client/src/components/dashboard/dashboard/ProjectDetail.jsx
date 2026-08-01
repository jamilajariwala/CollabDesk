import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import api from '../../../service/api'
const ProjectDetail = () => {
  const {id}=useParams()
  const [projectdetail,setProjectDetail]=useState(null)
  const [error,setError]=useState("")
  const {setUser}=useContext(AuthContext)
  const [loading,setLoading]=useState(true)
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
useEffect(()=>{
  fetchDetail()
},[id])

if (loading) return <div className="p-6">Loading project details...</div>
  return (
    <div>
      <button>
      
      </button>
    </div>
  )
}

export default ProjectDetail