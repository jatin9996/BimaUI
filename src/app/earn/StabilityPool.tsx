"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import style from "./style.module.scss";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import UOS from "@/assets/images/tokenImg/UOS.png";
import { Manrope } from "next/font/google";
import { ChevronDown, Loader2 } from "lucide-react";
import EarnDataTbl, { TStabilityPool } from "./EarnDataTbl";
import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import chains from "@/scripts/chains";
import { ethers } from "ethers";
import { useEarnContext } from "./contextFile";
import contracts from "@/scripts/contracts";
const inter = Manrope({ subsets: ["latin"] });

// const data: TStabilityPool[] = [
//   {
//     id: "m5gr84i9",
//     token: {
//       icon: mkUSD,
//       title: "mUSD",
//       label: "Prisma",
//     },
//     amountTVL: 998310,
//     unboostedAPR: 4613,
//     deposit: 99225,
//     boostedAPR: 0,
//     earned: 0,
//   },
//   {
//     id: "3u1reuv4",
//     token: {
//       icon: UOS,
//       title: "UOS",
//       label: "USBD",
//     },
//     amountTVL: 999310,
//     unboostedAPR: 7613,
//     deposit: 4225,
//     boostedAPR: 52,
//     earned: 5,
//   },
// ];
interface IStabilitypool {
  pools: TStabilityPool[];
}

const StabilityPool: React.FC<IStabilitypool> = ({ pools }) => {
  const [showTbl, setShowTbl] = React.useState(true);
  // const [poolsData, setPoolsData] = React.useState<TStabilityPool[]>([]);
  // const [poolsData, setPoolsData] = React.useState<TStabilityPool[]>([]);
  const [chainId, setChainId] = React.useState<number>(0);
  const [network, setNetwork] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setDebtAddress, setpoolAddress } = useEarnContext();
  // const { isConnected, address } = useAccount();

  const chain = useChainId();
  useEffect(() => {
    setChainId(chain);
    setNetwork(chains[chain].NetworkName);
    const contract = contracts[chains[chain].NetworkName];
    setDebtAddress(contract?.SPPools[0].tokenAddress);
    setpoolAddress(contract?.SPPools[0].poolAddress);
  }, [chain]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Set loading to true before fetching data
  //     try {
  //       const userAddres = isConnected?address:ethers.ZeroAddress
  //       const response = await fetch(`/api/earn/pools?network=${network}&user=${userAddres}`);
  //       const { data } = await response.json();
  //       console.log("PoolsData -> ", data);
  //       setPoolsData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching data
  //     }
  //   };
  //   if (network) {
  //     fetchData();
  //   }
  // }, [network,isConnected]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Set loading to true before fetching data
  //     try {
  //       const userAddres = isConnected?address:ethers.ZeroAddress
  //       const response = await fetch(`/api/earn/pools?network=${network}&user=${userAddres}`);
  //       const { data } = await response.json();
  //       console.log("PoolsData -> ", data);
  //       setPoolsData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching data
  //     }
  //   };
  //   if (network) {
  //     fetchData();
  //   }
  // }, [network,isConnected]);

  return (
    <div
      className={cn(
        style.stability_pool,
        "bg-white dark:bg-[#1A1A1A] dark:text-white mt-5"
      )}
    >
      <div className={cn(style.head)}>
        <h1 className={cn(inter.className, style._h1)}>Stability Pool</h1>
        <button
          className={cn("hover:bg-slate-200 dark:hover:bg-slate-600")}
          onClick={() => setShowTbl((_) => !_)}
        >
          <ChevronDown />
        </button>
      </div>
      {/* {showTbl && <EarnDataTbl data={poolsData} />} */}

      {showTbl &&
        (loading ? (
          <Loader2
            size={35}
            className="animate-spin absolute left-[50%] mt-5 dark:text-white"
          />
        ) : (
          <EarnDataTbl data={pools} />
        ))}
    </div>
  );
};

export default StabilityPool;
