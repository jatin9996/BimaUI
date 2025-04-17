// "use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils";
// import { Manrope } from "next/font/google";
// import React, { useEffect, useState } from "react";
// import LogoIcon from "@/assets/icons/logo_icon.png";
// import LogoIconBlue from "@/assets/icons/logo_icon_blue.png";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import md5 from "md5";
// import { IVaultCardProps, VaultCard } from "./ValutsComponents";
// import { ChevronDown, LucideLoaderCircle, MoveDownIcon } from "lucide-react";
// import networks from "@/scripts/contracts";
// import "./style.module.scss";
// import SliderButton from "./sliderButton";
// import DataTable from "./vaultTable";

// const inter = Manrope({ subsets: ["latin"] });

// interface ISectionProps {
//   title: string;
//   addonTitle: string;
//   addonSubTitle: string;
//   chainId: number;
//   cardsData: Array<IVaultCardProps["data"]>;
//   cardsDataLRT: Array<IVaultCardProps["data"]>;
// }

// interface IVaultsData {
//   vaultsData: any;
//   cardsFromattedData: IVaultCardProps["data"];
// }

// const Section = (selectedOption: any) => {
//   const [cardsData, setCardsData] = useState<IVaultsData[]>([]);
//   const [cardsDataLRT, setCardsDataLRT] = useState<IVaultsData[]>([]);
//   const [activeTab, setActiveTab] = useState("lst");
//   useEffect(() => {
//     const fetchCardsData = async () => {
//       try {
//         const response = await fetch(
//           `/api/vaults/cards?tab=${activeTab}&network=${selectedOption.network.toString()}`
//         );
//         const { data } = await response.json();

//         console.log("Data -> ", data.cardsData);

//         if (activeTab.includes("lrt")) {
//           setCardsDataLRT(data.cardsData);
//         } else {
//           setCardsData(data.cardsData);
//         }
//       } catch (error) {
//         console.error("Error fetching cards data:", error);
//       }
//     };
//     fetchCardsData();
//   }, [activeTab]);

//   if (cardsData?.length === 0 && cardsDataLRT?.length === 0)
//     return (
//       <div className="flex flex-col justify-center gap-3">
//         <LucideLoaderCircle
//           width={24}
//           height={24}
//           className="animate-spin dark:text-white"
//         />
//         <div className="dark:text-white">Loading vaults....</div>
//       </div>
//     );
//   else
//     return (
//       <div className="mb-3 pb-3 border-b border-dashed border-gray-400 dark:border-gray-300 w-full">
//         <div>
//           <div className="flex flex-wrap gap-2 lg:gap-5 items-center justify-between">
//             <h1
//               className={cn(
//                 inter.className,
//                 "text-base dark:text-[#edeef1] sm:text-2xl p-2 mt-10 font-semibold md:mt-0 "
//               )}
//             >
//               Choose an LST to mint USBD
//             </h1>
//             <div className="w-full lg:w-1/2">
//               <SliderButton />
//             </div>
//           </div>
//         </div>
//         <div className="items-center grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-0  w-full">
//           {cardsData?.map((data, i) => (
//             <VaultCard
//               title={data.vaultsData.vaultAddress}
//               subTitle={data.vaultsData.tokenName}
//               image={data.vaultsData.image}
//               data={data.cardsFromattedData}
//               isLRT={false}
//               key={i}
//             />
//           ))}
//         </div>

//         <div className="flex justify-center my-5">
//           <button className="flex items-center gap-2 text-[16px] font-medium">
//             <ChevronDown /> see more
//           </button>
//         </div>

//         <div>
//           <DataTable />
//         </div>
//       </div>
//     );
// };

// export default Section;

// const LRTBadage = ({ color }: { color?: string }) => {
//   return (
//     <svg
//       width="31"
//       height="16"
//       viewBox="0 0 31 16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M4.875 0C2.66586 0 0.875 1.79086 0.875 4V12C0.875 14.2091 2.66586 16 4.875 16H21.5242V5.44H19.0762V4H25.5562V5.44H23.1082V16H26.875C29.0841 16 30.875 14.2091 30.875 12V4C30.875 1.79086 29.0841 0 26.875 0H7.459V10.96H11.299V12.4H5.875V0H4.875ZM12.2588 4V12.4H13.8428V9.232H16.0508C16.2828 9.232 16.4468 9.292 16.5428 9.412C16.6468 9.532 16.6988 9.688 16.6988 9.88V12.4H18.2828V9.652C18.2828 9.316 18.1948 9.048 18.0188 8.848C17.8428 8.64 17.5948 8.528 17.2748 8.512V8.296C17.6268 8.152 17.9228 7.924 18.1628 7.612C18.4028 7.3 18.5228 6.892 18.5228 6.388V6.244C18.5228 5.788 18.4148 5.392 18.1988 5.056C17.9828 4.72 17.6788 4.46 17.2868 4.276C16.8948 4.092 16.4348 4 15.9068 4H12.2588ZM15.7388 7.792H13.8428V5.44H15.7388C16.1228 5.44 16.4188 5.544 16.6268 5.752C16.8348 5.952 16.9388 6.22 16.9388 6.556V6.676C16.9388 7.012 16.8308 7.284 16.6148 7.492C16.4068 7.692 16.1148 7.792 15.7388 7.792Z"
//         fill={color || "#8C8FA1"}
//         fillOpacity="0.5"
//       />
//     </svg>
//   );
// };

