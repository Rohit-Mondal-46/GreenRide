import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import { useEffect } from "react";

// Protect routes that require authentication
function PrivateRoute({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    console.log("Current User:", user); // ✅ Debugging user state
  }, [user]);

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <div className="bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <Map />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </AppContextProvider>
    </AuthProvider>
  );
}
