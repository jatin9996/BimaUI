"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useEffect, useState } from "react";
import USBD_2 from "@/assets/icons/USBD_2.svg";
import weETH from "@/assets/icons/weETH.svg";
import img from "next/image";
import AddPopup from "@/components/ui/positionPopup/AddPopup";
import WithdrawPopup from "@/components/ui/positionPopup/WithdrawPopup";
import BorrowPopup from "@/components/ui/positionPopup/BorrowPopup";
import RepayPopup from "@/components/ui/positionPopup/RepayPopup";

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
  loan: {
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

type PositionTableProps = {
  positions: Position[];
  connectedNetworkName: string; // Add the network name as a prop
  pools: BorrowPoolsProps["pools"];
};

let mypositions: Pool[] = [];

// console.log("Position",positions);

const PositionTable: React.FC<any> = ({
  connectedNetworkName,
  positions,
  morpho,
  userAddress,
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);
  const [isRepayOpen, setIsRepayOpen] = useState(false);
  const intiallstPrice: any = JSON.parse(
    localStorage.getItem("setlstPrice") || "0"
  );
  console.log("intiallstPrice", intiallstPrice);
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => {
    setIsAddOpen(false);
    fetchsupplyUserData();
  };

  const openWithdraw = () => setIsWithdrawOpen(true);
  const closeWithdraw = () => {
    setIsWithdrawOpen(false);
    fetchsupplyUserData();
  };
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  const openBorrow = () => setIsBorrowOpen(true);
  const closeBorrow = () => {
    setIsBorrowOpen(false);
    fetchsupplyUserData();
  };

  const openRepay = () => setIsRepayOpen(true);
  const closeRepay = () => {
    setIsRepayOpen(false);
    fetchsupplyUserData();
  };

  const [supplyUserData, setsupplyUserData] = useState<
    Record<number, { totalCollateral: string; totalBorrows: string }>
  >({});

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  async function fetchsupplyUserData() {
    const updatedsupplyUserData: Record<
      number,
      { totalCollateral: string; totalBorrows: string }
    > = {};

    for (const pool of positions) {
      try {
        const marketId = morpho?.generateMarketId(pool.marketParams);
        const userData = await morpho?.getUserLendsAndBorrows(
          marketId,
          userAddress
        );
        console.log("UserData -> ->", userData);

        if (
          parseFloat(userData?.totalCollateral) > 0 ||
          parseFloat(userData?.totalBorrows) > 0
        ) {
          console.log("Condition Applied");

          mypositions.push(pool);
          updatedsupplyUserData[pool.id] = {
            totalCollateral: formatUSBD(Number(userData?.totalCollateral)),
            totalBorrows: formatUSBD(Number(userData?.totalBorrows)),
          };
        }
      } catch (error) {
        console.error(`Error fetching data for pool ${pool.id}:`, error);
      }
    }

    setsupplyUserData(updatedsupplyUserData);
  }
  useEffect(() => {
    if (morpho && userAddress) {
      fetchsupplyUserData();
    }
    console.log("RENDERINNNNNNNGG");
    console.log("CONNECTED NETWORK IS ", connectedNetworkName);
  }, [morpho]);
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
  useEffect(() => {
    async function fetchPositionsMetadata() {
      const updatedMetadata: any = {};

      for (const pool of positions) {
        console.log("Market ID", pool.id);
        try {
          if (!morpho) return;
          if (!userAddress) return;
          if (!pool.marketParams) return;
          if (!pool.id) return;
          if (pool.network !== connectedNetworkName) return;
          const marketId = pool.id;
          const metadata = await morpho?.positionsMetadata(
            marketId,
            userAddress
          );

          updatedMetadata[pool.id] = {
            ltv: metadata?.ltv ?? "0%",
            liquidationLtv: metadata?.liquidationLtv ?? "0%",
            healthIndex: metadata?.healthIndex ?? "0",
          };
        } catch (error) {
          console.error(`Error fetching metadata for pool ${pool.id}:`, error);
          updatedMetadata[pool.id] = {
            borrowAPY: "0%",
            dayBorrowAPY: "0%",
            ltv: "0%",
            liquidationLtv: "0%",
            healthIndex: "0",
          };
        }
      }
      console.log("mypositions", mypositions);
      setPositionsMetadata(updatedMetadata);
      console.log("Positions Metadata:", updatedMetadata);
    }

    if (morpho && userAddress) {
      fetchPositionsMetadata();
    }
  }, [morpho]);

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#1A1A1A] rounded-[20px] mt-5">
      <div className="p-3">
        <h1
          className={cn(
            "text-[20px] font-medium",
            fontSpace_Grotesk.className
          )}>
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
            )}>
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
            )}>
            <tr>
              <th className="px-4 py-4 text-left">Collateral</th>
              <th className="px-4 py-4 text-left inline-flex items-center gap-1">
                Loan <ArrowDown className="size-[18px]" />
              </th>
              <th className="px-4 py-4 text-center">Borrow APY</th>
              <th className="px-4 py-4 text-center">1D Borrow APY</th>
              <th className="px-4 py-4 text-center">LTV</th>
              <th className="px-4 py-4 text-center">Liquidation LTV</th>
              <th className="px-4 py-4 text-center">Health Index</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position: any, index: any) => (
              <tr
                key={index}
                className="py-3">
                {/* Collateral */}
                <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
                  <div className="flex items-center gap-2">
                    <img
                      src={position?.collateralTokenImage}
                      alt={position?.collateralToken}
                      className="size-[24px]"
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                          inter.className
                        )}>
                        {supplyUserData[position.id]?.totalCollateral}{" "}
                        {position?.collateralToken}
                      </div>
                      <div className="text-[14px] font-medium px-1 py-[2px] rounded-md text-gray-700 bg-gray-200">
                        ${" "}
                        {formatUSBD(
                          Number(supplyUserData[position.id]?.totalCollateral) *
                            Number(intiallstPrice)
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap items-center">
                      <button
                        className="bg-[#F74A17] text-white px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openAdd();
                        }}>
                        Add
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openWithdraw();
                        }}>
                        Withdraw
                      </button>
                    </div>
                  </div>
                </td>

                {/* Loan */}
                <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
                  <div className="flex items-center gap-2">
                    <img
                      src={position?.debtTokenImage}
                      alt={position?.debtToken}
                      className="size-[24px]"
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                          inter.className
                        )}>
                        {supplyUserData[position.id]?.totalBorrows}{" "}
                        {position?.debtToken}
                      </div>
                      <div className="text-[14px] font-medium px-1 py-[2px] rounded-md text-gray-700 bg-gray-200">
                        $ {supplyUserData[position.id]?.totalBorrows}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap items-center">
                      <button
                        className="bg-[#F74A17] text-white px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openBorrow();
                        }}>
                        Borrow
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openRepay();
                        }}>
                        Repay
                      </button>
                    </div>
                  </div>
                </td>

                {/* Borrow APY */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}>
                  {position?.interest !== undefined &&
                  !isNaN(Number(position.interest))
                    ? (
                        (Math.pow(
                          1 + Number(position.interest) / 100 / 365,
                          365
                        ) -
                          1) *
                        100
                      ).toFixed(2)
                    : "0.00"}
                  %
                </td>

                {/* 1D Borrow APY */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}>
                  {position?.interest !== undefined &&
                  !isNaN(Number(position.interest))
                    ? (Number(position.interest) / 365).toFixed(4)
                    : "0.0000"}
                  %
                </td>

                {/* LTV */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}>
                  {positionsMetadata[position.id]?.ltv}
                </td>

                {/* Liquidation LTV */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}>
                  {positionsMetadata[position.id]?.liquidationLtv}
                </td>

                {/* Health Index */}
                <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}>
                  {positionsMetadata[position.id]?.healthIndex}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Popup */}
      {isAddOpen && (
        <AddPopup
          isOpen={isAddOpen}
          onClose={closeAdd}
          pool={selectedPosition}
          morpho={morpho}
        />
      )}

      {/* Withdraw Popup */}
      {isWithdrawOpen && (
        <WithdrawPopup
          isOpen={isWithdrawOpen}
          onClose={closeWithdraw}
          pool={selectedPosition}
          morpho={morpho}
        />
      )}

      {/* Borrow Popup */}
      {isBorrowOpen && (
        <BorrowPopup
          isOpen={isBorrowOpen}
          onClose={closeBorrow}
          pool={selectedPosition}
          morpho={morpho}
        />
      )}

      {/* Repay Popup */}
      {isRepayOpen && (
        <RepayPopup
          isOpen={isRepayOpen}
          onClose={closeRepay}
          pool={selectedPosition}
          morpho={morpho}
        />
      )}
    </div>
  );
};

export default PositionTable;
