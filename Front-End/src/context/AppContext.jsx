import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState("Welcome to GreenRide!");

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for accessing context
export function useAppContext() {
  return useContext(AppContext);
}
