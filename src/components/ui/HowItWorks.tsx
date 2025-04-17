import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Manrope } from "next/font/google";
import Stakes from "@/assets/images/how-it-works/Stakes.svg";
import Stakes_Dark from "@/assets/images/how-it-works/Stakes_Dark.svg";
import LST from "@/assets/images/how-it-works/LST.svg";
import LST_Dark from "@/assets/images/how-it-works/LST_Dark.svg";
import USBD from "@/assets/images/how-it-works/USBD.svg";
import USBD_Dark from "@/assets/images/how-it-works/USBD_Dark.svg";
import Yield from "@/assets/images/how-it-works/Yield.svg";
import Yield_Dark from "@/assets/images/how-it-works/Yield_Dark.svg";
import stake_mobile from "@/assets/images/how-it-works/stake_mobile.svg";
import LST_mobile from "@/assets/images/how-it-works/LST_mobile.svg";
import USBD_mobile from "@/assets/images/how-it-works/USBD_mobile.svg";
import yield_mobile from "@/assets/images/how-it-works/yield_mobile.svg";

type Option = {
  id: number;
  title: string;
  tagline: string;
  lightSrc: StaticImageData;
  darkSrc: StaticImageData;
  mobileSrc: StaticImageData;
};

const fontMonrope = Manrope({ subsets: ["latin"] });

const options: Option[] = [
  {
    id: 1,
    title: "Stake",
    tagline: "Stake BTC to receive LSTs",
    lightSrc: Stakes,
    darkSrc: Stakes_Dark,
    mobileSrc: stake_mobile,
  },
  {
    id: 2,
    title: "Deposit",
    tagline: "Deposit your LSTs in BIMA vaults",
    lightSrc: LST,
    darkSrc: LST_Dark,
    mobileSrc: LST_mobile,
  },
  {
    id: 3,
    title: "Mint",
    tagline: "mint USBD",
    lightSrc: USBD,
    darkSrc: USBD_Dark,
    mobileSrc: USBD_mobile,
  },
  {
    id: 4,
    title: "Earn",
    tagline: "Lend, Earn Yield, Provide Liquidity.",
    lightSrc: Yield,
    darkSrc: Yield_Dark,
    mobileSrc: yield_mobile,
  },
];

const HowItWorks = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const isDarkMode =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div className="flex justify-center items-center gap-[2%] w-[90%] mt-5 ">
      <div className="hidden lg:flex w-[49%] flex-col gap-6 space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center cursor-pointer transition-all duration-100 transform ${
              selectedOption === option.id
                ? "text-black dark:text-white scale-105"
                : "text-[#B2B1B0] dark:text-[#585654] hover:scale-105 hover:text-black hover:dark:text-white"
            }`}
            onMouseEnter={() => setSelectedOption(option.id)}
          >
            <div
              className={`relative ps-4 transition-all duration-100 ${
                selectedOption === option.id
                  ? "border-l-0"
                  : "border-l-[3px] border-[#B2B1B0] rounded-[2px] hover:border-[#F74A17]"
              }`}
            >
              {selectedOption === option.id && (
                <div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    background: `linear-gradient(to bottom, #F74A17 50%, #B2B1B0 50%)`,
                    height: "100%",
                    width: "3px",
                    borderRadius: "2px",
                  }}
                />
              )}
              <span
                className={cn(
                  "flex items-center gap-4 text-[24px] font-semibold leading-[28.8px] transition-all duration-100",
                  fontMonrope.className
                )}
              >
                <span
                  className={`text-[20px] font-semibold rounded-[8px] h-[40px] w-[40px] flex items-center justify-center transition-colors ${
                    selectedOption === option.id
                      ? "text-[#F74A17] dark:text-[#6B2200] bg-[#FFEEE6] dark:bg-[#FF5001]"
                      : "text-[#B2B1B0] border border-[#B2B1B0] dark:text-[#585654] dark:border-[#585654] hover:text-[#F74A17] hover:bg-[#FFEEE6]"
                  }`}
                >
                  {option.id}
                </span>
                {option.title}
              </span>
              <span
                className={cn(
                  "block text-[18px] text-[#666D80] font-[monorope] mt-1 font-normal leading-[25.2px] transition-opacity duration-300",
                  fontMonrope.className,
                  selectedOption === option.id
                    ? "text-[#666D80] dark:text-[#B2B1B0]"
                    : "text-[#B2B1B0] dark:text-[#585654]"
                )}
              >
                {option.tagline}
              </span>
              {selectedOption === option.id && (
                <div
                  className="absolute top-0 left-0 bg-[#F74A17]"
                  style={{ zIndex: -1 }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex justify-center items-center">
        <Image
          src={
            isDarkMode
              ? options.find((option) => option.id === selectedOption)
                  ?.darkSrc || ""
              : options.find((option) => option.id === selectedOption)
                  ?.lightSrc || ""
          }
          alt={`Selected option ${selectedOption}`}
          className="h-[100%] w-[100%] transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      <div className="block lg:hidden">
        {options.map((option) => (
          <div key={option.id} className="mb-8">
            <Image
              src={option.mobileSrc}
              alt={`Option ${option.id}`}
              className="w-full transition-transform duration-300 transform hover:scale-105"
            />
            <div className="mt-2">
              <h3
                className={cn(
                  "text-[18px] leading-[21.6px] flex items-center gap-3 font-[600] transition-transform duration-300",
                  fontMonrope.className
                )}
              >
                <span className="text-[12.59px] font-[600] rounded-[8px] h-[24px] sm:h-[40px] w-[24px] sm:w-[40px] flex items-center justify-center text-[#F74A17] dark:text-[#6B2200] bg-[#FFEEE6] dark:bg-[#FF5001]">
                  {option.id}
                </span>
                {option.title}
              </h3>
              <p className="text-[14px] leading-[16.8px] font-[400] mt-1 text-[#666D80] transition-opacity duration-300">
                {option.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
