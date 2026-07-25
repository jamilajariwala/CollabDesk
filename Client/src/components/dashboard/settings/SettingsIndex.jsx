import React, { useState } from 'react'
import SettingsCard from './SettingsCard'
import {ChevronRight, Lock, User, LogOut, Trash  } from 'lucide-react'
import Logout from '../../authentication/Logout'
import DeleteUser from '../../authentication/DeleteUser'

const SettingsIndex = () => {
    const [islogoutclick,setIslogoutclick]=useState(false)
    const [isdeleteclick,setIsdeleteclick]=useState(false)
  return (
        <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-medium text-xl md:text-3xl leading-relaxed">Settings</h2>
          <p className="text-base md:text-lg tracking-normal text-[#6D8196]">Manage your account settings and preference here</p>
        </div>
        <div className='flex flex-col gap-4'>
          <p className="font-medium text-lg tracking-normal">General</p>
          <div className='bg-white/80 border-t-2 border-r-2 border-l-2 rounded-xl shadow-md border-[#CBCBCB]/60'>

            <SettingsCard heading="Profile Information" des="Update name, email, profile picture." color="bg-[#5bb4ec]/20" logo={<User color='#5bb4ec'/>} link="/dashboard/settings/updateprofile"/>

             <SettingsCard heading="Change Password" des="Update your account password." color="bg-[#be69f7]/20" logo={<Lock color='#be69f7'/>} link="/dashboard/settings/changepassword"/>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className="font-medium text-lg tracking-normal">Danger</p>
           <div className='bg-white/80 border-t-2 border-r-2 border-l-2 rounded-xl {{shadow-md border-[#CBCBCB]/60'>

            <SettingsCard heading="Logout" des="Sign out from your account." color="bg-[#fccd5f]/20" logo={<LogOut  color='#fccd5f'/>} click={()=>setIslogoutclick(true)}/>

             <SettingsCard heading="Delete Account" des="Permanently delete your account." color="bg-[#f8958a]/20" logo={<Trash color='#f8958a'/>} click={()=>setIsdeleteclick(true)}/>
          </div>
        </div>
    {islogoutclick && (
    <Logout close={() => setIslogoutclick(false)} />
    )}
    {isdeleteclick && (
        <DeleteUser close={()=>setIsdeleteclick(false)}/>
    )}
      </div>
  )
}

export default SettingsIndex