import React, { Children, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
      if (loading) {

        return <h1>Loading...</h1>;
    }
    if(!user){
       return <Navigate to='/' replace/>
    }
    return children
}

export default ProtectedRoute