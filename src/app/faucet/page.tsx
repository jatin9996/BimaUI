"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Ellipse from "@/assets/icons/Ellipse.svg";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Dropdown from "@/components/ui/dropdown-faucet";
import { cn } from "@/lib/utils";
import WalletConnect from "./walletConnect"; // Correctly import the component
import { useAccount } from "wagmi";
import Banner from "@/components/ui/banner";
// import { connect } from "@wagmi/core";
const inter = Manrope({ subsets: ["latin"] });

const Faucet: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("stBTC");
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const { isConnected } = useAccount();

  console.log("isConnected", isConnected);

  const handleButtonClick = () => {};

  return (
    <>
      <Banner />

      {!isConnected ? (
        <div
          className={cn(
            inter.className,
            "flex justify-between bg-white mb-5 rounded-xl px-5 py-10 relative dark:bg-[#1A1A1A]"
          )}
        >
          <div className="hidden  lg:block">
            <h2 className="text-[32px] font-semibold dark:text-white">
              LSTs Testnet Faucet
            </h2>
            <div className="flex flex-col gap-2 text-[16px] font-medium text-gray-800 mt-5">
              <p className="text-[14px]  text-gray-500 dark:text-gray-300">
                <span>Step 1: Connect wallet for available Network</span>
              </p>
              <p className="text-[14px] text-gray-500 dark:text-gray-300">
                <span>Step 2: Select LSTs from dropdwon</span>
              </p>
              <p className="text-[14px]  text-gray-500 dark:text-gray-300">
                <span>Step 3: get LSTs</span>
              </p>
              <p className="text-[14px] text-gray-500 dark:text-gray-300">
                <span>
                  Step 4: To see the tokens add LST address in your wallet{" "}
                </span>
              </p>
            </div>
            <Image
              src={Ellipse}
              alt="ellipse"
              className="absolute bottom-0 left-[5px]"
            />
          </div>
          <div className="text-center flex flex-col gap-5">
            <div className="md:flex justify-between">
              <h2 className="text-[24px] font-semibold dark:text-white mb-2">
                Drop in your wallet details
              </h2>
              {/* <Dropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              /> */}
            </div>
            <p className="text-[14px] text-center text-gray-500 dark:text-gray-300">
              We support
              <b className="text-black dark:text-white"> Bitlayer</b>,
              <b className="text-black dark:text-white"> BoB</b>,
              <b className="text-black dark:text-white"> Holesky</b>, and 
              <b className="text-black dark:text-white">lorenzo</b> testnets.
              <br /> Soon we will onboard other chains as well.
              <b className="text-black dark:text-white">Connect your wallet</b>,
              to get Testnet LSTs and start Testing !
            </p>
            {/* <Button
              className="bg-orange-600 text-[16px] font-medium hover:bg-orange-500 dark:text-white"
              onClick={handleButtonClick}
            >
              Connect Wallet to get LSTs
            </Button> */}

            <div className="flex justify-center items-center">
              <hr className="border-1 border-gray-500 w-full" />
              {/* <span className="mx-2 dark:text-white"></span> */}
              <hr className="border-1 border-gray-500 w-full" />
            </div>

            <div className="flex flex-col gap-5 ">
              <p className="text-[12px] text-center text-gray-500 dark:text-gray-300">
                "🎉 Not part of our Discord community yet? You're missing out!
                Join us now from{" "}
                <a href={""} className="text-blue-500">
                  {" "}
                  Here{" "}
                </a>{" "}
                and be part of something amazing! 🚀"
              </p>
            </div>
          </div>
        </div>
      ) : (
        <WalletConnect /> // Show walletConnect when the button is clicked
      )}
    </>
  );
};

export default Faucet;
