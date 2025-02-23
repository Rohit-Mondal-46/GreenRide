// src/components/SignUp.jsx
import { useState } from "react";
import { signUp } from "../context/authService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear errors before new submission
    const user = await signUp(email, password);

    if (user && !user.error) {
      alert("Sign up successful! Please log in.");
      navigate("/login"); 
    } else {
      setError(user.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="p-6 bg-white rounded shadow-md max-w-sm">
        <h2 className="text-xl font-bold">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" required 
            className="block w-full p-2 border rounded"
          />
          <input 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" required 
            className="block w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
