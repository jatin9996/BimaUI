import AddPopup from "@/components/ui/positionPopup/AddPopup";
import AddSupplyPopup from "@/components/ui/positionPopup/AddSupplyPopup";
import WithdrawPopup from "@/components/ui/positionPopup/WithdrawPopup";
import WithdrawSupplyPopup from "@/components/ui/positionPopup/WithdrawSupplyPopup";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useChainId } from "wagmi";

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

const SupplyPosition: React.FC<any> = ({
  connectedNetworkName,
  positions,
  morpho,
  userAddress,
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);
  const [isRepayOpen, setIsRepayOpen] = useState(false);

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

  const [mypositions, setMyPositions] = useState<any[]>([]);

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
    Record<number, { totalSupply: string }>
  >({});

  const [supplyUserDataRaw, setsupplyUserDataRaw] = useState<
    Record<number, { totalSupply: string }>
  >({});

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  async function fetchsupplyUserData() {
    const updatedsupplyUserData: Record<number, { totalSupply: string }> = {};
    const rawUpdatedsupplyUserData: Record<number, { totalSupply: string }> =
      {};
    const updatedMyPositions: any[] = [];

    for (const pool of positions) {
      try {
        const marketId = morpho?.generateMarketId(pool.marketParams);
        const userData = await morpho?.getUserLendsAndBorrows(
          marketId,
          userAddress
        );
        console.log("UserData -> ->", userData);

        if (parseFloat(userData?.totalLends) > 0) {
          console.log("Condition Applied");
          updatedMyPositions.push(pool);
          rawUpdatedsupplyUserData[pool.id] = {
            totalSupply: userData?.totalLends,
          };
          updatedsupplyUserData[pool.id] = {
            totalSupply: formatUSBD(Number(userData?.totalLends)),
          };
        }
      } catch (error) {
        console.error(`Error fetching data for pool ${pool.id}:`, error);
      }
    }

    setsupplyUserData(updatedsupplyUserData);
    setsupplyUserDataRaw(rawUpdatedsupplyUserData);
    setMyPositions(updatedMyPositions); // Update mypositions state
  }
  useEffect(() => {
    if (morpho && userAddress) {
      fetchsupplyUserData();
    }
    console.log("RENDERINNNNNNNGG");
  }, [morpho, userAddress, positions]); // Add positions as a dependency

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
        try {
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
  }, [morpho, userAddress, positions]); // Add positions as a dependency

  const chain = useChainId();

  console.log("CHAIN ID is", chain);

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#1A1A1A] rounded-b-[20px]">
      {/* Conditional Rendering */}
      {!mypositions || mypositions.length == 0 ? (
        <div className="p-6 text-center">
          <p
            className={cn(
              "text-[16px] font-medium text-gray-700 dark:text-gray-300",
              inter.className
            )}
          >
            You currently have no Earn positions on{" "}
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
              {/* <th className="px-4 py-4 text-left inline-flex items-center gap-1">
              Loan <ArrowDown className="size-[18px]" />
            </th> */}
              {/* <th className="px-4 py-4 text-center">Borrow APY</th>
              <th className="px-4 py-4 text-center">1D Borrow APY</th>
              <th className="px-4 py-4 text-center">LTV</th>
              <th className="px-4 py-4 text-center">Liquidation LTV</th>
              <th className="px-4 py-4 text-center">Health Index</th> */}
            </tr>
          </thead>
          <tbody>
            {positions.map((position: any, index: any) => (
              <tr key={index} className="py-3">
                {/* Collateral */}
                <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={position?.collateralTokenImage}
                        alt={position?.debtToken}
                        className="size-[24px]"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                            inter.className
                          )}
                        >
                          {supplyUserData[position.id]?.totalSupply}{" "}
                          {position?.debtToken}
                        </div>
                        <div className="text-[14px] font-medium px-1 py-[2px] rounded-md text-gray-700 bg-gray-200">
                          $ {supplyUserData[position.id]?.totalSupply}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                      <button
                        className="bg-[#F74A17] text-white px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openAdd();
                        }}
                      >
                        Add Supply
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                        onClick={() => {
                          setSelectedPosition(position);
                          openWithdraw();
                        }}
                      >
                        Withdraw Supply
                      </button>
                    </div>
                  </div>
                </td>

                {/* Loan */}
                {/* <td className="px-8 md:px-4 py-3 hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]">
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
                      )}
                    >
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
                      }}
                    >
                      Borrow
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium"
                      onClick={() => {
                        setSelectedPosition(position);
                        openRepay();
                      }}
                    >
                      Repay
                    </button>
                  </div>
                </div>
              </td> */}

                {/* Borrow APY */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
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
                </td> */}

                {/* 1D Borrow APY */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {position?.interest !== undefined &&
                  !isNaN(Number(position.interest))
                    ? (Number(position.interest) / 365).toFixed(4)
                    : "0.0000"}
                  %
                </td> */}

                {/* LTV */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {positionsMetadata[position.id]?.ltv}
                </td> */}

                {/* Liquidation LTV */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {positionsMetadata[position.id]?.liquidationLtv}
                </td> */}

                {/* Health Index */}
                {/* <td
                  className={cn(
                    "px-4 py-3 text-center text-[16px] font-medium text-[#151618] dark:text-[#FFFFFF] hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]",
                    fontSpace_Grotesk.className
                  )}
                >
                  {positionsMetadata[position.id]?.healthIndex}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Popup */}
      {isAddOpen && (
        <AddSupplyPopup
          isOpen={isAddOpen}
          onClose={closeAdd}
          pool={selectedPosition}
          morpho={morpho}
        />
      )}

      {/* Withdraw Popup */}
      {isWithdrawOpen && (
        <WithdrawSupplyPopup
          isOpen={isWithdrawOpen}
          onClose={closeWithdraw}
          pool={selectedPosition}
          totalSupply={
            supplyUserData[(selectedPosition as any).id]?.totalSupply
          }
          rawTotalSupply={
            supplyUserDataRaw[(selectedPosition as any).id]?.totalSupply
          }
          morpho={morpho}
        />
      )}
    </div>
  );
};

export default SupplyPosition;
