import { NextResponse } from "next/server";

const BitlayervaultsData = [
 { 
    id: "lst",
    title: "Choose an LST to mint USBD",
    addonTitle: "Bitlayer stBTC",
    addonSubTitle:
      "on any USBD you mint by depositing into the Stability Pool.",
    chainId: 200810
  },
];

const LorenzovaultsData = [
  { 
     id: "lst",
     title: "Choose an LST to mint USBD",
     addonTitle: "Lorenzo stBTC",
     addonSubTitle:
       "on any USBD you mint by depositing into the Stability Pool.",
      chainId : 83291
   },
 ];

 const BoBvaultsData = [
  { 
     id: "lst",
     title: "Choose an LST to mint USBD",
     addonTitle: "BoB WBTC",
     addonSubTitle:
       "on any USBD you mint by depositing into the Stability Pool.",
      chainId : 111
   }
 ];
//for checking loader UI
const SIMULATED_DELAY_MS = 500;

export async function GET(request:Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
    const url = new URL(request.url);
    const containsNetwork = url.searchParams.get("network");
    if(containsNetwork == 'Bitlayer'){
    const vaultsList = BitlayervaultsData?.map(
      ({ id, title, addonTitle, addonSubTitle,chainId }) => ({
        id,
        title,
        addonTitle,
        addonSubTitle,
        chainId,
      })
    );
    return NextResponse.json({
      success: true,
      data: vaultsList,
      count: vaultsList.length,
    });
  }else if(containsNetwork == 'Lorenzo'){
    const vaultsList = LorenzovaultsData?.map(
      ({ id, title, addonTitle, addonSubTitle,chainId }) => ({
        id,
        title,
        addonTitle,
        addonSubTitle,
        chainId,
      })
    );
    return NextResponse.json({
      success: true,
      data: vaultsList,
      count: vaultsList.length,
    });
  }else{
    const vaultsList = BoBvaultsData?.map(
      ({ id, title, addonTitle, addonSubTitle,chainId }) => ({
        id,
        title,
        addonTitle,
        addonSubTitle,
        chainId,
      })
    );
    return NextResponse.json({
      success: true,
      data: vaultsList,
      count: vaultsList.length,
    });
  }
  } catch (error) {
    console.error("Error in /api/vaults:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
