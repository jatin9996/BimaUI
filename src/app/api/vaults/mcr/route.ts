import { NextResponse } from 'next/server';
// import {getMCR} from "@/lib/colletral-utils";
import  contracts from "@/scripts/contracts";

// export async function GET(request: Request) {
//     try{
//     const mcr = await getMCR(contracts.troveManagerAddress);
//     console.log("MCR->",mcr);
    
//     return NextResponse.json({
//         success: true,
//         data: mcr,
//       });         
// } catch (error) {
//     console.log(error);
    
// }
// }