import { useState, useEffect } from "react";
import sen_map from "../assets/sen_map.jpg";



export default function Map() {
  const [aqi, setAqi] = useState(null);
  const [aqiCategory, setAqiCategory] = useState("");
  const [error, setError] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  useEffect(() => {
    const fetchAqiData = async () => {
      const lat = 28.6139; // Delhi coordinates
      const lon = 77.209;
      const apiKey = import.meta.env.VITE_AIR_QUALITY_API;

      if (!apiKey) {
        setError("API key is missing. Check your .env file.");
        return;
      }

      const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch AQI data");

        const data = await response.json();
        const aqiValue = data.data.current.pollution.aqius;
        setAqi(aqiValue);
        setAqiCategory(getAqiCategory(aqiValue));
      } catch (err) {
        setError("Error fetching AQI data: " + err.message);
      }
    };

    fetchAqiData();
  }, []);

  function getAqiCategory(aqi) {
    if (aqi <= 50) return "Good 🟢";
    if (aqi <= 100) return "Moderate 🟡";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups 🟠";
    if (aqi <= 200) return "Unhealthy 🔴";
    if (aqi <= 300) return "Very Unhealthy 🟣";
    return "Hazardous ⚫";
  }

  const handleSearchRoute = () => {
    alert(`Searching route from ${startPoint} to ${endPoint}`);
  };

  return (
    <div className="p-6 h-screen w-full">
      <h2 className="text-2xl font-bold mb-4">Map Route Planner</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="relative w-full h-full border rounded shadow overflow-hidden">
        <img
          src={sen_map}
          alt="Static Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <input
            type="text"
            placeholder="Start Point"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="End Point"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSearchRoute}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search Route
          </button>
        </div>
      </div>

      {aqi !== null && (
        <p className="text-xl mt-4">
          Current Air Quality Index (AQI): <strong>{aqi}</strong> ({aqiCategory})
        </p>
      )}
    </div>
  );
} 
