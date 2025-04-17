"use client";
import { useState } from "react";
import { showConnect, getUserData } from "@stacks/connect";

declare global {
  interface Window {
    AsignaProvider: any;
  }
}
// EXTENSION LINK: https://chromewebstore.google.com/detail/asigna-multisig/gopddoinbenlokghakiafackadkbnlid
export const ConnectAsignaWallet = () => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      if (typeof window.AsignaProvider !== "undefined") {
        await showConnect(
          {
            appDetails: {
              name: "Bima",
              icon: "http://localhost:3000/favicon.ico",
            },
          },
          window.AsignaProvider
        );

        const userData = await getUserData();

        console.log("Asigna User Data", userData);

        setAddress(userData.profile.stxAddress.mainnet);
        setIsConnected(true);

        console.log("Connected to Asigna Multisig");
      } else {
        console.error(
          "Asigna custom provider not found. Please ensure the Asigna extension is installed."
        );
      }
    } catch (error) {
      console.error("Error connecting to Asigna Multisig:", error);
    }
  };

  return (
    <div>
      {!isConnected && (
        <button onClick={handleConnect}>Connect Asigna Multisig</button>
      )}
      {isConnected && (
        <div>
          <h3>Connected Asigna Multisig</h3>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectAsignaWallet;
