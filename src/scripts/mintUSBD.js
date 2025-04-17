import { Signer, ZeroAddress, ethers, formatEther, parseEther } from "ethers";

import {
  BorrowerOperations__factory,
  TroveManager__factory,
  StakedBTC__factory,
  StabilityPool__factory,
  DebtToken__factory,
  MultiCollateralHintHelpers__factory,
  PriceFeed__factory
} from "../typechain-types/index";
import { fetchGeneralData, fetchPrice } from "./fetchData";
import { debtTokenContract } from "@/constants/walletConstants";
import { zeroAddress } from "viem";
import { bigint } from "valibot";
import { forma } from "viem/chains";
async function  sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const percentageDivider = BigInt(10n ** 16n);

export const depositUSBD = async(
  stabilityPoolAddress,
  debtTokenAddress,
  user,
  amount,
) =>{
  // const owner = await user.getAddress();

  console.log("Stability Pool Address: ", stabilityPoolAddress);
  console.log("Debt Token Address: ", debtTokenAddress);
  console.log("User Address: ", user);
  console.log("Amount: ", amount);
  try{
  const stabilityPoolContract = StabilityPool__factory.connect(
    stabilityPoolAddress,
    user
  );
  const debtTokenContract = DebtToken__factory.connect(debtTokenAddress, user);

  console.log("Depositing ", amount, " to Stability Pool");
  // const allowance = await debtTokenContract.allowance(owner, stabilityPoolAddress);
  const approveTx = await debtTokenContract.approve(stabilityPoolAddress, amount);

  console.log("Approved Stability Pool to spend Debt Token");
  console.log("approveTx", approveTx.hash);
  
  await sleep(5000);
  
  const depositTx = await stabilityPoolContract.provideToSP(amount);
  await sleep(5000);
  console.log("Deposited ", amount, " to Stability Pool");
  console.log("depositTx", depositTx.hash);
  return depositTx.hash;
}catch (error) {
  throw error;
}
}  


export const WithdrawalUSBD = async(
  stabilityPoolAddress,
  user,
  amount,
) =>{
  console.log("Stability Pool Address: ", stabilityPoolAddress);
  console.log("User Address: ", user);
  console.log("Amount: ", amount);
  try{
  const stabilityPoolContract = StabilityPool__factory.connect(
    stabilityPoolAddress,
    user
  );

  const depositTx = await stabilityPoolContract.withdrawFromSP(amount);
  await sleep(5000);
  console.log("Withdrawal ", amount, " from Stability Pool");
  console.log("Withdraw", depositTx.hash);
  return depositTx.hash;
}catch (error) {
  throw error;
}
}  



