import { cn } from "@/lib/utils";
import { fetchRedeemBreakdownData } from "@/scripts/redeembreakdown";
import { ethers } from "ethers-old";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useEffect, useState } from "react";
import {useConnect} from 'wagmi';


type Detail = {
  label: string;
  value: string | number;
  unit?: string;
};

const fontMonrope = Manrope({ subsets: ["latin"] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });



let provider:any;

const RedeemBreakdown =  () => {
  const [details, setdetails] = useState<Detail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const vaultParam = urlParams.get("vault");
        if (vaultParam == undefined){
          return;
        }
        const isConnected = useConnect()
        if (!isConnected) {
          provider = null;
        } else {
          provider = new ethers.providers.Web3Provider(window.ethereum);
        }
        const data = await fetchRedeemBreakdownData(vaultParam,provider);
        if (data==undefined){
          return;
        }

        console.log("BreakDown Data -> -> ",data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const details: Detail[] = [
  //   { label: "Collateral Price", value: "$2,169.21" },
  //   { label: "Redemption Fees", value: "0.00%", unit: "%" },
  //   { label: "Redemption Fee Amount", value: "0.00", unit: "wsETH" },
  //   // { label: "Expected Collateral Received", value: "0.00", unit: "wsETH" },
  //   // { label: "Value of Collateral Received", value: "$0.00" },
  //   { label: "Actual Redemption Amount", value: "0.00", unit: "USBD" },
  // ];

  return (
    <div>
      {details?.map((detail, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <span
            className={cn(
              "text-[#A8A29E] text-[14px] font-semibold  border-b border-dotted border-[#A8A29E]",
              fontMonrope.className
            )}
          >
            {detail.label}
          </span>

          <span
            className={cn(
              "text-black text-[16px] font-bold ",
              fontSpace_Grotesk.className
            )}
          >
            {detail.value}{" "}
            {detail.unit && <span className="text-black">{detail.unit}</span>}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RedeemBreakdown;
