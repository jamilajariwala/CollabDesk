import React from 'react'
import { Outlet } from 'react-router-dom'

const Settings = () => {
  return (
    <div className='w-full'>
      <Outlet />
    </div>
  )
}

export default Settings