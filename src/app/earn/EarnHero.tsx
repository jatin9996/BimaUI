import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import vault_value_bg from "@/assets/icons/vault_value_bg.svg";
import barCircle2 from "@/assets/icons/barCircle2.svg";
import { useEarnContext } from "./contextFile";
import CountUp from "react-countup";
import PlatformStatsTab from "./Platform_Statistics";
const fontMonrope = Manrope({ subsets: ["latin"] });

export type IEarnStat = {
  totaltvl: string;
  apr: string;
  usbdBalance: string;
  mydeposit: string;
};

const EarnHero: React.FC<IEarnStat> = ({
  totaltvl,
  apr,
  usbdBalance,
  mydeposit,
}) => {
  const { setTVL, setAPR, setDeposit, setbalance } = useEarnContext();
  const [isTabOpen, setIsTabOpen] = useState(false);

  const openTab = () => setIsTabOpen(true);
  const closeTab = () => setIsTabOpen(false);

  console.log("USBDBalance->", usbdBalance);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  setTVL(totaltvl);
  setAPR(apr);
  setDeposit(mydeposit);
  setbalance(usbdBalance);

  return (
    <div className="flex-col flex xl:flex-row items-center justify-between gap-5">
      {/* <div
        className={cn(
          "w-[100%] lg:w-[65%] h-[160px] xl:h-[108px] px-3 flex justify-around lg:justify-between items-center flex-col lg:flex-row border border-[#E7E5E4] rounded-[20px]",
          fontMonrope.className
        )}
      > */}
      {/* <div className="flex items-center gap-5">
          <Image src={barCircle2} alt="earn" className="w-[52px]" />
          <div className="flex flex-col gap-[5px]">
            <span className="text-[20px] font-[600] leading-[22.4px] text-[#151618]">
              Earn up to 31.88% APR
            </span>
            <span className="text-[14px] font-[600] leading-[15.68px] text-[#A8A29E]">
              on any mkUSD you mint by depositing into the Stability Pool.
            </span>
          </div>
        </div> */}

      {/* <div>
          <button className="h-[36px] w-[130px] bg-[#0A0A0A] rounded-[8px] text-[16px] font-[500] text-white">
            Take me there
          </button>
        </div> */}
      {/* </div> */}

      {/* <div className="bg-white rounded-[20px] flex items-center xl:items-start justify-around flex-col xl:flex-row  pt-5 h-[160px] xl:h-[108px] w-[100%] lg:w-[35%]">
        <div className="flex flex-col gap-2">
          <h2
            className={cn(
              "text-[28px] font-semibold leading-[31.36px] text-[#151618]",
              fontMonrope.className
            )}
          >
            Connect Wallet
          </h2>
          <p
            className={cn(
              "text-[14px] font-semibold leading-[20.16px] text-[#78716C]",
              fontMonrope.className
            )}
          >
            Connect wallet to view your portfolio!
          </p>
        </div>
        <div>
          <button className="w-[120px] h-[33px] rounded-[12px] bg-[#F74A17] text-[14px] font-normal text-[#FFFFFF]">
            Connect Wallet
          </button>
        </div>
      </div> */}

      <div
        className={cn(
          "flex items-center justify-between w-[100%] gap-5 flex-col xl:flex-row",
          fontMonrope.className
        )}
      >
        <div className="relative w-[100%] lg:w-[50%] h-[103px] flex justify-start items-center gap-5 lg:gap-10 rounded-[20px] ps-5 bg-white dark:bg-[#1A1A1A]">
          {/* TVL Section */}
          <div className="flex flex-col gap-2 lg:gap-[5px]">
            <span className="text-[14px] font-[600] text-[#78716C] leading-[20.16px]">
              TVL
            </span>
            <span
              className="text-[22px] lg:text-[32px] font-[500] text-[#1C1917] dark:text-[#FFFFFF] leading-[40.96px] "
              style={{ width: "120px", textAlign: "left" }}
            >
              <CountUp
                start={0}
                end={parseFloat(totaltvl?.toString().replace(/[^0-9.-]+/g, ""))}
                duration={2.5}
                separator=","
                formattingFn={formatCurrency}
                prefix="$"
              />
            </span>
          </div>

          {/* APR Section */}
          <div className="flex flex-col gap-[5px]">
            <span className="text-[14px] font-[600] text-[#78716C] leading-[20.16px] text-left">
              APR
            </span>
            <span
              className="text-[22px] lg:text-[32px] font-[500] text-[#1C1917] dark:text-[#FFFFFF] leading-[40.96px]"
              style={{ width: "100px", textAlign: "left" }}
            >
              {apr}%
            </span>
          </div>

          {/* See More Button */}
          {/* <button
            onClick={openTab}
            className="absolute right-2 top-2 flex items-center gap-[3px] bg-transparent text-[16px] text-[#919191] font-[500] z-10"
          >
            See More <ArrowUpRight />
          </button> */}
          {/* <PlatformStatsTab
            isOpen={isTabOpen}
            onClose={() => setIsTabOpen(false)}
          /> */}

          {/* Background Image */}
          <div className="absolute right-0 top-0 hidden xl:block dark:hidden">
            <Image src={vault_value_bg} alt="bg" className="rounded-[20px]" />
          </div>
        </div>

        <div className="relative w-[100%] lg:w-[50%] h-[103px] flex justify-start items-center gap-5 lg:gap-10 ps-5 rounded-[20px] bg-white dark:bg-[#1A1A1A]">
          <div className="flex flex-col gap-[5px]">
            <span className="text-[14px] font-[600] text-[#78716C] leading-[20.16px]">
              USBD Balance
            </span>
            <span
              className="text-[22px] lg:text-[32px] font-[500] text-[#1C1917] dark:text-[#FFFFFF] leading-[40.96px]"
              style={{ width: "120px", textAlign: "left" }}
            >
              <CountUp
                start={0}
                end={parseFloat(
                  usbdBalance?.toString().replace(/[^0-9.-]+/g, "")
                )}
                duration={2.5}
                separator=","
              />
            </span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[14px] font-[600] text-[#78716C] leading-[20.16px]">
              Your Deposit
            </span>
            <span
              className="text-[22px] lg:text-[32px] font-[500] text-[#1C1917] dark:text-[#FFFFFF] leading-[40.96px]"
              style={{ width: "100px", textAlign: "left" }}
            >
              <CountUp
                start={0}
                end={parseFloat(
                  mydeposit?.toString().replace(/[^0-9.-]+/g, "")
                )}
                duration={2.5}
                separator=","
                formattingFn={formatCurrency}
                prefix="$"
              />
            </span>
          </div>

          <div className="absolute right-0 top-0 hidden xl:block dark:hidden">
            <Image src={vault_value_bg} alt="bg" className="rounded-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnHero;
