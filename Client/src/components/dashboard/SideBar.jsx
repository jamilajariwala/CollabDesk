import React, { useContext, useState } from "react";
import { House,FolderDot,Bell,User,Settings,LogOut, Menu ,X, UserRound  } from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AuthButton from "../authentication/AuthButton";
import Logout from "../authentication/Logout";
const SideBar=()=>{
    const [open,setOpen]=useState(false)
    const {user} =useContext(AuthContext)
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
        <aside className={`border-r-2 border-[#f9f9bb] fixed md:static top-0 left-0 z-50  flex flex-col  gap-2 h-full w-64 p-2 bg-[#FFFFE3] shadow-md transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <button onClick={toggle}>
                    <X className="md:hidden"/>
                </button>
                <h1 className='text-2xl md:text-4xl font-bold font-logo tracking-wide'>
                        CollabDesk
                </h1>
                <ul className='flex flex-col gap-4 pt-8 list-none text-[#6D8196] text-lg'>
                    <Link to='/dashboard'>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl group transition-all cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                        <House size={18}/> <span className='group-hover:font-medium'>Dashboard</span>
                    </li>
                    </Link>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all cursor-pointer group duration-200 flex items-center gap-3' onClick={toggle}>
                        <FolderDot size={18}/> <span className='group-hover:font-medium'>Projects</span>
                    </li>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                       <Bell size={18}/> <span className='group-hover:font-medium'>Notification</span>
                    </li>
                    <Link to='/dashboard/profile'>
                    <li className=' hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3'onClick={toggle}>
                       <User size={18}/> <span className='group-hover:font-medium'>Profile</span>
                    </li>
                    </Link>
                    <Link to='/dashboard/settings'><li className='hover:bg-gray-500/10 p-2 hover:rounded-xl  transition-all group cursor-pointer duration-200 flex items-center gap-3' onClick={toggle}>
                       <Settings size={18}/><span className='group-hover:font-medium'>Settings</span>
                    </li></Link>
                </ul>
                <div className="fixed bottom-0 flex gap-3 justify-center items-center mb-3">
                    <div>
                        <div  className="flex justify-center items-center rounded-full w-12 h-12 bg-[#6D8196] border border-black/10 " >
                        <span className='text-white text-lg font-medium'>
                            {user.user.userName.charAt(0).toUpperCase()}
                        </span>
                        </div>
                    </div>
                    <div>
                    <p className="font-medium tracking-wide">{user.user.userName}</p>
                    <p className="font-light">{user.user.plan}</p>
                    </div>
                    
                </div>
            </aside>
            </div>
    )
}
export default SideBar