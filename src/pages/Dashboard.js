import React from "react";
import CalendarView from "../components/CalendarView";
import TheatreList from "../components/TheatreList";
import PatientList from "../components/PatientList";

const Dashboard = () => (
  <div className="grid grid-cols-3 gap-4 p-4">
    <div className="col-span-2">
      <CalendarView />
    </div>
    <div className="col-span-1 bg-gray-100 p-4 rounded-xl">
      <TheatreList />
      <hr className="my-4" />
      <PatientList />
    </div>
  </div>
);

export default Dashboard;
