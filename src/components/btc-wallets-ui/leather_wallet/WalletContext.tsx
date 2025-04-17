// src/context/WalletContext.tsx
import React, { createContext, useState, useContext } from "react";

// Define the shape of the context data
interface WalletContextProps {
  walletAddress: string | null;
  setWalletAddress: (address: string) => void;
}

// Create the context with default values
const WalletContext = createContext<WalletContextProps>({
  walletAddress: null,
  setWalletAddress: () => {},
});

// Export a hook to use the context
export const useWallet = () => useContext(WalletContext);

// Provide the context to your application
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
