import { ethers, Provider } from "ethers";
import {
  MockOracle__factory,
  PriceFeed__factory,
  TroveManager__factory,
  StabilityPool__factory
} from "../typechain-types/index";
import contracts from "./contracts";



export const getPoolsData = async ({
    stabilityPool_address,
    useraddress,
    provider,
    }: {
    stabilityPool_address: string;
    useraddress:string;
    provider: Provider;
    }) => {
    const stabilityPoolContract = StabilityPool__factory.connect(
        stabilityPool_address,
        provider
    );

    const totalDebtTokenDeposits = await stabilityPoolContract.getTotalDebtTokenDeposits();
    const compondedDeposit = await stabilityPoolContract.getCompoundedDebtDeposit(useraddress)
    const formatedTotalDebtdeposits = Number(
        ethers.formatUnits(totalDebtTokenDeposits, 18)
      );
    const formatedCompondeddeposits = Number(
      ethers.formatUnits(compondedDeposit, 18)
    );
    return {
        formatedTotalDebtdeposits,
        formatedCompondeddeposits
    };
    }




// export const getContractData = async (network: string) => {
//   var contract = contracts[network];
//   const provider = getProvider(contract.rpcURL);

//   const contractData = await fetchGeneralData({
//     troveManagerAddress: contract.troveManagerAddress,
//     provider,
//   });
//   return contractData;
// }
