import React from 'react'
import AuthLayout from '../components/authentication/AuthLayout'
import ForgotPasswordCard from '../components/authentication/ForgotPasswordCard'

const ForgotPassword = () => {
  return (
    <div>
        <AuthLayout>
            <ForgotPasswordCard/>
        </AuthLayout>
    </div>
  )
}

export default ForgotPassword