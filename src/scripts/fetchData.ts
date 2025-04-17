import { ethers, Provider } from "ethers";
import {
  MockOracle__factory,
  PriceFeed__factory,
  TroveManager__factory,
} from "../typechain-types/index";

export const fetchGeneralData = async ({
  troveManagerAddress,
  provider,
}: {
  troveManagerAddress: string;
  provider: Provider;
}) => {
  const troveManagerContract = TroveManager__factory.connect(
    troveManagerAddress,
    provider
  );

  try {
    const [
      totalCollateral,
      totalDebt,
      mcr,
      mintFee,
      borrowInterestRate,
      redemptionRate,
      totalStakes,
      rewardRate,
      rewardIntegral,
      totalActiveDebt,
      totalActiveCollateral,
      //currentPrice,
      maxSystemDebt,
    ] = await Promise.all([
      troveManagerContract.getEntireSystemColl(),
      troveManagerContract.getEntireSystemDebt(),
      troveManagerContract.MCR(),
      troveManagerContract.redemptionFeeFloor(),
      troveManagerContract.interestRate(),
      troveManagerContract.getRedemptionRate(),
      troveManagerContract.totalStakes(),
      troveManagerContract.rewardRate(),
      troveManagerContract.rewardIntegral(),
      troveManagerContract.getTotalActiveDebt(),
      troveManagerContract.getTotalActiveCollateral(),
      //troveManagerContract.fetchPrice(),
      troveManagerContract.maxSystemDebt(),
    ]);

    return {
      totalCollateral,
      totalDebt,
      mcr,
      mintFee,
      borrowInterestRate,
      redemptionRate,
      totalStakes,
      rewardRate,
      rewardIntegral,
      totalActiveDebt,
      totalActiveCollateral,
      //currentPrice,
      maxSystemDebt,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchPrice = async ({
  oracleAddress,
  provider
}: {
  oracleAddress: string;
  provider: Provider;
}) => {
  try {
    const oracleContract = MockOracle__factory.connect(oracleAddress, provider);

    const result = await oracleContract.latestRoundData();
    return result.answer;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export const fetchDataToCalculateUSDB = async ({
  collateralAmount,
  troveManagerAddress,
  oracleAddress,
  provider,
  }: {
  collateralAmount:number
  troveManagerAddress: string;
  oracleAddress: string;
  provider: Provider;
  }) => {
  const troveManagerContract = TroveManager__factory.connect(
    troveManagerAddress,
    provider
  );
  const price = await fetchPrice({ oracleAddress, provider });
  const collateralAmountFormatted = Number(
    ethers.formatUnits(collateralAmount, 18)
  );

  const debtGasCompensationFormatted = Number(
    ethers.formatUnits(await troveManagerContract.DEBT_GAS_COMPENSATION(), 18)
  );
  const borrowingRateWithDecayFormatted = Number(
    ethers.formatUnits(await troveManagerContract.getBorrowingRateWithDecay(), 18)
  );
  const decimalPrecisionFormatted = Number(
    ethers.formatUnits(await troveManagerContract.DECIMAL_PRECISION(), 18)
  );


  const collateralPriceFormatted = price ? Number(ethers.formatUnits(price, 18)): 0;

  const collateralRatioFormatted = Number(
    ethers.formatUnits(200, 18)
  );
  console.log("collateralPriceFormatted",collateralPriceFormatted);
  console.log("collateralRatioFormatted",collateralRatioFormatted);
  
  return (
    (collateralAmountFormatted * collateralPriceFormatted -
      collateralRatioFormatted * debtGasCompensationFormatted) /
    (collateralRatioFormatted *
      (1 + borrowingRateWithDecayFormatted / decimalPrecisionFormatted))
  );
}
