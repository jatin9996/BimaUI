"use client";

import { X } from "lucide-react";
import React, { useRef, useEffect } from "react";

export type Section = {
  header: string;
  value: string | number;
};

export type PlatformStatsTabProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PlatformStatsTab: React.FC<PlatformStatsTabProps> = ({
  isOpen,
  onClose,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside the tab container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Grouped data with sections
  const platformStatsData = [
    {
      sectionTitle: "Section 1",
      items: [
        { header: "Total Collateral Value", value: "$7,762,065.66" },
        { header: "Total Debt Value", value: "$2,373,669.68" },
      ],
    },
    {
      sectionTitle: "Section 2",
      items: [
        { header: "LST Collateral Ratio", value: "352.74%" },
        { header: "Total LST Value", value: "$7,284,937.89" },
        { header: "USBD Debt", value: "$2,065,266.32" },
      ],
    },
    {
      sectionTitle: "Section 3",
      items: [
        { header: "LRT Collateral Ratio", value: "217.59%" },
        { header: "Total LRT Value", value: "$477,127.77" },
        { header: "ULTRA Debt", value: "$219,273.69" },
      ],
    },
    {
      sectionTitle: "Section 4",
      items: [
        { header: "Total USBD Locked", value: "97,777,315" },
        { header: "Total Lock Weight", value: "4,835,743,934" },
        { header: "Total Vote Weight", value: "4,616,201,644" },
      ],
    },
    {
      sectionTitle: "Section 5",
      items: [
        { header: "Current Protocol Week", value: 71 },
        { header: "Current Emissions Week", value: 59 },
        { header: "Current Week Emissions", value: "773,998 PRISMA" },
        { header: "Rewards Lock Length", value: "0 weeks" },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50   flex items-center justify-center z-50">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none; 
          }
          .no-scrollbar {
            -ms-overflow-style: none; 
            scrollbar-width: none; 
          }
        `}
      </style>

      <div
        ref={tabRef} // Attach ref to the tab container
        className="bg-white dark:bg-[#1A1A1A] w-[80%] lg:w-[30%] rounded-[20px] shadow-lg pb-2 overflow-y-auto relative no-scrollbar"
      >
        <div className="bg-[#F74A17] py-2">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={onClose}
          >
            <X className="size-[22px] " />
          </button>

          <h2 className="text-center text-lg font-semibold text-white mt-3 mb-4">
            Platform Statistics
          </h2>
        </div>

        {/* Tab Content */}
        <div className="space-y-2 px-2">
          {platformStatsData.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="border-b border-gray-300 pb-4 last:border-none"
            >
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="pt-2 flex justify-between items-center"
                >
                  <h3 className="text-[16px] font-medium text-[#585654]  dark:text-[#B2B1B0]">
                    {item.header}
                  </h3>
                  <p className="text-[18px] font-semibold text-[#302F2E] dark:text-[#FFFFFF]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformStatsTab;
