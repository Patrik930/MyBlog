import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword,signOut, updateProfile, } from 'firebase/auth'
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
    
     setMsg({})
     setMsg({signin:"Sikeres bejelentkezés!"})
    } catch (error) {
        console.log(error);
        setMsg({err:error.message})
        
    }
}

 const logOut=async()=>{
    await signOut(auth)
    setMsg({})
}


const signUpUser=async(email,password,displayName)=>{
    try {
     await createUserWithEmailAndPassword(auth,email,password)
     await updateProfile(auth.currentUser,{displayName})
     setMsg({})
     setMsg({signup:"Sikeres regisztráció!"})
    } catch (error) {
        setMsg({err:err.message})        
    }
}

const resetPassword=async(email)=>{
    try {
        await sendPasswordResetEmail(auth,email)
        setMsg({})
        setMsg({resetPw:"A jelszó visszaállítási email elküldve!"})
    } catch (error) {
        setMsg({err:err.message})    
    }

}

const updateCredentials=async(displayName)=>{
    try {
        await updateProfile(auth.currentUser,{displayName})
        setMsg({})
        setMsg({signup:"Sikeres módosítás"})
       } catch (error) {
           setMsg({err:err.message})        
       }
}





    

    return(
        <UserContext.Provider value={{user,signInUser,logOut,signUpUser,msg,setMsg,resetPassword,updateCredentials}}>
            {children}
        </UserContext.Provider>
    )
}



