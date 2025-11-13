import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'
import EventModal from './EventModal'

const STATUS_COLORS = {
  SCHEDULED: '#2563eb',
  IN_PROGRESS: '#f97316',
  COMPLETED: '#16a34a',
  CANCELLED: '#ef4444'
}

export default function CalendarPage(){
  const calendarRef = useRef(null)
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const API = import.meta.env.VITE_API_BASE || 'https://ot-backend-g90m.onrender.com/api'

  useEffect(()=>{ fetchEvents() },[])

  async function fetchEvents(){
    try{
      const res = await axios.get(`${API}/bookings`)
      const data = res.data || []
      const mapped = data.map(b => ({
        id: b.id,
        title: b.patientName || b.id,
        start: b.scheduledStart,
        end: b.scheduledEnd,
        extendedProps: { status: b.status },
        backgroundColor: STATUS_COLORS[b.status] || STATUS_COLORS.SCHEDULED,
        borderColor: STATUS_COLORS[b.status] || STATUS_COLORS.SCHEDULED
      }))
      setEvents(mapped)
    }catch(e){
      console.error('fetch events error', e)
    }
  }

  function handleDateSelect(selectInfo){
    setSelected({
      start: selectInfo.startStr,
      end: selectInfo.endStr
    })
    setModalOpen(true)
  }

  function handleEventClick(clickInfo){
    setSelected({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      status: clickInfo.event.extendedProps.status
    })
    setModalOpen(true)
  }

  async function saveEvent(payload){
    try{
      if(payload.id){
        await axios.put(`${API}/bookings/${payload.id}`, {
          scheduledStart: payload.start,
          scheduledEnd: payload.end
        })
      } else {
        await axios.post(`${API}/bookings`, {
          patientName: payload.title,
          scheduledStart: payload.start,
          scheduledEnd: payload.end,
          status: payload.status || 'SCHEDULED'
        })
      }
      setModalOpen(false)
      fetchEvents()
    }catch(e){
      console.error('save error', e)
      alert('Unable to save. Check console.')
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Calendar (Week view)</h2>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        }}
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        height="auto"
      />

      <EventModal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        initial={selected}
        onSave={saveEvent}
      />
    </div>
  )
}
