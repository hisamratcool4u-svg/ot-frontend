import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import API from "../api";

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      const formatted = res.data.map(b => ({
        id: b.id,
        title: `OT-${b.ot?.name || b.otId} | ${b.patient?.name || "Patient"}`,
        start: b.scheduledStart,
        end: b.scheduledEnd,
        color: b.status === "COMPLETED" ? "#16a34a" : "#2563eb",
      }));
      setEvents(formatted);
    } catch (e) {
      console.error("Error fetching bookings", e);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDateSelect = (info) => {
    const title = prompt("Enter Patient Name:");
    if (title) {
      const newEvent = {
        patientName: title,
        scheduledStart: info.startStr,
        scheduledEnd: info.endStr,
      };
      API.post("/bookings", newEvent).then(fetchBookings);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Operation Theatre Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleDateSelect}
        events={events}
        height="80vh"
      />
    </div>
  );
};

export default CalendarView;
