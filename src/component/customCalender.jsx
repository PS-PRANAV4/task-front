// CalendarView.js
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/CalendarView.css'; // Custom styles if needed
import axios from 'axios';
import { useEffect } from 'react';

const locales = {
  'en-US': enUS,
};

const formatDate = (date) => format(date, 'MMM dd, yyyy', { locale: locales['en-US'] });
const parseDate = (dateString) => parse(dateString, 'MMM dd, yyyy', new Date(), { locale: locales['en-US'] });
const startOfWeekDate = (date) => startOfWeek(date, { weekStartsOn: 0 });
const getDayOfWeek = (date) => getDay(date);

const localizer = dateFnsLocalizer({
  format: formatDate,
  parse: parseDate,
  startOfWeek: startOfWeekDate,
  getDay: getDayOfWeek,
  locales: Object.keys(locales),
});

// Sample events data
const events = [
  {
    title: 'All Day Event',
    start: new Date(2024, 9, 3),
    end: new Date(2024, 9, 3),
  },
  {
    title: 'Another Event',
    start: new Date(2024, 9, 5, 10, 0),
    end: new Date(2024, 9, 5, 12, 0),
  },

];

const CalendarView = () => {

  const [calenderState,setCalanderState] = useState([])
  const [response, setResponse] = useState('');
  useEffect(() => {
    // This is where the side effect happens
    const fetchData = async () => {
      try {
        
        
              const res  = await axios.get( process.env.REACT_APP_API_URL +'task_api/tasks/',{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
              })
        
              if(res.status){

                const arr = res.data.map((singleData)=>{
                
                  const newState = {title:singleData.task_name,start:new Date(singleData.sheduled_time),end:new Date(singleData.sheduled_time)}
                  return newState
                  
                })
                console.log(arr);
                setCalanderState(arr)
                
                setResponse("Task Added")
              }
             
              
          } catch (err) {
        
            setResponse('Task ADD Failed')
            
              
        
              
          } 
    };

    fetchData();

    // Optional cleanup function
    return () => {
      console.log('Cleanup on unmount');
    };
  }, []); 

  return (
    <div className="calendar-container" style={{width:"100%"}} >
      <h1 className="calendar-title">Event Calendar</h1>
      <div >
      <Calendar 
        localizer={localizer}
        events={calenderState}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        popup
        selectable
        eventPropGetter={(event) => ({
          className: event.isImportant ? 'important-event' : 'normal-event',
        })}
        onSelectEvent={(event) => alert(event.title)} 
      />
      </div>
    </div>
  );
};

export default CalendarView;
