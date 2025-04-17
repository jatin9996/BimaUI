"use client";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { useState } from "react";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text); // Copy text to clipboard
    setCopied(true); // Set "copied" state
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="w-[105px] h-[28px] rounded-[8px] flex items-center justify-center gap-2 bg-white  shadow-sm">
      <p
        className={cn(
          "text-[14px] text-[#312D2C] font-semibold",
          fontMonrope.className
        )}
      >
        {text}
      </p>
      <button
        onClick={handleCopy}
        className={`flex items-center transition-colors ${
          copied ? "text-green-500" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Copy className="size-[16px]" />
      </button>
    </div>
  );
};

export default CopyBtn;
