import React from 'react'
import AuthLayout from '../components/authentication/AuthLayout'
import ResetPasswordCard from '../components/authentication/ResetPasswordCard'

const ResetPassword = () => {
  return (
    <div>
        <AuthLayout>
            <ResetPasswordCard/>
        </AuthLayout>
    </div>
  )
}

export default ResetPassword