import React from 'react'
import Sidebar from '../component/sidbar'

import TaskInput from '../component/taskInput';


function Home() {
    
  return (
    <div>
        <Sidebar></Sidebar>
      

        <TaskInput />
    </div>
  )
}

export default Home
