import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";

type SliderButtonProps = {
  isMint: boolean;
  setIsMint: (value: boolean) => void;
};

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });

const SliderButton = ({ isMint, setIsMint }: SliderButtonProps) => {
  return (
    <div className="relative flex items-center bg-[#E7E5E4] dark:bg-[#302F2E] mt-5 rounded-[14px] h-[49px] w-[100%]">
      {/* Sliding Background */}
      <div
        className={`absolute h-[44px] w-[49.6%] bg-[#FAFAF9] dark:bg-[#1A1A1A] rounded-[14px] ms-[2.3px] transition-transform duration-300 ${
          isMint ? "translate-x-0" : "translate-x-full"
        }`}
      />

      {/* Mint Button */}
      <div
        className={cn(
          "z-10 flex items-center justify-center w-1/2 cursor-pointer text-[16px] font-medium text-[#57534E] dark:text-[#FFFFFF]",
          fontSpace_Grotesk.className
        )}
        onClick={() => setIsMint(true)}
      >
        Mint
      </div>

      {/* Redeem Button */}
      <div
        className={cn(
          "z-10 flex items-center justify-center w-1/2 cursor-pointer text-[16px] font-medium text-[#57534E] dark:text-[#FFFFFF]",
          fontSpace_Grotesk.className
        )}
        onClick={() => setIsMint(false)}
      >
        Redeem
      </div>
    </div>
  );
};

export default SliderButton;
