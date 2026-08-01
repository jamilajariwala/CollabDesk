import React from 'react'
import SideBar from '../components/dashboard/SideBar';
import { Outlet } from 'react-router-dom';
const DashboardLayout = () => {
  return (
    <div className='min-h-screen md:h-screen w-full'>
        <div className='flex flex-col md:flex-row h-full w-full'>
            <SideBar className="h-full"/>
            <main className='overflow-y-auto flex-1 p-6 md:p-10'>
              <Outlet/>
            </main> 
        </div>
    </div>
  )
}

export default DashboardLayout