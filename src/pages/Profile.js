import React, {useState} from "react";
import axios from "axios";


function Profile() {
  const [passcode, setpasscode] = useState()
     const storeID = 2
     const yearnum = 2
     const mothnum = 2
 
     const aDD =()=>{
 
      axios.post('http://localhost:80/dd',{id:storeID, year:yearnum, monthnum:mothnum})
    .then((respon)=> setpasscode(respon.data))
    .catch((err)=> console.log(err))
  
    
  }

    return(
    <div> 
       <button onClick={aDD}>ok</button>
       {passcode}
    </div>
    )
}

export default Profile