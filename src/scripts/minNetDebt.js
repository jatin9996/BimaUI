import { ethers } from 'ethers';
import { abi as BorrowerOperationsABI } from '../web3/abis/borrowerOperationsABI.json';

export const getMinNetDebt = async (provider, borrowerOperationsAddress) => {
  try {
    const contract = new ethers.Contract(
      borrowerOperationsAddress,
      BorrowerOperationsABI,
      provider
    );
    const minNetDebt = await contract.minNetDebt();
    const minNetDebtString = minNetDebt.toString();
    const formattedMinNetDebt = `${minNetDebtString.slice(
      0,
      -18
    )}.${minNetDebtString.slice(-18)}`;
    return formattedMinNetDebt;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
