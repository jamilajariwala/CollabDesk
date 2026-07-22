import React, { useState } from 'react'
import { Eye,LockKeyhole ,EyeOff} from 'lucide-react'

const PasswordInputField = ({label,placeholder,name,value,change}) => {
    const [showpassword,setshowpassword]=useState(false)
  return (
       <div className='flex flex-col gap-1'>
        <label className='text-md' >{label}</label>
        <div className='relative flex items-center'>

            <LockKeyhole color='#6D8196' size={20} className='absolute left-3'/>
            <button type="button" className="absolute right-3" onClick={()=>{
                setshowpassword((prev)=>!prev)
            }}>
                {
                    showpassword?<EyeOff color='#6D8196' size={20}/>:<Eye color='#6D8196' size={20}/>
                
                }
            </button>
            <input 
            type={showpassword?"text":"password"} 
            name={name}
            value={value}
            onChange={(e)=>{
                change(e)
            }}
            placeholder={placeholder} 
            className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500"
            ' />
            
        </div>
    </div>
  )
}

export default PasswordInputField