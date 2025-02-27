import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import BestRouteVisualization from "./pages/BestRouteVisualization";
import FullScreenLoader from "./components/Loader";

// Protect routes that require authentication
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />; // Use loader instead of "Loading..."

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Show loader on first load or refresh
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling during loading

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto"; // Restore scrolling after loading
    }, 700); // Increased duration for smoother experience

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FullScreenLoader />; // Ensures full-screen loader appears
  }

  return (
    <AuthProvider>
      <AppContextProvider>
        <div className="bg-black min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route
                path="/map"
                element={
                  <PrivateRoute>
                    <Map />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bestRoute"
                element={
                  <PrivateRoute>
                    <BestRouteVisualization />
                  </PrivateRoute>
                }
              />

              {/* Redirect all unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AppContextProvider>
    </AuthProvider>
  );
}
