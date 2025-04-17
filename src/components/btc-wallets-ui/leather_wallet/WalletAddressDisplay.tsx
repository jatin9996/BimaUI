// src/components/WalletAddressDisplay.tsx
import React from "react";
import { useWallet } from "./WalletContext"; // Import the context hook

const WalletAddressDisplay: React.FC = () => {
  const { walletAddress } = useWallet();

  return (
    <input
      type="text"
      value={walletAddress || ""}
      placeholder="Wallet Address"
      readOnly
    />
  );
};

export default WalletAddressDisplay;
