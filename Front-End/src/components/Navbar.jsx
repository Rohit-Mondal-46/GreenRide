import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { logOut } from "../context/authService"; // Import logOut function

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setShowNav(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!showNav) return null;

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="w-full flex justify-between items-center">
        {/* Logo Section - Positioned to the Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="pl-4 pt-2"
        >
          <Link
            to="/"
            className="relative text-2xl font-bold transition duration-300 
                       hover:text-green-500 before:absolute before:inset-0 
                       before:blur-xl before:content-[attr(data-text)] 
                       before:text-green-500"
            data-text="GreenRide🚲"
          >
            GreenRide🚲
          </Link>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex justify-center items-center">
          <div className="flex border border-green-600 rounded-full overflow-hidden">
            {["Home", "Map", "About"].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1"
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="block px-6 py-3 text-center transition duration-300 
                             hover:bg-green-500 hover:text-black"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-1"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full px-6 py-3 text-center transition duration-300 
                              hover:bg-red-600"
                >
                  Logout
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-1"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 min-w-[130px] 
                             transition duration-300 hover:bg-green-500 hover:text-black 
                             rounded-md whitespace-nowrap"
                >
                  Login / Signup
                </Link>
              </motion.div>
            )}
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
          className="md:hidden flex flex-col items-center w-full mt-4 space-y-3"
        >
          {["Home", "Map", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="w-3/4 text-center py-3 px-6 transition duration-300 
                         hover:bg-green-500 hover:text-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-3/4 text-center py-3 px-6 transition duration-300 
                         bg-red-500 hover:bg-red-600 rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="w-3/4 text-center py-3 px-6 transition duration-300 
                         hover:bg-green-500 hover:text-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Login / Signup
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
