import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext=createContext()
function AuthProvider({children}) {
    const [blogs,setBlogs]=useState()
    useEffect(()=>{
        const fetchBlogs=async()=>{
            try {
            const response=await axios.get("http://localhost:3000/api/blogs/allBlogs")
            console.log(response)
            setBlogs(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs();
    },[])
  return (
   <AuthContext.Provider value={{blogs}}>
     {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth=()=>useContext(AuthContext)
