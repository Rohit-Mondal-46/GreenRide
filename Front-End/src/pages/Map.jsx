import { useState, useEffect } from "react";
import L from "leaflet"; // Import Leaflet for interactive map
import "leaflet/dist/leaflet.css";

export default function Map() {
  const [aqi, setAqi] = useState(null);
  const [aqiCategory, setAqiCategory] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    const map = L.map("map").setView([28.6139, 77.209], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([28.6139, 77.209]).addTo(map).bindPopup("New Delhi").openPopup();

    return () => {
      map.remove(); // Cleanup when component unmounts
    };
  }, []);

  function getAqiCategory(aqi) {
    if (aqi <= 50) return "Good 🟢";
    if (aqi <= 100) return "Moderate 🟡";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups 🟠";
    if (aqi <= 200) return "Unhealthy 🔴";
    if (aqi <= 300) return "Very Unhealthy 🟣";
    return "Hazardous ⚫";
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Interactive Map</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div id="map" className="w-full h-80 my-4 border rounded shadow"></div>
      {aqi !== null && (
        <p className="text-xl mt-4">
          Current Air Quality Index (AQI): <strong>{aqi}</strong> ({aqiCategory})
        </p>
      )}
    </div>
  );
}
