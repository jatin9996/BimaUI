import { NextResponse } from 'next/server';
// import {getUserBalance} from "@/lib/colletral-utils";

// export async function GET(request: Request) {

//     try{
//     const { searchParams } = new URL(request.url);
//     const address = searchParams.get("address");

//     console.log("Address->",address);
    
//     if (!address) {
//         return NextResponse.redirect("/");
//     }
//     const balance = await getUserBalance(address);
//     console.log("Balance->",balance);
    
//     return NextResponse.json({
//         success: true,
//         data: balance,
//       });
            
// } catch (error) {
//     console.log(error);
    
// }
// }