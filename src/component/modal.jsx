import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const CustomModal = (props) => {
  
const {modalBool,modalFunc,refresh,row,changeRow} = props
  const closeModal = () => {
    modalFunc(false)
  }
  const isModalOpen = modalBool

  


  

  const modalStyles = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    zIndex: 1000,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
  };

  const overlayStyles = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  };

  const buttonStyles = {
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 5px',
    fontSize: '16px',
  };





const SubmitModal= async (e)=>{
    e.preventDefault();
console.log("done");
try {
    console.log(row.task_name);
    const data = {
        task_name:row.task_name,
        sheduled_time:row.sheduled_time

    }
    
    console.log(localStorage.getItem("token"));
    
          const res  = await axios.patch( process.env.REACT_APP_API_URL +`task_api/tasks/${row.id}/`, data,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
    
          if(res.status){
          refresh()
          modalFunc(false)
          }
         
          
      } catch (err) {
    
     
        
          
    
          
      } 
}
const changeTaskName= (e)=>{

    
    
    const newData = {id:row.id,task_name:e.target.value,sheduled_time:row.sheduled_time}
    
    changeRow(newData)


}
const changeTime= (e)=>{


    
    const newData = {id:row.id,task_name:row.task_name,sheduled_time:e.target.value}
    
    changeRow(newData)


}

  return (
    <div>
    

      <div style={overlayStyles} onClick={closeModal}></div>

      <div style={modalStyles}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter Your Details</h2>
        <form>
          <input
            type="text"
            placeholder="task"
            value={row.task_name}
            style={inputStyles}
            onChange={changeTaskName}
          />
          <input
            type="date"
            onChange={changeTime}
            value={row.sheduled_time ? new Date(row.sheduled_time).toISOString().split('T')[0] : ''}
            style={inputStyles}
          />
         
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              onClick={SubmitModal}
              style={{ ...buttonStyles, backgroundColor: '#28a745', color: 'white' }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              style={{ ...buttonStyles, backgroundColor: '#dc3545', color: 'white' }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
