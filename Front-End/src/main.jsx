import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx"; // ✅ Fixed import
import App from "./App.jsx";
import "./index.css";
import { RouteProvider } from "./context/RouteContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <RouteProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </RouteProvider>
    </AppContextProvider>
  </BrowserRouter>
);
