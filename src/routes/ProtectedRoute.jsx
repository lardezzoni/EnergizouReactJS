import { Navigate, Outlet } from "react-router-dom";
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const isValid = useRef(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    let validToken = localStorage.getItem('token');
      
    const validJson = {
      token: validToken
    };    
    axios.defaults.headers.common["Authorization"] = "Bearer " + validToken;
    axios
    .post('http://localhost:3005/api/v1/users/validateToken', validJson)
    .then(res=> {
      console.log(res)
      
        if(res.status == 200){
              isValid.current = true;
              console.log(isValid.current);
              console.log("INSIDE PROTECTED2")

        }
        else{
            isValid.current = false;
        }
    })
    .catch(err => {
      isValid.current = false;
      console.log(localStorage.getItem('token'))     
      navigate('/login') 
    })

  }, [isValid])
  
  const handleLogin = useCallback(async ()=>{
    if (isValid.current==true) {
      return <Navigate to = {{ pathname: "/events" }} />;
  
    }
    else{
      
        return <Navigate to = {{ pathname: "/login" }} />;
    
      
    }
  })
  handleLogin()
  return (
    <>
    <Outlet />
    </>
   

);
}

export default ProtectedRoute;
  