import { ethers } from "ethers";
import contracts from "@/scripts/contracts";
import vaults from "@/scripts/vaults";
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
import {
    StakedBTC__factory,
    TroveManager__factory,
  } from "../typechain-types/index";

export const getUserBalance = async (signerAddress: any,vaultAddress:any,rpcURL:string) => {
    const vaultInfo = vaults.find((vault) => vault.vaultsAddress === vaultAddress);
    const provider = new ethers.JsonRpcProvider(rpcURL);
    const collateralContract = StakedBTC__factory.connect(
      vaultInfo?.colletralTokenAddress as string,
        provider
      );
    const balanceOfUser = await collateralContract.balanceOf(signerAddress);
    console.log("balanceOfUser", balanceOfUser.toString());
    return balanceOfUser.toString();
}

// export const getMCR = async (troveManagerAddress:any) => {
//     const troveManagerContract = TroveManager__factory.connect(
//         contracts.troveManagerAddress,
//         provider
//       );
//     const mcr = await troveManagerContract.MCR();
//     console.log("MCR", mcr.toString());
//     return mcr.toString();
// }
