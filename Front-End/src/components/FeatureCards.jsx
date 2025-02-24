import { motion, useAnimation  } from "framer-motion";
import routeImage from "../assets/route.jpg"; // Add relevant images
import aqiImage from "../assets/aqi.jpg";
import ecoPath from "../assets/eco-path.jpg";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

  const titleControls = useAnimation();
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (titleInView) {
      titleControls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    } else {
      titleControls.start({ opacity: 0, y: 50 });
    }
  }, [titleInView, titleControls]);

  return (
    <section className="py-16 px-6 md:px-16 bg-black">
      <motion.h2 
        ref={titleRef}
        className="text-4xl font-bold text-white text-center mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={titleControls}
      >
        Discover the Difference 🌟
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const controls = useAnimation();
  const textControls = useAnimation();
  const { ref, entry } = useInView({ threshold: [0.4, 0.75, 1] });

  useEffect(() => {
    if (entry?.intersectionRatio >= 0.75) {
      controls.start({ filter: "blur(8px)", transition: { duration: 0.8 } });
      textControls.start({ opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } });
    } else if (entry?.intersectionRatio >= 0.4 && entry?.intersectionRatio < 0.75) {
      controls.start({ filter: "blur(0px)", transition: { duration: 0.8 } });
      textControls.start({ opacity: 0, filter: "blur(8px)", transition: { duration: 0.8 } });
    } else {
      textControls.start({ opacity: 0, filter: "blur(8px)", transition: { duration: 0.8 } });
    }
  }, [entry, controls, textControls]);

  return (
    <motion.div 
      ref={ref} 
      className="relative bg-white p-8 rounded-lg shadow-lg text-center overflow-hidden transition"
      whileHover={{ 
        boxShadow: "0px 0px 40px 15px rgba(0, 255, 0, 0.8)", 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.5 },
      }}
    >
      <motion.img 
        src={feature.image} 
        alt={feature.title} 
        className="absolute inset-0 w-full h-full object-cover"
        animate={controls}
      />
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={textControls}
      >
        <motion.div 
          className="text-5xl relative"
          whileHover={
            feature.icon === "🚴‍♂️" 
              ? { x: [-10, 10, -10], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } } 
              : feature.icon === "🌍"
              ? { rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } }
              : {}
          }
        >
          {feature.icon}
          {feature.icon === "🌿" && (
            <>
              <motion.span 
                className="absolute left-[-20px] opacity-50"
                initial={{ y: 0, opacity: 0 }}
                whileHover={{ y: [0, 20, 40], opacity: [1, 0.5, 0], transition: { duration: 1, repeat: Infinity, ease: "easeOut" } }}
              >🌿</motion.span>
              <motion.span 
                className="absolute right-[-20px] opacity-50"
                initial={{ y: 0, opacity: 0 }}
                whileHover={{ y: [0, 20, 40], opacity: [1, 0.5, 0], transition: { duration: 1, repeat: Infinity, ease: "easeOut" } }}
              >🌿</motion.span>
            </>
          )}
        </motion.div>
        <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
        <p className="text-black mt-2">{feature.desc}</p>
      </motion.div>
    </motion.div>
  );
}