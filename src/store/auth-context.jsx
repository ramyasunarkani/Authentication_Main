import React, { createContext, useEffect, useState } from "react";

const AuthContext=createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});
 export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token');
    const [token ,setToken]=useState(initialToken);
    const userIsLoggedIn=!!token;
    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
    }
    useEffect(()=>{
        const storedToken=localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken)
        }

    },[])
    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return (
    <AuthContext.Provider value={contextValue}>
       {props.children}
    </AuthContext.Provider>);
 }
 export default AuthContext;
