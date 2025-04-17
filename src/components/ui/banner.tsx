import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center w-[100%]">
      <div className="border border-[#f74a17] rounded-[12px] py-3 mb-5 w-[90%] lg:w-[60%] text-center">
        <h2 className="text-[14px] lg:text-[18px] font-semibold text-[#f74a17] font-mono">
          🚧 BIMA is currently in testnet.
        </h2>
      </div>
    </div>
  );
};

export default Banner;
