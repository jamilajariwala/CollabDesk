import React from 'react'

const ProjectDetailCard = ({title,detail}) => {
  return (
    <div className='flex flex-col items-start justify-center border-gray-200 border bg-white/60 h-30 p-5 rounded-lg shadow-lg backdrop-blur-lg'>
                <p className='text-md  text-[#6D8196]'>{title}</p>
                <p className='text-lg font-medium text-[#4A4A4A]'>{detail}</p>
    </div>
  )
}

export default ProjectDetailCard