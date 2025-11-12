import React, { useEffect, useState } from "react";
import API from "../api";

const TheatreList = () => {
  const [ots, setOts] = useState([]);

  useEffect(() => {
    API.get("/ots").then((res) => setOts(res.data));
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">Available OTs</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {ots.map((ot) => (
          <li key={ot.id}>{ot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TheatreList;
