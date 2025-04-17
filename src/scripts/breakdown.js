import { ethers } from "ethers";
import { abi as troveManagerAbi } from "@/web3/abis/troveManagerABI.json";
import { abi as priceFeedAbi } from "@/web3/abis/priceFeedABI.json";


const percentageDivider = BigInt(10n ** 16n);

export const breakdownFunctions = async (
  troveManagerAddress,
  priceFeedAddress,
  userAddress,
  provider
) => {
  const troveManager = new ethers.Contract(
    troveManagerAddress,
    troveManagerAbi,
    provider
  );

  const priceFeed = new ethers.Contract(
    priceFeedAddress,
    priceFeedAbi,
    provider
  );

  let debtInFront = "0";
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
    liquidationPrice,
    borrowInterestRate,
    remainingMintableUSBD,
    collateralRatio,
  };
};
