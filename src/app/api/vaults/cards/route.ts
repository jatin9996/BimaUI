import { toDollar } from "@/lib/utils";
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { fetchGeneralData } from "@/scripts/fetchData";
import { getVaultsDataFromContract } from "@/lib/contract-utils";
// const _cdata = [
//   { title: "Total Value Locked", value: toDollar(219600) },
//   { title: "Minted USBD", value: "19.8k / ∞" },
//   { title: "MCR", value: "31.88%" },
//   { title: "Mint Fee", value: "5.00%" },
//   { title: "Borrow Interest Rate", value: "50.00%" },
//   { title: "Redemption Rebate", value: "0.00%" },
//   { title: "Staked stBTC APR", value: "2.6%" },
// ];

// const provider = new ethers.JsonRpcProvider(
//   "https://rpc-testnet.lorenzo-protocol.xyz/"
// );

// function formatContractData(contractData: any) {
//   const etherToUSD = BigInt(60000);
//   const weiToEther = BigInt(10n ** 18n);
//   const percentageDivider = BigInt(10n ** 16n);

//   const totalValueLocked =
//     Number((contractData.totalCollateral / weiToEther) * etherToUSD);
//   const mintedUSBD = Number(contractData.totalDebt / weiToEther);
//   const mcr = Number(contractData.mcr / percentageDivider);
//   const mintFee = Number(contractData.mintFee / percentageDivider);
//   const borrowInterestRate =
//   Number(contractData.borrowInterestRate / percentageDivider);
//   const redemptionRebate = Number(contractData.redemptionRate / percentageDivider);
//   const stakedEtherAPR = Number(contractData.rewardRate / percentageDivider);

//  return [
//     { title: "Total Value Locked", value: `$${totalValueLocked.toFixed(2)}` },
//     { title: "Minted USBD", value: `${mintedUSBD.toFixed(2)} / ∞` },
//     { title: "MCR", value: `${mcr.toFixed(2)}%` },
//     { title: "Mint Fee", value: `${mintFee.toFixed(2)}%` },
//     { title: "Borrow Interest Rate", value: `${borrowInterestRate.toFixed(2)}%` },
//     { title: "Redemption Rebate", value: `${redemptionRebate.toFixed(2)}%` },
//     { title: "Staked stBTC APR", value:`${stakedEtherAPR.toFixed(2)}%` },
//   ]
//   // return {
//   //   totalValueLocked: `$${totalValueLocked.toFixed(2)}`,
//   //   mintedUSBD: `${mintedUSBD.toFixed(2)} / ∞`,
//   //   mcr: `${mcr.toFixed(2)}%`,
//   //   mintFee: `${mintFee.toFixed(2)}%`,
//   //   borrowInterestRate: `${borrowInterestRate.toFixed(2)}%`,
//   //   redemptionRebate: `${redemptionRebate.toFixed(2)}%`,
//   //   stakedEtherAPR: `${stakedEtherAPR.toFixed(2)}%`,
//   // };
// }
// const getVaultsDataFromContract = async () => {
//   const contractData = await fetchGeneralData({
//     troveManagerAddress: "0x796B058649Ee8b72B851DE6Af4d3529019198803",
//     provider,
//   });
//   if (contractData) {
//     console.log("contractData", contractData)
//     const formattedData = formatContractData(contractData);
//     console.log("formattedData", formattedData);
//     return {
//       lst: {
//         cardsData: Array(1).fill(formattedData),
//       },
//       lrt: {
//         cardsData: Array(1).fill(formattedData),
//       },
//     };
//   }

// };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab");
  const networkParam = searchParams.get("network");

  const vaultsData: any = await getVaultsDataFromContract(networkParam??'Bitlayer');
  if (!tab || !vaultsData[tab]) {
    return NextResponse.json(
      { success: false, error: "Invalid tab parameter" },
      { status: 400 }
    );
  }

  try {
    // await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
    const { cardsData, cardsDataLRT } = vaultsData[tab];
    console.log("Cards data", cardsData)
    return NextResponse.json({
      success: true,
      data: { cardsData, cardsDataLRT },
    });
  } catch (error) {
    console.error("Error in /api/vaults/cards:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
