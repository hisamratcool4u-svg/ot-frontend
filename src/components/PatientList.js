import React, { useEffect, useState } from "react";
import API from "../api";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    API.get("/patients").then((res) => setPatients(res.data));
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">Patients</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {patients.map((p) => (
          <li key={p.id}>
            {p.name} ({p.age} yrs) - {p.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
