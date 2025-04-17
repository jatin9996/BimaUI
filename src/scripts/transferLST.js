import {ethers} from "ethers";

import {abi as LSTABI} from "../web3/abis/faucetABI.json";

export const transferLST = async(
    lstAddress,
    fauetContractAddress,
    user,
    userAddress,
) =>{
    try{
        const lstContract = new ethers.Contract(fauetContractAddress, LSTABI, user);
        const lst = lstContract.connect(user);
        const Tx = await lst.getTokens(lstAddress);
        return {status: true, message: "LST Transferred Successfully", hash: Tx.hash};
    }catch (error) {
        return {status: false, message: "Your daily limit is reached or something went wrong, please try after 24 hours"};
    }
}

