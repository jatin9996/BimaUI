"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Pools } from "@/scripts/pools";
import MorphoABI from "@/web3/abis/MorphoABI.json";
import { ethers } from "ethers-old";
import MorphoIntegration from "@/scripts/morpho-integration";
import ErrorPopup from "../ErrorPopup";
import Link from "next/link";
import SuccessPopup from "../SuccessPopup";
import chains from "@/scripts/chains";
import contracts from "@/scripts/contracts";
import { useLendingContext } from "@/app/lend/contextFile";
const inter = Manrope({ subsets: ["latin"] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export default function AddSupplyPopup({
  onClose,
  isOpen,
  pool,
  morpho,
}: {
  isOpen: boolean;
  onClose: () => void;
  pool: any;
  morpho: any;
}) {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [txLink, settxLink] = useState("");
  const { explorerLink } = useLendingContext();
  // const [morpho, setMorpho] = useState<MorphoIntegration | null>(null);
  const [addAmount, setAddAmount] = useState("");

  // const initializeMorpho = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const userAddress = await signer.getAddress();
  //     const morphoContractAddress = pool.morphoContract;
  //     const morpho = new MorphoIntegration(
  //       provider,
  //       morphoContractAddress,
  //       MorphoABI
  //     );

  //     console.log('Morpho instance initialized:', morpho);
  //     console.log('User Address:', userAddress);

  //     setMorpho(morpho);
  //   } catch (error) {
  //     console.error('Error initializing Morpho:', error);
  //   }
  // };

  // useEffect(() => {
  //   initializeMorpho();
  // }, []);

  const morphoAdd = async () => {
    try {
      setLoading(true);
      console.log("Before -> ",isSuccessOpen);
      
      console.log("explorer", explorerLink);
      const marketParams = pool.marketParams;
      const scaledAmount = ethers.utils.parseUnits(String(addAmount), 18);

      const onBehalf = await morpho?.provider?.getSigner().getAddress();

      // Approve token spending first
      const loanTokenContract = new ethers.Contract(
        marketParams.loanToken, // Use loanToken instead of collateralToken
        ["function approve(address spender, uint256 amount) returns (bool)"],
        morpho?.provider?.getSigner()
      );

      const approveTx = await loanTokenContract.approve(
        morpho?.contract.address,
        scaledAmount
      );
      await approveTx.wait();

      // Supply Collateral Step
      const supplyCollateralTx = await morpho?.supply(
        marketParams,
        scaledAmount,
        onBehalf
      );

      settxLink(`${explorerLink}${supplyCollateralTx.hash}`);
      console.log("Morpho Mint Successful:", supplyCollateralTx);
      // alert('Supply Transaction Successful!');
      setIsSuccessOpen(true);
      setLoading(false);
      console.log("After -> ",isSuccessOpen);
      // onClose();
    } catch (error) {
      setIsErrorOpen(true);
      setLoading(false);
      console.error("Morpho Mint Failed:", error);
      // alert('Mint Transaction Failed!');
    }
  };

  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addRef.current && !addRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const [balance, setBalance] = useState("0"); // State to store the user's balance
  const [rawBalance, setRawBalance] = useState("0");
  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  const fetchBalance = async () => {
    if (!isConnected || !pool || !morpho?.provider) return;

    try {
      const signer = morpho.provider.getSigner();
      const userAddress = await signer.getAddress();

      // Create a contract instance for the collateral token
      const collateralTokenContract = new ethers.Contract(
        pool.marketParams.loanToken,
        ["function balanceOf(address owner) view returns (uint256)"],
        signer
      );

      // Fetch the balance of the user's wallet
      const balance = await collateralTokenContract.balanceOf(userAddress);
      const formattedBalance = ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals

      setBalance(formatUSBD(Number(formattedBalance))); // Update the balance state
      setRawBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={addRef}
        className=" w-[80%] lg:w-[30%] ">
        {/* Main Card */}
        <Card className="bg-white dark:bg-[#1A1A1A] rounded-2xl relative">
          <CardHeader>
            <div className="flex justify-center md:justify-between gap-3 md:gap-0 flex-col md:flex-row border-b border-dashed border-[#8C8FA166] pb-5">
              <h1
                className={cn(
                  "text-[32px] text-[#151618] dark:text-[#FFFFFF] leading-[35.84px] font-semibold pt-2",
                  inter.className
                )}>
                Supply
              </h1>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-300 p-2 size-[30px] rounded-full flex items-center justify-center">
                X
              </button>
            </div>
          </CardHeader>

          <CardContent className="mt-2  border-[#8C8FA1]">
            <div
              className={cn(
                "flex items-center justify-between font-semibold",
                inter.className
              )}>
              <span>Enter amount of {pool?.debtToken}</span>
              <p>
                <span className="text-muted-foreground">Balance</span>&nbsp;
                <span>{balance}</span>
              </p>
            </div>

            <div className="flex justify-between flex-wrap py-1">
              <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
                <Input
                  type="number"
                  placeholder="Enter USBD here"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
                />
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-muted-foreground">
                    ${formatUSBD(Number(addAmount))}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg px-2 h-[27px]"
                    onClick={() => {
                      setAddAmount(rawBalance);
                    }}>
                    Max
                  </Button>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                className="rounded-xl bg-black text-white w-[24%]">
                <img
                  src={pool?.collateralTokenImage}
                  width={20}
                  height={20}
                  alt="Icon"
                  className="mr-2"
                />
                {pool?.debtToken}
              </Button>
            </div>

            <Button
              className="w-full mt-4 bg-[#F74A17] hover:bg-[#F74A17]/90 text-white"
              disabled={loading}
              onClick={isConnected ? morphoAdd : () => alert("Connect Wallet")}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isConnected ? (
                "Supply"
              ) : (
                "Connect Wallet"
              )}
            </Button>
            <SuccessPopup
              isOpen={isSuccessOpen}
              onClose={() => setIsSuccessOpen(false)}
              title="USBD Supplied Successful"
              message={`An amount of ${addAmount} Collateral has been successfully Supplied. Sit back, relax, and reap the benefits of your effort.`}
              actions={
                <div className="w-[100%] flex flex-col gap-2">
                  <Link
                    className={cn(
                      "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                      fontSpace_Grotesk.className
                    )}
                    href={{ pathname: "/lending" }}>
                    Supply more Collateral
                  </Link>
                  <Link
                    className="bg-[#F5F5F4] text-[#78716C] text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full"
                    href={txLink}>
                    Check on explorer
                  </Link>
                </div>
              }
            />
            <ErrorPopup
              isOpen={isErrorOpen}
              onClose={() => setIsErrorOpen(false)}
              title="Something went wrong"
              message={`Something went wrong while processing the transaction. Please wait for the balances to reflect or try again.`}
              actions={
                <div className="w-[100%] flex flex-col gap-2">
                  <button
                    className={cn(
                      "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                      fontSpace_Grotesk.className
                    )}
                    onClick={() => setIsErrorOpen(false)}>
                    Try Again
                  </button>
                </div>
              }
            />
          </CardContent>
        </Card>

        <ToastContainer
          className="!right-16 !top-20"
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
