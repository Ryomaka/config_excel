import React ,{ useState } from "react";
import { BrowserRouter, NavLink, Route ,Routes, Navigate } from 'react-router-dom';
// import "./App.css"

//Pages
import Error from "./pages/Error";
import Dev from "./pages/Approve";
import Edit from "./pages/testUpload";
import About from "./senddata/AboutPage";
import LOG from "./Login";
import Home from "./senddata/HomePage";
import Profile from "./pages/Profile";

function App() {

   const [logIn, setLogIn] = useState(null)
 
   function handleLogin() {
      setLogIn(true)
   }

   function handleLogout() {
    setLogIn(false)
 }


   let activeClassName = 'nav-active'


  return (
  
    <BrowserRouter > 
    <nav>
       <NavLink to="/" />
       <NavLink to="/test" />
      

    </nav>
    <Routes>
       <Route path="/" element= {<LOG login={handleLogin}/>}/>
       <Route path="/test" element={<Profile/>}/>
       <Route path="*" element={<Error/>}/>
    </Routes>
      
  </BrowserRouter>
  );
}

export default App;
