import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative bg-gradient-to-r from-black via-gray-500 to-black text-white text-center py-20 px-8 transition-all duration-500 group hover:brightness-110 hover:shadow-[0_0_40px_rgba(0,255,0,0.3)]">
      
      {/* Glowing Floating Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-green-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-green-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Title with Glow Effect */}
      <motion.h2
        className="text-4xl font-extrabold transition-all duration-300 group-hover:text-green-400 group-hover:scale-110"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ textShadow: "0px 0px 10px rgba(0, 255, 0, 0.8)" }}
      >
        🚀 Ready to Ride Smarter?
      </motion.h2>

      {/* Subtext with Hover Effect */}
      <motion.p
        className="text-lg mt-4 text-gray-300 transition-all duration-300 group-hover:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Join thousands of cyclists using AI-powered bike routes.
      </motion.p>

      {/* CTA Button with Ripple Glow Effect */}
      <motion.a
        href="/map"
        className="relative mt-6 px-8 py-4 bg-green-500 text-lg font-semibold rounded-lg inline-block shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-green-600 active:scale-95 overflow-hidden"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 255, 0, 0.5)" }}
      >
        Start Planning 🚲
        {/* Ripple Glow Effect */}
        <span className="absolute inset-0 bg-white opacity-10 rounded-lg transition-all duration-500 group-hover:opacity-20 animate-ping"></span>
      </motion.a>
    </section>
  );
}
