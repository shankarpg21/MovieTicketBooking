import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext=createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [token,setToken]=useState("")
    const [isUser,setisUser]=useState(false);
    const [isAdmin,setisAdmin]=useState(false);
    const [movie,setMovie]=useState("");
    const navigate=useNavigate();
    const login=(user)=>{
        setUser(user)
    }
    const verify=(token)=>{
        setToken(token)
    }
    const logout=()=>{
        setUser(null)
        setisUser(false)
        setisAdmin(false)
        navigate('/')
    }
    const title=(movie)=>{
        setMovie(movie)
    }
    const User=()=>{
        setisAdmin(false)
        setisUser(true)
    }
    const Admin=()=>{
        setisUser(false)
        setisAdmin(true)
    }
  return (
    <AuthContext.Provider value={{user,token,verify,login,logout,User,Admin,title,movie,isAdmin,isUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth(){
    return useContext(AuthContext)
}
