"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import style from "./style.module.scss";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import UOS from "@/assets/images/tokenImg/UOS.png";
import { Manrope } from "next/font/google";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const inter = Manrope({ subsets: ["latin"] });
const fontManrope = Manrope({ subsets: ["latin"] });

function RewardsComponent() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-7 py-5 dark:bg-slate-800">
        <div className={cn(style.head)}>
        <h1 className={cn(inter.className, style._h1)}>Rewards</h1>
        
        </div>
        <div className="flex items-center space-x-2 w-max py-2 lg:py-0">
            <p className="__className_da1155 text-muted-foreground text-sm whitespace-pre">
              <span
                className={cn(
                  fontManrope.className,
                  "text-muted-foreground text-sm whitespace-pre"
                )}
              >
                {"Hide small pools (< $1000) "}
              </span>
              <Switch />
            </p>
            {/* <Input
              placeholder="Search"
              className="ring-0 bg-gray-200 lg:w-[316px] outline-none"
            /> */}
          </div>
        <div className={cn(style.head)}>
            <span className="text-muted-foreground text-sm __className_587f35 ">There are a number of ways to earn PRISMA, such as minting mkUSD or USBD against a collateral or by depositing mkUSD or USBD in to the Stability Pool. Each week, the amount of PRISMA allocated to these actions changes depending on the outcome of the emissions vote.  Learn more</span>
        </div>
    </div>
    </div>         
  );
};

export default RewardsComponent;
