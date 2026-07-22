import React from 'react'
import AuthCard from './AuthCard'

const AuthLayout = ({children}) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
            <h1 className='text-2xl md:text-4xl font-bold font-logo tracking-wide'>
                        CollabDesk
            </h1>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout