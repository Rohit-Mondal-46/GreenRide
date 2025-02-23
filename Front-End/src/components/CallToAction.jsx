import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="bg-blue-600 text-white text-center py-16 px-8">
      <motion.h2 
        className="text-4xl font-extrabold"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        🚀 Ready to Ride Smarter?
      </motion.h2>

      <motion.p 
        className="text-lg mt-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        Join thousands of cyclists using AI-powered bike routes.
      </motion.p>

      <motion.a 
        href="/map"
        className="mt-6 px-6 py-3 bg-yellow-400 text-lg font-semibold rounded-lg inline-block shadow-md hover:scale-105 transition"
        whileHover={{ scale: 1.1 }}
      >
        Start Planning 🚲
      </motion.a>
    </section>
  );
}
