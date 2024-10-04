import React from 'react'
import Sidebar from '../component/sidbar'


import CalendarView from '../component/customCalender';
function TaskCalander() {
    
  return (
    <div style={{display:'flex',}} >
        <div style={{ width:"18%"}}  >
        <Sidebar></Sidebar>
        </div>
<div  >
        <CalendarView/>
        </div>
    </div>
  )
}

export default TaskCalander
