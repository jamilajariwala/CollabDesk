import React, { use, useState } from 'react'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import ProjectCard from './ProjectCard'
import StateCard from './StateCard'
import api from '../../../service/api'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CreateProject from './CreateProject'

const DashBoard = () => {
    const [error, setError] = useState()
    const [ownedproject, setOwnedproject] = useState([])
    const [clientproject, setClientproject] = useState([])
    const [calculation, setCalculation] = useState("")
    const { setUser,user } = useContext(AuthContext)
    const [btnclick, setBtnclick] = useState(false)
    const fetchProject = async () => {
        try {
            const res = await api.get('/project')
            setOwnedproject(res.data.data.ownedprojects)

            const cal = await api.get('/calculate')
            setCalculation(cal.data.data)

        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
                return
            }
            setError(error?.response?.data?.message || "something went wrong")
        }
    }

       const [success, setSuccess]=useState("")
    useEffect(() => {
        fetchProject()
    }, [])
    return (
        <div className='flex flex-col gap-8'>
            <div>
                <h1 className='text-2xl font-bold text-[#4A4A4A]'>Dashboard</h1>
            </div>
            <div className='flex justify-between items-center flex-wrap gap-4'>
                <h3 className='text-xl font-medium text-[#4A4A4A]'>Welcome back, {user.user.userName}</h3>
                <button className='text-white text-md bg-[#6D8196] px-4 py-2 rounded-lg flex flex-row gap-2 justify-center items-center hover:bg-[#5C7087] transition-all duration-200 cursor-pointer active:scale-95'
                    onClick={() => {
                        setBtnclick(true)
                    }}>
                    <Plus size={18} /> Create Project
                </button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                <StateCard
                    title="My Project"
                    cal={calculation.totalOwnProject} />
            </div>
            <div className='bg-white/60 p-5 flex flex-col gap-4 rounded-lg shadow-lg backdrop-blur-lg border-gray-200 '>
                <p className='text-xl font-bold text-[#4A4A4A]'>My Projects</p>
                <div className='gap-2 flex flex-col divide-y divide-[#6D8196]/50'>
                {
                    ownedproject?.map((item) => {
                        return <ProjectCard item={item} key={item._id} />
                    })
                }
                </div>
            </div>
            {
                btnclick && (
                    <CreateProject close={ ()=>{
                        setBtnclick(false)
                    }}
                    fetchProject={fetchProject} />
                )
            }
        </div>
    )
}

export default DashBoard