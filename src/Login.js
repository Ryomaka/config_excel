import React, { useState } from "react";
import ReactDOM from "react-dom";
import Upload from "./Upload";
import { BrowserRouter, NavLink, Route ,Routes, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import "./CSS/login.css"

import Error from "./pages/Error";
import Approve from "./pages/Approve";
function App({login}) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDev, setIsSubmitDev] = useState(false);
  

  const errors = {
    uname: "invalid username",
    pass: "invalid password "
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    await axios.post(`https://fkghv2ohm5.execute-api.ap-southeast-1.amazonaws.com/dev/dynamodb/login`,{username:uname.value, password:pass.value})
    .then((response)=> {if (response.data.length > 0) {
      if (response.data[0].password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        if (response.data[0].username === "Support") {
          setIsSubmitted(true);
        } else {
          setIsSubmitDev(true);
        }
       
        
      }
    } else {
      // Username not found
  
      setErrorMessages({ name: "uname", message: errors.uname });
    } })
    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);
  
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="app">
        <h1>Login</h1>
        <div className="login-form">
    <div className="form">
        
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit"  />
        </div>
      </form>
    </div>
</div>
</div>
  );

//logout
function handleLogout() {
    setIsSubmitted(false)
    setIsSubmitDev(false)
}
//  let location = useLocation()
//  console.log(location)
  return (
   <div>
        
        {/* { isSubmitted ? <Upload  logout={handleLogout}  /> : renderForm} 
         { isSubmitDev ? <Dashboard  logout={handleLogout}  /> : renderForm} */}
         
      {(() => {
        if (isSubmitted) {
          return (
            <Upload  logout={handleLogout}  />
          )
        } else if (isSubmitDev) {
          return (
            <Approve  logout={handleLogout}  />
          )
        } else {
          return (
            renderForm
          )
        }
      })()}
   
   </div>
  );
}

export default App;