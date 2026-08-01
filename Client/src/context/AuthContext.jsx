import { Children, createContext, useEffect, useState } from "react";
import api from "../service/api";

export const AuthContext=createContext()

const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const fetchCurrentUser=async()=>{
        try {
            const response=await api.get('/user/getuser')
            setUser(response?.data?.data)
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null);
            } else {
                console.error(error);
            }
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