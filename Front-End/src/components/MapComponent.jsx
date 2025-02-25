import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
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

      {/* AQI Display with Dynamic Color */}
      {aqi !== null && (
        <motion.p
          className="text-xl mt-4 transition-transform duration-300 group-hover:scale-110"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🌍 Air Quality Index:{" "}
          <strong className={`${getAqiColor(aqi)} transition-all duration-300`}>
            {aqi}
          </strong>
        </motion.p>
      )}
    </section>
  );
}