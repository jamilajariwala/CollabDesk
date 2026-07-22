import React from 'react'
import LoginCard from '../components/authentication/LoginCard'
import AuthLayout from "../components/authentication/AuthLayout";

const Login = () => {
  return (
    <div>
        <AuthLayout>
            <LoginCard/>
        </AuthLayout>
    </div>
  )
}

export default Login