// unisat.tsx
"use client";
import { useState } from "react";

declare global {
  interface Window {
    unisat: any;
  }
}

export const ConnectUnisatWallet = () => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      if (typeof window.unisat !== "undefined") {
        await window.unisat.requestAccounts();

        const network = await window.unisat.getNetwork();

        const walletAddress = await window.unisat.getPublicKey();
        console.log("Unisat Wallet Address:", walletAddress);
        setAddress(walletAddress);
        setIsConnected(true);

        console.log("Connected to UniSat Wallet on network:", network);
      } else {
        console.error("UniSat Wallet not found");
      }
    } catch (error) {
      console.error("Error connecting to UniSat Wallet:", error);
    }
  };

  return (
    <div>
      {!isConnected && (
        <button onClick={handleConnect}>Connect UniSat Wallet</button>
      )}
      {isConnected && (
        <div>
          <h3>Connected UniSat Wallet</h3>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectUnisatWallet;
