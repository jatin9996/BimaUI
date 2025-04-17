import { NextResponse } from "next/server";
import { getContractData, formatContractData, getDefaultContractData } from "@/lib/contract-utils"
export async function GET() {

  const contractData = await getDefaultContractData();
  const formattedData = formatContractData(contractData,97000);
  console.log("formattedData", formattedData);
  const cardsData = [
    {
      circulationAmount: formattedData.mintedUSBD,
      heading: "USBD circulating",
    },
  ];
  try {
    const cardsList = cardsData?.map(({ circulationAmount, heading }) => ({
      circulationAmount,
      heading,
    }));
    return NextResponse.json({
      success: true,
      data: cardsList,
      count: cardsList.length,
    });
  } catch (error) {
    console.error("Error in /api/home:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
