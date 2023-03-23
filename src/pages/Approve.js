import React, {useState} from "react";
import{Link, Outlet} from 'react-router-dom'
import axios from 'axios'
import '../CSS/Dev.css'
import { NavLink } from 'react-router-dom';

import Edit from './testUpload'
import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogContentText,
  DialogActions
} from '@mui/material'

function Approve({logout}) {
  
  const [dataBase, setDatabase] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [show, setShow] = useState(false)  
  const [savedSuccessfully, setSavedSuccessfully] = useState(false)  
  const [deleteI, setDeleteI] = useState(false) 
  const [isSubmitDev, setIsSubmitDev] = useState(false) 
  const [dataBase2, setDataBase2] = useState(true) 
  const [cilckButton, setcilckButton] = useState('Editor') 
    
  if(dataBase2){
     axios.get(`http://localhost:80/show_item`,{crossdomain:true})
    .then((response)=>{
      // console.log(response)
      if(response.data.Items.length > 0){
          setDatabase(response.data.Items)
      }else{
         alert("ไม่มีข้อมูล")
      }
      
      
    }).then(setDataBase2(false)).catch((err)=>console.log(err))
  }else{

  }


    const deleteItem = (sort_key) => {
      
      axios.post('http://localhost:80/delete_item', {sort_key: sort_key})
      // .then((response)=>{console.log(response)})
      .then(()=>{ setDatabase(dataBase.filter(item => item.sort_key !== sort_key))})
      .then(()=> setDeleteI(true) )
    }      
      
    const handleRefresh = async ()=>{
        
        // await axios.get(`http://localhost:80/show_item`,{crossdomain:true})
        // .then((response)=>{
        //   // console.log(response)
        //   if(response.data.Items.length > 0){
        //       setDatabase(response.data.Items)
        //   }else{
        //      alert("ไม่มีข้อมูล")
        //   }
        // })
        setDataBase2(true)
      } 
     const delet =(sort_key)=>{
      setDatabase(dataBase.filter(item => item.sort_key !== sort_key))
     }

     const back =()=>{
      setIsSubmitDev(false)
     }
     
    const saved_successfully =()=>{
        setSavedSuccessfully(true)
    }

    const ok_set =()=>{
     
      setSavedSuccessfully(false)
      setDataBase2(true)
  }

     const handleConfirm = (sort_key, name, time, status)=>{
      axios.post(`http://localhost:80/upload`,{sort_key:sort_key, name:name, time:time})
      .then(async()=>{
        axios.post(`http://localhost:80/config`,{name:name, time:time, sort_key:sort_key, status:status})
        await axios.post(`http://localhost:80/delete_item`,{sort_key:sort_key})
      })
      // .then(()=>{ axios.post(`http://localhost:80/delete_item`,{sort_key:sort_key})})
       .then(()=>{
        
        setDatabase(dataBase.filter(item => item.sort_key !== sort_key))
        setShow(true)
        
      })
      .catch((err)=>console.log(err))
     }

     
    const editItem =(sort_key, name, time)=>{
      setIsSubmitDev(true)
  
      setDataEdit(
        {
          sort_key:sort_key, name:name, time:time , back , saved_successfully
        }
      )
      // .then(setcilckButton('save'))
 
    }
    const MainForm =(
      <div className='app-container'>
    <h1>Hello Dev.</h1>   
       {/* <Link to="ryoma">Ryoma</Link>
       <Outlet/> */}
       
       <div className='container_dev'>
         <button className='button_logout' onClick={logout}>Logout</button>
         {/* <button className='button_refresh'  onClick={handleRefresh}  > Show data </button> */}
       </div>
    
       <div className='table_scroll'>
       <table>
           <thead>
                 <tr>
                     <th> No.</th>
                     <th> ชื่อไฟล์ </th>
                     <th> หมายเลข </th>
                     <th> เวลาอัพโหลด </th>
                     <th>  </th>
                     <th>   </th>
                 </tr>
           </thead>
           <tbody>
            
                  {dataBase.map((items, index)=>(
                 <tr key={index+1}>

                    <td >{index+1} </td> 
                    <td> {items.status === 'true' ? '*'+items.name : items.name}</td>
                    <td> {items.sort_key} </td>
                    <td> {items.time}   </td>
                    <td><button className='button_confirm'  onClick={()=>{ handleConfirm(items.sort_key,items.name,items.time,items.status )}}  > Confirm </button></td>
                    <td><button className='button_delete'  onClick={()=>{ deleteItem(items.sort_key)}}  > Delete </button></td>
                    <td>  <button className='button_edit' onClick={()=>{ editItem(items.sort_key,items.name,items.time)}}>{cilckButton} </button></td>
                 </tr>


                  ))}
              
           </tbody>
       </table>
                  
       </div>
       
       <Dialog 
       open={show}
       onChange={()=> setShow(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
            <DialogTitle id="dialog-title" >&#9989; แจ้งเตือน </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">อัพโหลดข้อมูลเรียบร้อย</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={()=> setShow(false)}>ตกลง</Button>
            </DialogActions>
       </Dialog>

       <Dialog 
       open={deleteI}
       onChange={()=> setDeleteI(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
            <DialogTitle id="dialog-title" >&#10062; แจ้งเตือน </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">ลบข้อมูลเรียบร้อย</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={()=> setDeleteI(false)}>ตกลง</Button>
            </DialogActions>
       </Dialog>

       <Dialog 
       open={savedSuccessfully}
       onChange={()=> setSavedSuccessfully(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
            <DialogTitle id="dialog-title" >&#9989; แจ้งเตือน </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">แก้ไขข้อมูลเรียบร้อย</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={ok_set}>ตกลง</Button>
            </DialogActions>
       </Dialog>
    </div>
    )

    return(
    //   <div>
    //      {(()=>{
    //   if (isSubmitDev) {
    //     return (<Edit data={dataEdit} />)
    //   } else {
    //     return (MainForm)
    //   }
    // })()}
    //   </div>
       isSubmitDev ? <Edit data={dataEdit} /> : MainForm
   
        
      

      
       
    )
}

export default Approve