"use client";
import { StaticImageData } from "next/image";
import style from "./style.module.scss";
import Diposit from "@/assets/images/tokenImg/Diposit.png";
import WaterDrop from "@/assets/images/tokenImg/WaterDrop.png";
const inter = Manrope({ subsets: ["latin"] });

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";
import { Manrope } from "next/font/google";
import { cn, toDollar } from "@/lib/utils";
import Link from "next/link";

export type TStabilityPool = {
  id: string;
  token: {
    icon: string;
    title: string;
    label?: string;
  };
  amountTVL: number;
  unboostedAPR: number;
  boostedAPR: number;
  deposit: number;
  earned: number;
};
export const columns: ColumnDef<TStabilityPool>[] = [
  {
    accessorKey: "token",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:block hover:bg-transparent"
        >
          Token
        </Button>
      );
    },

    cell(props) {
      const token = props.row.getValue<TStabilityPool["token"]>("token");
      return (
        <div className="flex items-center space-x-2">
          <img src={token.icon} alt={token.title} className="h-8 w-8" />
          <div>
            <h6 className="font-semibold dark:text-white">{token.title}</h6>
            <small className="text-sm  text-muted-foreground">
              {token.label}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amountTVL",

    sortingFn: (a, b) => a.original.amountTVL - b.original.amountTVL,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          TVL
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("amountTVL");
      return (
        <span className={cn(inter.className, "font-semibold dark:text-white")}>
          {toDollar(value)}
        </span>
      );
    },
  },
  {
    accessorKey: "unboostedAPR",

    sortingFn: (a, b) => a.original.unboostedAPR - b.original.unboostedAPR,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Unboosted APR
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("unboostedAPR");
      return (
        <span className={cn(inter.className, "font-semibold dark:text-white")}>
          {value / 100}%
        </span>
      );
    },
  },
  {
    accessorKey: "boostedAPR",

    sortingFn: (a, b) => a.original.boostedAPR - b.original.boostedAPR,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Boosted APR
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("boostedAPR");
      return (
        <span className={cn(inter.className, "font-semibold text-blue-600")}>
          {value / 100}%
        </span>
      );
    },
  },
  {
    accessorKey: "deposit",

    sortingFn: (a, b) => a.original.deposit - b.original.deposit,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Your Deposit
          <ChevronsUpDown className="ml-2 h-[14px] w-[14px]" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("deposit");
      return (
        <div className="flex items-center justify-center gap-1">
          <img src={Diposit.src} alt={"diposit"} className="h-8 w-8" />
          <span
            className={cn(inter.className, "font-semibold dark:text-white")}
          >
            {toDollar(value)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "earned",

    sortingFn: (a, b) => a.original.earned - b.original.earned,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Earned
          <ChevronsUpDown className="ml-2 h-[14px] w-[14px] dark:text-white" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("earned");
      return (
        <div className="flex items-center justify-center gap-1 ">
          <img src={WaterDrop.src} alt={"water drop"} className="h-8 w-8" />
          <span
            className={cn(inter.className, "font-semibold dark:text-white")}
          >
            {toDollar(value)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell(props) {
      const token = props.row.getValue<TStabilityPool["token"]>("token");
      const id = props.row.original.id;
      return (
        <Link
          href={{ pathname: "/earn/deposit", query: { pool: id } }}
          className="hover:underline dark:text-white"
        >
          Manage
        </Link>
      );
    },
  },
];

function EarnDataTbl({
  data,
  paginate,
}: {
  data: TStabilityPool[];
  paginate?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    // manualPagination: true,
    // rowCount: 10,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });
  const [pageNo, setPageNo] = React.useState(0);
  useEffect(() => {
    table.setPageIndex(pageNo);
  }, [pageNo]);
  return (
    <div
      className={cn(
        style.tbl_div,
        "w-full border-gray-300 dark:border-gray-600 mb-5"
      )}
    >
      {/* Desktop View (Default Table) */}
      <div className="hidden lg:block">
        <Table className="border-0">
          <TableHeader className="border-0">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id} className="border-0 ">
                {headerGroup.headers.map((header: any) => (
                  <TableHead key={header.id} className="border-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" cursor-pointer hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-l-[#F74A17]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  className="border-0 h-20"
                  key={row.id}
                  onClick={() => {
                    window.location.href = `/earn/deposit?pool=${row.original.id}`;
                  }}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  <Loader2
                    className="animate-spin ms-[50%] dark:text-white"
                    width={34}
                    height={34}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View (Card Style) */}
      <div className="block lg:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: any) => (
            <div
              key={row.id}
              className="p-4 mb-4 grid grid-cols-2 md:grid-cols-3 gap-5 items-center justify-start cursor-pointer hover:bg-[radial-gradient(circle,_#FF9A7D_20%,_#FFF3EF)] dark:hover:bg-[radial-gradient(circle,_#2D3748_20%,_#1A202C)] hover:border-l-2 border-l-[#F74A17] rounded-b-[20px]"
              onClick={() => {
                window.location.href = `/earn/deposit?pool=${row.original.id}`;
              }}
            >
              {/* Render each cell as a row in the card */}
              {row.getVisibleCells().map((cell: any) => (
                <div key={cell.id} className="flex flex-col items-center mb-2 ">
                  <span className="text-sm font-medium text-gray-500">
                    {flexRender(
                      cell.column.columnDef.header,
                      cell.getContext()
                    )}
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <Loader2
              className="animate-spin ms-[50%] dark:text-white"
              width={34}
              height={34}
            />
          </div>
        )}
      </div>

      {paginate && (
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-start space-x-2 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPageNo((_) => _ - 1)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="sm"
                onClick={() => setPageNo(i)}
                disabled={i === pageNo}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPageNo((_) => _ + 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
          </div>
          {/* n-m of total */}
          <span className="text-sm text-muted-foreground">
            {`${pageNo * 10 + 1}-${
              pageNo * 10 + table.getRowModel().rows.length
            } of ${data.length}`}
          </span>
        </div>
      )}
    </div>
  );
}

export default EarnDataTbl;
