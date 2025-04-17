import { NextResponse } from "next/server";
import lsts from "@/scripts/faucetLSTs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const networkParam = searchParams.get("chainId");
      const network = networkParam || 200810;
      console.log('network -> ',network)

      try {
        const lstData = await lsts[network].lstTokens;
        if (lstData.length === 0) {
            return NextResponse.json(
                { success: false, error: "No data found for the network" },
                { status: 500 }
            );
        }
        return NextResponse.json({
          success: true,
          data: lstData,
        });
      } catch (error) {
        // console.error("Error in /api/faucet/list:", error);
        return NextResponse.json(
          { success: false, error: "Internal Server Error" },
          { status: 500 }
        );
      }



    }