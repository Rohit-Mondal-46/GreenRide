import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { signUp, googleSignUp } from "../context/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Particle = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particles = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            filter: "drop-shadow(0 0 20px rgba(0, 255, 0, 1))",
            opacity: 1,
          }}
          initial={{ opacity: 1 }}
          animate={{
            y: [-10, windowSize.height],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const newUser = await signUp(email, password);
    if (newUser && !newUser.error) {
      setUser(newUser);
      alert("Sign-up successful! Redirecting...");
      navigate("/");
    } else {
      setError(newUser.error || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);

    const googleUser = await googleSignUp();
    if (googleUser && !googleUser.error) {
      setUser(googleUser);
      alert("Signed up successfully with Google! Redirecting...");
      navigate("/");
    } else {
      setError(googleUser.error || "Google sign-up failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Particle />
      <div className="bg-black/50 flex items-center justify-center min-h-screen px-4 sm:px-6 relative z-10">
        <div className="relative p-6 sm:p-8 w-full max-w-md">
          <div className="bg-white rounded-lg shadow p-5 sm:p-6">
            <h3 className="text-2xl font-medium text-center mb-4">Sign Up</h3>
            <p className="text-sm text-center text-slate-600 mb-6">
              Create your account and get started.
            </p>

            <div className="flex flex-col gap-3">
              <SocialButton provider="google" text="Sign up with Google" onClick={handleGoogleSignUp} />
            </div>

            <div className="flex items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div> OR <div className="h-px w-full bg-slate-200"></div>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full">
              <InputField type="email" value={email} setValue={setEmail} placeholder="Email Address" disabled={loading} />
              <InputField type="password" value={password} setValue={setPassword} placeholder="Password" disabled={loading} />
              
              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full mt-4 bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium focus:ring-2 focus:ring-black ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm sm:text-base text-slate-600">
              Already have an account? <Link to="/login" className="text-[#4285f4] font-medium">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ provider, text, onClick }) {
  const icons = {
    google: "https://www.svgrepo.com/show/475656/google-color.svg",
  };

  return (
    <button 
      onClick={onClick} 
      className="flex items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm sm:text-base font-medium text-black rounded-lg"
      aria-label={`Sign up with ${provider}`}
    > 
      <img src={icons[provider]} alt={provider} className="h-5 w-5" />
      {text}
    </button>
  );
}

function InputField({ type, value, setValue, placeholder, disabled }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      disabled={disabled}
      className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder={placeholder}
    />
  );
}
