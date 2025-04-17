"use client";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import React, { Suspense, useEffect, useState } from "react";
import { DetailCard, HeadBtn, InfoCard, LargeCard } from "./DepositCard";
import vault from "@/scripts/vaults";
const inter = Manrope({ subsets: ["latin"] });
import { useAccount } from "wagmi";

const Deposite = ({}) => {
  const [show, setShow] = useState(false);
  const [chainId, setChainId] = useState<string>("");

  // useEffect(() => {
  //   if (wallet) {
  //     if (wallet.provider) {
  //       if (chainId==wallet.chains[0].id) {
  //         setShow(false);
  //       }
  //     }
  //   }
  // },[wallet]);

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Suspense>
        <HeadBtn />
        {/* {show && <NetworkError chainId={chainId} setShow={setShow} />} */}
      </Suspense>
      <InfoCard />
      <LargeCard setShow={setShow} />
      <DetailCard />
      {/* <div
        className={cn(
          "w-full bg-gray-300/30 dark:bg-slate-800 rounded-2xl p-5 my-3 grid grid-cols-2",
          inter.className
        )}
      >
        <div>
          <h1 className={cn("text-lg font-semibold")}>110.0%</h1>
          <p className="text-sm text-muted-foreground font-semibold">
            Minimum Collat. Ratio
          </p>
        </div>
        <div>
          <h1 className={cn("text-lg font-semibold")}>$3,386.99</h1>
          <p className="text-sm text-muted-foreground font-semibold">
            Price of stBTC
          </p>
        </div>
        <div>
          <h1 className={cn("text-lg font-semibold")}>100.00M</h1>
          <p className="text-sm text-muted-foreground font-semibold">
            Total USBD mintable
          </p>
        </div>
        <div>
          <h1 className={cn("text-lg font-semibold")}>6.60M</h1>
          <p className="text-sm text-muted-foreground font-semibold">
            USBD minted
          </p>
        </div>
        <div>
          <h1 className={cn("text-lg font-semibold")}>$6.60M</h1>
          <p className="text-sm text-muted-foreground font-semibold">
            stBTC TVL
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Deposite;
