import React from 'react'
import AuthLayout from '../components/authentication/AuthLayout'
import VerifyOtpCard from '../components/authentication/VerifyOtpCard'

const VerifyOtp = () => {
  return (
    <div>
        <AuthLayout>
            <VerifyOtpCard></VerifyOtpCard>
        </AuthLayout>
    </div>
  )
}

export default VerifyOtp