import React from 'react'


const InputField = ({label,logo,type,placeholder,name,value,change,auto}) => {
    
  return (
    <div className='flex flex-col gap-1'>
        <label className='text-md' >{label}</label>
        <div className='relative flex items-center'>

            {logo}
            <input
             type={type} 
             autoComplete={auto}
             placeholder={placeholder} 
             name={name}
             value={value}
             onChange={(e)=>{
                change(e)
             }}
             className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500"
            ' />
            
        </div>
    </div>
  )
}

export default InputField