export const checkVaultPosition = async (
  troveManagerAddress,
  priceFeedAddress,
  userAddress,
  provider
) => {


  console.log(":Provider",provider);
  console.log("User",userAddress);
  
  
  const troveManager = TroveManager__factory.connect(troveManagerAddress,provider)

  const priceFeed = PriceFeed__factory.connect(priceFeedAddress,provider);

  let debtInFront = "0";
  let depositedColl = "0";
  let liquidationPrice = "0";
  let borrowInterestRate = "0";
  let remainingMintableUSBD = "0";
  let collateralRatio = "0";

  let coll = 0n;
  let debt = 0n;
  try {
    const [fetchedColl, fetchedDebt] = await troveManager.getTroveCollAndDebt(
      userAddress
    );
    coll = fetchedColl;
    debt = fetchedDebt;
    console.log("Fetched coll:", coll);
    console.log("Fetched debt:", debt);
  } catch (error) {
    console.error("Error fetching collateral and debt:", error);
  }

  try {
    debtInFront = parseFloat(ethers.formatEther(debt)).toFixed(2);
    depositedColl = parseFloat(ethers.formatEther(coll)).toFixed(2);
    console.log("debtInFront:", debtInFront);
  } catch (error) {
    console.error("Error formatting debtInFront:", error);
    debtInFront = "0";
  }

  try {
    const MCR = await troveManager.MCR();
    const liquidationPriceBN = (debt * MCR) / 1000000000000000000n - 1n;
    liquidationPrice = parseFloat(
      ethers.formatEther(liquidationPriceBN)
    ).toFixed(2);
    console.log("liquidationPrice:", liquidationPrice);
  } catch (error) {
    console.error("Error calculating liquidationPrice:", error);
    liquidationPrice = "0";
  }

  try {
    const borrowRate = await troveManager.interestRate();

    console.log("BorrowRate",borrowRate);
    
    borrowInterestRate = Number(borrowRate / percentageDivider).toFixed(2)
    console.log("borrowInterestRate:", borrowInterestRate);
  } catch (error) {
    console.error("Error fetching borrowInterestRate:", error);
    borrowInterestRate = "0";
  }

  try {
    const maxSystemDebt = await troveManager.maxSystemDebt();
    const totalActiveDebt = await troveManager.getTotalActiveDebt();
    const defaultedDebt = await troveManager.defaultedDebt();

    const remainingMintableUSBDValue =
      maxSystemDebt - totalActiveDebt - defaultedDebt;

    const formattedRemainingMintableUSBD = ethers.formatUnits(
      remainingMintableUSBDValue,
      18
    );
    remainingMintableUSBD = parseFloat(formattedRemainingMintableUSBD).toFixed(
      2
    );
    console.log("remainingMintableUSBD:", remainingMintableUSBD);
  } catch (error) {
    console.error("Error fetching remainingMintableUSBD:", error);
    remainingMintableUSBD = "0";
  }

  try {
    const collateralTokenAddress = await troveManager.collateralToken();

    const priceRecord = await priceFeed.priceRecords(collateralTokenAddress);

    const priceBN = priceRecord.scaledPrice;

    const price = BigInt(priceBN.toString());

    const [collBN, debtBN] = await troveManager.getTroveCollAndDebt(
      userAddress
    );

    const collValue = BigInt(collBN.toString());
    const debtValue = BigInt(debtBN.toString());

    if (collValue === 0n && debtValue === 0n) {
      collateralRatio = "0";
    } else {
      const ICRValue = await troveManager.getCurrentICR(userAddress, price);

      const ICR = BigInt(ICRValue.toString());

      collateralRatio = Number(ICR / percentageDivider).toFixed(2)
    }
    console.log("collateralRatio:", collateralRatio);
  } catch (error) {
    console.error("Error fetching collateralRatio:", error);
    collateralRatio = "0";
  }

  return {
    debtInFront,
    depositedColl,
    liquidationPrice,
    borrowInterestRate,
    remainingMintableUSBD,
    collateralRatio,
  };
};




export const redeemColletral = async(
  hintHelperAddress,
  troveManagerAddress,
  debtToken,
  price,
  user,
) => {
  try{
    const userAddress = await user.getAddress();
    const TroveManagerContract = TroveManager__factory.connect(troveManagerAddress,user);
    // const ZeroAddress = ethers.ZeroAddress();
    console.log("userAddress",userAddress);
    console.log(debtToken);
    
    
    if(debtToken <= 0){
      return;
    }
    const parsedprice = BigInt(ethers.parseEther(price));
    console.log("parsedprice",parsedprice);
    const debtValue = ethers.parseEther(debtToken);
    console.log("DebtVaule",debtValue);
    // const NominalICR = await getNominalICR(hintHelperAddress,troveManagerAddress,debtValue,parsedprice,0,user)
    // console.log("NominalICR",NominalICR);
    const helperContract = await MultiCollateralHintHelpers__factory.connect(hintHelperAddress,user);
    const ICR =await helperContract.getRedemptionHints(troveManagerAddress,debtValue,parsedprice,0);
    console.log("NominalICR",ICR[0],ICR[1]);
    const tx = await TroveManagerContract.redeemCollateral(
      debtValue,
      ICR[0],
      zeroAddress,
      zeroAddress,
      ICR[1],
      '0',
      '1000000000000000000'
    )

  return tx.hash;

  }catch (e) {
      return (e); 
  }
}


