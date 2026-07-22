import React from 'react'
import SideBar from './SideBar';
const DashboardLayout = () => {
  return (
    <div className='min-h-screen md: h-screen bg-white w-full'>
        <div className='flex flex-col md:flex-row h-full'>
            <SideBar/>
            <main>vjdbc</main> 
        </div>
    </div>
  )
}

export default DashboardLayout