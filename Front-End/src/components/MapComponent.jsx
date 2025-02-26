import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import bikeMapAnimation from "../assets/bike-map.json"; // Lottie animation

export default function MapComponent() {
  const [startLocation, setStartLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [startAqi, setStartAqi] = useState(null);
  const [dropAqi, setDropAqi] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_AIR_QUALITY_API; // AQI API Key
  const geocodeApiKey = import.meta.env.VITE_GEOCODING_API; // Google Geocoding API Key

  // Convert location names to lat/lon using Geocoding API
  const fetchCoordinates = async (location, type) => {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${geocodeApiKey}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        if (type === "start") setStartCoords({ lat, lon: lng });
        else setDropCoords({ lat, lon: lng });

        fetchAqiData(lat, lng, type);
      } else {
        throw new Error("Invalid location entered.");
      }
    } catch (err) {
      setError("Error fetching location coordinates.");
      console.error(err);
    }
  };

  // Fetch AQI for the given coordinates
  const fetchAqiData = async (lat, lon, type) => {
    if (!apiKey) {
      setError("API key is missing! Check your .env file.");
      return;
    }

    const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch AQI data");

      const data = await response.json();
      const aqi = data.data.current.pollution.aqius;

      if (type === "start") setStartAqi(aqi);
      else setDropAqi(aqi);
    } catch (err) {
      setError("Error fetching AQI data.");
      console.error(err);
    }
  };

  // Handle Location Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (startLocation) fetchCoordinates(startLocation, "start");
    if (dropLocation) fetchCoordinates(dropLocation, "drop");
  };

  // Dynamic AQI color function
  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "text-green-400";
    if (aqi <= 100) return "text-yellow-400";
    if (aqi <= 150) return "text-orange-400";
    if (aqi <= 200) return "text-red-500";
    return "text-purple-500";
  };

  return (
    <section className="text-center py-10 bg-black text-white group">
      <motion.h2
        className="text-4xl font-bold transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:text-green-400"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🗺️ Plan Your Ride
      </motion.h2>

      <motion.p
        className="text-lg text-gray-400 transition-all duration-300 group-hover:text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Enter your start and destination to check pollution levels.
      </motion.p>

      {/* Lottie Animation */}
      <motion.div
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Player autoplay loop src={bikeMapAnimation} className="w-2/3 md:w-1/3" />
      </motion.div>

      {/* Location Input Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Enter start location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="w-2/3 md:w-1/3 p-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-green-400"
        />
        <input
          type="text"
          placeholder="Enter drop location"
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
          className="w-2/3 md:w-1/3 p-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-green-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition"
        >
          Check AQI
        </button>
      </form>

      {/* Display AQI Results */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      <div className="mt-6">
        {startAqi !== null && (
          <motion.p
            className="text-xl transition-transform duration-300 group-hover:scale-110"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            🚀 Start Location AQI:{" "}
            <strong className={`${getAqiColor(startAqi)} transition-all duration-300`}>
              {startAqi}
            </strong>
          </motion.p>
        )}

        {dropAqi !== null && (
          <motion.p
            className="text-xl transition-transform duration-300 group-hover:scale-110 mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            🏁 Destination AQI:{" "}
            <strong className={`${getAqiColor(dropAqi)} transition-all duration-300`}>
              {dropAqi}
            </strong>
          </motion.p>
        )}
      </div>
    </section>
  );
}