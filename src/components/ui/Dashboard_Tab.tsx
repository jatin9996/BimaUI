import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Bg_tab from "@/assets/icons/Bg_tab.svg";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const fontMonrope = Manrope({ subsets: ["latin"] });

type TabContent = {
  title: string;
  mainValue: string;
  subValue?: string;
};

type Tab = {
  id: string;
  content: TabContent[];
};

export const Tabs: React.FC = () => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  const tabsData: Tab[] = [
    {
      id: "tab1",
      content: [
        {
          title: "Total USBD Circulating",
          mainValue: "$1200000",
        },
      ],
    },
    {
      id: "tab2",
      content: [
        {
          title: "Total Value Locked",
          mainValue: "$4400000",
        },
      ],
    },
    {
      id: "tab3",
      content: [
        {
          title: "Current APY",
          mainValue: "5 - 20%",
        },
      ],
    },
    {
      id: "tab4",
      content: [
        {
          title: "Active Vaults",
          mainValue: "1,200",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        {tabsData.map((tab, tabIndex) => (
          <div
            key={tab.id}
            className="transition-transform transform hover:scale-105"
          >
            <div>
              {tab.content.map((item, index) => {
                // Intersection Observer hook
                const { ref, inView } = useInView({
                  threshold: 0.5, // Trigger when 50% of the card is visible
                  triggerOnce: true, // Animation happens only once
                });

                const isPercentage = item.mainValue.includes("%");
                const isAPY = item.mainValue.includes("-");
                return (
                  <div
                    ref={ref}
                    key={index}
                    className={cn(
                      "relative bg-white rounded-[24px] shadow-md border ps-5 pt-5 border-[#DFE1E7] h-[157px] w-[295px] lg:w-[588px] dark:bg-[#212121] dark:border-[#302F2E] overflow-hidden",
                      fontMonrope.className
                    )}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${Bg_tab.src})`,
                      }}
                    ></div>

                    <div className="absolute inset-0 bg-[#212121] opacity-0 dark:opacity-90"></div>

                    {/* Overlay */}
                    <div className="relative z-10">
                      <p className="text-[14px] font-medium text-[#666D80] dark:text-[#B2B1B0]">
                        {item.title}
                      </p>

                      <p className="text-[24px] font-semibold text-[#F74A17] my-3">
                        {isAPY?(
                          `${item.mainValue}`
                      ):inView ? (
                      <CountUp
                        start={0}
                        end={parseFloat(
                          item.mainValue.replace(/[^0-9.-]+/g, "")
                        )}
                        duration={2.5}
                        separator=","
                        prefix={isPercentage ? "" : "$"}
                        formattingFn={(value) =>
                          isPercentage ? `${value}%` : formatCurrency(value)
                        }
                      />
                    ) : isPercentage ? (
                      "0%"
                    ) : (
                      "$0"
                    )}
                      </p>

                      {item.subValue && (
                        <p className="text-[14px] font-medium text-[#666D80] dark:text-[#B2B1B0]">
                          {item.subValue}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
