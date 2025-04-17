"use client";
import { toDollar, formatCurrency } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Lend_bg from "@/assets/icons/Lend_bg.svg";
import Lend_bg_1 from "@/assets/icons/Lend_bg_1.svg";
import pool_icon_1 from "@/assets/icons/pool_icon_1.svg";
import pool_icon_2 from "@/assets/icons/pool_icon_2.svg";
import pool_icon_3 from "@/assets/icons/pool_icon_3.svg";
import pool_icon_4 from "@/assets/icons/pool_icon_4.svg";
import pool_icon_5 from "@/assets/icons/pool_icon_5.svg";
import { ChevronsUpDown, Loader2 } from "lucide-react";

import { use, useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import chains from "@/scripts/chains";
import networks from "@/scripts/contracts";
import { ethers } from "ethers-old";
import MorphoIntegration from "@/scripts/morpho-integration";
import MorphoABI from "@/web3/abis/MorphoABI.json";
import { SupplyPools } from "./Pools/SupplyPools";
import { BorrowPools } from "./Pools/BorrowPools";
import PositionTable from "./MyPosition/BorrowPositon";
import { useLendingContext } from "./contextFile";
import contracts from "@/scripts/contracts";
import SliderButton from "./MyPosition/SliderButton";
import SupplyPosition from "./MyPosition/SupplyPosition";
import BorrowPosition from "./MyPosition/BorrowPositon";
import Banner from "@/components/ui/banner";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Manrope({ subsets: ["latin"] });

export default function LendingPage() {
  const marketCap = 100000000; // $100M
  const userDeposit = 0;
  const [connectedNetworkName, setConnectedNetwork] = useState("");
  const { setexplorerLink,settotalBorrow,settotalSupply} = useLendingContext();
  const positions = [
    {
      collateral: { amount: 10.0, token: "WETH", value: "$34.71k" },
      loan: { amount: 25000.0, token: "USBD", value: "$24.99k" },
      borrowAPY: "3.04%",
      dayBorrowAPY: "2.06%",
      ltv: "71.548%",
      liquidationLtv: "86%",
      healthIndex: "1.2019",
    },
  ];

  // const pools: Pool[] = [
  //   {
  //     id: 1,
  //     src: pool_icon_1,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_3,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_4,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_5,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_4,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_5,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_3,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_4,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_5,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  //   {
  //     id: 1,
  //     src: pool_icon_1,
  //     src2: pool_icon_2,
  //     src3: pool_icon_1,
  //     src4: pool_icon_2,
  //     name: "yPRISMA/PRISMA",
  //     marketSize: "99319k",
  //     apr: 46.13,
  //     yourLends: 0,
  //     yourBorrow: 0,
  //   },
  // ];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [network, setNetwork] = useState("Bitlayer");
  const [chainId, setChainId] = useState<number>(200810);
  const [morpho, setMorpho] = useState<MorphoIntegration | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [pools, setPools] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<{
    totalBorrow: string;
    totalSupply: string;
  }>({ totalBorrow: "", totalSupply: "" });

  const chain = useChainId();

  useEffect(() => {
    setIsLoading(true);
    setChainId(chain);
    setNetwork(chains[chain].NetworkName);
    const explorer = contracts[chains[chain].NetworkName].explorerLink;
    console.log("explorer", explorer);
    // if(explorer != undefined){
    //   setexplorerLink(explorer)
    // }
    setPools(networks[chains[chain].NetworkName].Markets ?? []);
    setexplorerLink(explorer ? explorer : "");
    setIsLoading(false);
  }, [chain]);

  const initializeMorpho = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setUserAddress(userAddress);
      const morphoContractAddress = pools[0].morphoContract;
      const morpho = new MorphoIntegration(
        provider,
        morphoContractAddress,
        MorphoABI
      );

      setMorpho(morpho);
    } catch (error) {
      console.error("Error initializing Morpho:", error);
    }
  };

  useEffect(() => {
    initializeMorpho();
  }, [pools]);

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  const metadataFunction = async () => {
    let totalBorrow = 0;
    let totalSupply = 0;

    // Loop through each pool in the pools array
    for (const pool of pools) {
      const userData = await morpho?.getTotalStats(pool.id);

      // Accumulate totalBorrow and totalSupply
      totalBorrow += Number(userData?.totalBorrow) || 0;
      totalSupply += Number(userData?.totalSupply) || 0;
    }

    // Set the aggregated metadata
    setMetadata({
      totalBorrow: formatUSBD(totalBorrow),
      totalSupply: formatUSBD(totalSupply),
    });
    settotalBorrow(formatUSBD(totalBorrow));
    settotalSupply(formatUSBD(totalSupply));
    console.log("Aggregated User Data:", { totalBorrow, totalSupply });
  };

  useEffect(() => {
    metadataFunction();
  }, [morpho]);

  const [isSupply, setIsSupply] = useState(true);
  const [balance, setBalance] = useState("0");
  const { isConnected } = useAccount();

  const fetchBalance = async () => {
    if (!isConnected || !pools || !morpho?.provider) return;

    try {
      const signer = morpho.provider.getSigner();
      const userAddress = await signer.getAddress();

      // Create a contract instance for the collateral token
      const loanTokenContract = new ethers.Contract(
        pools[0].marketParams.loanToken,
        ["function balanceOf(address owner) view returns (uint256)"],
        signer
      );

      // Fetch the balance of the user's wallet
      const balance = await loanTokenContract.balanceOf(userAddress);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);

      setBalance(formatUSBD(Number(formattedBalance)));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, [morpho]);
  return (
    <div className=" ">
      <Banner />

      <div className="border border-[#E7E5E4] rounded-[20px] h-[110px] mb-5 flex justify-between items-center">
        <div>
          <Image
            src={Lend_bg_1}
            alt="Lend Left Frame"
            className="rounded-[20px] hidden lg:block dark:hidden"
          />
        </div>
        <div className="">
          <h1
            className={cn(
              "text-[28px] font-semibold text-center leading-[31.36px] text-[#57534E] dark:text-[#FFFFFF]",
              inter.className
            )}>
            Earn up to 10x rewards by <br className="hidden lg:block" />{" "}
            depositing in pools
          </h1>
        </div>

          <div>
            <Image
              src={Lend_bg}
              alt="Lend Right Frame"
              className="rounded-[20px] hidden lg:block dark:hidden"
            />
          </div>
        </div>

      <div className="flex justify-between items-center gap-3 lg:gap-5 flex-col lg:flex-row">
        <StatsCard
          title="Total Supply"
          value={`$ ${metadata.totalSupply}`}
        />
        <StatsCard
          title="Total Borrow"
          value={`$ ${metadata.totalBorrow}`}
        />
        <StatsCard
          title="USBD Balance"
          value={balance}
        />
        {/* <StatsCard
          title="Your Rewards"
          value={formatCurrency(userDeposit)}
          action={
            <button className="bg-[#F74A17] h-[27px] w-[54px] rounded-[8px] text-[16px] font-bold hover:bg-[#F74A17]/90 text-white">
              Claim
            </button>
          }
        /> */}
        </div>

        {/* <div>
        <PositionTable
          connectedNetworkName={network}
          positions={pools}
          morpho={morpho}
          userAddress={userAddress}
        />
      </div> */}

      <div>
        <div className="p-3 flex gap-5 items-center overflow-x-auto bg-white dark:bg-[#1A1A1A] rounded-t-[20px] mt-5">
          <h1
            className={cn(
              "text-[20px] font-medium",
              fontSpace_Grotesk.className
            )}>
            My Positions
          </h1>
          <SliderButton
            isSupply={isSupply}
            setIsSupply={setIsSupply}
          />
        </div>

          {/* Conditional Rendering for Supply and Borrow */}
          {isSupply ? (
            <SupplyPosition
              connectedNetworkName={network}
              positions={pools}
              morpho={morpho}
              userAddress={userAddress}
            />
          ) : (
            <BorrowPosition
              connectedNetworkName={network}
              positions={pools}
              morpho={morpho}
              userAddress={userAddress}
            />
          )}
        </div>

      <div className="flex justify-between items-center gap-5 flex-col lg:flex-row w-[100%] my-5">
        <div className="w-[100%] lg:w-[50%] bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[20px]">
          <div>
            <h2
              className={cn(
                "text-[20px] leading-[24px] font-medium mb-4 text-[#0C0A09] dark:text-[#FFFFFF] border-b border-dashed border-[#8C8FA166] ps-5 py-5",
                fontSpace_Grotesk.className
              )}>
              Supply & Earn
            </h2>
            <SupplyPools
              pools={pools}
              morpho={morpho}
              userAddress={userAddress}
            />
          </div>
        </div>

        <div className="w-[100%] lg:w-[50%] bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[20px]">
          <div>
            <h2
              className={cn(
                "text-[20px] leading-[24px] font-medium mb-4 text-[#0C0A09] dark:text-[#FFFFFF] border-b border-dashed border-[#8C8FA166] ps-5 py-5",
                fontSpace_Grotesk.className
              )}>
              Borrow
            </h2>

              <BorrowPools
                pools={pools}
                morpho={morpho}
                userAddress={userAddress}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

interface StatsCardProps {
  title: string;
  value: string;
  action?: React.ReactNode;
}

function StatsCard({ title, value, action }: StatsCardProps) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[20px] h-[103px] ps-5 pt-5 w-[100%] lg:w-[33.3%]">
      <div className="">
        <div className="flex flex-col space-y-2">
          <div className="inline-flex ">
            <p
              className={cn(
                "text-[14px] text-[#78716C] font-semibold border-b border-dashed border-[#78716C]",
                inter.className
              )}>
              {title}
            </p>
          </div>
          <div className="flex gap-5 items-center ">
            <span
              className={cn(
                "font-medium text-[32px] leading-[40.96px] text-[#1C1917] dark:text-[#FFFFFF]",
                inter.className
              )}>
              {value}
            </span>
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}
