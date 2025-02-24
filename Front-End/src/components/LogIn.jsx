// src/components/LogIn.jsx
import { useState } from "react";
import { logIn } from "../context/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const user = await logIn(email, password);

    if (user && !user.error) {
      setUser(user); 
      alert("Successfully logged in!");
      navigate("/map"); 
    } else {
      setError(user.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="p-6 bg-white rounded shadow-md max-w-sm">
        <h2 className="text-xl font-bold">Log In</h2>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
           
        </form>
        
      </div>
    </div>
  );
}
