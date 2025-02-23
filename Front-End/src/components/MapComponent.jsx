import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import bikeMapAnimation from "../assets/bike-map.json"; // Add a JSON Lottie file

export default function MapComponent() {
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const fetchAqiData = async () => {
      const lat = 28.6139;
      const lon = 77.209;
      const apiKey = import.meta.env.VITE_AIR_QUALITY_API;
      const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setAqi(data.data.current.pollution.aqius);
      } catch (error) {
        console.error("Error fetching AQI data", error);
      }
    };

    fetchAqiData();
  }, []);

  return (
    <section className="text-center py-10 bg-gray-100">
      <h2 className="text-3xl font-bold">🗺️ Plan Your Ride</h2>
      <p className="text-gray-600">Check routes and pollution levels before heading out.</p>

      <div className="flex justify-center">
        <Player 
          autoplay
          loop
          src={bikeMapAnimation}
          className="w-2/3 md:w-1/3"
        />
      </div>

      {aqi !== null && (
        <p className="text-xl mt-4">
          🌍 Air Quality Index: <strong className="text-red-500">{aqi}</strong>
        </p>
      )}
    </section>
  );
}
