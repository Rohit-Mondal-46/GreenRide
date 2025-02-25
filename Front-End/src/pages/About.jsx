"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";

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

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-30" />;
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const headingText = "Discover Our Universe";

  const cardData = [
    { title: "Eco-Friendly Rides", description: "Electric bikes that reduce pollution & promote sustainability." },
    { title: "Affordable & Efficient", description: "Budget-friendly commuting with hassle-free pricing plans." },
    { title: "Smart & Convenient", description: "Locate, unlock, & ride using our AI-powered app for seamless travel." },
    { title: "Real-Time Air Quality", description: "Live updates to help you pick the safest cycling routes." },
    { title: "Secure & Reliable", description: "GPS tracking & smart locks for a safe ride experience." },
    { title: "Community Driven", description: "Join thousands of riders contributing to a sustainable world." },
  ];

  return (
    <div ref={ref} className="relative min-h-screen bg-black text-gray-100 flex flex-col items-center justify-center">
      <ParticleBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        
        {/* Animated Heading */}
        <motion.h1 
          className="text-5xl font-bold text-center text-green-300 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {headingText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (wordIndex * 3 + letterIndex) * 0.05 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 25px rgba(0, 255, 0, 0.7)",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/30 p-6 rounded-lg shadow-lg border border-green-400 text-center hover:bg-green-900/20 transition-all"
            >
              <h2 className="text-xl font-semibold text-green-300 mb-2">{item.title}</h2>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
