import { ethers, formatUnits } from 'ethers';
import { abi as StabilityPoolABI } from '../web3/abis/stabilityPoolABI.json';

export const getPoolDeposited = async (provider, stabilityPoolAddress, userAddress) => {
  try {
    const contract = new ethers.Contract(stabilityPoolAddress, StabilityPoolABI, provider);
    const deposit = await contract.accountDeposits(userAddress);
    const formattedDeposit = parseFloat(formatUnits(deposit.amount, 18)).toFixed(2);
    console.log
    return formattedDeposit;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
