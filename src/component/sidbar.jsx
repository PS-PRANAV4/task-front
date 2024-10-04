import React from 'react'

import '../css/sidebar.css'
import { useNavigate } from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();
   
    return (



<div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><div id="nav-title"  target="_blank"><i class="fab fa-codepen"></i>Menu</div>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
   
    <div class="nav-button" onClick={()=>navigate('/')} ><i class="fas fa-fire"></i><span>Create Task</span></div>
    <div class="nav-button" onClick={()=>navigate('/calender')}><i class="fas fa-magic"></i><span>Calender view</span></div>
    <hr/>
    <div   onClick={()=>navigate('/list')}class="nav-button"><i class="fas fa-gem"></i><span>Task list</span></div>
    <div id="nav-content-highlight"></div>
   
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
 
</div>
    )
}

export default Sidebar
