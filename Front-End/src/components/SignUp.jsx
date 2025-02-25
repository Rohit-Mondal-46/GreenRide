import { useState, useEffect } from "react";
import { signUp } from "../context/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // ✅ Redirect logged-in users to home
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const newUser = await signUp(email, password);
    if (newUser && !newUser.error) {
      setUser(newUser);
      alert("Sign up successful! Redirecting...");
      navigate("/"); // ✅ Redirect after sign-up
    } else {
      setError(newUser.error || "Signup failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-black/50 flex items-center justify-center min-h-screen px-4 sm:px-6">
      <div className="relative p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="bg-white rounded-lg shadow p-5 sm:p-6">
          <h3 className="text-2xl font-medium text-center mb-4">Sign Up</h3>
          <p className="text-sm text-center text-slate-600 mb-6">
            Create your account and get started.
          </p>

          {/* Social Login Options */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm sm:text-base font-medium text-black rounded-lg">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5" />
              Continue with GitHub
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm sm:text-base font-medium text-black rounded-lg">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm sm:text-base font-medium text-black rounded-lg">
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
              Continue with LinkedIn
            </button>
          </div>

          <div className="flex items-center gap-2 py-6 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            OR
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          {/* Email & Password Sign-Up */}
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
            <button type="submit" className="w-full mt-4 bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium focus:ring-2 focus:ring-black">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm sm:text-base text-slate-600">
            Already have an account? <a href="/login" className="text-[#4285f4] font-medium">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
