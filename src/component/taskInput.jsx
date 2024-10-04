import React, { useState } from 'react';
import '../css/taskinput.css';
import axios from 'axios';


function TaskInput() {
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [response, setResponse] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   const  data = {
      task_name:taskName,
      task_details:taskDetails,
      sheduled_time:taskDate
    }
    console.log(data);
    
    try {
console.log(localStorage.getItem("token"));

      const res  = await axios.post( process.env.REACT_APP_API_URL +'task_api/tasks/', data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })

      if(res.status){
        setResponse("Task Added")
      }
     
      
  } catch (err) {

    setResponse('Task ADD Failed')
    
      

      
  } 
  };
  const changeName = (e,type)=>{

    
   setResponse('')



switch(type) {
  case 1:
    setTaskName(e.target.value)
    break;
  case 2:
    setTaskDetails(e.target.value)
    break;
  case 3:
    setTaskDate(e.target.value)
    break;

  default:
    console.log("Invalid day");
    
    
}


  }

  return (
    <>
    <div style={{
        width: "100%",
        height: 500,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
            fontSize: '24px',
            color: '#ffffff',
            marginBottom: '20px'
          }}>Create Task</div>
  
    <div>
        <input type="text" 
        onChange={(e)=>changeName(e,1)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #9575cd', 
            borderRadius: '5px',
            marginBottom: '20px',
            backgroundColor: '#673ab7', 
            color: '#fff',
            width: '250px', 
            outline: 'none'
          }} 
          placeholder="Enter task name"
        />
        </div>
        <div>
         <input type="text" 
         onChange={(e)=>changeName(e,2)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #9575cd', 
            borderRadius: '5px',
            marginBottom: '20px',
            backgroundColor: '#673ab7', 
            color: '#fff',
            width: '250px', 
            outline: 'none'
          }} 
          placeholder="Enter task name"
        />
        </div>
       
  
  
        
        <div className="task-container">
          <input type="date" 
          onChange={(e)=>changeName(e,3)}
            id="task-date" 
            className="task-date-picker"
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #9575cd', 
              borderRadius: '5px',
              backgroundColor: '#673ab7',
              color: '#fff',
              width: '250px', 
              outline: 'none'
            }}
          />
        </div>
  
      
        <button onClick={handleSubmit} type='submit' style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#673ab7',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
          Add Task
        </button>
        <div>{response}</div> 
      </div>
    </div>
  </>
  
  );
}

export default TaskInput;
