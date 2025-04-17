"use client";

import * as React from "react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  Theme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import {
  holesky,
  bscTestnet,
  arbitrumSepolia,
  polygonZkEvmCardona,
  sepolia,
  baseSepolia,
  avalancheFuji,
  fantomTestnet,
  scrollSepolia,
  mantaSepoliaTestnet,
  zetachainAthensTestnet,
  xLayerTestnet,
  rootstockTestnet
} from "wagmi/chains";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  bitgetWallet,
  bybitWallet,
  binanceWallet,
} from "@rainbow-me/rainbowkit/wallets";
import merge from "lodash.merge";

import {
  MerlinTestnet,
  BEVMTestnet,
  coreTestnet,
  citreaTestnet,
  BNBTestnet,
  PolygonzkEvmTestnet,
  OptimismTestnet,
  AvalancheTestnet,
  FilecoinTestnet,
  MinatoTestnet,
  bobSepolia,
  btrTestnet,
} from "@/web3/custom-chains"

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#F74A17",
  },
} as Theme);

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",

  chains: [
    btrTestnet,
    // bobSepolia,
    holesky,
    // bscTestnet,
    // polygonZkEvmCardona,
    MerlinTestnet,
    // BEVMTestnet,
    // sepolia,
    // avalancheFuji,
    BNBTestnet,
    // PolygonzkEvmTestnet,
    // OptimismTestnet,
    AvalancheTestnet,
    // FilecoinTestnet,
    // fantomTestnet,
    arbitrumSepolia,
    baseSepolia,
    // scrollSepolia,
    coreTestnet,
    rootstockTestnet,
    // mantaSepoliaTestnet,
    // MinatoTestnet,
    // citreaTestnet,
    // zetachainAthensTestnet,
    // xLayerTestnet,
  ],

  wallets: [
    { groupName: "EVM", wallets: [rainbowWallet] },
    { groupName: "EVM", wallets: [walletConnectWallet] },
    { groupName: "EVM", wallets: [metaMaskWallet] },
    { groupName: "EVM", wallets: [binanceWallet] },
    { groupName: "BTC", wallets: [bitgetWallet] },
    { groupName: "BTC", wallets: [bybitWallet] },
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme}>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
