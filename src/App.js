import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://ot-backend-g90m.onrender.com/api';

export default function App() {
  const [ots, setOts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/ots`)
      .then(res => setOts(res.data))
      .catch(err => console.error('Error loading OTs:', err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Operation Theatre Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={ots.map(ot => ({
          title: ot.name || 'OT',
          start: ot.scheduledStart,
          end: ot.scheduledEnd
        }))}
      />
    </div>
  );
}
