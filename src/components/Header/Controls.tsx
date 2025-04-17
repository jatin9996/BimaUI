"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoIcon from "@/assets/icons/logo_icon.png";
import Star_1 from "@/assets/icons/Star_1.svg";
import start1_indicator from "@/assets/icons/start1_indicator.png";
import style from "./style.module.scss";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Copy,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { Manrope } from "next/font/google";

import WalletModal from "@/components/WalletModal/WalletModal";
import Dropdown from "@/components/ui/dropdown-controls";

const fontMonrope = Manrope({ subsets: ["latin"] });

const Values = () => {
  return (
    <div className={cn(style.values, "dark:text-gray-200")}>
      <Image src={LogoIcon} alt="Logo Icon" width={20} height={20} />
      <span>295,6%</span>
      <span className={style.divider}></span>
      <span>210,1%</span>
    </div>
  );
};
const Star = () => {
  return (
    <button className={style.start_btn}>
      <Image src={Star_1} alt="Star" width={16} height={16} />
      <Image
        src={start1_indicator}
        className={cn(style.indicator, style.run)}
        alt="Star Indicator"
        width={6}
        height={6}
      />
    </button>
  );
};

const ConnectWalletBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [btcConnectedNetwork, setBtcConnectedNetwork] = useState<string | null>(
    null
  );

  const { isConnected, address } = useAccount(); // RainbowKit address
  const { disconnect } = useDisconnect(); // RainbowKit disconnect

  const pathname = usePathname();

  const [manualWalletAddress, setManualWalletAddress] = useState<string | null>(
    null
  ); // State to store manual wallet address

  const isConnectedWithAddress = isConnected && address;
  const isConnectedWithManualAddress = manualWalletAddress !== null; // Check if manually connected

  const handleConnectClick = () => {
    setIsModalOpen(true); // Open the modal for selecting wallets
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDisconnect = () => {
    if (isConnectedWithAddress) {
      disconnect(); // Disconnect from RainbowKit wallet
    } else {
      setManualWalletAddress(null); // Reset manual wallet address
      setBtcConnectedNetwork(null); // Reset the connected BTC wallet network on disconnect
    }
    setShowDropdown(false); // Close dropdown after disconnect
  };

  const displayedAddress = isConnectedWithAddress
    ? address
    : isConnectedWithManualAddress
    ? manualWalletAddress
    : null;

  const handleStartAppClick = async () => {
    const host =
      `${window.location.host}` === "localhost:3000"
        ? `http://${window.location.host}`
        : `https://${window.location.host}`;

    if (pathname === "/") {
      window.open(`${host}/vaults`, "_blank"); // Open /vaults page in a new tab
    }
  };
  useEffect(() => {
    if (isConnected && address) {
      setIsModalOpen(false);
    }
  }, [isConnected, address]);
  return (
    <div className="relative flex flex-col lg:flex-row  items-center justify-between gap-4">
      {/* Show the BTC network button only when btcConnectedNetwork is not null */}
      {btcConnectedNetwork && (
        <button
          type="button"
          className="border bg-white dark:bg-black font-semibold shadow-xl px-4 py-2 rounded-md text-[16px] dark:text-white"
        >
          {btcConnectedNetwork} {/* Show Testnet, Mainnet, etc. */}
        </button>
      )}

      {/* Chain button for RainbowKit wallets */}
      {isConnected && pathname !== "/" && (
        <ConnectButton.Custom>
          {({ chain, openChainModal, mounted, authenticationStatus }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected = ready && chain;

            return connected && chain ? (
              <button
                onClick={openChainModal}
                type="button"
                className="bg-white dark:bg-black border h-[48px] w-fit border-gray-200 flex items-center gap-2 shadow-xl font-semibold px-4 py-2 rounded-md text-[16px] dark:text-white"
              >
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground,
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 4,
                    }}
                  >
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        style={{ width: 20, height: 20 }}
                      />
                    )}
                  </div>
                )}
                {chain.name}
                <ChevronDown className="text-gray-500 dark:text-white" />
              </button>
            ) : null;
          }}
        </ConnectButton.Custom>
      )}

      {pathname === "/" ? (
        <Button
          variant="primary"
          onClick={handleStartAppClick}
          className="rounded-[12px] bg-[#FF5001] text-[16px] font-medium"
        >
          Launch App
        </Button>
      ) : displayedAddress ? (
        <div className="relative">
          <Button variant="primary" onClick={toggleDropdown} className="flex-1">
            {typeof displayedAddress === "string"
              ? `${displayedAddress.substring(
                  0,
                  6
                )}...${displayedAddress.substring(displayedAddress.length - 4)}`
              : ""}
          </Button>

          <Dropdown
            displayedAddress={displayedAddress}
            onCopyAddress={() =>
              navigator.clipboard.writeText(displayedAddress!)
            }
            onDashboardClick={() => console.log("Dashboard clicked")}
            onDisconnect={handleDisconnect}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={handleConnectClick}
          className="rounded-[12px] bg-[#FF5001] text-[16px] font-medium"
        >
          Connect Wallet
        </Button>
      )}

      {isModalOpen && (
        <WalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setManualAddress={setManualWalletAddress} // Pass the function to set manual wallet address
          setConnectedNetwork={setBtcConnectedNetwork} // Pass the function to set connected BTC wallet network
        />
      )}
    </div>
  );
};

const ToggleTheme = () => {
  const [darkMood, setDarkMood] = useState(false);
  useEffect(() => {
    if (darkMood) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [darkMood]);
  return (
    <div className="ms-[16px]">
      <div className={style.theme_toggle_btn}>
        <span
          className={cn({
            [style.dark]: darkMood,
          })}
        ></span>
        <button
          title="Light mood"
          onClick={() => setDarkMood((pv) => !pv)}
          className={cn({
            [style.active]: !darkMood,
          })}
        >
          <Sun size={19} />
        </button>
        <button
          onClick={() => setDarkMood((pv) => !pv)}
          title="Dark mood"
          className={cn({
            [style.active]: darkMood,
          })}
        >
          <Moon size={19} />
        </button>
      </div>
    </div>
  );
};

const Controls = () => {
  const path = usePathname();

  return (
    <ul
      className={cn(
        style.controls,
        "ms-auto flex gap-5 flex-col lg:flex-row justify-between"
      )}
    >
      {/* <li>
        <Values />
      </li>
      <li>
        <Star />
      </li> */}
      <li>{/* <Dropdown /> */}</li>
      {/* {path === "/" && (
        <li
          className={cn(
            "border-2 border-[#CBCBCA] h-[36px] lg:h-[48px] w-[70px] lg:w-[107px] rounded-[12px] flex justify-center items-center text-[16px] font-[500] leading-[19.2px] cursor-pointer dark:text-white dark:border-white",
            fontMonrope.className
          )}
        >
          Sign in
        </li>
      )} */}
      {path != "/" && (
        <li>
          <ToggleTheme />
        </li>
      )}
      <li>
        {/* {pathname === "/" ? (
          <Button variant={"primary"} onClick={() => window.open(`${host}/vaults`,"_blank")}>
            Start App
          </Button>
        ) : (
          <ConnectButton />
        )} */}
        {/* <App /> */}

        <ConnectWalletBtn />
      </li>
    </ul>
  );
};

export default Controls;
function disconnectRainbow() {
  throw new Error("Function not implemented.");
}
