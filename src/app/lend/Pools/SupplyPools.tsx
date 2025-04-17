"use client";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Manrope({ subsets: ["latin"] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export interface Pool {
  id: number;
  name: string;
  marketSize: string;
  apr: number;
  yourLends: number;
  src: string;
  src2: string;
}

interface SupplyPoolsProps {
  pools: any[];
  morpho: any;
  userAddress: string | null;
}

export function SupplyPools({ pools, morpho, userAddress }: SupplyPoolsProps) {
  const [supplyUserData, setsupplyUserData] = useState<
    Record<number, { totalLends: string }>
  >({});
  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  useEffect(() => {
    async function fetchsupplyUserData() {
      const updatedsupplyUserData: Record<number, { totalLends: string }> = {};

      for (const pool of pools) {
        try {
          const marketId = morpho?.generateMarketId(pool.marketParams);
          const userData = await morpho?.getUserLendsAndBorrows(
            marketId,
            userAddress
          );
          updatedsupplyUserData[pool.id] = {
            totalLends: formatUSBD(Number(userData?.totalLends) ?? 0),
          };
        } catch (error) {
          console.error(`Error fetching data for pool ${pool.id}:`, error);
          updatedsupplyUserData[pool.id] = { totalLends: "$0" };
        }
      }

      setsupplyUserData(updatedsupplyUserData);
    }

    if (morpho && userAddress) {
      fetchsupplyUserData();
    }
  }, [morpho, userAddress, pools]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className={cn(
          "flex justify-between items-center py-3 px-5 text-[14px] font-semibold leading-[20.16px] text-[#A8A29E]",
          inter.className
        )}
      >
        <div className="w-1/3">Market Size</div>
        <div className="w-1/3 text-center">APR</div>
        <div className="w-1/3 text-right flex items-center justify-end gap-1">
          Your Lends
          <ChevronsUpDown />
        </div>
      </div>

      {/* Pool Rows */}
      {pools.map((pool: any) => (
        <Link
          key={pool.id}
          href={`/lend/supply?pool=${pool.id}`}
          className="block hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17] rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between px-5 py-4">
            {/* Market Size */}
            <div className="w-1/3 flex items-center gap-2">
              <div className="flex -space-x-2">
                <img
                  src={pool.debtTokenImage}
                  alt="Icon 1"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white bg-white"
                />
                <img
                  src={pool.collateralTokenImage}
                  alt="Icon 2"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white bg-white"
                />
              </div>
              <div>
                <p
                  className={cn(
                    "font-semibold text-[16px] dark:text-[#FFFFFF] ",
                    inter.className
                  )}
                >
                  {pool.debtToken}/{pool.collateralToken}
                </p>
                <p
                  className={cn(
                    "text-sm text-gray-500 dark:text-[#FFFFFF]",
                    inter.className
                  )}
                >
                  ${pool.marketSize}
                </p>
              </div>
            </div>

            {/* APR */}
            <div
              className={cn(
                "w-1/3 text-center font-medium leading-[17.92px] text-[#151618] dark:text-[#FFFFFF] text-[16px]",
                fontSpace_Grotesk.className
              )}
            >
              {pool.interest}%
            </div>

            {/* Your Lends */}
            <div className="w-1/3 text-right">
              <span
                className={cn(
                  "text-[16px] font-medium leading-[17.92px] text-[#8C8FA1] dark:text-[#FFFFFF]",
                  fontSpace_Grotesk.className
                )}
              >
                $ {supplyUserData[pool.id]?.totalLends ?? "0"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
