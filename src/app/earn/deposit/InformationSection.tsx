import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { FC } from "react";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

interface InformationProps {
  minimumLPTokens: number;
  minimumLPTokensAfterSlippage: number;
  slippageTolerance: string;
  slippageBonus: string;
}

const InformationSection: FC<InformationProps> = ({
  minimumLPTokens,
  minimumLPTokensAfterSlippage,
  slippageTolerance,
  slippageBonus,
}) => {
  return (
    <div className="p-4 bg-white dark:bg-[#1A1A1A]">
      <h2
        className={cn(
          "text-[24px] font-semibold text-[#151618] leading-[26.66px] mb-4",
          fontMonrope.className
        )}
      >
        Information
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
              fontMonrope.className
            )}
          >
            Minimum LP Tokens
          </span>
          <span
            className={cn(
              "text-[16px] font-bold text-[#151618]",
              fontSpace_Grotesk.className
            )}
          >
            {minimumLPTokens.toFixed(5)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
              fontMonrope.className
            )}
          >
            Minimum LP Tokens (after slippage)
          </span>
          <span
            className={cn(
              "text-[16px] font-bold text-[#151618]",
              fontSpace_Grotesk.className
            )}
          >
            {minimumLPTokensAfterSlippage.toFixed(5)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
              fontMonrope.className
            )}
          >
            Slippage Tolerance
          </span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[16px] font-bold text-[#151618]",
                fontSpace_Grotesk.className
              )}
            >
              {slippageTolerance}
            </span>
            <Settings className="size-[16px] text-[#A8A29E]" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
              fontMonrope.className
            )}
          >
            Slippage Bonus
          </span>
          <span
            className={cn(
              "text-[16px] font-bold text-[#151618]",
              fontSpace_Grotesk.className
            )}
          >
            {slippageBonus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
