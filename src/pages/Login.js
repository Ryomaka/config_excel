import React  from "react";
import { Link, useNavigate } from "react-router-dom";
function Login({login}) {

     let navigate = useNavigate()
    
    return(
    <div> 
    
       <button onClick={()=>{
         login();
         navigate('/dashboard')
       }}>login</button>
       {/* <Link to='/contact' state={'Hi'}> send</Link>
       <button onClick={()=> navigate('/contact',{state:'Hi Ryo'})}>redirect</button> */}
    </div>

    )
}

export default Login