"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import Image from "next/image";
import { Pools } from "@/scripts/pools";
import MorphoABI from "@/web3/abis/MorphoABI.json";
import { ethers } from "ethers-old";
import MorphoIntegration from "@/scripts/morpho-integration";
import SuccessPopup from "../SuccessPopup";
import Link from "next/link";
import ErrorPopup from "../ErrorPopup";
import chains from "@/scripts/chains";
import contracts from "@/scripts/contracts";
// import { useLendingContext } from "@/app/lend/contextFile";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Manrope({ subsets: ["latin"] });

export default function RepayDebtPopup({
  onClose,
  isOpen,
  pool,
}: {
  isOpen: boolean;
  onClose: () => void;
  pool: any;
}) {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [repayAmount, setRepayAmount] = useState("0");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [txLink, settxLink] = useState("");
  // const { explorerLink } = useLendingContext();


  const repayDebt = async () => {
    setIsSuccessOpen(true);
  }
  // const morphoRepay = async () => {
  //   try {
  //     setLoading(true);
  //     const marketParams = pool.marketParams;
  //     const scaledAmount = ethers.utils.parseUnits(String(repayAmount), 18);

  //     const onBehalf = await morpho?.provider?.getSigner().getAddress();

  //     // Approve token spending first
  //     const loanTokenContract = new ethers.Contract(
  //       marketParams.loanToken, // Use loanToken instead of collateralToken
  //       ["function approve(address spender, uint256 amount) returns (bool)"],
  //       morpho?.provider?.getSigner()
  //     );

  //     const approveTx = await loanTokenContract.approve(
  //       morpho?.contract.address,
  //       scaledAmount
  //     );
  //     await approveTx.wait();

  //     // Repay Step
  //     const repayTx = await morpho?.repay(marketParams, scaledAmount, onBehalf);
  //     console.log("Morpho Repay Successful:", repayTx);
  //     settxLink(`${explorerLink}${repayTx.hash}`);
  //     setIsSuccessOpen(true);
  //     setLoading(false);
  //     onClose();
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Morpho Repay Failed:", error);
  //     setIsErrorOpen(true);
  //   }
  // };

  const RepayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        RepayRef.current &&
        !RepayRef.current.contains(event.target as Node)
      ) {
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
  // const fetchBalance = async () => {
  //   if (!isConnected || !pool || !morpho?.provider) return;

  //   // try {
  //   //   const signer = morpho.provider.getSigner();
  //   //   const userAddress = await signer.getAddress();

  //   //   // Create a contract instance for the collateral token
  //   //   const collateralTokenContract = new ethers.Contract(
  //   //     pool.marketParams.collateralToken,
  //   //     ['function balanceOf(address owner) view returns (uint256)'],
  //   //     signer
  //   //   );

  //   //   // Fetch the balance of the user's wallet
  //   //   const balance = await collateralTokenContract.balanceOf(userAddress);
  //   //   const formattedBalance = ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals

  //   //   setBalance(formatUSBD(Number(formattedBalance))); // Update the balance state
  //   // } catch (error) {
  //   //   console.error('Error fetching balance:', error);
  //   // }

  //   try {
  //     const signer = morpho.provider.getSigner();
  //     const userAddress = await signer.getAddress();
  //     const userData = await morpho?.getUserLendsAndBorrows(
  //       pool.id,
  //       userAddress
  //     );

  //     const loanBalance = formatUSBD(Number(userData?.totalBorrows) ?? 0);
  //     setBalance(loanBalance);
  //     setRawBalance(userData?.totalBorrows ?? "0");
  //   } catch (error) {
  //     console.error(`Error fetching data for pool ${pool.id}:`, error);
  //     setBalance("0");
  //     setRawBalance("0");
  //   }
  // };
  // useEffect(() => {
  //   fetchBalance();
  // }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={RepayRef}
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
                Repay
              </h1>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-300 p-2 size-[30px] rounded-full flex items-center justify-center">
                X
              </button>
            </div>
          </CardHeader>

          <CardContent className="mt-2 border-b border-dashed  border-[#8C8FA1]">
            {/* <div
              className={cn(
                "flex items-center justify-between font-semibold",
                inter.className
              )}
            >
              <span>Supply {pool?.name} Collateral</span>
              <p>
                <span className="text-muted-foreground">Balance</span>&nbsp;
                <span>0.00</span>
              </p>
            </div> */}

            {/* <div className="flex justify-between flex-wrap py-1">
              <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
                />
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-muted-foreground">$0.00</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg px-2 h-[27px]"
                  >
                    Max
                  </Button>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                className="rounded-xl bg-black text-white w-[24%]"
              >
                <img
                  src="/tokens/prisma.svg"
                  width={20}
                  height={20}
                  alt="Icon"
                  className="mr-2"
                />
                {pool?.collateralToken}
              </Button>
            </div> */}

            <div
              className={cn(
                "flex items-center justify-between font-semibold mt-6",
                inter.className
              )}>
              <span>Repay {pool.debtToken}</span>
              <p>
                <span className="text-muted-foreground">Balance</span>&nbsp;
                <span>{balance}</span>
              </p>
            </div>

            <div className="flex justify-between flex-wrap py-1">
              <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
                <Input
                  type="number"
                  placeholder="Enter the borrow amount"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
                />
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-muted-foreground">
                    ${formatUSBD(Number(repayAmount))}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg px-2 h-[27px]"
                    onClick={() => setRepayAmount(rawBalance)}>
                    Max
                  </Button>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                className="rounded-xl bg-black text-white w-[24%]">
                <img
                  src={pool?.debtTokenImage}
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
              onClick={
                isConnected ? repayDebt : () => alert("Connect Wallet")
              }>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isConnected ? (
                "Repay"
              ) : (
                "Connect Wallet"
              )}
            </Button>

            <SuccessPopup
              isOpen={isSuccessOpen}
              onClose={() => setIsSuccessOpen(false)}
              title="USBD Borrowed Successful"
              message={`An amount of ${repayAmount} USBD has been successfully Repaid. Sit back, relax, and reap the benefits of your effort.`}
              actions={
                <div className="w-[100%] flex flex-col gap-2">
                  <Link
                    className={cn(
                      "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                      fontSpace_Grotesk.className
                    )}
                    href={{ pathname: "/lending" }}>
                    Repay More USBD
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

          <CardFooter
            className={cn(inter.className, "flex-col items-start mt-3")}>
            <h2 className="text-[24px] text-[#151618] dark:text-[#FFFFFF] font-semibold mb-4">
              Breakdown
            </h2>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  Total Supply
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#E71F1F]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.vaultPosition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  Liquidity
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#E71F1F]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.debtInFront}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  Total Liquidity
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#1DB86E]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.collatRatio}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  1D Borrow APY
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#1DB86E]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.liquidationPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  LTV / Liquidation LTV
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.borrowInterestRate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  Collateral ({pool?.collateralToken})
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.remainingMintableMkUSD}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                  Loan ({pool?.collateralToken})
                </span>
                <span
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
                    fontSpace_Grotesk.className
                  )}>
                  {pool?.remainingMintableMkUSD}
                </span>
              </div>
            </div>
          </CardFooter>
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
