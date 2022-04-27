import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoContextAPI = createContext();

const CryptoContext = ({ children }) => {
  // The state creation
  const [currency, setCurrency] = useState("NGN");
  const [symbol, setSymbol] = useState("N");

  useEffect(() => {
    if (currency === "NGN") {
      setSymbol("₦");
    } else if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "EUR") {
      setSymbol("€");
    }
  }, [currency]);

  return (
    <CryptoContextAPI.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContextAPI.Provider>
  );
};

export default CryptoContext;

// To export the state
export const CryptoState = () => useContext(CryptoContextAPI);
