"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useEffect, useState } from "react";
import USBD_2 from "@/assets/icons/USBD_2.svg";
import weETH from "@/assets/icons/weETH.svg";
import img from "next/image";
import { checkVaultPosition } from "@/scripts/mintUSBD";
import contracts from "@/scripts/contracts";
import { ethers } from "ethers-old";
import {useAccount,useChainId} from "wagmi";
import WithdrawDebtPopup from "@/components/ui/positionPopup/WithdrawDebtPopup";
import RepayDebtPopup from "@/components/ui/positionPopup/RepayDebtPopup";
import WithdrawCollPopup from "@/components/ui/positionPopup/WithdrawCollPopup";
import AddCollPopup from "@/components/ui/positionPopup/AddCollPopup";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Manrope({ subsets: ["latin"] });

export interface Pool {
  id: number;
  name: string;
  marketSize: string;
  apr: number;
  yourBorrow: number;
  src3: string;
  src4: string;
}

interface BorrowPoolsProps {
  pools: Pool[];
}

type Position = {
  collateral: {
    amount: number;
    token: string;
    value: string;
  };
  debt: {
    amount: number;
    token: string;
    value: string;
  };
  borrowAPY: string;
  dayBorrowAPY: string;
  ltv: string;
  liquidationLtv: string;
  healthIndex: string;
};

// type PositionTableProps = {
//   positions: Position[];
//   connectedNetworkName: string; // Add the network name as a prop
//   pools: BorrowPoolsProps["pools"];
// };



// console.log("Position",positions);