const getNominalICR = async(
  hintHelperAddress,
  troveManager,
  amount,
  price,
  maxIterations,
  provider
)=>{
  try{

    console.log("NominalICR",ICR);
    return ICR
  }catch(e){
    return e;
  }
}


export const getUSBDBalance = async(
  debtTokenAddress,
  user,
) =>{
  try{
  const userAddress = await user.getAddress();
  const debtTokenContract = DebtToken__factory.connect(debtTokenAddress, user);
  const balance = await debtTokenContract.balanceOf(userAddress);
  console.log("USBD Balance: ", balance);
  return balance;
}catch (error) {
  return error;
}
}




//   export const getUSBDAmount = async (
//     oracleAddress,
//     collateralAddress,
//     troveManagerAddress,
//     provider,
//     amountstBTC,
//     percentage,
//     signerAddress
//   ) => {
//     try{
//     const price = await fetchPrice({
//       oracleAddress,
//       collateralAddress,
//       provider: provider,
//     });
//     console.log("Price: ", price);
//     if (!price) {
//       console.log("Price not available");
//       return null;
//     }

//     const troveManagerContract = await TroveManager__factory.connect(
//       troveManagerAddress,
//       provider
//     )
//     // const signerAddress = await provider.getAddress();
//     const depositedAmount = await troveManagerContract.getTroveStake(
//       signerAddress
//     );
//     const debtAmount = await troveManagerContract.getTroveCollAndDebt(
//       signerAddress
//     );
//     console.log("===========================");
//     console.log("SignerAddress",signerAddress); 
//     console.log("DepositedAmmount:",depositedAmount);
    
    
//     const normalizedPrice = price / 10n ** 8n;

//     // if (depositedAmount > 0){
//     //   const newAmounts =
//     //   (BigInt(amountstBTC) * normalizedPrice * 100n) / BigInt(percentage);
//     // console.log("New Amounts: ", newAmounts);
//     // console.log("DebtAmmount",debtAmount[1]);
    
//     // const change = Number(parseEther(newAmounts.toString()) - debtAmount[1]);
//     // console.log("change:",change);
//     // return change;
//     // }else{
//       console.log("Normalized Price: ", normalizedPrice);
//       const percentageAmount = (BigInt(amountstBTC) * normalizedPrice * 100) / BigInt(percentage);
//       console.log("Percentage Amount: ", percentageAmount);
//      return percentageAmount.toFixed(2);  
//     // }
//     }catch (error) {
//       console.log("Error: ", error);
//       return error
//     }
// }

export const getUSBDAmount = async (
  oracleAddress,
  collateralAddress,
  troveManagerAddress,
  provider,
  amountstBTC,
  percentage,
  signerAddress
) => {
  try{
  const price = await fetchPrice({
    oracleAddress,
    collateralAddress,
    provider: provider,
  });
  console.log("Price: ", price);
  if (!price) {
    console.log("Price not available");
    return null;
  }
  const normalizedPrice = parseInt(price) / 10 ** 8;
  console.log("Normalized Price: ", normalizedPrice);
  const percentageAmount = ((amountstBTC) * normalizedPrice * 100) / (percentage);
  console.log("Percentage Amount: ", percentageAmount);

   return percentageAmount.toFixed(2);  
  }catch(e){
    return e;
  }
}

export const getLSTPrice = async (
  oracleAddress,
  collateralAddress,
  provider,
) =>{
  try{
  const price = await fetchPrice({
    oracleAddress,
    collateralAddress,
    provider: provider,
  });
  console.log("Price: ", price);
  if (!price) {
    console.log("Price not available");
    return 0;
  }
  const normalizedPrice = parseInt(price) / 10 ** 8;
  console.log("Normalized Price: ", normalizedPrice);
  return normalizedPrice;

}catch (error) {
  console.log("Error: ", error);
  return error
}
}


