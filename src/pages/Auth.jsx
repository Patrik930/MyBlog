import React from 'react'
import { Form, useLocation } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import {  UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { Toastify } from '../components/Toastify'




  const midleStyle = {
    width: '300px',
    position : 'absolute',
    top: '50%',
    left: '50%',
    transition:'translate(-50%,-50%)'
  }






export const Auth = () => {

  const {user,signInUser,signUpUser,msg} = useContext(UserContext)

  const location = useLocation()
  console.log(location.pathname);

  const isSignIn = location.pathname =='/auth/in' // true vagy false
  console.log(msg);
  

  

  const handleSubmit=(event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get('email'),data.get('password'),data.get('displayName'));

    if(isSignIn){
      signInUser(data.get('email'),data.get('password'))
    }else{
      signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
    }
    
    
  }

  console.log(user);
  

  return (
    <div className='page'>
      <div style={midleStyle}>
        <h3>{isSignIn ? 'Bejelentkezés ' : 'Regisztráció'}</h3>
        <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="with a placeholder"
      type="email"
    />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword">
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="password placeholder"
      type="password"
    />
  </FormGroup>
  {!isSignIn &&
    <FormGroup>
    <Label for="examplePassword">
      Felhasználónév:
    </Label>
    <Input
      id="examplePassword"
      name="displayName"
      type="text"
    />
  </FormGroup>
  }
 
  <Button>
    Submit
  </Button>
</Form>
{msg && <Toastify {...msg}/> }
      </div>
    </div>
  )
}


