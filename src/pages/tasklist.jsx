import React from 'react'
import Sidebar from '../component/sidbar'
import DataTableComponent from '../component/TaskListCo';

import CalendarView from '../component/customCalender';
function TaskList() {
    
  return (
    <div style={{display:'flex',}} >
        <div style={{ width:"18%"}}  >
        <Sidebar></Sidebar>
        </div>
<div  >
<DataTableComponent/>
        </div>
    </div>
    
  )
}

export default TaskList
