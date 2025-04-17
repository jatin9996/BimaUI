import { toDollar } from "@/lib/utils";
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { fetchGeneralData } from "@/scripts/fetchData";
import { getVaultsDataFromContract, PoolsDatafromNetwork } from "@/lib/contract-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const networkParam = searchParams.get("network");
  const user = searchParams.get("user");
    const network = networkParam || "Bitlayer";
    console.log('network -> ',network);
    const UserAddress = user || ethers.ZeroAddress
  try {
    const Poolsdata = await PoolsDatafromNetwork(network,UserAddress);    
    if (Poolsdata.length === 0) {
        return NextResponse.json(
            { success: false, error: "No data found for the network" },
            { status: 400 }
        );
    }
    return NextResponse.json({
      success: true,
      data: Poolsdata,
    });
  } catch (error) {
    console.error("Error in /api/earn/pools:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
