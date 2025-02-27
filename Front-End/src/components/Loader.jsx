import React, { useEffect } from "react";
import { motion } from "framer-motion";

const FullScreenLoader = () => {
  useEffect(() => {
    const scriptId = "dotlottie-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
      script.type = "module";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="fixed inset-0 flex justify-center items-center z-50 w-screen h-screen bg-black"
      style={{
        backgroundColor: "black", // Ensures background stays black
        pointerEvents: "none", // Prevents interaction while fading
      }}
    >
      <dotlottie-player
        src="https://lottie.host/2882cdd6-cf14-49d1-a3eb-00955e1db15c/M7qBfSUnF7.lottie"
        background="transparent"
        speed="1"
        className="w-screen h-screen object-cover"
        direction="1"
        playMode="forward"
        loop
        autoplay
      ></dotlottie-player>
    </motion.div>
  );
};

export default FullScreenLoader;
