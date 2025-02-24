import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowNav(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!showNav) return null;

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            to="/"
            className="relative text-2xl font-bold transition duration-300 
                       hover:text-green-500 
                       before:absolute before:inset-0 before:blur-xl 
                       before:content-[attr(data-text)] before:text-green-500"
            data-text="GreenRide🚲"
          >
            GreenRide🚲
          </Link>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex justify-center items-center">
          <div className="flex border border-green-600 rounded-full overflow-hidden">
            {["Home", "Map", "About", "Contact"].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1"
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="block px-6 py-3 text-center transition duration-300 hover:bg-green-500 hover:text-black"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden block text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden mt-4"
        >
          {["Home", "Map", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block py-2 text-center transition duration-300 hover:bg-green-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
