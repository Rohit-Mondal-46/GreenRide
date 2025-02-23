import FeatureCards from "../components/FeatureCards";
import HowItWorks from "../components/HowItWorks";
import MapComponent from "../components/MapComponent";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";
import heroBike from "../assets/hero-bike.png"; // Add a high-quality bike image

export default function Home() {
  return (
    <div>
      {/* Hero Section with Animation */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-center py-24">
        <motion.h1 
          className="text-5xl font-extrabold"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          🚴‍♂️ Plan Your Smartest Bike Ride!
        </motion.h1>

        <motion.p 
          className="text-xl mt-4"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
        >
          AI-powered routes, pollution alerts & a safer cycling experience.
        </motion.p>

        <motion.img 
          src={heroBike} 
          alt="Smart Bike Ride" 
          className="mx-auto mt-6 w-3/5 max-w-md"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2 }}
        />

        <motion.a 
          href="/map"
          className="mt-6 px-6 py-3 bg-yellow-400 text-lg font-semibold rounded-lg inline-block shadow-md hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
        >
          Start Planning 🚲
        </motion.a>
      </header>

      <FeatureCards />
      <HowItWorks />
      <MapComponent />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
