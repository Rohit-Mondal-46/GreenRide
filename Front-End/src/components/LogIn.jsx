import { useState, useEffect } from "react";
import { logIn, logInWithGoogle } from "../context/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      setPageLoading(false);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loggedInUser = await logIn(email, password);

    if (loggedInUser && !loggedInUser.error) {
      setUser(loggedInUser.user);
      alert("Successfully logged in!");
      navigate("/");
    } else {
      setError(loggedInUser.error || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const googleUser = await logInWithGoogle();

    if (googleUser && !googleUser.error) {
      setUser(googleUser.user);
      alert("Successfully logged in with Google!");
      navigate("/");
    } else {
      setError(googleUser.error || "Google login failed");
    }
    setLoading(false);
  };

  if (pageLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Particle Background Effect */}
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 1))",
          }}
          initial={{ opacity: 1 }}
          animate={{
            y: [-10, window.innerHeight],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
  
      <div className="bg-black/50 flex items-center justify-center min-h-screen px-4 sm:px-6 relative z-10">
        <div className="relative p-6 sm:p-8 w-full max-w-md"> {/* Changed from max-w-lg to max-w-md */}
          <div className="bg-white rounded-lg shadow p-5 sm:p-6">
            <h3 className="text-2xl font-medium text-center mb-4">Login to your account</h3>
            <p className="text-sm text-center text-slate-600 mb-6">
              You must be logged in to access your account.
            </p>
  
            {/* Social Login Options */}
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm sm:text-base font-medium text-black rounded-lg"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Continue with Google
              </button>
            </div>
  
            <div className="flex items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>
  
            {/* Email & Password Login */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Email Address"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Password"
              />
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">
                  Reset your password?
                </a>
              </p>
              <button
                type="submit"
                className="w-full mt-4 bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium focus:ring-2 focus:ring-black"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Continue"}
              </button>
            </form>
  
            <p className="mt-6 text-center text-sm sm:text-base text-slate-600">
              Don't have an account? <a href="/signup" className="text-[#4285f4] font-medium">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