// const LineChartCircle = ({ color }: { color?: [string, string] }) => {
//   return (
//     <svg
//       width="53"
//       height="52"
//       viewBox="0 0 53 52"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <ellipse
//         cx="26.6665"
//         cy="26"
//         rx="26"
//         ry="26"
//         transform="rotate(90 26.6665 26)"
//         fill="url(#paint0_radial_150_2669)"
//       />
//       <path
//         d="M36 35H19C18.4477 35 18 34.5523 18 34V17H20V33H36V35ZM23.373 30L22 28.656L26.856 23.9C27.2383 23.5285 27.8467 23.5285 28.229 23.9L30.456 26.081L34.627 22L36 23.344L31.144 28.1C30.7617 28.4715 30.1533 28.4715 29.771 28.1L27.543 25.918L23.374 30H23.373Z"
//         fill="white"
//       />
//       <defs>
//         <radialGradient
//           id="paint0_radial_150_2669"
//           cx="0"
//           cy="0"
//           r="1"
//           gradientUnits="userSpaceOnUse"
//           gradientTransform="translate(18.456 9.57895) rotate(38.2338) scale(14.3725 22.5417)"
//         >
//           <stop stopColor={color?.[0] || "#FFBEAA"} />
//           <stop offset="1" stopColor={color?.[1] || "#F74A17"} />
//         </radialGradient>
//       </defs>
//     </svg>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { LucideLoaderCircle, ChevronDown, ChevronUp } from "lucide-react";
import SliderButton from "./sliderButton";
import { VaultCard, IVaultCardProps } from "./ValutsComponents";
import DataTable from "./vaultTable";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";

const inter = Manrope({ subsets: ["latin"] });

interface ISectionProps {
  title: string;
  addonTitle: string;
  addonSubTitle: string;
  chainId: number;
  cardsData: Array<IVaultCardProps["data"]>;
  cardsDataLRT: Array<IVaultCardProps["data"]>;
}

interface IVaultsData {
  VaultTokenName: string;
  VaultTokenImage: string;
  VaultTokenAddress: string;
  formatedTotalCollateral: string;
  formatedTotalDebt: string;
  formatedMCR: string;
  formatedMintFee: string;
  formatedBorrowInterestRate: string;
  formatedRedemptionRebate: string;
  formatedStakedEtherAPR: string;
}

interface ISectionData{
  cardsData :IVaultsData[],
  cardsDataLRT: IVaultsData[]
}
// React.FC<VaultsListProps> = ({ cardsData })
const Section: React.FC<ISectionData> = ({ cardsData,cardsDataLRT}) => {
  // const [cardsData, setCardsData] = useState<IVaultsData[]>([]);
  // const [cardsDataLRT, setCardsDataLRT] = useState<IVaultsData[]>([]);
  // const [activeTab, setActiveTab] = useState("lst");
  const [showTable, setShowTable] = useState(false); // state to handle table visibility
  const tableRef = useRef<HTMLDivElement>(null);

  // const handleToggle = () => {
  //   setShowTable(!showTable);
  //   // Scroll to the data table section if showing it
  //   if (!showTable && tableRef.current) {
  //     setTimeout(() => {
  //       tableRef.current?.scrollIntoView({ behavior: "smooth" });
  //     }, 500);
  //   }
  // };

  // useEffect(() => {
  //   const fetchCardsData = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/vaults/cards?tab=${activeTab}&network=${selectedOption.network.toString()}`
  //       );
  //       const { data } = await response.json();

  //       if (activeTab.includes("lrt")) {
  //         setCardsDataLRT(data.cardsData);
  //       } else {
  //         setCardsData(data.cardsData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cards data:", error);
  //     }
  //   };
  //   fetchCardsData();
  // }, [activeTab]);

  if (cardsData?.length === 0 && cardsDataLRT?.length === 0)
    return (
      <div className="flex flex-col justify-center gap-3">
        <LucideLoaderCircle
          width={24}
          height={24}
          className="animate-spin dark:text-white"
        />
        <div className="dark:text-white">Loading vaults....</div>
      </div>
    );

  return (
    <div className="mb-3 mt-7 pb-3 border-b border-dashed border-gray-400 dark:border-gray-300 w-full">
      {/* {!showTable ? (
        <>
          <div className="flex flex-wrap gap-2 lg:gap-5 items-center justify-between">
            <h1
              className={cn(
                inter.className,
                "text-base dark:text-[#edeef1] sm:text-2xl p-2 mt-10 font-semibold md:mt-0 "
              )}
            >
              Choose an LST to mint USBD
            </h1>
          </div>
          <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-0 w-full">
            {cardsData?.map((data, i) => (
              <VaultCard
                title={data.vaultsData.vaultAddress}
                subTitle={data.vaultsData.tokenName}
                image={data.vaultsData.image}
                data={data.cardsFromattedData}
                isLRT={false}
                key={i}
              />
            ))}
          </div>
        </>
      ) : null}


      <div className="flex justify-center my-5">
        <button
          className="flex items-center gap-2 text-[16px] font-medium scroll-smooth"
          onClick={handleToggle}
        >
          {showTable ? <ChevronUp /> : <ChevronDown />}
          {showTable ? "Vault Card" : "See More"}
        </button>
      </div>

      
      {showTable ? (
        <div className=" ">
          {" "}
         
          <DataTable />
        </div>
      ) : null} */}

      <DataTable cardData={cardsData}/>
    </div>
  );
};

export default Section;