export const mintUSBD = async ({
  borrowerOperationsAddress,
  signer,
  amountstBTC,
  percentage,
  troveManagerAddress,
  oracleAddress,
  collateralAddress,
}) => {

  try{
  const signerAddress = await signer.getAddress();
  const borrowerOperationsContract = BorrowerOperations__factory.connect(
    borrowerOperationsAddress,
    signer
  );

  const troveManagerContract = await TroveManager__factory.connect(
    troveManagerAddress,
    signer
  );

  const stBTC = await StakedBTC__factory.connect(collateralAddress, signer);

  if (!signer.provider) {
    throw new Error("Provider not available");
  }

  const price = await fetchPrice({
    oracleAddress,
    collateralAddress,
    provider: signer.provider,
  });

  if (!price) {
    console.log("Price not available");
    return null;
  }

  const normalizedPrice = price / 10n ** 8n;

  const percentageAmount =
    (amountstBTC * normalizedPrice * 100n) / BigInt(percentage);
    
  const result = await stBTC.approve(
    borrowerOperationsAddress,
    amountstBTC
  );
   await sleep(8000);
  // await wait();
  // console.log("Approval Result", result);
  
  const depositedAmount = await troveManagerContract.getTroveStake(
    signerAddress
  );

  const debtAmount = await troveManagerContract.getTroveCollAndDebt(
    signerAddress
  );

  console.log("Debt Amount: ", formatEther(debtAmount[1]));

  if (depositedAmount === 0n) {
    console.log("amountstBTC: ", amountstBTC);
    console.log("percentageAmount: ", percentageAmount);

    console.log(troveManagerAddress);
    console.log("Signer address: ", signerAddress);

   const tx = await borrowerOperationsContract.openTrove(
      troveManagerAddress, // troveManagerAddress
      signerAddress,
      parseEther("1"),
      amountstBTC,
      percentageAmount,
      ZeroAddress,
      ZeroAddress
    );
    return tx;
  } else {

    // const tx = await borrowerOperationsContract.addColl(
    //   troveManagerAddress,
    //   signerAddress,
    //   amountstBTC,
    //   ZeroAddress,
    //   ZeroAddress
    // )

    // return tx;

    const increaseDecrease = amountstBTC;
    console.log("Increase Decrease: ", increaseDecrease);
    const newAmounts =
      (amountstBTC * normalizedPrice * 100n) / BigInt(percentage);
    console.log("New Amounts: ", newAmounts);
    const change = newAmounts;
    console.log("Change: ", change);
    console.log({
      0: troveManagerAddress, // troveManagerAddress
      1: signerAddress, // borrower
      2: parseEther("1"), // maxFeePercentage
      3: increaseDecrease > 0n ? increaseDecrease : 0n, // collDeposit
      4: increaseDecrease < 0n ? -increaseDecrease : 0n, // collWithdrawal
      5: change >= 0n ? change : -change, // debtChange
      6: true, //isDebtIncrease
      7: ZeroAddress,
      8: ZeroAddress,
    });

   const tx = await borrowerOperationsContract.adjustTrove(
      troveManagerAddress, // troveManagerAddress
      signerAddress, // borrower
      parseEther("1"), // maxFeePercentage
      increaseDecrease > 0n ? increaseDecrease : 0n, // collDeposit
      increaseDecrease < 0n ? -increaseDecrease : 0n, // collWithdrawal
      change >= 0n ? change : -change, // debtChange
      change >= 0n, //isDebtIncrease
      ZeroAddress,
      ZeroAddress
    );
    
    return tx;
  }} catch (error) {

    return throwError(error);
  }
};
