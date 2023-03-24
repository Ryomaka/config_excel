import React, { useState } from "react";
import { ReactExcel, generateObjects  } from "@ramonak/react-excel";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios  from "axios";
import * as FormData  from 'form-data'
import '../CSS/Edit.css'

const UploadPage = (data) => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [dataSet, setDataSet] = useState(true);



   
    if(dataSet ){
      axios.post('https://fkghv2ohm5.execute-api.ap-southeast-1.amazonaws.com/dev/dynamodb/after_edit', {name:data.data.name, time: data.data.time, sort_key: data.data.sort_key})
     .then((response)=> setInitialData(response.data)).catch((err)=>console.log(err)).then(setDataSet(false))

    }

 
  const save = async() => {
    const result = generateObjects(currentSheet);
    const services = result.find(item => item.service)
    
    if (services !== undefined) {
      var newData = result.map(obj => ({...obj, pilot_no: parseInt(obj.pilot_no)}));
    } else if(services === undefined){
      var newData = result
    }
     //save array of objects to backend
    
    // console.log(newData)
    const fileName = data.data.name;
    const sort_key = data.data.sort_key;
    const arayName = {name:fileName, sort_key:sort_key};
    
    const time = data.data.time;
  const worksheet = XLSX.utils.json_to_sheet(newData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, initialData.SheetNames[0]);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // console.log(fileData)
  let fromdata = new FormData()
  fromdata.append('file', fileData)
  fromdata.append('name',  JSON.stringify(arayName)) 
  await axios.post('https://fkghv2ohm5.execute-api.ap-southeast-1.amazonaws.com/dev/dynamodb/edit', fromdata )
  // .then(()=>{axios.post('http://localhost:80/delete_item', {sort_key:data.data.sort_key})})
  .then(()=>{axios.post('https://fkghv2ohm5.execute-api.ap-southeast-1.amazonaws.com/dev/dynamodb/status', {name:fileName, sort_key:sort_key, time:time})})
  // .then(()=>data.data.handleRefresh)
  .then(data.data.back)
  
  // .then(data.data.delet(data.data.sort_key))
  .then(data.data.saved_successfully)
  
  .catch((err)=> console(err))
  // // saveAs(fileData, fileName);
  };
  
  
  return (
    <div className="page_edit">
    <button className="button_back" onClick={data.data.back}>Back</button>
      <div className="table_edit">
        <label className="label_edit">sheet:</label>
         <ReactExcel 
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName="active-sheet"
        reactExcelClassName="react-excel"
      />
      </div>
    
      <button className="button_save_data" onClick={save}>Save</button>
    </div>
  );
};

export default UploadPage;




