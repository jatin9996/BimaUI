// src/App.tsx
import React from "react";
import { WalletProvider } from "./WalletContext";
import WalletConnectButton from "./WalletConnectButton";
import WalletAddressDisplay from "./WalletAddressDisplay";

const App: React.FC = () => {
  return (
    <WalletProvider>
      <div>
        <WalletConnectButton />
        <WalletAddressDisplay />
      </div>
    </WalletProvider>
  );
};

export default App;
