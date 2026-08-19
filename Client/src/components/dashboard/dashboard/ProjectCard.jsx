import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({item}) => {
  const statusColors = {
      Planning: "bg-gray-200 text-gray-700",
      In_Progress: "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700"
}

  return (
               <Link to={`/dashboard/project/${item._id}`}>
                <div className='group flex flex-col sm:flex-row sm:justify-between  sm:items-center p-4 gap-3 transition-all duration-200 cursor-pointer hover:bg-white hover:shadow-md  hover:translate-x-1'>
                 <div className='sm:w-1/2'>
                    <h2 className='text-lg font-bold text-[#4A4A4A] '>{item.title}</h2>
                    <p className='text-sm text-[#6D8196]  '>{item.description}</p>
                </div>
                <div>
                    <p className={`px-4 py-1 rounded-lg font-medium ${statusColors[item.projectStatus]}`}>{item.projectStatus}</p>
                </div>
                <div>
                    <p className='text-[#6D8196] text-sm font-medium'>{item.endDate.split('T')[0]}</p>
                </div>
                <div className='text-[#6D8196]/40 group-hover:text-[#6D8196] group-hover:translate-x-1 transition-all duration-200'>
                  <ChevronRight/>
                </div>
               </div> 
              </Link>
  )
}

export default ProjectCard