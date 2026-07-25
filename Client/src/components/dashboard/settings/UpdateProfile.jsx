import { User } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

const Updateprofile = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className='flex justify-center items-center'>
      <div className='border w-full max-w-lg bg-white/60 border-white/40 backdrop-blur-3xl rounded-lg shadow-md my-5'>
        <div className='px-6 py-4 flex flex-col gap-8 w-full'>
          <div>
          <p className='font-medium text-xl md:text-2xl'>My Profile</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-3'>
          <div className=' w-16 h-16 rounded-full bg-[#6D8196] flex justify-center items-center border border-white shadow-md'>
            <span className='text-white text-lg font-medium'>{user.user.userName.charAt(0).toUpperCase()}</span>
          </div>
          <p className='font-medium text-lg md:text-xl'>{user.user.userName}</p>
          <div className=' px-6 py-2 rounded-full bg-[#fdfd9c] shadow-sm'>
            <p className='text-[#6D8196] font-medium'>{user.user.plan}</p>
          </div>
        </div>
        <div className='bg-[#fdfd9c]/50 p-4 max-w-lg border border-[#6D8196]/50 rounded-lg shadow-sm'>
          <h2 className='text-xl font-bold text-[#4A4A4A] mb-4'>User Details</h2>
         <dl className='divide-[#6D8196]/50 divide-y'>
          <div className='flex flex-row justify-between items-center py-3'>
            <dt className='font-medium text-[#6D8196]'>
            Full Name
          </dt>
          <dd className='font-semibold text-gray-800 capitalize'>
            {user.user.fullName}
          </dd>
          </div>
          <div className='flex flex-row justify-between items-center py-3'>
            <dt className='font-medium text-[#6D8196]'>
            Email
          </dt>
          <dd className='font-semibold text-gray-800'>
            {user.user.email}
          </dd>
          </div>
          <div className='flex flex-row justify-between items-center py-3'>
            <dt className='font-medium text-[#6D8196]'>
            Joining Date
          </dt>
          <dd className='font-semibold text-gray-800 capitalize'>
            {user.user.createdAt.split('T')[0]}
          </dd>
          </div>
         </dl>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Updateprofile