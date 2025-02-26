import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import bikeMapAnimation from "../assets/bike-map.json"; // Add a JSON Lottie file

export default function MapComponent() {
  const [aqi, setAqi] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            fetchAqiData(latitude, longitude);
          },
          (err) => {
            console.error("Error getting location:", err);
            setError("Failed to retrieve location. Using default coordinates.");
            setLocation({ lat: 28.6139, lon: 77.209 }); // Default to New Delhi
            fetchAqiData(28.6139, 77.209);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLocation({ lat: 28.6139, lon: 77.209 }); // Default location
        fetchAqiData(28.6139, 77.209);
      }
    };

    const fetchAqiData = async (lat, lon) => {
      setLoading(true);
      const apiKey = import.meta.env.VITE_AIR_QUALITY_API; // Using env variable

      if (!apiKey) {
        console.error("API key is missing! Check your .env file.");
        setError("API key is missing.");
        setLoading(false);
        return;
      }

      const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch AQI data");

        const data = await response.json();
        setAqi(data.data.current.pollution.aqius);
      } catch (error) {
        console.error("Error fetching AQI data:", error);
        setError("Error fetching AQI data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

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
      {/* Title with Hover Effect */}
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
        Check routes and pollution levels before heading out.
      </motion.p>

      {/* Lottie Animation with Hover Effect */}
      <motion.div
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Player autoplay loop src={bikeMapAnimation} className="w-2/3 md:w-1/3" />
      </motion.div>

      {/* Location & AQI Display */}
      {loading ? (
        <p className="text-white mt-4">Fetching location and AQI data...</p>
      ) : error ? (
        <p className="text-red-400 mt-4">{error}</p>
      ) : (
        <>
          <motion.p
            className="text-lg mt-4 transition-transform duration-300 group-hover:scale-110"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            📍 Location: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
          </motion.p>

          <motion.p
            className="text-xl mt-2 transition-transform duration-300 group-hover:scale-110"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            🌍 Air Quality Index:{" "}
            <strong className={`${getAqiColor(aqi)} transition-all duration-300`}>
              {aqi}
            </strong>
          </motion.p>
        </>
      )}
    </section>
  );
}