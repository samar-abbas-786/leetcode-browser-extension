import { createContext, useState, useContext } from "react";

// 1. Create the context
const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiKey = () => useContext(ApiContext);
