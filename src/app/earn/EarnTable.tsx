"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Search,
  SlidersVertical,
} from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

import Delta from "@/assets/icons/Delta.svg";
import Gamma from "@/assets/icons/Gamma.svg";
import Rho from "@/assets/icons/Rho.svg";
import Gammax from "@/assets/icons/Gammax.svg";
import USBD_2 from "@/assets/icons/USBD_2.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FilterTab from "./FilterTab";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

type Data = {
  pair: string;
  risk: "Low" | "Medium" | "High";
  estAPY: string;
  histAPY: string;
  available: string;
  holdings: string;
  deposits: string;
};

const Data = [
  {
    Pair: "Delta Neutral",
    logo: Delta,
    tagline: "USBD",
    risk: "Low",
    estAPY: "4.58%",
    histAPY: "5.18%",
    available: "0.00",
    holdings: "0.00",
    deposits: "46.13%",
  },
  {
    Pair: "Gamma Neutral",
    logo: Gamma,
    tagline: "USBD",
    risk: "High",
    estAPY: "4.58%",
    histAPY: "5.18%",
    available: "0.00",
    holdings: "0.00",
    deposits: "46.13%",
  },
  {
    Pair: "Rho Neutral",
    logo: Rho,
    tagline: "USBD",
    risk: "High",
    estAPY: "4.58%",
    histAPY: "5.18%",
    available: "0.00",
    holdings: "0.00",
    deposits: "46.13%",
  },
  {
    Pair: "Gamma x Rho",
    logo: Gammax,
    tagline: "USBD",
    risk: "Medium",
    estAPY: "4.58%",
    histAPY: "5.18%",
    available: "0.00",
    holdings: "0.00",
    deposits: "46.13%",
  },
];

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const router = usePathname();
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();

  const filteredData = Data.filter((item) =>
    item.Pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className=" p-4 bg-white dark:bg-[#1A1A1A] rounded-[20px] my-5  ">
      <div className="flex items-center justify-between flex-col lg:flex-row border-b border-dashed border-gray-200 pb-4 mb-4">
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
                "text-[32px] font-medium leading-[40.96px] text-[#1C1917]",
                fontMonrope.className
              )}
            >
              $76.09M
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
                "text-[32px] font-medium leading-[40.96px] text-[#1C1917]",
                fontMonrope.className
              )}
            >
              $126.09M
            </p>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end items-center flex-col lg:flex-row gap-2">
          <div className="relative mt-3 lg:mt-0">
            <Search className="absolute left-3 top-[15px] text-[#A8A29E] size-[16px]" />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 h-[48px] border border-none text-[#A8A29E] bg-[#F5F5F4] rounded-[12px] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <button
                className={cn(
                  "flex items-center justify-center gap-1 h-[48px] w-[121px] rounded-[14px] bg-[#F5F5F4] text-[16px] font-medium text-[#A8A29E]",
                  fontSpace_Grotesk.className
                )}
              >
                All Chains <ChevronDown />
              </button>
            </div>
            <div className="relative">
              <button
                className={cn(
                  "flex items-center justify-center gap-1 h-[48px] w-[88px] rounded-[14px] text-[16px] font-medium ",
                  isFilterOpen
                    ? "bg-black text-white"
                    : "bg-[#F5F5F4] text-[#A8A29E]",
                  fontSpace_Grotesk.className
                )}
                onClick={toggleFilterMenu}
              >
                <SlidersVertical className="size-[20px]" /> Filter
              </button>
              {isFilterOpen && <FilterTab />}
            </div>
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
                  "text-left text-[14px] text-[#A8A29E] font-normal bg-white ",
                  fontMonrope.className
                )}
              >
                <th className="p-4">Pair</th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    {" "}
                    Risk <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    {" "}
                    Est. APY <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    Hist. APY <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    Available <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    Holdings <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">
                    Deposits <ChevronsUpDown className="size-[20px]" />
                  </div>
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.Pair} className="">
                  <td className="p-4 flex items-center space-x-4 ">
                    <Image
                      src={item.logo}
                      alt={item.Pair}
                      className="size-[36px] rounded-full"
                    />
                    <div className={cn("", fontMonrope.className)}>
                      <div className="font-semibold text-[16px] text-[#151618]">
                        {item.Pair}
                        <span className="ms-2 text-[10px] border border-[#EDEEF1] px-2 py-1 rounded-[4px] text-[#151618]">
                          v2
                        </span>
                      </div>
                      <div className="text-[#A8A29E] text-[14px] font-semibold flex items-center gap-1">
                        <Image src={USBD_2} alt="USBD" />
                        {item.tagline}
                      </div>
                    </div>
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    <span
                      className={`h-[28px] px-2 py-1 rounded-[6px] text-[16px] font-medium ${
                        item.risk === "Low"
                          ? "bg-[#CCFFE5] text-[#006633]"
                          : item.risk === "Medium"
                          ? "bg-[#CCE5FF] text-[#003366]"
                          : "bg-[#FFCCCC] text-[#660000]"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.estAPY}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.histAPY}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.available}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.holdings}
                  </td>
                  <td
                    className={cn(
                      "p-4 font-normal text-[16px] text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.deposits}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        router.push(
                          `/earn/deposit/${item.Pair.toLowerCase().replace(
                            / /g,
                            "-"
                          )}`
                        );
                      }}
                      className="text-[#8C8FA1] hover:underline flex justify-end items-center"
                    >
                      <ChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile view */}
        <div className="lg:hidden">
          {paginatedData.map((item) => (
            <div
              key={item.Pair}
              className="border-b border-[#EDEEF1] rounded-lg p-4 mb-4 bg-white "
            >
              {/* Pair Section */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Image
                    src={item.logo}
                    alt={item.Pair}
                    className="w-[36px] h-[36px] rounded-full mr-4"
                  />
                  <div>
                    <div
                      className={cn(
                        "font-semibold text-[16px] text-[#151618] mb-1",
                        fontMonrope.className
                      )}
                    >
                      {item.Pair}
                      <span className="ms-2 text-[10px] border border-[#EDEEF1] px-2 py-1 rounded-[4px] text-[#151618]">
                        v2
                      </span>
                    </div>
                    <div
                      className={cn(
                        "text-[#A8A29E] text-[14px] font-semibold flex items-center gap-1",
                        fontMonrope.className
                      )}
                    >
                      <Image
                        src={USBD_2}
                        alt="USBD"
                        className="w-[16px] h-[16px]"
                      />
                      {item.tagline}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      router.push(
                        `/earn/deposit/${item.Pair.toLowerCase().replace(
                          / /g,
                          "-"
                        )}`
                      );
                    }}
                    className="text-[#8C8FA1] hover:underline flex items-center"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              {/* Risk Badge */}
              <div className="flex justify-center items-center gap-5 mb-4">
                <p className="text-[#A8A29E] text-[14px]">Risk</p>
                <span
                  className={`h-[28px] px-2 py-1 rounded-[6px] text-[14px] font-medium ${
                    item.risk === "Low"
                      ? "bg-[#CCFFE5] text-[#006633]"
                      : item.risk === "Medium"
                      ? "bg-[#CCE5FF] text-[#003366]"
                      : "bg-[#FFCCCC] text-[#660000]"
                  }`}
                >
                  {item.risk}
                </span>
              </div>

              {/* Data Section */}
              <div className="flex flex-wrap justify-between gap-4 mb-4 text-[14px]">
                <div>
                  <p className="text-[#A8A29E]">Est. APY</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.estAPY}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8A29E]">Hist. APY</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.histAPY}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8A29E]">Available</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.available}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8A29E]">Holdings</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.holdings}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8A29E]">Deposits</p>
                  <p
                    className={cn(
                      "font-semibold text-[#151618]",
                      fontSpace_Grotesk.className
                    )}
                  >
                    {item.deposits}
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
                    page === i + 1 ? "bg-gray-200 rounded-full size-[44px]" : ""
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
