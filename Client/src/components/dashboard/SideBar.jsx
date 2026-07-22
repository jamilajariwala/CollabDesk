import React, { useState } from "react";
import { House,FolderDot,Bell,User,Settings,LogOut, Menu ,X } from 'lucide-react';
const SideBar=()=>{
    const [open,setOpen]=useState(false)
    const toggle=()=>{
        setOpen(!open)
    }
    return(
        <div>
        <div className="md:hidden p-4 cursor-pointer">
            <button onClick={toggle} 
            className="p-2 rounded-lg bg-[#FFFFE3] text-[#6D8196] shadow-sm border border-black/5"
        >
            {
                open?<Menu className="hidden"/>:<Menu/>
            }
            </button>
            
        </div>
        {
            open && <div className="bg-black/40 fixed inset-0 z-40 backdrop-blur-lg md:hidden" onClick={toggle}></div>
        }
        <aside className={`fixed top-0 left-0 z-50 md:static flex flex-col  gap-8 h-full w-64 p-4 border-r-1border-[#fefeb7] bg-[#FFFFE3] shadow-md transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <button onClick={toggle}>
                    <X className="md:hidden"/>
                </button>
                <h1 className='text-2xl md:text-4xl font-bold font-logo tracking-wide'>
                        CollabDesk
                </h1>
                <ul className='flex flex-col gap-4 list-none text-[#6D8196] text-lg'>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl group transition-all cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                        <House size={18}/> <span className='group-hover:font-medium'>Dashboard</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all cursor-pointer group duration-200 flex items-center gap-3' onClick={toggle}>
                        <FolderDot size={18}/> <span className='group-hover:font-medium'>Projects</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                       <Bell size={18}/> <span className='group-hover:font-medium'>Notification</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3'onClick={toggle}>
                       <User size={18}/> <span className='group-hover:font-medium'>Profile</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                       <Settings size={18}/> <span className='group-hover:font-medium'>Settings</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                       <LogOut size={18}/> <span className='group-hover:font-medium'>Logout</span>
                    </li>
                </ul>
            </aside>
            </div>
    )
}
export default SideBar