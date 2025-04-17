import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";

interface APY {
  last7Days: string;
  last30Days: string;
  inception: string;
}

interface Fees {
  management: string;
  performance: string;
}

interface DescriptionSectionProps {
  description: string;
  apy: APY;
  fees: Fees;
}

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
  apy,
  fees,
}) => {
  return (
    <div className={cn("bg-white p-6 ", fontMonrope.className)}>
      <h2 className="text-[24px] font-semibold text-[#151618] mb-4">
        Description
      </h2>
      <p className="text-[#A8A29E] text-[14px] font-medium mb-6">
        {description}
      </p>

      <h3 className="text-[20px] font-semibold text-[#151618] mb-2">APY</h3>
      <div className="flex gap-6 xl:gap-20 items-center flex-wrap">
        <div className="text-center">
          <p
            className={cn(
              "text-[32px] font-medium text-[#000000]",
              fontSpace_Grotesk.className
            )}
          >
            {apy.last7Days}
          </p>
          <p className="text-[14px] inline-flex text-[#A8A29E] font-semibold border-b border-dashed border-[#A8A29E]">
            Last 7 Days
          </p>
        </div>
        <div className="text-center">
          <p
            className={cn(
              "text-[32px] font-medium text-[#000000]",
              fontSpace_Grotesk.className
            )}
          >
            {apy.last30Days}
          </p>
          <p className="text-[14px] inline-flex text-[#A8A29E] font-semibold border-b border-dashed border-[#A8A29E]">
            Last 30 Days
          </p>
        </div>
        <div className="text-center">
          <p
            className={cn(
              "text-[32px] font-medium text-[#000000]",
              fontSpace_Grotesk.className
            )}
          >
            {apy.inception}
          </p>
          <p className="text-[14px] inline-flex text-[#A8A29E] font-semibold border-b border-dashed border-[#A8A29E]">
            Inception
          </p>
        </div>
      </div>

      <h3 className="text-[20px] font-semibold text-[#151618] mb-2 mt-6">
        Fees
      </h3>
      <div className="flex gap-6 xl:gap-20 items-center flex-wrap">
        <div className="text-center">
          <p
            className={cn(
              "text-[32px] font-medium text-[#000000]",
              fontSpace_Grotesk.className
            )}
          >
            {fees.management}
          </p>
          <p className="text-[14px] inline-flex text-[#A8A29E] font-semibold border-b border-dashed border-[#A8A29E]">
            Management
          </p>
        </div>
        <div className="text-center">
          <p
            className={cn(
              "text-[32px] font-medium text-[#000000]",
              fontSpace_Grotesk.className
            )}
          >
            {fees.performance}
          </p>
          <p className="text-[14px] inline-flex text-[#A8A29E] font-semibold border-b border-dashed border-[#A8A29E]">
            Performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
