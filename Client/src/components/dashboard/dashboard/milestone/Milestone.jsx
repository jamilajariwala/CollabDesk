import React from 'react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Createmilestone from './Createmilestone'
import { useParams } from 'react-router-dom'
import api from '../../../../service/api'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import Displaymilestone from './Displaymilestone'

const Milestone = () => {
    const [btnclick,setBtnclick]=useState(false)
    const {id}=useParams()
    const {setUser}=useContext(AuthContext)
    const [loading,setLoading]=useState(true)
    const [error, setError] = useState("")
    const [displaymilestone,setDisplaymilestone]=useState([])
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

    useEffect(()=>{
        fetchMilestone()
    },[id])

    
if (loading) return <div className="p-6">Loading....</div>
  return (
    <div>
        <div className='bg-white/60 p-5 flex flex-col gap-8 rounded-lg shadow-lg backdrop-blur-lg border-gray-200 w-1/2'>
        <div className='flex justify-between'>
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
                }}></Displaymilestone>
                })
            }
            </div>
        </div>
        {
            btnclick && (
                <Createmilestone closecard={()=>{
                    setBtnclick(false)
                }} id={id} fetchMilestone={()=>{
                    fetchMilestone()
                }}/>
            )
        }
    </div>
  )
}

export default Milestone