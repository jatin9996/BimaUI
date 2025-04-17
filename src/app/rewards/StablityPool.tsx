"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import style from "./style.module.scss";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import UOS from "@/assets/images/tokenImg/UOS.png";
import { Manrope } from "next/font/google";
import { ChevronDown } from "lucide-react";
import FeesDataTbl, { TStabilityPool } from "./FeesDataTbl";

const inter = Manrope({ subsets: ["latin"] });

const data: TStabilityPool[] = [
  {
    id: "m5gr84i9",
    token: {
      icon: mkUSD,
      title: "mUSD",
      label: "Prisma",
    },
    amountTVL: 998310,
    unboostedAPR: 4613,
    deposit: 99225,
    boostedAPR: 0,
    earned: 0,
  },
  {
    id: "3u1reuv4",
    token: {
      icon: UOS,
      title: "UOS",
      label: "USBD",
    },
    amountTVL: 999310,
    unboostedAPR: 7613,
    deposit: 4225,
    boostedAPR: 52,
    earned: 5,
  },
];

const StabilityPool = () => {
  const [showTbl, setShowTbl] = React.useState(true);
  return (
    <div
      className={cn(
        style.stability_pool,
        "bg-white dark:bg-gray-700 dark:text-white gap-3"
      )}
    >
      <div className={cn(style.head)}>
        <h1 className={cn(inter.className, style._h3)}>Stability Pool</h1>
        <button
          className={cn("hover:bg-slate-200 dark:hover:bg-slate-600")}
          onClick={() => setShowTbl((_) => !_)}
        >
          <ChevronDown />
        </button>
      </div>
      {/* {showTbl && <FeesDataTbl data={data} />} */}
    </div>  
  );
};

export default StabilityPool;
