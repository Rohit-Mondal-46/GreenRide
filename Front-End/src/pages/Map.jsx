import map_char from "../assets/map_char.jpg";
import loaderAnimation from "../assets/Loader.json";

"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RouteContext } from "../context/RouteContext";
import Lottie from "lottie-react";
import { findGeocode } from "../services/findCoords";
import { log } from "console";

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-1000" />;
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const api_key = import.meta.env.VITE_GEOCODE_API_KEY;
  const [startLatLng, setStartLatLng] = useState({});
  const [endLatLng, setEndLatLng] = useState({});
  const navigate = useNavigate();

  const { setRoute } = useContext(RouteContext);
  const backend_api = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  console.log("backend api url:",backend_api);
  
  // findGeocode()

  useEffect(() => {
    if (startLatLng.lat && endLatLng.lat) {
      fetchAqiData(startLatLng, endLatLng);
    }
  }, [startLatLng, endLatLng]);

  const fetchAqiData = async (startLatLng, endLatLng) => {
    try {
      const response = await axios.post(
        `${backend_api}/api/routes/optimize`,
        {
          startPoint: { lat: startLatLng.lat, lng: startLatLng.lng },
          endPoint: { lat: endLatLng.lat, lng: endLatLng.lng },
          mode: "walking",
        },
        {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
        }
      );
      console.log("fetchedAqi: ",response.data);
      setRoute(response.data)
      setLoading(false);
      navigate("/bestRoute");
    } catch (error) {
      console.error("Error optimizing route:", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const startLatLngResult = await findGeocode(startPoint);
      const endLatLngResult = await findGeocode(endPoint);

      if (!startLatLngResult || !endLatLngResult) {
        setLoading(false);
        return;
      }

      setStartLatLng(startLatLngResult);
      setEndLatLng(endLatLngResult);
    } catch (error) {
      console.error("Error fetching geocode:", error);
      setLoading(false);
    }
  };

  return (
    <div ref={ref} className="relative min-h-screen bg-black text-gray-100 flex items-center justify-center">
      <ParticleBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <motion.h1 className="text-4xl font-bold text-green-300" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>Find Your Route</motion.h1>
          <input type="text" placeholder="Start Point" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} className="w-full p-2 rounded-lg bg-black/50 border border-green-400 text-green-300 placeholder-gray-400 focus:outline-none" />
          <input type="text" placeholder="End Point" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} className="w-full p-2 rounded-lg bg-black/50 border border-green-400 text-green-300 placeholder-gray-400 focus:outline-none" />
          <button onClick={handleSearch} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-black font-bold rounded-lg shadow-lg transition-all">Search Route</button>
        </div>
        <motion.div className="flex justify-center items-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.1, opacity: 1 }} transition={{ duration: 1 }}>
          {loading ? <Lottie animationData={loaderAnimation} className="w-48 h-48" /> : <img src={map_char} alt="Map Character" className="w-[90%] h-auto max-w-xl" />}
        </motion.div>
      </div>
    </div>
  );
}
