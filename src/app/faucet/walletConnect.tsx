"use client";
import Dropdown from "@/components/ui/dropdown-faucet";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import Ellipse_7 from "@/assets/icons/Ellipse_7.svg";
import Ellipse_8 from "@/assets/icons/Ellipse_8.svg";
import { Button } from "@/components/ui/button";
import { useAccount, useChainId } from "wagmi";
import { ethers } from "ethers-old";
import { transferLST } from "@/scripts/transferLST";
import { toast } from "react-toastify";
import { faucetContracts } from "@/scripts/faucetLSTs";
import { Loader2 } from "lucide-react";

const inter = Manrope({ subsets: ["latin"] });

interface IWalletConnectProps {
  lstName: string;
  lstAddress: string;
  lstImage: string;
}

const walletConnect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("bmBTC");
  const [walletAddress, setWalletAddress] = useState("");
  const [lstList, setLstList] = useState<IWalletConnectProps[]>([]);
  const [faucetContract, setFaucetContract] = useState<string>("");
  const [lstAddress, setLstAddress] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [faucetLink, setFaucetLink] = useState<string>("");
  const { isConnected, address } = useAccount();

  const [loading, setLoading] = useState(false);

  const chain = useChainId();
  let provider: any;

  const notifyTransfer = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  useEffect(() => {
    if (isConnected) {
      console.log("chainId -> ", chain);
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Provider->->", provider);
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchFaucetList = async () => {
      const response = await fetch(`/api/faucet/list?chainId=${chain}`);
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      console.log("data -> ", data.data[0]);
      setLstList(data.data[0]);
      // console.log("faucetContracts ->", faucetContracts[chain]);

      setFaucetContract(faucetContracts[chain].contractAddress);
      setFaucetLink(faucetContracts[chain].faucetLink);
      setLstAddress(data.data[0].lstAddress);
    };
    fetchFaucetList();
  }, [chain]);

  const handlegetLSTs = async () => {
    setLoading(true);
    try {
      console.log("lstList ->", lstList);
      if (isConnected) {
        console.log("chainId -> ", chain);
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const Signer = provider.getSigner();
        console.log("Signer ->", Signer);
        console.log("userAddress ->", userAddress);
        console.log("faucetContract ->", faucetContract);
        console.log("lstAddress ->", lstAddress);

        const tx = await transferLST(
          lstAddress,
          faucetContract,
          Signer,
          userAddress
        );
        console.log("Tranaction Hash ->", tx.hash);
        tx.status ? notifyTransfer(tx.message) : notifyError(tx.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in transfer ->", error);
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };

  return (
    <div className={cn(inter.className)}>
      <div className="flex justify-between bg-white mb-5 rounded-xl px-5 py-10 relative dark:bg-gray-700">
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
          {/* 
          <Image
            src={Ellipse_7}
            alt="ellipse"
            className="absolute bottom-0 left-0 rounded-bl-xl"
          />
          <Image
            src={Ellipse_8}
            alt="ellipse"
            className="absolute bottom-0 left-0 rounded-bl-xl"
          /> */}
        </div>
        <div className=" flex flex-col gap-5 ">
          <div className="md:flex justify-between">
            <h2 className="text-[24px] font-semibold dark:text-white mb-2">
              Drop in your wallet details
            </h2>
            <Dropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <p className="text-[14px] text-gray-500 dark:text-gray-300">
            Please Note: These tokens are for testing purposes only and hold no
            real value on market!
          </p>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder={isConnected ? address : "Enter your address"}
              value={address}
              onChange={(e) => setUserAddress(e.target.value)}
              className="border-none outline-none rounded-lg bg-gray-300 h-[48px] w-[80%] px-2 lg:w-[514px]"
              readOnly
            />
            <Button
              className="h-[48px] min-w-[100px] bg-orange-600 text-[16px] dark:text-white dark:hover:text-black"
              onClick={handlegetLSTs}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin dark:text-white" />
              ) : (
                "Get LSTs"
              )}
            </Button>
          </div>

          {/* <div className="flex justify-center items-center">
            <hr className="border-1 border-gray-500 w-full" />
            <span className="mx-2 dark:text-white">OR</span>
            <hr className="border-1 border-gray-500 w-full" />
          </div> */}

          <div className="flex flex-col gap-5 ">
            <p className="text-[14px] text-gray-500 dark:text-gray-300">
              Don't Have a Balance ? Get some Faucet to get LSTs and start
              testing!{" "}
              <a href={faucetLink} className="text-blue-500">
                {" "}
                Here{" "}
              </a>
            </p>

            {/* <p className="text-[14px] font-semibold dark:text-white">
              Want to Transfer in any other wallet?{" "}
            </p> */}
            <div className="flex gap-2 items-center">
              {/* <input
                type="text"
                placeholder="0x00"
                className="border-none outline-none rounded-lg bg-gray-300 h-[48px] w-[100%] px-2 lg:w-[514px]"
              />
              <Button className="bg-gray-300 text-[16px] h-[48px] text-black"
              onClick={handlegetLSTs}>
                Get LSTs
              </Button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default walletConnect;
