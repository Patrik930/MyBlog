import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Toastify } from "../components/Toastify";

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

export const Auth = () => {
  const { user, signInUser, signUpUser, msg } = useContext(UserContext);

  const location = useLocation();
  const isSignIn = location.pathname === "/auth/in";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignIn) {
      signInUser(data.get("email"), data.get("password"));
    } else {
      signUpUser(data.get("email"), data.get("password"), data.get("displayName"));
    }
  };

  return (
    <div
      className="page"
      style={{
        background: "linear-gradient(135deg, #333, #444)", // Dark background gradient
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={midleStyle}>
        <div style={{ textAlign: "center" }}>
       
          <h3 style={{ fontWeight: "bold", margin: "20px 0" }}>
            {isSignIn ? "Bejelentkezés" : "Regisztráció"}
          </h3>
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
          <FormGroup>
            <Label for="examplePassword">Jelszó</Label>
            <Input
              id="examplePassword"
              name="password"
              type="password"
              placeholder="********"
              style={inputStyle}
            />
          </FormGroup>
          {!isSignIn && (
            <FormGroup>
              <Label for="exampleUsername">Felhasználónév</Label>
              <Input
                id="exampleUsername"
                name="displayName"
                type="text"
                required
                style={inputStyle}
              />
            </FormGroup>
          )}
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
              {isSignIn ? "Belépés" : "Regisztráció"}
            </span>
          </button>
        </Form>

        {msg && <Toastify {...msg} />}
      </div>
    </div>
  );
};

// Custom Styles for Inputs
const inputStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginBottom: "15px",
};

