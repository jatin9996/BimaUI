"use client";
import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useState } from "react";
import USBD_2 from "@/assets/icons/USBD_2.svg";
import Image from "next/image";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const Deposite = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "stake">(
    "deposit"
  );

  const tabPositions = {
    deposit: "translate-x-0",
    withdraw: "translate-x-[100%]",
    stake: "translate-x-[198.5%]",
  };

  return (
    <div className="bg-white p-2 lg:p-6 shadow-md rounded-[20px] ">
      <div className="relative flex items-center bg-[#E7E5E4] rounded-[14px] h-[48px] w-[100%]">
        <div
          className={`absolute h-[44px] w-[33.3%] bg-[#FAFAF9] rounded-[14px] ms-[2.3px]  transition-transform duration-300 ${tabPositions[activeTab]}`}
        />

        {["deposit", "withdraw", "stake"].map((tab) => (
          <div
            key={tab}
            className={cn(
              "z-10 flex items-center justify-center w-[33.3%] cursor-pointer text-[16px] font-medium text-[#57534E]",
              tab === activeTab ? "font-bold" : "",
              "fontSpace_Grotesk"
            )}
            onClick={() =>
              setActiveTab(tab as "deposit" | "withdraw" | "stake")
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="mt-6">
        {activeTab === "deposit" && (
          <div>
            <div className="flex justify-between items-center">
              <label
                className={cn(
                  "block font-semibold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Deposit
              </label>
              <p
                className={cn(
                  "block font-semibold text-[14px] text-[#A8A29E] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Balance{" "}
                <span
                  className={cn(
                    " font-bold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                    fontSpace_Grotesk.className
                  )}
                >
                  0.00
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-end items-center bg-[#F5F5F4] h-[48px] w-[68%] lg:w-[80%] rounded-[12px] pr-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className={cn(
                    "flex-1 border-none px-4 py-2 bg-transparent text-[16px] text-[#A8A29E] font-medium outline-none",
                    fontSpace_Grotesk.className
                  )}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[14px] text-[#A8A29E]  font-medium",
                      fontSpace_Grotesk.className
                    )}
                  >
                    =$0.0
                  </span>
                  <button
                    className={cn(
                      "bg-[#F74A17] h-[27px] w-[48px] text-white text-[16px] rounded-[8px] font-bold",
                      fontSpace_Grotesk.className
                    )}
                  >
                    Max
                  </button>
                </div>
              </div>

              <button
                className={cn(
                  "bg-[#151618] w-[30%] lg:w-[18%] h-[48px]  text-white text-[16px] rounded-[12px] font-medium flex items-center justify-center gap-1",
                  fontSpace_Grotesk.className
                )}
              >
                <Image src={USBD_2} alt="USBD" />
                USBD
              </button>
            </div>
            <button className="mt-6 bg-[#F5F5F4] text-[#A8A29E] w-full h-[44px] rounded-[12px] font-medium">
              Deposit
            </button>
            <div className="mt-4 flex justify-between">
              <span
                className={cn(
                  "text-[14px] font-semibold text-[#A8A29E] border-b border-dashed border-[#A8A29E]",
                  fontMonrope.className
                )}
              >
                Network Fee
              </span>{" "}
              <span
                className={cn(
                  "text-[16px] font-bold text-[#151618] ",
                  fontSpace_Grotesk.className
                )}
              >
                0.01 ULTRA
              </span>
            </div>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div>
            <div className="flex justify-between items-center">
              <label
                className={cn(
                  "block font-semibold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Withdraw
              </label>
              <p
                className={cn(
                  "block font-semibold text-[14px] text-[#A8A29E] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Balance{" "}
                <span
                  className={cn(
                    " font-bold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                    fontSpace_Grotesk.className
                  )}
                >
                  0.00
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-end items-center bg-[#F5F5F4] h-[48px] w-[68%] lg:w-[80%] rounded-[12px] pr-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className={cn(
                    "flex-1 border-none px-4 py-2 bg-transparent text-[16px] text-[#A8A29E] font-medium outline-none",
                    fontSpace_Grotesk.className
                  )}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[14px] text-[#A8A29E]  font-medium",
                      fontSpace_Grotesk.className
                    )}
                  >
                    =$0.0
                  </span>
                  <button
                    className={cn(
                      "bg-[#F74A17] h-[27px] w-[48px] text-white text-[16px] rounded-[8px] font-bold",
                      fontSpace_Grotesk.className
                    )}
                  >
                    Max
                  </button>
                </div>
              </div>

              <button
                className={cn(
                  "bg-[#151618] w-[30%] lg:w-[18%] h-[48px] text-white text-[16px] rounded-[12px] font-medium flex items-center justify-center gap-1",
                  fontSpace_Grotesk.className
                )}
              >
                <Image src={USBD_2} alt="USBD" />
                USBD
              </button>
            </div>
            <button className="mt-6 bg-[#F5F5F4] text-[#A8A29E] w-full h-[44px] rounded-[12px] font-medium">
              Withdraw
            </button>
            <div className="mt-4 flex justify-between">
              <span
                className={cn(
                  "text-[14px] font-semibold text-[#A8A29E] border-b border-dashed border-[#A8A29E]",
                  fontMonrope.className
                )}
              >
                Network Fee
              </span>{" "}
              <span
                className={cn(
                  "text-[16px] font-bold text-[#151618] ",
                  fontSpace_Grotesk.className
                )}
              >
                0.01 ULTRA
              </span>
            </div>
          </div>
        )}

        {activeTab === "stake" && (
          <div>
            <div className="flex justify-between items-center">
              <label
                className={cn(
                  "block font-semibold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Stake
              </label>
              <p
                className={cn(
                  "block font-semibold text-[14px] text-[#A8A29E] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Balance{" "}
                <span
                  className={cn(
                    " font-bold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                    fontSpace_Grotesk.className
                  )}
                >
                  0.00
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-end items-center bg-[#F5F5F4] h-[48px] w-[68%] lg:w-[80%] rounded-[12px] pr-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className={cn(
                    "flex-1 border-none px-4 py-2 bg-transparent text-[16px] text-[#A8A29E] font-medium outline-none",
                    fontSpace_Grotesk.className
                  )}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[14px] text-[#A8A29E]  font-medium",
                      fontSpace_Grotesk.className
                    )}
                  >
                    =$0.0
                  </span>
                  <button
                    className={cn(
                      "bg-[#F74A17] h-[27px] w-[48px] text-white text-[16px] rounded-[8px] font-bold",
                      fontSpace_Grotesk.className
                    )}
                  >
                    Max
                  </button>
                </div>
              </div>

              <button
                className={cn(
                  "bg-[#151618] w-[30%] lg:w-[18%] h-[48px] text-white text-[16px] rounded-[12px] font-medium flex items-center justify-center gap-1",
                  fontSpace_Grotesk.className
                )}
              >
                <Image src={USBD_2} alt="USBD" />
                USBD
              </button>
            </div>
            <button className="mt-6 bg-[#F5F5F4] text-[#A8A29E] w-full h-[44px] rounded-[12px] font-medium">
              Stake
            </button>

            <div className="flex justify-between items-center mt-5">
              <label
                className={cn(
                  "block font-semibold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Claim Rewards
              </label>
              <p
                className={cn(
                  "block font-semibold text-[14px] text-[#A8A29E] leading-[20.16px] mb-2",
                  fontMonrope.className
                )}
              >
                Balance{" "}
                <span
                  className={cn(
                    " font-bold text-[14px] text-[#151618] leading-[20.16px] mb-2",
                    fontSpace_Grotesk.className
                  )}
                >
                  0.00
                </span>
              </p>
            </div>

            <div className="flex items-center bg-[#F5F5F4] h-[48px] w-[100%] rounded-[12px] gap-4 pr-2">
              <input
                type="number"
                placeholder="0.00"
                className={cn(
                  "flex-1 border-none px-4 py-2 bg-transparent text-[16px] text-[#A8A29E] font-medium outline-none",
                  fontSpace_Grotesk.className
                )}
              />
              <span
                className={cn(
                  "text-[14px] text-[#A8A29E] font-medium",
                  fontSpace_Grotesk.className
                )}
              >
                =$0.0
              </span>
            </div>

            <div className="flex gap-3">
              <button className="mt-6 bg-[#F5F5F4] text-[#A8A29E] w-full h-[44px] rounded-[12px] font-medium">
                Claim & Exit
              </button>
              <button className="mt-6 bg-[#F5F5F4] text-[#A8A29E] w-full h-[44px] rounded-[12px] font-medium">
                Claim
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <span
                className={cn(
                  "text-[14px] font-semibold text-[#A8A29E] border-b border-dashed border-[#A8A29E]",
                  fontMonrope.className
                )}
              >
                Network Fee
              </span>{" "}
              <span
                className={cn(
                  "text-[16px] font-bold text-[#151618] ",
                  fontSpace_Grotesk.className
                )}
              >
                0.01 ULTRA
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposite;
