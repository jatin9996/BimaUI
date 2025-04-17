"use client";
import { HeadBtn, LargeCard } from "./DepositCard";
import { cn } from "@/lib/utils";
import { CornerUpRight } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import React, { Suspense } from "react";
import { useEarnContext } from "../contextFile";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const Deposite = () => {
  const { tvl, deposit, poolAddress, debtAddress } = useEarnContext();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Suspense>
        <HeadBtn />
      </Suspense>

      <div className="h-[120px] w-full bg-white dark:bg-[#1A1A1A]  rounded-2xl p-5 grid grid-cols-2 items-center mb-3">
        <div>
          <div className="flex items-center justify-start space-x-3">
            <span className="text-theme font-semibold text-2xl">
              {formatCurrency(tvl)}
            </span>
            {/* <span className="font-semibold dark:text-gray-100"></span> */}
          </div>
          <small className="text-muted-foreground">Pool TVL</small>
        </div>
        <div>
          <div>
            <span className="font-semibold text-2xl dark:text-gray-100">
              {formatCurrency(deposit)}
            </span>
          </div>
          <small className="text-muted-foreground">Your Deposit</small>
        </div>
      </div>

      <LargeCard />
      {/* <div className="h-32 w-full bg-gray-200 dark:bg-slate-800  rounded-2xl p-2 lg:p-5  my-3">
        <h1 className={cn(inter.className, "text-lg font-semibold")}>
          More information
        </h1>
        <ul>
          <li className="flex flex-col lg:flex-row justify-between lg:items-center text-xs  md:text-sm ">
            <span className="text-muted-foreground">Stability Pool</span>
            <Link href={"/earn"} className="text-blue-600 inline-flex">
              0x6953504F2f4537D7a7B4024508f321f7816BB6ED{" "}
              <CornerUpRight size={12} />
            </Link>
          </li>
          <li className="flex flex-col lg:flex-row justify-between lg:items-center text-xs md:text-sm">
            <span className="text-muted-foreground">Prisma USBD</span>
            <Link href={"/earn"} className="text-blue-600 inline-flex">
              0x6953504F2f4537D7a7B4024508f321f7816BB6ED{" "}
              <CornerUpRight size={12} />
            </Link>
          </li>
        </ul>
      </div> */}

      <div className=" my-5 bg-[#D6D3D1] p-6 shadow-md rounded-[20px]">
        <h2
          className={cn(
            "text-[24px] font-semibold text-[#151618] mb-4",
            fontMonrope.className
          )}
        >
          More Information
        </h2>
        <div className="flex flex-col gap-3">
          {/* <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
            <span
              className={cn(
                "text-[14px] font-semibold text-[#78716C]",
                fontMonrope.className
              )}
            >
              SP Pool contract
            </span>
            <span
              className={cn(
                "text-[14px] font-medium text-[#F74A17]",
                fontSpace_Grotesk.className
              )}
            > */}
          {/* <a href="#" className="flex gap-1 items-center"> */}
          {/* Mobile View */}
          {/* <span className="block lg:hidden">
                  {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                </span> */}

          {/* Desktop View */}
          {/* <span className="hidden lg:block">
                  {debtAddress}{" "}
                </span>
                <CornerUpRight className="size-[14px]" />
              </a>
            </span>
          </div> */}

          {/* LP Token */}
          <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
            <span
              className={cn(
                "text-[14px] font-semibold text-[#78716C]",
                fontMonrope.className
              )}
            >
              USBD Token Contract
            </span>
            <span
              className={cn(
                "text-[14px] font-medium text-[#F74A17]",
                fontSpace_Grotesk.className
              )}
            >
              <a href="#" className="flex gap-1 items-center">
                <span className="block sm:hidden">
                  {debtAddress.slice(0, 34)}... {/* Mobile View */}
                </span>
                <span className="hidden sm:block">
                  {debtAddress} {/* Desktop View */}
                </span>
                <CornerUpRight className="size-[14px]" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposite;
