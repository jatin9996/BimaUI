import React from "react";
import Delta from "@/assets/icons/Delta.svg";
import Gamma from "@/assets/icons/Gamma.svg";
import Rho from "@/assets/icons/Rho.svg";
import Gammax from "@/assets/icons/Gammax.svg";
import Image from "next/image";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import CopyBtn from "@/components/ui/CopyButtonEarn";
import Card from "./Card";
import { string } from "valibot";
import DescriptionSection from "./Description";
import Deposite from "./Deposite";
import { CornerUpRight } from "lucide-react";
import RiskTable from "./RiskTable";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const EarnDetail = ({ params }: { params: { pair: string } }) => {
  const { pair } = params;

  const Data: Record<
    string,
    {
      logo: string;
      totalDeposited: string;
      historicalAPY: string;
      valueInWETH: string;
      extraEarned: string;
      description: string;
      fees: {
        management: string;
        performance: string;
      };
      apy: {
        last7Days: string;
        last30Days: string;
        inception: string;
      };
    }
  > = {
    "delta-neutral": {
      logo: Delta,
      totalDeposited: "1,300.4",
      historicalAPY: "16.24%",
      valueInWETH: "0.00",
      extraEarned: "0.00",
      description:
        "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la im",
      fees: {
        management: "0%",
        performance: "10%",
      },
      apy: {
        last7Days: "14.27%",
        last30Days: "16.44%",
        inception: "3.15%",
      },
    },
    "gamma-neutral": {
      logo: Gamma,
      totalDeposited: "1,300.4",
      historicalAPY: "16.24%",
      valueInWETH: "0.00",
      extraEarned: "0.00",
      description:
        "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la im",
      fees: {
        management: "0%",
        performance: "10%",
      },
      apy: {
        last7Days: "14.27%",
        last30Days: "16.44%",
        inception: "3.15%",
      },
    },
    "rho-neutral": {
      logo: Rho,
      totalDeposited: "1,300.4",
      historicalAPY: "16.24%",
      valueInWETH: "0.00",
      extraEarned: "0.00",
      description:
        "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la im",
      fees: {
        management: "0%",
        performance: "10%",
      },
      apy: {
        last7Days: "14.27%",
        last30Days: "16.44%",
        inception: "3.15%",
      },
    },
    "gamma-x-rho": {
      logo: Gammax,
      totalDeposited: "1,300.4",
      historicalAPY: "16.24%",
      valueInWETH: "0.00",
      extraEarned: "0.00",
      description:
        "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la im",
      fees: {
        management: "0%",
        performance: "10%",
      },
      apy: {
        last7Days: "14.27%",
        last30Days: "16.44%",
        inception: "3.15%",
      },
    },
  };

  const data = Data[pair];

  if (!data) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500 font-semibold">Vault data not found.</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Deposited",
      value: data.totalDeposited,
      subValue: "$4,567.1",
    },
    {
      title: "Historical APY",
      value: data.historicalAPY,
      subValue: "EST. APY → 34.56%",
    },
    { title: "Value in WETH", value: data.valueInWETH, subValue: "0.00" },
    { title: "Extra Earned, dYFI", value: data.extraEarned, subValue: "0.00" },
  ];

  return (
    <div className=" py-6">
      {/* Header */}

      <div className="flex justify-center text-center items-center flex-col gap-5">
        <div>
          <Image src={data.logo} alt="logo" className="size-[64px]" />
        </div>
        <div className="flex flex-col items-center gap-5">
          <h1
            className={cn(
              "text-[48px] font-normal leading-[60px] text-[#1C1917] capitalize",
              fontMonrope.className
            )}
          >
            {pair.replace(/-/g, " ")}
          </h1>
          <CopyBtn text="0xAC...571" />
        </div>

        <div className="flex gap-4">
          <button
            className={cn(
              "px-3 h-[28px] bg-white rounded-[8px] text-[14px] font-semibold text-[#312D2C]",
              fontMonrope.className
            )}
          >
            Wrapped Ether
          </button>
          <button
            className={cn(
              "px-3 h-[28px] bg-white rounded-[8px] text-[14px] font-semibold text-[#312D2C]",
              fontMonrope.className
            )}
          >
            Ethereum
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div>
        <Card cards={cards} />
      </div>

      {/* Deposit/Withdraw/Stake Section */}
      <div className=" mt-6 flex  flex-wrap gap-5 w-[100%] ">
        <div className="w-[50%] flex-1">
          <Deposite />
          {/* More Information */}
          <div className=" mt-6 bg-[#D6D3D1] p-6 shadow-md rounded-[20px]">
            <h2
              className={cn(
                "text-[24px] font-semibold text-[#151618] mb-4",
                fontMonrope.className
              )}
            >
              More Information
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
                <span
                  className={cn(
                    "text-[14px] font-semibold text-[#78716C]",
                    fontMonrope.className
                  )}
                >
                  Deposit contract
                </span>
                <span
                  className={cn(
                    "text-[14px] font-medium text-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  <a href="#" className="flex gap-1 items-center">
                    {/* Mobile View */}
                    <span className="block lg:hidden">
                      {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                    </span>

                    {/* Desktop View */}
                    <span className="hidden lg:block">
                      0x6953504F2f4537D7a7B4024508f321f7816BB6ED{" "}
                    </span>
                    <CornerUpRight className="size-[14px]" />
                  </a>
                </span>
              </div>

              {/* LP Token */}
              <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
                <span
                  className={cn(
                    "text-[14px] font-semibold text-[#78716C]",
                    fontMonrope.className
                  )}
                >
                  LP token
                </span>
                <span
                  className={cn(
                    "text-[14px] font-medium text-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  <a href="#" className="flex gap-1 items-center">
                    <span className="block sm:hidden">
                      {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                      {/* Mobile View */}
                    </span>
                    <span className="hidden sm:block">
                      0x6953504F2f4537D7a7B4024508f321f7816BB6ED{" "}
                      {/* Desktop View */}
                    </span>
                    <CornerUpRight className="size-[14px]" />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-[50%] flex-1 bg-white p-6 shadow-md rounded-[20px]">
          <DescriptionSection
            description={data.description}
            apy={data.apy}
            fees={data.fees}
          />
        </div>
      </div>

      <div className="w-[100%]">
        <RiskTable />
      </div>
    </div>
  );
};

export default EarnDetail;
