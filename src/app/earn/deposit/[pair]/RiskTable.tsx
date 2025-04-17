"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  MoveUpRight,
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
import metamask from "@/assets/icons/metamask.svg";

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

export default function RiskTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"vault" | "info" | "risks">(
    "vault"
  );

  const tabPositions = {
    vault: "translate-x-0",
    info: "translate-x-[100%]",
    risks: "translate-x-[196%]",
  };

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
    <div className="  p-4 bg-white rounded-[20px] mt-5  ">
      <div className="flex items-center justify-between gap-5 lg:gap-0 flex-col lg:flex-row border-b border-dashed border-gray-200 pb-4 mb-4">
        <div className="relative flex items-center bg-[#E7E5E4] rounded-[14px] h-[48px] w-[80%] lg:w-[20%]">
          <div
            className={`absolute h-[44px] w-[33.3%] bg-[#FAFAF9] rounded-[14px] ms-[2.3px]  transition-transform duration-300 ${tabPositions[activeTab]}`}
          />

          {["vault", "info", "risks"].map((tab) => (
            <div
              key={tab}
              className={cn(
                "z-10 flex items-center justify-center w-[33.3%] cursor-pointer text-[16px] font-medium text-[#57534E]",
                tab === activeTab ? "font-bold" : "",
                "fontSpace_Grotesk"
              )}
              onClick={() => setActiveTab(tab as "vault" | "info" | "risks")}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>
        {/* Search Bar */}
        <div className="flex justify-end items-center flex-col lg:flex-row gap-4 lg:gap-2">
          {activeTab === "vault" && (
            <div className="relative">
              <Search className="absolute left-3 top-[15px] text-[#A8A29E] size-[16px]" />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 h-[48px] border border-none text-[#A8A29E] bg-[#F5F5F4] rounded-[12px] focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <div>
            <button
              className={cn(
                "flex items-center justify-center gap-1  rounded-[14px] text-[#919191]",
                fontMonrope.className
              )}
            >
              <Image src={metamask} alt="metamask" className="w-[28px]" />
              <span className="text-[16px] font-medium border-b border-dashed border-[#919191] ">
                View on Etherscan
              </span>{" "}
              <MoveUpRight className="size-[16px]" />
            </button>
          </div>
          <div className="relative"></div>
        </div>
      </div>

      {/* Table */}
      {activeTab === "vault" && (
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
                <div className="flex items-center justify-between mb-3">
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
                        <span className="ml-2 text-[10px] border border-[#EDEEF1] px-2 py-1 rounded-[4px] text-[#151618]">
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

                  {/* Action Button */}
                  <div className="flex justify-end mt-4">
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

                {/* Key Data as a Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[14px]">
                  <div>
                    <p className="text-[#A8A29E] mb-1">Risk</p>
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

                  <div>
                    <p className="text-[#A8A29E] mb-1">Est. APY</p>
                    <p className="text-[#151618] font-semibold">
                      {item.estAPY}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#A8A29E] mb-1">Hist. APY</p>
                    <p className="text-[#151618] font-semibold">
                      {item.histAPY}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#A8A29E] mb-1">Available</p>
                    <p className="text-[#151618] font-semibold">
                      {item.available}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#A8A29E] mb-1">Holdings</p>
                    <p className="text-[#151618] font-semibold">
                      {item.holdings}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#A8A29E] mb-1">Deposits</p>
                    <p className="text-[#151618] font-semibold">
                      {item.deposits}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center gap-4 lg:gap-0 flex-col lg:flex-row p-4">
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
                        ? "bg-gray-200 rounded-full size-[44px]"
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
                disabled={
                  page === Math.ceil(filteredData.length / itemsPerPage)
                }
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
      )}

      {activeTab === "info" && (
        <div className="flex flex-col gap-4">
          {/* Vault Contract Address */}
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <p
              className={cn(
                "text-[14px] font-semibold text-[#78716C]",
                fontMonrope.className
              )}
            >
              Vault Contract Address
            </p>
            <p
              className={cn(
                "text-[14px] font-medium text-[#F74A17]",
                fontSpace_Grotesk.className
              )}
            >
              <span className="block sm:hidden">
                {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                {/* Mobile View */}
              </span>
              <span className="hidden sm:block">
                0x6953504F2f4537D7a7B4024508f321f7816BB6ED {/* Desktop View */}
              </span>
            </p>
          </div>

          {/* Token Contract Address */}
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <p
              className={cn(
                "text-[14px] font-semibold text-[#78716C]",
                fontMonrope.className
              )}
            >
              Token Contract Address
            </p>
            <p
              className={cn(
                "text-[14px] font-medium text-[#F74A17]",
                fontSpace_Grotesk.className
              )}
            >
              <span className="block sm:hidden">
                {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                {/* Mobile View */}
              </span>
              <span className="hidden sm:block">
                0x6953504F2f4537D7a7B4024508f321f7816BB6ED {/* Desktop View */}
              </span>
            </p>
          </div>

          {/* Staking Contract Address */}
          <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
            <p
              className={cn(
                "text-[14px] font-semibold text-[#78716C]",
                fontMonrope.className
              )}
            >
              Staking Contract Address
            </p>
            <p
              className={cn(
                "text-[14px] font-medium text-[#F74A17]",
                fontSpace_Grotesk.className
              )}
            >
              <span className="block sm:hidden">
                {`0x6953504F2f4537D7a7B4024508f321f7`.slice(0, 34)}...{" "}
                {/* Mobile View */}
              </span>
              <span className="hidden sm:block">
                0x6953504F2f4537D7a7B4024508f321f7816BB6ED {/* Desktop View */}
              </span>
            </p>
          </div>
        </div>
      )}

      {activeTab === "risks" && (
        <div className="flex flex-col gap-5">
          <p
            className={cn(
              "h-[27px] w-[46px] rounded-[6px] bg-[#CCFFE5] text-[16px] font-medium text-[#006633] flex items-center justify-center",
              fontSpace_Grotesk.className
            )}
          >
            Low
          </p>
          <p
            className={cn(
              " text-[14px] font-medium text-[#A8A29E] ",
              fontMonrope.className
            )}
          >
            es simplemente el texto de relleno de las imprentas y archivos de
            texto. Lorem Ipsum ha sido el <br className="hidden lg:block" />{" "}
            texto de relleno estándar de las industrias desde el año 1500,
            cuando un impresor (N. del T. <br className="hidden lg:block" />
            persona que se dedica a la im
          </p>
        </div>
      )}
    </div>
  );
}
