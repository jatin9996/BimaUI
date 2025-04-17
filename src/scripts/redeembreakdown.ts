import { Signer, ZeroAddress, ethers, formatEther, parseEther } from "ethers";

import {
  BorrowerOperations__factory,
  TroveManager__factory,
  StakedBTC__factory,
  StabilityPool__factory,
  DebtToken__factory,
} from "../typechain-types/index";
import { promise } from "valibot";

type Detail = {
    label: string;
    value: string | number;
    unit?: string;
  };

const redeemedDebtFraction= Number('1000000000000000000');
const percentageDivider = BigInt(10n ** 16n);


export const fetchRedeemFee =async(
  troveManagerAddress:any,
  user:any
)=>{
  try{
    console.log("TroveManager",troveManagerAddress);
    
    const TroveManagerContract = await TroveManager__factory.connect(troveManagerAddress,user);
    const redeemtion_fee =(await TroveManagerContract.getRedemptionRateWithDecay()/percentageDivider)
    const RedeemFeeAmount = Number(redeemtion_fee + (percentageDivider / BigInt(2)))
    const entireSystemdebt = await TroveManagerContract.getEntireSystemDebt()
    const amount = (RedeemFeeAmount /Number(entireSystemdebt) );
    console.log("Redeem Data -> -> -> ",redeemtion_fee,RedeemFeeAmount,amount,entireSystemdebt);
    
    return redeemtion_fee;
  }catch(e){
    return 0;
  }
}


// export const fetchRedeemFeeAmmount(
//   redeemFee:any

// )



export const fetchRedeemBreakdownData = async(
    troveManagerAddress:any,
    user:any
  ) =>{
    try{

        const TroveManagerContract = await TroveManager__factory.connect(troveManagerAddress,user);
        const redeemtion_fee =(await TroveManagerContract.getRedemptionRateWithDecay()/percentageDivider)
        const RedeemFeeAmount = Number(redeemtion_fee + (percentageDivider / BigInt(2)))
        const entireSystemdebt = await TroveManagerContract.getEntireSystemDebt()
        const amount = (RedeemFeeAmount /Number(entireSystemdebt) );


        const details: Detail[] = [
          { label: "Collateral Price", value: "$2,169.21" },
          { label: "Redemption Fees", value: `${redeemtion_fee}`, unit: "%" },
          { label: "Redemption Fee Amount", value: `${amount}`, unit: "" },
          // { label: "Expected Collateral Received", value: "0.00", unit: "wsETH" },
          // { label: "Value of Collateral Received", value: "$0.00" },
          // { label: "Actual Redemption Amount", value: "0.00", unit: "USBD" },
        ];
      
      return details;

    }catch(e){
      return e;
    }

  }
   
  export default fetchRedeemBreakdownData;