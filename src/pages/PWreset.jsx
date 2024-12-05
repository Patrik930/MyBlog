import React from 'react'
import { Form } from 'react-router-dom';
import { FormGroup, Input, Label } from 'reactstrap';
import { Toastify } from '../components/Toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const midleStyle = {
  width: "400px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  padding: "40px 30px",
};





export const PWreset = () => {

  const {msg,resetPassword} = useContext(UserContext)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    resetPassword(data.get('email'))
    
  }
  return (
    <div
    className="page"
    style={{
      background: "linear-gradient(135deg, #333, #444)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div style={midleStyle}>
      <div style={{ textAlign: "center" }}>
     
        
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="pelda@gmail.com"
            type="email"
            
            style={inputStyle}
          />
        </FormGroup>
        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600"
          style={{
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "#852af5",
            padding: "10px 15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          <span
            className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            style={{
              display: "inline-block",
              width: "100%",
              color: "white",
              background: "transparent",
            }}
          >
            Új jelszó igénylése
          </span>
        </button>
      </Form>
 

      {msg && <Toastify {...msg} />}
    </div>
  </div>
  )
}

const inputStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginBottom: "15px",
};



