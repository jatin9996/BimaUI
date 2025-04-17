"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import style from "./style.module.scss";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import UOS from "@/assets/images/tokenImg/UOS.png";
import { Manrope } from "next/font/google";
import { ChevronDown } from "lucide-react";
import EarnDataTbl, { TStabilityPool } from "../earn/EarnDataTbl";
import { useEffect, useRef } from "react";

const inter = Manrope({ subsets: ["latin"] });

function Statistics() {
  const [showTbl, setShowTbl] = React.useState(true);
  const boostRef = useRef<HTMLHeadingElement>(null);

  const boostReward = useRef<HTMLHeadingElement>(null);

  const boostDeposite = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
      const boostElement = boostReward.current;
      if (boostElement) {
          let currentBoost = 0;
          const interval = setInterval(() => {
              currentBoost += 10.64;
              if (currentBoost >= 76.64) {
                  clearInterval(interval);
                  currentBoost = 76.64;
              }
              boostElement.textContent = currentBoost.toFixed(2);
          }, 50);
          return () => clearInterval(interval);
      }
  }, []);

  useEffect(() => {
    const boostElement = boostDeposite.current;
    if (boostElement) {
        let currentBoost = 0;
        const interval = setInterval(() => {
            currentBoost += 100.35;
            if (currentBoost >= 1254.65) {
                clearInterval(interval);
                currentBoost = 1254.65;
            }
            boostElement.textContent = currentBoost.toFixed(2);
        }, 50);
        return () => clearInterval(interval);
    }
}, []);

useEffect(() => {
    const boostElement = boostRef.current;
    if (boostElement) {
        let currentBoost = 0;
        const interval = setInterval(() => {
            currentBoost += 1.00;
            if (currentBoost >= 5) {
                clearInterval(interval);
                currentBoost = 5;
            }
            boostElement.textContent = currentBoost.toFixed(2) + "x";
        }, 50);
        return () => clearInterval(interval);
    }
}, []);


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-7 py-5 dark:bg-slate-800">
        <span className="text-muted-foreground text-sm __className_587f35">Total Rewards</span>
            <h1 className="text-4xl __className_587f35" ref={boostReward}>$00.00</h1>
            <span className="text-muted-foreground text-sm __className_587f35">Lockable with a max boost</span>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-7 py-5 dark:bg-slate-800">
        <span className="text-muted-foreground text-sm __className_587f35">Total Deposits</span>
            <h1 className="text-4xl __className_587f35" ref={boostDeposite}>$0000.00</h1>
        <span className="text-muted-foreground text-sm __className_587f35">Lockable with a max boost</span>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-7 py-5 dark:bg-slate-800">
        <span className="text-muted-foreground text-sm __className_587f35">Your Boost</span>

            <h1 className="text-4xl __className_587f35" ref={boostRef}>0.00x</h1>
            {/* <h1 className="text-4xl __className_587f35" ref={}>0.00x</h1> */}
            <span className="text-muted-foreground text-sm __className_587f35">Total Rewards</span>
        </div>
    </div>
  );
};

export default Statistics;
