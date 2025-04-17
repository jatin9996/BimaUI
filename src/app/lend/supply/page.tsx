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
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import networks from "@/scripts/contracts";
import { Pools } from "@/scripts/pools";
import MorphoABI from "@/web3/abis/MorphoABI.json";
import { ethers } from "ethers-old";
import MorphoIntegration from "@/scripts/morpho-integration";
import ErrorPopup from "@/components/ui/ErrorPopup";
import SuccessPopup from "@/components/ui/SuccessPopup";
import chains from "@/scripts/chains";
import Link from "next/link";
import contracts from "@/scripts/contracts";
import WalletModal from "@/components/WalletModal/WalletModal";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Manrope({ subsets: ["latin"] });

export default function LendingPoolPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcConnectedNetwork, setBtcConnectedNetwork] = useState<string | null>(
    null
  );

  const [manualWalletAddress, setManualWalletAddress] = useState<string | null>(
    null
  );
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const chain = useChainId();
  const searchParams = useSearchParams();
  const poolId = searchParams.get("pool");
  const pool: any = Pools.find((pool) => pool.id === poolId);

  const [morpho, setMorpho] = useState<MorphoIntegration | null>(null);
  const [mintAmount, setMintAmount] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [txLink, settxLink] = useState("");
  const [balance, setBalance] = useState("0");
  const [rawBalance, setRawBalance] = useState(0);

  let provider;
  const initializeMorpho = async () => {
    try {
      setConnectedNetwork(chains[chain].NetworkName);
      if (isConnected) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        const morphoContractAddress = pool.morphoContract;
        const morpho = new MorphoIntegration(
          provider,
          morphoContractAddress,
          MorphoABI
        );
        console.log("Morpho instance initialized:", morpho);
        console.log("User Address:", userAddress);
        setMorpho(morpho);
      } else {
        provider = null;
      }
    } catch (error) {
      console.error("Error initializing Morpho:", error);
    }
  };

  const morphoMint = async () => {
    try {
      setLoading(true);
      const marketParams = pool.marketParams;
      const scaledAmount = ethers.utils.parseUnits(String(mintAmount), 18);

      const onBehalf = await morpho?.provider?.getSigner().getAddress();

      // Approve token spending first
      const usbdTokenContract = new ethers.Contract(
        marketParams.loanToken,
        ["function approve(address spender, uint256 amount) returns (bool)"],
        morpho?.provider?.getSigner()
      );

      const approveTx = await usbdTokenContract.approve(
        morpho?.contract.address,
        scaledAmount
      );
      await approveTx.wait();
      const explorerLink = contracts[connectedNetwork].explorerLink;
      const tx = await morpho?.supply(marketParams, scaledAmount, onBehalf);
      settxLink(`${explorerLink}${tx.hash}`);
      setIsSuccessOpen(true);
      setLoading(false);
      console.log("Morpho Mint Successful:", tx);
    } catch (error) {
      setIsErrorOpen(true);
      setLoading(false);
      console.error("Morpho Mint Failed:", error);
    }
  };

  const handleConnectClick = () => {
    setIsModalOpen(true); // Open the modal for selecting wallets
  };

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  const fetchBalance = async () => {
    if (!isConnected || !pool || !morpho?.provider) return;

    try {
      setConnectedNetwork(chains[chain].NetworkName);
      const signer = morpho.provider.getSigner();
      const userAddress = await signer.getAddress();

      const collateralTokenContract = new ethers.Contract(
        pool.marketParams.loanToken,
        ["function balanceOf(address owner) view returns (uint256)"],
        signer
      );

      const balance = await collateralTokenContract.balanceOf(userAddress);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);
      setRawBalance(Number(formattedBalance));
      setBalance(formatUSBD(Number(formattedBalance)));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  useEffect(() => {
    initializeMorpho();
  }, [isConnected]);
  useEffect(() => {
    fetchBalance();
  }, [morpho]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Back button and title */}
      <div className="flex items-center space-x-4 mb-5">
        <Button
          onClick={() => router.back()}
          className="bg-slate-300/45 dark:bg-[#302F2E] rounded-md p-2.5 text-black dark:text-white"
        >
          <ChevronLeft />
        </Button>
        <h3 className="text-xl font-semibold">{pool.name}</h3>
      </div>

      {/* Stats section */}
      {/* <div className="flex justify-around py-[28px] bg-white rounded-[20px] mb-4">
        <div>
          <p
            className={cn(
              "text-[32px] font-medium leading-[40.96px] text-[#F74A17]",
              fontSpace_Grotesk.className
            )}
          >
            {poolData.tvl}
          </p>
          <p
            className={cn(
              "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
              inter.className
            )}
          >
            TVL
          </p>
        </div>
        <div>
          <p
            className={cn(
              "text-[32px] font-medium leading-[40.96px] text-[#151618]",
              fontSpace_Grotesk.className
            )}
          >
            {poolData.totalSupplied}
          </p>
          <p
            className={cn(
              "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
              inter.className
            )}
          >
            Total Supplied
          </p>
        </div>
        <div>
          <p
            className={cn(
              "text-[32px] font-medium leading-[40.96px] text-[#151618]",
              fontSpace_Grotesk.className
            )}
          >
            {poolData.totalBorrowed}
          </p>
          <p
            className={cn(
              "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
              inter.className
            )}
          >
            Total Borrowed
          </p>
        </div>
      </div> */}

      {/* Main Card */}
      <Card className="bg-white dark:bg-[#1A1A1A] rounded-2xl">
        <CardHeader>
          <div className="flex justify-center md:justify-between gap-3 md:gap-0 flex-col md:flex-row border-b border-dashed border-[#8C8FA166] pb-5">
            <h1
              className={cn(
                "text-[32px] text-[#151618] dark:text-[#FFFFFF] leading-[35.84px] font-semibold pt-2",
                inter.className
              )}
            >
              Supply
            </h1>
            {/* <Button
              variant='primary'
              className='flex items-center rounded-xl'>
              {pool.apr} APR
            </Button> */}
          </div>
        </CardHeader>
        {/* 
        <div className="px-[5%]">
          <SliderButton isMint={isMint} setIsMint={setIsMint} />
        </div> */}

        <CardContent className="mt-2  border-[#8C8FA1]">
          <div
            className={cn(
              "flex items-center justify-between font-semibold",
              inter.className
            )}
          >
            <span>Enter amount of USBD</span>
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
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
              />
              <div className="flex justify-center items-center space-x-4">
                <span className="text-muted-foreground flex flex-row">
                  ${formatUSBD(Number(mintAmount))}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-lg px-2 h-[27px]"
                  onClick={() => setMintAmount(rawBalance.toString())}
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
                src={pool.debtTokenImage}
                width={20}
                height={20}
                alt="Icon"
                className="mr-2"
              />
              USBD
            </Button>
          </div>

          {/* {isConnected && (
            <>
              <div
                className={cn(
                  "flex items-center justify-between font-semibold mt-6",
                  inter.className
                )}
              >
                <span>Borrow</span>
                <p>
                  <span className="text-muted-foreground">Balance</span>&nbsp;
                  <span>0.00</span>
                </p>
              </div>

              <div className="flex justify-between flex-wrap py-1">
                <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-slate-800/90">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-slate-800/90"
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
                    src="/tokens/stbtc.svg"
                    width={20}
                    height={20}
                    alt="Icon"
                    className="mr-2"
                  />
                  stBTC
                </Button>
              </div>
            </>
          )} */}

          <div className="my-3">
            <div className="flex justify-between items-center">
              <p
                className={cn(
                  "text-[14px] text-[#B8B8B8]  font-semibold",
                  inter.className
                )}
              >
                1D Earn APY
              </p>
              <p
                className={cn(
                  "text-[14px]  font-bold dark:text-[#FFFFFF]",
                  fontSpace_Grotesk.className
                )}
              >
                36.17%
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p
                className={cn(
                  "text-[14px] text-[#B8B8B8]  font-semibold",
                  inter.className
                )}
              >
                Collateral Exposure
              </p>
              <div className="flex -space-x-2">
                <img
                  src={pool.debtTokenImage}
                  alt="Icon 3"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white bg-white"
                />
                <img
                  src={pool.collateralTokenImage}
                  alt="Icon 4"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white bg-white"
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-4 bg-[#F74A17] hover:bg-[#F74A17]/90 text-white"
            disabled={loading}
            onClick={isConnected ? morphoMint : handleConnectClick}
          >
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
            message={`An amount of ${mintAmount} USBD has been successfully Supplied. Sit back, relax, and reap the benefits of your effort.`}
            actions={
              <div className="w-[100%] flex flex-col gap-2">
                <Link
                  className={cn(
                    "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                    fontSpace_Grotesk.className
                  )}
                  href={{ pathname: "/lending" }}
                >
                  Supply more USBD
                </Link>
                <Link
                  className="bg-[#F5F5F4] text-[#78716C] text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full"
                  href={txLink}
                >
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
                  onClick={() => setIsErrorOpen(false)}
                >
                  Try Again
                </button>
              </div>
            }
          />
          {isModalOpen && (
            <WalletModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              setManualAddress={setManualWalletAddress} // Pass the function to set manual wallet address
              setConnectedNetwork={setBtcConnectedNetwork} // Pass the function to set connected BTC wallet network
            />
          )}
        </CardContent>

        {/* <CardFooter
          className={cn(inter.className, "flex-col items-start mt-3")}
        >
          <h2 className="text-[24px] text-[#151618] font-semibold mb-4">
            Breakdown
          </h2>
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Vault position
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#E71F1F]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.vaultPosition}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Debt in front
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#E71F1F]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.debtInFront}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Collat. Ratio
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#1DB86E]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.collatRatio}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Liquidation Price
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#1DB86E]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.liquidationPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Borrow Interest Rate
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#151618]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.borrowInterestRate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-[14px] text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Remaining Mintable mkUSD
              </span>
              <span
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#151618]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.remainingMintableMkUSD}
              </span>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {/* <Card className="bg-white dark:bg-slate-800 rounded-2xl mt-4">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <p
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#151618]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {poolData.minCollatRatio}
                </p>
                <p
                  className={cn(
                    "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
                    inter.className
                  )}
                >
                  Minimum Collat. Ratio
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-[16px] font-bold leading-[20.48px] text-[#151618]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {poolData.wstEthTVL}
                </p>
                <p
                  className={cn(
                    "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
                    inter.className
                  )}
                >
                  wstETH TVL
                </p>
              </div>
            </div>
            <div>
              <p
                className={cn(
                  "text-[16px] font-bold leading-[20.48px] text-[#151618]",
                  fontSpace_Grotesk.className
                )}
              >
                {poolData.wstEthPrice}
              </p>
              <p
                className={cn(
                  "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
                  inter.className
                )}
              >
                Price of wstETH
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

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
  );
}
