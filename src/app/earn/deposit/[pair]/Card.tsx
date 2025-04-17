import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import React from "react";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

interface Card {
  title: string;
  value: string;
  subValue?: string; // Optional sub-value
}

interface StatCardsProps {
  cards: Card[];
}

const Card: React.FC<StatCardsProps> = ({ cards }) => {
  return (
    <div className="flex justify-around items-center flex-wrap my-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "bg-white ps-6 shadow-md rounded-[20px] h-[122px] w-[357px] flex flex-col justify-center items-start mt-5",
            fontMonrope.className
          )}
        >
          <p className="text-[#78716C] text-[14px] font-semibold border-b border-dashed border-[#78716C]">
            {card.title}
          </p>
          <p className="text-[32px] font-medium text-[#1C1917]">{card.value}</p>
          {card.subValue && (
            <p className="text-[12px] text-[#78716C] font-semibold">
              {card.subValue}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
