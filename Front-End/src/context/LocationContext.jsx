import { createContext, useState, useContext } from "react";

// Create the Location Context
export const LocationContext = createContext();

// LocationProvider component to wrap around the app
export const LocationProvider = ({ children }) => {
  const [currLocation, setCurrLocation] = useState(null);

  

  return (
    <LocationContext.Provider value={{currLocation, setCurrLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the Location Context
// export const useLocation = () => {
//   return useContext(LocationContext);
// };


