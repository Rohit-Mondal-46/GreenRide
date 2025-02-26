import { useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import bikeMapAnimation from "../assets/bike-map.json"; // Lottie animation

export default function MapComponent() {
  const [location, setLocation] = useState("");
  const [aqi, setAqi] = useState(null);
  const [error, setError] = useState(null);
  const geocodeApiKey = import.meta.env.VITE_GEOCODING_API;

  const fetchCoordinatesAndAqi = async () => {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${geocodeApiKey}`;
      
      const response = await axios.get(geocodeUrl);
      
      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        fetchAqiData(lat, lng);
      } else {
        throw new Error("Invalid location entered.");
      }
    } catch (err) {
      setError("Error fetching location coordinates.");
      console.error(err);
    }
  };

  const fetchAqiData = async (lat, lng) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/routes/getAqiValue",
        { startPoint: { lat, lng } },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      setAqi(response.data.aqi);
    } catch (err) {
      setError("Error fetching AQI data.");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (location) fetchCoordinatesAndAqi();
  };

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
        🗺️ Check AQI for Your Location
      </motion.h2>

      <motion.div
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Player autoplay loop src={bikeMapAnimation} className="w-full md:w-2/3 lg:w-1/2" />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Enter Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-2/3 md:w-1/3 p-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-green-400"
            />
            <motion.button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-lg text-white font-bold transition relative 
             hover:bg-green-500 hover:shadow-green-400 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #22c55e" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Check AQI
            </motion.button>
          </div>
        </form>
      </motion.div>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {aqi !== null && (
          <motion.p
            className="text-xl transition-transform duration-300 group-hover:scale-110"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            🌍 AQI at {location}: {" "}
            <strong className={`${getAqiColor(aqi)} transition-all duration-300`}>
              {aqi}
            </strong>
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
