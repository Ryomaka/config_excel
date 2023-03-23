
import MaterialTable from '@material-table/core'
import  { read, utils,write  }  from 'xlsx'
import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogContentText,
  DialogActions
} from '@mui/material'
import './CSS/Upload.css'
import React ,{useState} from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";


import * as FormData  from 'form-data'
export default function App({logout}) {


  const [data, setData] = useState()//แสดงข้อมูลหน้าfront
  const [column, setColumn] = useState()//แสดงข้อมูลหน้าfront
  const [show, setShow] = useState(false)
  const [noData, setNodata] = useState(false)
  const [saveFile, setSavefile] = useState(false)

  //login
  // let location = useLocation()
  // console.log('====')
  // console.log(location.state)
  
 
  //send backend
  const [nameFile, setnameFile] = useState()
  const [FileEx, setfileEx] = useState()
  const [sheetName, setSheetName] = useState()
  
const ts = new Date()
 const date_ob = new Date(ts)
 const time = date_ob.getMonth() + 1 + "-" + date_ob.getDate() + "-" + date_ob.getFullYear() 
// console.log(time)


  const importExcel =  (e)=> {
  //===========
  const file = e.target.files[0]

  setnameFile(file.name)
  
  const reader = new FileReader()
  const convertToJson = (headers, data)=>{
    const rows =[]
   
       data.forEach(element => {
         let rowData ={}
         element.forEach((row, index)=>{
          rowData[headers[index]]=row
         } )
         rows.push(rowData)
       });

      return rows
  }
  reader.onload=(event)=>{
      //===========
      const bstr = event.target.result
      const workBook = read(bstr, {type:'binary'})

      const workSheetName = workBook.SheetNames[1]
      const workSheet = workBook.Sheets[workSheetName]
      const fileData = utils.sheet_to_json(workSheet, {header:1})
      const fileData2 = utils.sheet_to_json(workSheet)
    
      setSheetName(workBook.SheetNames[1])
      setfileEx(fileData2)
      const headers =fileData[0]
      const heads = headers.map(head=>({title:head, field:head}))
      fileData.splice(0, 1)
    
      setColumn(heads)
      setData(convertToJson(headers, fileData))
  } 
       reader.readAsBinaryString(file)
      
 }

 const exportData2 =  async()=>{
  try {
   
  const worksheet = utils.json_to_sheet(FileEx);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // console.log(fileData)
  let fromdata = new FormData()
  fromdata.append('file', fileData)
  fromdata.append('name', nameFile )
   await axios.post('http://localhost:80/input_item', fromdata   )
   .then(()=>setShow(false)).then(()=>setSavefile(true))
  
  } catch (error) {
    setNodata(true)
    setShow(false)
    console.log(error)
   }
 }


  return (
    <div className="App">
      <button className="logout" onClick={logout} > Logout </button>
      <h1 align='center'> Convert File Excel. </h1>
      <div className="input-file">
        <input type="file" name="file"  className="import" id="inputGroupFile" required  onChange={importExcel} 
         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
         <button className="save" onClick={()=> setShow(true)} > ยืนยัน </button>
        
            
      </div>
       <Dialog 
       open={show}
       onChange={()=> setShow(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
            <DialogTitle id="dialog-title" >&#9989;โปรดยืนยัน </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">ต้องการส่งไฟล์นี้หรือไม่</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={()=> setShow(false)}>ไม่</Button>
               <Button autoFocus onClick={exportData2}>ใช่</Button>
            </DialogActions>
       </Dialog>
      <div className="table">
      <MaterialTable  title='Show Data' data={data} columns={column} />
      </div>
      <Dialog 
       className="dialog"
       open={noData}
       onChange={()=> setNodata(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
        
            <DialogTitle id="dialog-title" >&#10067;เกิดข้อผิดพลาด</DialogTitle>
            <DialogContent >
              <DialogContentText id="dialog-description">โปรดตรวจสอบข้อมูลอีกครั้ง</DialogContentText>
            </DialogContent>
            <DialogActions>
               
               <Button autoFocus onClick={()=> setNodata(false)}>ตกลง</Button>
            </DialogActions>
       </Dialog>
       <Dialog 
       className="dialog"
       open={saveFile}
       onChange={()=> setSavefile(false)}
       aria-labelledby="dialog-title"
       aria-describedby="dialog-description">
        
            <DialogTitle id="dialog-title" >&#10071; แจ้งเตือน</DialogTitle>
            <DialogContent >
              <DialogContentText id="dialog-description">ส่งข้อมูลเรียบร้อย</DialogContentText>
            </DialogContent>
            <DialogActions>
               
               <Button autoFocus onClick={()=> setSavefile(false) }>ตกลง</Button>
            </DialogActions>
       </Dialog>
    </div>
  );
}