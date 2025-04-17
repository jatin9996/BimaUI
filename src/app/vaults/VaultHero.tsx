import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import vault_value_bg from "@/assets/icons/vault_value_bg.svg";
import barCircle2 from "@/assets/icons/barCircle2.svg";
import router from "next/router";
import { usePathname } from "next/navigation";
const fontMonrope = Manrope({ subsets: ["latin"] });

const VaultHero = () => {
  const pathname = usePathname();
  const handleClick = async () => {
    const host =
      `${window.location.host}` === "localhost:3000"
        ? `http://${window.location.host}`
        : `https://${window.location.host}`;

    if (pathname === "/vaults") window.location.assign(`${host}/earn`);
  };

  return (
    <div className="flex-col flex xl:flex-row items-center justify-between gap-5">
      <div
        className={cn(
          "w-[100%] lg:w-[65%] h-[160px] xl:h-[108px] px-3 flex justify-around lg:justify-between items-center flex-col lg:flex-row border border-[#E7E5E4] rounded-[20px]",
          fontMonrope.className
        )}
      >
        <div className="flex items-center gap-5">
          <Image src={barCircle2} alt="earn" className="w-[52px]" />
          <div className="flex flex-col gap-[5px]">
            <span className="text-[20px] font-[600] leading-[22.4px] text-[#151618] dark:text-[#ffffff]">
              Earn competitive APR
            </span>
            <span className="text-[14px] font-[600] leading-[15.68px] text-[#A8A29E]">
              on any USBD you mint by depositing into the Earn Pool.
            </span>
          </div>
        </div>

        <div>
          <button
            className="h-[36px] w-[130px] bg-[#0A0A0A] rounded-[8px] text-[16px] font-[500] text-white"
            onClick={handleClick}
          >
            Take me there
          </button>
        </div>
      </div>

      {/* <div className="bg-white rounded-[20px] flex items-start justify-around pt-5 h-[108px] w-[100%] lg:w-[35%]">
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
    </div>
  );
};

export default VaultHero;
