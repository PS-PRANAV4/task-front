import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TextField, MenuItem, Select, FormControl, InputLabel,Button,Switch   } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;


const DataTableComponent = (props) => {

    const {columns,data,handleClickRow,search_filter} = props
    const [filterText, setFilterText] = useState('');
 

    const [ tableData,setTableData] = useState([])
  const navigate = useNavigate();
  const handleRowClicked = (row)=>{
    if(handleClickRow)
        {
            handleClickRow(row)
        }
  }



  const handleEdit = (row) => {
    
    console.log('Edit row:', row);
   
    navigate(`/edit/${row.id}`);
  };

  const handleDelete =async (row) => {
    try {
        
        
        const res  = await axios.delete( process.env.REACT_APP_API_URL +`task_api/tasks/${row.id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
  
        if(res.status){
         fetchData()
          
          

          
         
        }
       
        
    } catch (err) {
  

      
        
  
        
    } 
   
   
  };

  const s = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Task Name', selector: row => row.task_name,  },
    { name: 'Sheduled Time', selector: row => row.sheduled_time,  },
    {
        name: 'Task Status',
        cell: (row) => (
          <Switch
            checked={row.task_status}
            onChange={() => handleStatusToggle(row)}
            color="primary"
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },

    {
      name: 'Edit',
      cell: (row) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(row)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
         
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
        name: 'Delete',
        cell: (row) => (
            <>
            <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(row)}
          >
            Delete
          </Button>
           
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
  ];
 
  const handleStatusToggle = async (row)=>{
    console.log("row clicked");
    
    try {
        
        
        const res  = await axios.get( process.env.REACT_APP_API_URL +`task_api/change-status/${row.id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
  
        if(res.status){
         fetchData()
          
          

          
         
        }
       
        
    } catch (err) {
  

      
        
  
        
    } 
  }
  const fetchData = async () => {
    try {
      
      
            const res  = await axios.get( process.env.REACT_APP_API_URL +'task_api/tasks/',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            })
      
            if(res.status){
              console.log(res.data);
              setTableData(res.data)
              

              
            
            }
           
            
        } catch (err) {
      
         
          
            
      
            
        } 
  };

useEffect(() => {
   
    

    fetchData();

   
    return () => {
      console.log('Cleanup on unmount');
    };
  }, []);

  return (
    <div>
      <FilterContainer>
        <TextField
          label="Filter by Name"
          variant="outlined"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
       
      </FilterContainer>
      <DataTable
        columns={s}
        data={tableData}
        pagination
        highlightOnHover
        onRowClicked={handleRowClicked}

        pointerOnHover
      />
    </div>
  );
};

export default DataTableComponent;