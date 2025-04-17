import { fetchGeneralData, fetchPrice } from "@/scripts/fetchData";
import { ethers, Provider } from "ethers";
import contracts from "@/scripts/contracts";
import { BigNumber } from "ethers-old";
import { getPoolsData } from "@/scripts/fetchPoolsData";
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);


export const getProvider = (rpcURL : string ) =>{
    return new ethers.JsonRpcProvider(rpcURL);
}


export const formatContractData = (contractData: any,price:any) => {

  console.log("contractData", contractData);

    const etherToUSD = BigInt(Math.floor(price))
    const weiToEther = BigInt(10n ** 18n);
    const percentageDivider = BigInt(10n ** 16n);
    const totalValueLocked =BigNumber.from(contractData.totalCollateral).mul(etherToUSD).div(weiToEther);
    const mintedUSBD = Number(contractData.totalDebt / weiToEther).toFixed(2);
    const mcr = Number(contractData.mcr / percentageDivider).toFixed(2);
    const mintFee = Number(contractData.mintFee / percentageDivider).toFixed(2);
    const borrowInterestRate =
    Number(contractData.borrowInterestRate / percentageDivider).toFixed(2);
    const redemptionRebate = Number(contractData.redemptionRate / percentageDivider).toFixed(2);
    const stakedEtherAPR = Number(contractData.rewardRate / percentageDivider).toFixed(2);
  
   return {
        totalValueLocked,
        mintedUSBD,
        mcr,
        mintFee,
        borrowInterestRate,
        redemptionRebate,
        stakedEtherAPR
   };
  }

export const getCardsFromattedData = (formattedData:any) => {
    const cardsFromattedData = [
        { title: "Total Value Locked", value: `$${formattedData.totalValueLocked}` },
        { title: "Minted USBD", value: `${formattedData.mintedUSBD} / ∞` },
        //Overriding till the contract deployment works with 200% MCR
        // { title: "MCR", value: `${formattedData.mcr}%` },
        { title: "MCR", value: `${200.00}%` },
        { title: "Mint Fee", value: `${formattedData.mintFee}%` },
        { title: "Borrow Interest Rate", value: `${formattedData.borrowInterestRate}%` },
        { title: "Redemption Rebate", value: `${formattedData.redemptionRebate}%` },
        { title: "Staked BTC APR", value:`${formattedData.stakedEtherAPR}%` },
      ];
      return cardsFromattedData;
};

export const getContractData = async(network: string) => {
    var contract = contracts[network];
    const provider = getProvider(contract.rpcURL);

    const contractDataArray = await Promise.all(contract.vaults.map(async (vault) => {
      const contractData = await fetchGeneralData({
        troveManagerAddress: vault.vaultAddress,
        provider,
      });
      const oracleAddress = contract.oracleAddress
      const LSTprice = await fetchPrice({oracleAddress,provider});
      const collateralPriceFormatted = LSTprice ? (parseInt(LSTprice?.toString()) / 10 ** 8) : 0 ; 
      const formattedData = formatContractData(contractData,collateralPriceFormatted);
      console.log("formattedData", formattedData)
      const cardsFromattedData = getCardsFromattedData(formattedData);


      return {
        VaultTokenName: vault.tokenName,
        VaultTokenImage: vault.image,
        VaultTokenAddress: vault.vaultAddress,
        formatedTotalCollateral: Number(formattedData.totalValueLocked.toString()),
        formatedTotalDebt: formattedData.mintedUSBD,
        formatedMCR: formattedData.mcr,
        formatedMintFee: formattedData.mintFee,
        formatedBorrowInterestRate: formattedData.borrowInterestRate,
        formatedRedemptionRebate: formattedData.redemptionRebate,
        formatedStakedEtherAPR: formattedData.stakedEtherAPR,
        collateralPriceFormatted:collateralPriceFormatted
      };
    }));

    console.log("ArrayOf Contract :",contractDataArray);

    return contractDataArray;
}

export const getContractDataForUSDBToken = async(network:string) => {  
  var contract = contracts[network];
    const provider = getProvider(contract.rpcURL);

    const contractData = await fetchGeneralData({
        troveManagerAddress: contract.vaults[0].vaultAddress,
        provider,
      });
    return contractData;
}


export const getDefaultContractData = async() => {
  const defaultNetwork = contracts['Bitlayer'];
    const provider = getProvider(defaultNetwork.rpcURL);
    const contractData = await fetchGeneralData({
        troveManagerAddress: defaultNetwork.vaults[0].vaultAddress,
        provider,
      });
    return contractData;
}

export const getVaultsDataFromContract = async (network:string) => {
    const contractData = await getContractData(network);
    if (contractData) {
      return {
        lst: {
          cardsData: contractData,
        },
        lrt: {
          cardsData: contractData,
        },
      };
    }
  
  };


  export const PoolsDatafromNetwork = async (network:string,useraddress:string) => {
    console.log("network",network);
      var contract: any = contracts[network];
      const provider = getProvider(contract.rpcURL);
      var Poolsdata: any[] = [];
      const Pools = await Promise.all(contract.SPPools.map(async (pool:any) => {
        const poolsData = await getPoolsDataFromContract(pool.poolAddress,useraddress,provider);
        
        const formattedData = {
            id: pool.poolAddress,
            token: {
              icon: pool.image,
              title: "USBD",
              label: "USBD",
            },
            amountTVL: poolsData.formatedTotalDebtdeposits,
            unboostedAPR: 0,
            deposit: poolsData.formatedCompondeddeposits,
            boostedAPR: 0,
            earned: 0,
          }
          console.log("formattedData",formattedData);     
          Poolsdata.push(formattedData);
      }));
      return Poolsdata;
  }

  export const  getPoolsDataFromContract = async (stabilityPool_address:string,useraddress:string,provider:Provider) => {
    const poolsData = await getPoolsData({
        stabilityPool_address,
        useraddress,
        provider,
      });
      return poolsData;
  }
    





  // const calculateDebtAmount = async (
  //   collateralAmount: number,
  //   collateralRatio: number,
  //   price: number,
  //   troveManager: string
  // ) => {
  //   const collateralAmountFormatted = Number(
  //     ethers.formatUnits(collateralAmount, 18)
  //   );
  //   const collateralPriceFormatted = Number(ethers.formatUnits(price, 8));
  //   const collateralRatioFormatted = Number(
  //     ethers.formatUnits(collateralRatio, 18)
  //   );
  //   const debtGasCompensationFormatted = Number(
  //     ethers.formatUnits(await troveManager.DEBT_GAS_COMPENSATION(), 18)
  //   );
  //   const borrowingRateWithDecayFormatted = Number(
  //     ethers.formatUnits(await troveManager.getBorrowingRateWithDecay(), 18)
  //   );
  //   const decimalPrecisionFormatted = Number(
  //     ethers.formatUnits(await troveManager.DECIMAL_PRECISION(), 18)
  //   );
  
  //   return (
  //     (collateralAmountFormatted * collateralPriceFormatted -
  //       collateralRatioFormatted * debtGasCompensationFormatted) /
  //     (collateralRatioFormatted *
  //       (1 + borrowingRateWithDecayFormatted / decimalPrecisionFormatted))
  //   );
  // };

  // export async function getUSDBTokenAmount(network:string){

  // }