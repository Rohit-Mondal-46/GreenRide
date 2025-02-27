import { useState, useContext } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import bikeMapAnimation from "../assets/bike-map.json"; // Lottie animation
import { findGeocode } from "../services/findCoords";
import { LocationContext } from "../context/LocationContext";

const openCageData_Api = import.meta.env.VITE_OPENCAGEDATA_API_KEY;

export default function MapComponent() {
  const [location, setLocation] = useState("");
  const [aqi, setAqi] = useState(null);
  const [error, setError] = useState(null);
  const { currLocation } = useContext(LocationContext);

  // Function to handle reverse geocoding of the current location coordinates
  const reverseGeoCode = async () => {
    if (currLocation && currLocation.latitude && currLocation.longitude) {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${currLocation.latitude},${currLocation.longitude}&key=${openCageData_Api}&language=en&pretty=1`;
      const res = await axios.get(url);
      const formattedLocation = res.data.results[0]?.formatted;
      if (formattedLocation) {
        setLocation(formattedLocation); // Set the reverse-geocoded address to the input field
        return formattedLocation;
      } else {
        setError("Failed to reverse geocode location.");
      }
    } else {
      setError("No current location available.");
    }
    return null;
  };

  // Function to get AQI based on the location (either manually entered or reverse-geocoded)
  const getSinglePointAqi = async (useCurrentLocation = false) => {
    let resolvedLocation = location;

    if (useCurrentLocation) {
      const geoLocation = await reverseGeoCode();
      if (geoLocation) {
        resolvedLocation = geoLocation;
      } else {
        return; // Exit if reverse geocoding fails
      }
    }

    if (resolvedLocation) {
      const geocode = await findGeocode(resolvedLocation);
      console.log("Geocode:", geocode);

      const response = await axios.post(
        "http://localhost:3000/api/routes/getAqiValue",
        {
          location: { lat: geocode.lat, lng: geocode.lng },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }
      );
      console.log("aqi:",response.data);
      
      setAqi(response.data);
    }
  };

  // Handle form submission for manual input
  const handleSubmit = (e) => {
    e.preventDefault();
    getSinglePointAqi(); // Fetch AQI based on manual location input
    setError(null);
  };

  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "text-green-400";
    if (aqi <= 100) return "text-yellow-400";
    if (aqi <= 150) return "text-orange-400";
    if (aqi >= 200) return "text-red-500";
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
        🗺️ Find Aqi Level
      </motion.h2>

      <motion.p
        className="text-lg text-gray-400 transition-all duration-300 group-hover:text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Enter your location to check Aqi levels.
      </motion.p>

      <motion.div
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Player
          autoplay
          loop
          src={bikeMapAnimation}
          className="w-full md:w-2/3 lg:w-1/2"
        />
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
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-2/3 md:w-1/3 p-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-green-400"
            />

            <motion.button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-lg text-white font-bold transition relative hover:bg-green-500 hover:shadow-green-400 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #22c55e" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Check AQI
            </motion.button>

            <motion.button
              type="button" // Type "button" to avoid form submission
              onClick={() => {
                getSinglePointAqi(true); // Pass true to use the current location
              }}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white font-bold transition relative hover:bg-blue-500 hover:shadow-blue-400 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #3b82f6" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Use Current Location
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
            🚀 AQI Result:{" "}
            <strong className={`${getAqiColor(aqi)} transition-all duration-300`}>
              {aqi}
            </strong>
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
