import { cn } from "@/lib/utils";
import { CircleCheck, X } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import React from "react";
import { toast } from "react-toastify";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const SuccessMinting = () => {
  return (
    <div className="flex items-center bg-white h-[86px] w-[360px] rounded-[20px] shadow-md px-4 relative">
      {/* Icon */}
      <div className="flex items-center justify-center w-[36px] h-[36px] bg-green-100 text-[#1DB86E] rounded-[10px]">
        <CircleCheck className="size-[24px]" />
      </div>

      {/* Content */}
      <div className="ml-4 flex-1">
        <p
          className={cn(
            "text-[16px] text-[#151618] font-bold",
            fontMonrope.className
          )}
        >
          Minted successfully!!
        </p>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 p-1 text-white bg-[#D6D3D1] rounded-full"
        onClick={() => toast.dismiss()}
      >
        <X className="size-[16px]" />
      </button>
    </div>
  );
};

export default SuccessMinting;
