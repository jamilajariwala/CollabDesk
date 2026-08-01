import React from 'react'

const StateCard = ({title,cal}) => {
  return (
    <div className='flex flex-col items-start justify-center border-gray-200 border bg-white/60 h-30 p-5 rounded-lg shadow-lg backdrop-blur-lg'>
                <p className='text-sm font-medium text-[#6D8196]'>{title}</p>
                <p className='text-3xl font-bold text-[#4A4A4A]'>{cal}</p>
    </div>
  )
}

export default StateCard