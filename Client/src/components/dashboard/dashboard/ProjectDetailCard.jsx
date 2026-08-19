import React from 'react'

const ProjectDetailCard = ({title,detail,statusColors,inviteColor,start,end}) => {
  
  return (
    <div className='flex flex-col items-start justify-center gap-2 border-gray-200 border bg-white/60 h-30 p-5 rounded-lg shadow-lg backdrop-blur-lg'>
                <p className='text-md  text-[#6D8196]'>{title}</p>
                <p className={`text-lg font-medium  px-4 py-1 rounded-full ${statusColors} ${inviteColor} ${start} ${end}`}>{detail}</p>
    </div>
  )
}

export default ProjectDetailCard