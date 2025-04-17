// src/components/WalletConnectButton.tsx
import React from "react";
import { useWallet } from "./WalletContext"; // Import the context hook

const WalletConnectButton: React.FC = () => {
  const { setWalletAddress } = useWallet();

  const connectWallet = async () => {
    try {
      if (window.LeatherProvider) {
        const response = await window.LeatherProvider.request("getAddresses");
        const addresses = response.result.addresses;

        if (addresses.length > 0) {
          const btcAddress = addresses.find(
            (address: { symbol: string }) => address.symbol === "BTC"
          );
          if (btcAddress) {
            setWalletAddress(btcAddress.address);
          }
        }
      } else {
        alert(
          "Leather Wallet not found. Please install the Leather browser extension."
        );
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default WalletConnectButton;
