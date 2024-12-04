import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = ({err,signin}) => {

    console.log(err);
    

    const navigate = useNavigate()

    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-left"})
        }else if(signin){
            toast.success(signin,{position: "top-center"})
            setTimeout(()=>navigate('/'),2000)
            
        }
    },[err,signin])


  return (
    <div>
      <ToastContainer/>
    </div>
  )
}