const MyPosition: React.FC<any> = ({
  connectedNetworkName,
  positions
}) => {
  const [isAddCollOpen, setIsAddCollOpen] = useState(false);
  const [isWithdrawCollOpen, setIsWithdrawCollOpen] = useState(false);
  const [isWithdrawDebtOpen, setIsWithdrawDebtOpen] = useState(false);
  const [isRepayDebtOpen, setIsRepayDebtOpen] = useState(false);
  const [mypositions,setmyposition] = useState<any[]>([]);
  const {address,isConnected} = useAccount();
  const intiallstPrice: any = JSON.parse(
    localStorage.getItem("setlstPrice") || "0"
  );

  let provider: ethers.providers.Web3Provider | null;
  const chain = useChainId()
  console.log("intiallstPrice", positions);
  const openAdd = () => setIsAddCollOpen(true);
  const closeAdd = () => {
    setIsAddCollOpen(false);
    // fetchVaultUserData();
  };

  const openWithdraw = () => setIsWithdrawCollOpen(true);
  const closeWithdraw = () => {
    setIsWithdrawCollOpen(false);
    // fetchVaultUserData();
  };
  const [selectedPosition, setSelectedPosition] = useState<any | null>(
    null
  );

  const openBorrow = () => setIsWithdrawDebtOpen(true);
  const closeBorrow = () => {
    setIsWithdrawDebtOpen(false);
    fetchVaultUserData();
  };

  const openRepay = () => setIsRepayDebtOpen(true);
  const closeRepay = () => {
    setIsRepayDebtOpen(false);
    fetchVaultUserData();
  };

  const [UserVaultMetaData, setUserVaultMetaData] = useState<
    Record<any, { debtInFront: string; depositedColl: string ,collateralRatio: string,liquidationPrice:string}>
  >({});

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);





  async function fetchVaultUserData() {

    try{
      const updatedUserData: Record<number, { debtInFront: string; depositedColl: string ,collateralRatio: string,liquidationPrice:string}> = {};
      console.log("positions---->>>>",positions);
      const temp :any[] =[];
      for (const pool of positions) {
        console.log("Pool",pool);
        
          const userData =await checkVaultPosition(pool.VaultTokenAddress,contracts[connectedNetworkName].priceFeedAddress,address,provider);
          console.log("UserData",userData);

          if(Number(userData.debtInFront) > 0 || Number(userData.depositedColl) > 0){
            // const id = pool.VaultTokenAddress
            temp.push(pool);
            updatedUserData[pool.VaultTokenAddress] = {debtInFront:userData.debtInFront,depositedColl:userData.depositedColl,collateralRatio:userData.collateralRatio,liquidationPrice:userData.liquidationPrice}
          }
      }
    setmyposition(temp);
    setUserVaultMetaData(updatedUserData);
    }catch(error){
        return(error);
    }
    console.log("my-position", mypositions);
  }
  useEffect(() => {
    if(isConnected){
      console.log("fetching data");
      provider= new ethers.providers.Web3Provider(window.ethereum);
      fetchVaultUserData()
    }else{
      console.log("making null");
      provider = null;
      // mypositions = [];
    }
  },[chain,isConnected]);


  const [positionsMetadata, setPositionsMetadata] = useState<
    Record<
      number,
      {
        ltv: string;
        liquidationLtv: string;
        healthIndex: string;
      }
    >
  >({});
  // useEffect(() => {


  //   async function fetchPositionsMetadata() {
  //     const updatedMetadata: any = {};

  //     for (const pool of positions) {
  //       try {
  //         const marketId = morpho?.generateMarketId(pool.marketParams);
  //         const userData = await morpho?.getUserLendsAndBorrows(
  //           marketId,
  //           userAddress
  //         );
  //         // Fetch metadata for each pool
  //         const metadata = await morpho?.positionsMetadata(
  //           pool.marketParams,
  //           userAddress
  //         );

  //         updatedMetadata[pool.id] = {
  //           ltv: metadata?.ltv ?? "0%",
  //           liquidationLtv: metadata?.liquidationLtv ?? "0%",
  //           healthIndex: metadata?.healthIndex ?? "0",
  //         };
  //       } catch (error) {
  //         console.error(`Error fetching metadata for pool ${pool.id}:`, error);
  //         updatedMetadata[pool.id] = {
  //           borrowAPY: "0%",
  //           dayBorrowAPY: "0%",
  //           ltv: "0%",
  //           liquidationLtv: "0%",
  //           healthIndex: "0",
  //         };
  //       }
  //     }
  //     console.log("mypositions", mypositions);
  //     setPositionsMetadata(updatedMetadata);
  //     console.log("Positions Metadata:", updatedMetadata);
  //   }

  //   if (morpho && userAddress) {
  //     fetchPositionsMetadata();
  //   }
  // }, [morpho]);

  const [isSupply, setIsSupply] = useState(true);

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#1A1A1A] rounded-[20px]">
      <div className="p-3 flex gap-5 items-center overflow-x-auto bg-white dark:bg-[#1A1A1A] mt-5">
        <h1
          className={cn("text-[20px] font-medium", fontSpace_Grotesk.className)}
        >
          My Positions
        </h1>
      </div>
      {/* Conditional Rendering */}
      {!mypositions || mypositions.length == 0 ? (
        <div className="p-6 text-center">
          <p
            className={cn(
              "text-[16px] font-medium text-gray-700 dark:text-gray-300",
              inter.className
            )}
          >
            You currently have no positions on{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {connectedNetworkName}
            </span>
            .
          </p>
        </div>
      ) : (
        <table className="min-w-full table-auto border-collapse border-t border-dashed border-[#8C8FA166]">
          <thead
            className={cn(
              "text-[14px] font-semibold text-[#A8A29E]",
              inter.className
            )}
          >
            <tr>
              <th className="px-4 py-4 text-left">Collateral</th>
              <th className="px-4 py-4 text-left inline-flex items-center gap-1">
                Debt <ArrowDown className="size-[18px]" />
              </th>
              <th className="px-4 py-4 text-center">Collateral Ratio</th>
              <th className="px-4 py-4 text-center">Liquidation Price</th>
              <th className="px-4 py-4 text-center">Borrow Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position: any, index: any) => (
              <tr key={index} className="py-3">
                {/* Collateral */}
                <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
                  <div className="flex items-center gap-2">
                    <img
                      src={position?.VaultTokenImage}
                      alt={position?.VaultTokenName}
                      className="size-[24px]"
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                          inter.className
                        )}
                      >
                        {UserVaultMetaData[position?.VaultTokenAddress].debtInFront}{" "}
                        {position?.VaultTokenName}
                      </div>
                      <div className="text-[14px] font-medium px-1 py-[2px] rounded-md text-gray-700 bg-gray-200">
                        ${" "}
                        {formatUSBD(
                          Number(UserVaultMetaData[position?.VaultTokenAddress].debtInFront)
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap items-center">
                      <button
                        className="bg-[#F74A17] text-white px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openAdd();
                        }}
                      >
                        Add collateral
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openWithdraw();
                        }}
                      >
                        Withdraw collateral
                      </button>
                    </div>
                  </div>
                </td>

                {/* Loan */}
                <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
                  <div className="flex items-center gap-2">
                    <img
                      src={position?.VaultTokenImage}
                      alt={position?.VaultTokenName}
                      className="size-[24px]"
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                          inter.className
                        )}
                      >
                        {UserVaultMetaData[position?.VaultTokenAddress].debtInFront}{" "}
                        {'USBD'}
                      </div>
                      <div className="text-[14px] font-medium px-1 py-[2px] rounded-md text-gray-700 bg-gray-200">
                        $ {UserVaultMetaData[position?.VaultTokenAddress].debtInFront}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap items-center">
                      <button
                        className="bg-[#F74A17] text-white px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openBorrow();
                        }}
                      >
                        Withdraw debt
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openRepay();
                        }}
                      >
                        Repay debt
                      </button>
                    </div>
                  </div>
                </td>

                {/* Borrow APY */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {UserVaultMetaData[position?.VaultTokenAddress].collateralRatio}
                  %
                </td>

                {/* 1D Borrow APY */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  ${UserVaultMetaData[position?.VaultTokenAddress].liquidationPrice}
                  
                </td>

                {/* LTV */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {position?.formatedBorrowInterestRate}%
                </td>

                {/* Liquidation LTV */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {position[index]?.debtInFront}
                </td> */}

                {/* Health Index */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {position[index]?.debtInFront}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Popup */}
      {isAddCollOpen && (
        <AddCollPopup
          isOpen={isAddCollOpen}
          onClose={closeAdd}
          pool={selectedPosition}
        />
      )}

      {/* Withdraw Popup */}
      {isWithdrawCollOpen && (
        <WithdrawCollPopup
          isOpen={isWithdrawCollOpen}
          onClose={closeWithdraw}
          pool={selectedPosition}
        />
      )}

      {/* Borrow Popup */}
      {isWithdrawDebtOpen && (
        <WithdrawDebtPopup
          isOpen={isWithdrawDebtOpen}
          onClose={closeBorrow}
          pool={selectedPosition}
        />
      )}

      {/* Repay Popup */}
      {isRepayDebtOpen && (
        <RepayDebtPopup
          isOpen={isRepayDebtOpen}
          onClose={closeRepay}
          pool={selectedPosition}
        />
      )}
    </div>
  );
};

export default MyPosition;
