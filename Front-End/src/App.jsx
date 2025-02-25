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

// Protect routes that require authentication
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default function App() {
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
