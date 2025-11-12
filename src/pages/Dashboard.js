import React from "react";
import CalendarView from "../components/CalendarView";
import TheatreList from "../components/TheatreList";
import PatientList from "../components/PatientList";

const Dashboard = () => (
  <div className="min-h-screen p-6 bg-gray-100">
    <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
      🏥 Operation Theatre Management Dashboard
    </h1>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <CalendarView />
      </div>
      <div className="col-span-1 space-y-6">
        <TheatreList />
        <PatientList />
      </div>
    </div>
  </div>
);

export default Dashboard;
