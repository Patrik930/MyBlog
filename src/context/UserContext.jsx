import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut, updateProfile, } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'




export const UserContext = createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [msg,setMsg] = useState({})

    useEffect(()=>{
       const unSubscribe  = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unSubscribe()
    },[])

 const signInUser=async(email,password)=>{
    try {
     await signInWithEmailAndPassword(auth,email,password)
     delete msg?.err
     setMsg({...msg,signin:'Sikeres bejelentkezés!'})
    } catch (error) {
        console.log(error);
        setMsg({...msg,err:error.message})
        
    }
}

 const logOut=async()=>{
    await signOut(auth)
    delete msg?.signin
}


const signUpUser=async(email,password,displayName)=>{
    try {
     await createUserWithEmailAndPassword(auth,email,password)
     await updateProfile(auth.currentUser,{displayName})
    } catch (error) {
        console.log(error);
        
    }
}










    

    return(
        <UserContext.Provider value={{user,signInUser,logOut,signUpUser,msg}}>
            {children}
        </UserContext.Provider>
    )
}



