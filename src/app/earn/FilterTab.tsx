import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import React from "react";

const fontMonrope = Manrope({ subsets: ["latin"] });

const FilterTab = () => {
  return (
    <div
      className={cn(
        "absolute top-16 -right-8 lg:right-0 bg-white drop-shadow-xl rounded-[20px] p-4 h-[277px] w-[300px] lg:w-[370px]",
        fontMonrope.className
      )}
    >
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-[#A8A29E] text-[14px] font-medium mb-3">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">All</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Stablecoin</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Curve</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Pendle</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">All</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Stablecoin</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Curve</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Pendle</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">All</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Stablecoin</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Curve</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="form-checkbox accent-black" />
              <span className="text-[14px] font-normal">Pendle</span>
            </label>
          </div>
        </div>
      </div>

      {/* Type Section */}
      <div>
        <h3 className="text-[#A8A29E] text-[14px] font-medium mb-3">Type</h3>
        <div className="flex flex-wrap items-start gap-3">
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox accent-black" />
            <span className="text-[14px] font-normal">All</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox accent-black" />
            <span className="text-[14px] font-normal">Fancy</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox accent-black" />
            <span className="text-[14px] font-normal">Multi Strategy</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox accent-black" />
            <span className="text-[14px] font-normal">Single Strategy</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterTab;
