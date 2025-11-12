import React, { useEffect, useState } from "react";
import API from "../api";

const TheatreList = () => {
  const [ots, setOts] = useState([]);

  useEffect(() => {
    API.get("/ots").then((res) => setOts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Available Operation Theatres</h2>
      <ul className="list-disc ml-6">
        {ots.map((ot) => (
          <li key={ot.id}>{ot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TheatreList;
