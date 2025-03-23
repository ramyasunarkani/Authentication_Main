import React, { createContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext=createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});
 export const AuthContextProvider=(props)=>{
    const history=useHistory();
    const initialToken=localStorage.getItem('token');
    const [token ,setToken]=useState(initialToken);
    const userIsLoggedIn=!!token;
    const LOG_OUT_TIME=1*60*1000;
    const logoutTimerRef=useRef(null);
    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token);
        resetTimer();
    }
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
        clearTimeout(logoutTimerRef.current);
        history.replace('/login');
    }
    const resetTimer=()=>{
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current=setTimeout(logoutHandler,LOG_OUT_TIME)
    }
    useEffect(()=>{
        if(userIsLoggedIn){
            resetTimer();
            const activities=['mousemove','keydown','scroll','click'];
            activities.forEach((event)=>window.addEventListener(event, resetTimer));

            return()=>{
            activities.forEach((event)=>window.removeEventListener(event, resetTimer));
            clearTimeout(logoutTimerRef.current);
          };
        }
        

    },[userIsLoggedIn])
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
