import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative text-center py-24 bg-gradient-to-b from-black via-gray-900 to-green-700 text-white overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-400 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500 opacity-30 blur-3xl rounded-full"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h1
          className="text-6xl font-extrabold leading-tight text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 20px rgba(0, 255, 0, 0.7)",
            color: "#86efac",
          }}
        >
          Smart Bike Route Planner 🚴‍♂️
        </motion.h1>

        <motion.p
          className="mt-4 text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileHover={{ scale: 1.05, color: "#a7f3d0" }}
        >
          Find the cleanest and safest routes with real-time air quality updates.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/map">
            <motion.button
              className="relative px-8 py-4 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-400 transition-all duration-300 shadow-xl transform hover:scale-105"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 30px rgba(0, 255, 0, 0.8)",
              }}
            >
              Get Started
              <span className="absolute inset-0 bg-white opacity-10 rounded-lg"></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
