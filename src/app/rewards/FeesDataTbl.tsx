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
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { Manrope } from "next/font/google";
import { cn, toDollar } from "@/lib/utils";
import Link from "next/link";

export type TStabilityPool = {
  id: string;
  token: {
    icon: StaticImageData;
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
    header: "Token",
    cell(props) {
      const token = props.row.getValue<TStabilityPool["token"]>("token");
      return (
        <div className="flex items-center space-x-2">
          <img src={token.icon.src} alt={token.title} className="h-8 w-8" />
          <div>
            <h6 className="font-semibold">{token.title}</h6>
            <small className="text-sm  text-muted-foreground">
              {token.label}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "APR",
    sortingFn: (a, b) => a.original.amountTVL - b.original.amountTVL,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TVL
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      let value = props.row.getValue<number>("amountTVL");
      return (
        <span className={cn(inter.className, "font-semibold")}>
          {toDollar(value)}
        </span>
      );
    },
  },
  {
    accessorKey: "Earned",
    sortingFn: (a, b) => a.original.unboostedAPR - b.original.unboostedAPR,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unboosted APR
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  //   cell(props) {
  //     let value = props.row.getValue<number>("unboostedAPR");
  //     return (
  //       <span className={cn(inter.className, "font-semibold")}>
  //         {value / 100}%
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "boostedAPR",
  //   sortingFn: (a, b) => a.original.boostedAPR - b.original.boostedAPR,
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Boosted APR
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell(props) {
  //     let value = props.row.getValue<number>("boostedAPR");
  //     return (
  //       <span className={cn(inter.className, "font-semibold text-blue-600")}>
  //         {value / 100}%
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "deposit",
  //   sortingFn: (a, b) => a.original.deposit - b.original.deposit,
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Your Deposit
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell(props) {
  //     let value = props.row.getValue<number>("deposit");
  //     return (
  //       <div className="flex items-center space-x-2">
  //         <img src={Diposit.src} alt={"diposit"} className="h-8 w-8" />
  //         <span className={cn(inter.className, "font-semibold")}>
  //           {toDollar(value)}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "earned",
  //   sortingFn: (a, b) => a.original.earned - b.original.earned,
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Earned
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell(props) {
  //     let value = props.row.getValue<number>("earned");
  //     return (
  //       <div className="flex items-center space-x-2">
  //         <img src={WaterDrop.src} alt={"water drop"} className="h-8 w-8" />
  //         <span className={cn(inter.className, "font-semibold")}>
  //           {toDollar(value)}
  //         </span>
  //       </div>
  //     );
  //   },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell(props) {
      const token = props.row.getValue<TStabilityPool["token"]>("token");
      return (
        <Link
          href={{ pathname: "/earn/deposit", query: { token: token.title } }}
          className="hover:underline"
        >
          Manage
        </Link>
      );
    },
  },
];

function FeesDataTbl({
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
        "w-full px-4 border-gray-300 dark:border-gray-600"
      )}
    >
      <Table className="border-0">
        <TableHeader className="border-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-0">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="border-0" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default FeesDataTbl;
