import { createContext, useState } from "react";

// Create the RouteContext
export const RouteContext = createContext();

// Create the provider component
export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState(null);

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
