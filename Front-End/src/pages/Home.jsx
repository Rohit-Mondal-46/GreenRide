import FeatureCards from "../components/FeatureCards";
import HowItWorks from "../components/HowItWorks";
import MapComponent from "../components/MapComponent";
// import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";
import mountainride from "../assets/mountainride.jpg"; // Add

export default function Home() {
  return (
    <div>
      {/* Hero Section with Animation */}
      <header className="relative h-[90vh]">
    {/* Background Image */}
    <motion.img
      src={mountainride}
      alt="Smart Bike Ride"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    />

    {/* Overlay with Text */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-60 px-4">
      {/* Small Top Text */}
      <motion.p
        className="text-lg font-semibold uppercase tracking-wider bg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-3xl">🚴‍♂️</span> Plan Your
      </motion.p>

      {/* Main Heading */}
      <motion.h1
        className="text-6xl font-extrabold mt-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className="text-green-500">Smartest</span> Bike Ride!
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-lg mt-4 text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        AI-powered routes, pollution alerts & a safer cycling experience.
      </motion.p>

      {/* Green and White Button */}
      <motion.a
        href="/map"
        className="mt-6 px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition"
        whileHover={{ scale: 1.1 }}
      >
        Start Planning 🚲
      </motion.a>
    </div>
  </header>

      <FeatureCards />
      <HowItWorks />
      <MapComponent />
       
      <CallToAction />
    </div>
  );
}
