import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

export const AuthContext=createContext()

const AuthContextProvider=({children})=>{
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const fetchCurrentUser=async()=>{
        try {
            const response=await axios.get(
                `${API_BASE_URL}/user/getuser`,
                {
                    withCredentials:true
                }
            )
            setUser(response?.data?.data)
        } catch (error) {
            setUser(null)
            console.log(error);
            
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchCurrentUser()
    },[])
    return <AuthContext.Provider value={{
        user,
        setUser,
        loading,
        fetchCurrentUser
    }}>
        {children}
    </AuthContext.Provider>
}
export default AuthContextProvider