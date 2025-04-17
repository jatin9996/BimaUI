import React from "react";
import { Card } from "../ui/card";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import Lorenzo from "@/assets/images/tokenImg/lorenzo_logo.png";
import Bitlayer from "@/assets/images/tokenImg/bitlayer.png";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
interface HeroSectionCards {
  circulationAmount: string;
  heading: string;
}
const HeroSectionCard = ({ circulationAmount, heading }: HeroSectionCards) => {
  return (
    <Card className="px-7 py-5 dark:bg-slate-800">
      <div className="flex gap-2">
        <Image src={Bitlayer} alt="Diposit" width={36} height={36} />
        <Image src={Lorenzo} alt="Diposit" width={36} height={36} />
      </div>
      <h1 className={cn("text-4xl", fontSpace_Grotesk.className)}>
        {`${circulationAmount}`}
      </h1>
      <span
        className={cn(
          "text-muted-foreground text-sm",
          fontSpace_Grotesk.className
        )}
      >
        {heading}
      </span>
    </Card>
  );
};

export default HeroSectionCard;
