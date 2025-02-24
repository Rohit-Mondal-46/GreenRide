import { motion } from "framer-motion";
import routeImage from "../assets/route.jpg"; // Add relevant images
import aqiImage from "../assets/aqi.jpg";
import ecoPath from "../assets/eco-path.jpg";

export default function FeatureCards() {
  const features = [
    { 
      title: "AI-Optimized Routes", 
      desc: "Get real-time bike-friendly routes avoiding high-traffic areas.",
      icon: "🚴‍♂️",
      image: routeImage
    },
    { 
      title: "Live Air Quality Index", 
      desc: "Know the pollution levels before heading out.",
      icon: "🌍",
      image: aqiImage
    },
    { 
      title: "Safe & Green Routes", 
      desc: "Navigate through eco-friendly bike paths.",
      icon: "🌿",
      image: ecoPath
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-10">🚀 Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="relative bg-transparent p-8 rounded-lg shadow-lg text-center overflow-hidden hover:shadow-5xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10">
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
