import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Search,
  SlidersVertical,
} from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import SliderButton from "./sliderButton";
import Bitlayer from "@/assets/icons/Bitlayer.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAccount, useChainId } from "wagmi";
import CountUp from "react-countup";
import { useVaultContext } from "@/lib/contextFile";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

export default function DataTable(cardData: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const { tvl, setTVL, totaldebt, setTotalDebt, setusbdMintable, setlstPrice } =
    useVaultContext();
  // const router = usePathname();
  const [page, setPage] = useState(1);
  const { isConnected, address } = useAccount();
  const chain = useChainId();
  const itemsPerPage = 4;
  const router = useRouter();

  console.log("cardData", cardData);

  const filteredData = cardData.cardData.filter((item: any) =>
    item.VaultTokenName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const totalCollateralValue = cardData.cardData.reduce(
      (sum: number, item: any) => {
        return sum + parseFloat(item.formatedTotalCollateral);
      },
      0
    );

    const totalDebtValue = cardData.cardData.reduce(
      (sum: number, item: any) => {
        return sum + parseFloat(item.formatedTotalDebt);
      },
      0
    );

    const lstPrice = cardData.cardData
      .reduce((sum: number, item: any) => {
        return parseFloat(item.collateralPriceFormatted);
      }, 0)
      .toFixed(2);

    setTVL(totalCollateralValue);
    setTotalDebt(totalDebtValue);
    setusbdMintable(100000000000 - totalDebtValue);
    setlstPrice(lstPrice);
  }, [cardData]);

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <div className=" py-4 bg-white dark:bg-[#1A1A1A] rounded-[20px]">
      <div className="flex items-center justify-between flex-col gap-3 lg:gap-0 lg:flex-row border-b border-dashed border-gray-200 pb-4 mb-4 px-4">
        {/* Toggle for 'BIMA' and 'BIMA LRT' */}
        <div className="flex gap-10 lg:gap-16 items-center">
          <div>
            <p
              className={cn(
                "text-[14px] font-semibold leading-[20.16px] text-[#78716C]",
                fontMonrope.className
              )}
            >
              Total Collateral Value
            </p>
            <p
              className={cn(
                "text-[32px] font-medium leading-[40.96px] text-[#1C1917] dark:text-[#FFFFFF]",
                fontMonrope.className
              )}
            >
              <CountUp
                start={0}
                end={parseFloat(tvl.toString().replace(/[^0-9.-]+/g, ""))}
                duration={2.5}
                separator=","
                formattingFn={formatCurrency}
                prefix="$"
              />
            </p>
          </div>
          <div>
            <p
              className={cn(
                "text-[14px] font-semibold leading-[20.16px] text-[#78716C]",
                fontMonrope.className
              )}
            >
              Total Debt Value
            </p>
            <p
              className={cn(
                "text-[32px] font-medium leading-[40.96px] text-[#1C1917] dark:text-[#FFFFFF]",
                fontMonrope.className
              )}
            >
              <CountUp
                start={0}
                end={parseFloat(
                  totaldebt?.toString().replace(/[^0-9.-]+/g, "")
                )}
                duration={2.5}
                separator=","
                formattingFn={formatCurrency}
                prefix="$"
              />
            </p>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-[#A8A29E] size-[16px]" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-none text-[#A8A29E] bg-[#F5F5F4] rounded-[12px] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        <div className="hidden lg:block">
          <table className="min-w-full">
            <thead>
              <tr
                className={cn(
                  "text-left text-[14px] text-[#A8A29E] font-normal",
                  fontMonrope.className
                )}
              >
                <th className="p-4">LSTs Vault</th>
                <th className="p-4 flex ">
                  TVL <ChevronsUpDown className="size-[20px]" />
                </th>
                <th className="p-4">Minted USBD</th>
                <th className="p-4">MCR</th>
                <th className="p-4">Available to Deposit</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item: any) => (
                <tr
                  key={item.VaultTokenName}
                  className="cursor-pointer hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-[#F74A17]"
                  onClick={() => {
                    router.push(
                      `/vaults/deposit?vault=${item.VaultTokenAddress}`
                    );
                  }}
                >
                  <td className="p-4 flex items-center space-x-4 ">
                    <img
                      src={item.VaultTokenImage}
                      alt={item.VaultTokenName}
                      className="size-[36px] rounded-full"
                    />
                    <div className={cn("", fontMonrope.className)}>
                      <div className="font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]">
                        {item.VaultTokenName}
                      </div>
                      {/* <div className="text-[#A8A29E] text-[14px] font-semibold">
                      {item.tagline}
                    </div> */}
                    </div>
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {formatCurrency(item.formatedTotalCollateral)}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {formatCurrency(item.formatedTotalDebt)}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {`${item.formatedMCR}%`}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    $100
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        router.push(
                          `/vaults/deposit?vault=${item.VaultTokenAddress}`
                        );
                      }}
                      className={cn(
                        "text-[#8C8FA1] font-medium hover:underline flex justify-end items-center",
                        fontMonrope.className
                      )}
                    >
                      Deposit <ChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden">
          {paginatedData.map((item: any) => (
            <div
              key={item.VaultTokenName}
              className="border-b border-[#E5E5E5] rounded-lg p-4 mb-4 cursor-pointer hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-l-[#F74A17]"
              onClick={() => {
                router.push(`/vaults/deposit?vault=${item.VaultTokenAddress}`);
              }}
            >
              {/* Vault Section */}
              <div className="flex items-center justify-between mb-4 ">
                <div className="flex items-center">
                  <img
                    src={item.VaultTokenImage}
                    alt={item.VaultTokenName}
                    className="w-[36px] h-[36px] rounded-full mr-4"
                  />
                  <div>
                    <div
                      className={cn(
                        "font-semibold text-[16px] text-[#151618] dark:text-[#FFFFFF]",
                        fontMonrope.className
                      )}
                    >
                      {item.VaultTokenName}
                    </div>
                  </div>
                </div>
                {/* Action Section */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      router.push(
                        `/vaults/deposit?vault=${item.VaultTokenAddress}`
                      );
                    }}
                    className="text-[#8C8FA1] hover:underline flex items-center"
                  >
                    Deposit <ChevronRight />
                  </button>
                </div>
              </div>

              {/* Data Section */}
              <div className="grid grid-cols-2 gap-y-4 text-[14px]">
                <div>
                  <p className="text-[#8D8883]">TVL</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {formatCurrency(item.formatedTotalCollateral)}
                  </p>
                </div>
                <div>
                  <p className="text-[#8D8883]">Minted USBD</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {formatCurrency(item.formatedTotalDebt)}
                  </p>
                </div>
                <div>
                  <p className="text-[#8D8883]">MCR</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {`${item.formatedMCR}%`}
                  </p>
                </div>
                <div>
                  <p className="text-[#8D8883]">Available to Deposit</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618] dark:text-[#FFFFFF]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    $100
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center flex-col gap-3 lg:gap-0 lg:flex-row p-4">
          <div className="space-x-2 flex items-center">
            <button
              className="px-2 py-1 border border-[#E7E5E4] rounded-[12px] size-[44px]"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="size-[24px]" />
            </button>
            {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
              (_, i) => (
                <button
                  key={i}
                  className={`px-2 py-1  ${
                    page === i + 1
                      ? "bg-gray-200 rounded-full size-[44px] text-[#151618] "
                      : ""
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              className="px-2 py-1 border border-[#E7E5E4] rounded-[12px] size-[44px]"
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(filteredData.length / itemsPerPage)}
            >
              <ChevronRight className="size-[24px]" />
            </button>
          </div>

          <div>
            {itemsPerPage * (page - 1) + 1} -{" "}
            {Math.min(itemsPerPage * page, filteredData.length)} of{" "}
            {filteredData.length}
          </div>
        </div>
      </div>
    </div>
  );
}
