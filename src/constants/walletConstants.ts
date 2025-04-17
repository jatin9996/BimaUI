// import stBTCAbi from "../assets/contracts/artifacts/contracts/core/stBTC.sol/stBTC.json";
import prismaCoreAbi from "../assets/contracts/artifacts/contracts/core/PrismaCore.sol/PrismaCore.json";
import priceFeedAbi from "../assets/contracts/artifacts/contracts/core/PriceFeed.sol/PriceFeed.json";
// import feeReceiverAbi from "../assets/contracts/artifacts/contracts/";
import interimAdminAbi from "../assets/contracts/artifacts/contracts/dao/InterimAdmin.sol/InterimAdmin.json";
import gasPoolAbi from "../assets/contracts/artifacts/contracts/core/GasPool.sol/GasPool.json";
import factoryAbi from "../assets/contracts/artifacts/contracts/core/Factory.sol/Factory.json";
import liquidationManagerAbi from "../assets/contracts/artifacts/contracts/core/LiquidationManager.sol/LiquidationManager.json";
import debtTokenAbi from "../assets/contracts/artifacts/contracts/core/DebtToken.sol/DebtToken.json";
import borrowerOperationsAbi from "../assets/contracts/artifacts/contracts/core/BorrowerOperations.sol/BorrowerOperations.json";
import stabilityPoolAbi from "../assets/contracts/artifacts/contracts/core/StabilityPool.sol/StabilityPool.json";
import troveManagerAbi from "../assets/contracts/artifacts/contracts/core/TroveManager.sol/TroveManager.json";
import sortedTrovesAbi from "../assets/contracts/artifacts/contracts/core/SortedTroves.sol/SortedTroves.json";
import tokenLockerAbi from "../assets/contracts/artifacts/contracts/dao/TokenLocker.sol/TokenLocker.json";
import incentiveVotingAbi from "../assets/contracts/artifacts/contracts/dao/IncentiveVoting.sol/IncentiveVoting.json";
import { id } from "ethers";
// import prismaTokenAbi from "../assets/contracts/artifacts/contracts/staking/Curve/";
// import prismaVaultAbi from "../assets/contracts/artifacts/contracts/core/PrismaVault.sol/PrismaVault.json";

export const NETWORKS = {
  LORENZO: {
    MAINNET: {
      id: 8329,
      label: "Lorenzo Mainnet",
      rpcUrl: "https://rpc.lorenzo-protocol.xyz",
      token: "stBTC",
    },
    TESTNET: {
      id: 83291,
      label: "Lorenzo Testnet",
      rpcUrl: "https://rpc-testnet.lorenzo-protocol.xyz",
      token: "stBTC",
    },
  },
  BITLAYER:{
    TESTNET:{
      id: 200810,
      label: "Bitlayer Testnet",
      rpcUrl: "https://testnet-rpc.bitlayer.org",
      token: "BTC",
    }
  }
};

// export const stBTCContract = {
//   address: "0x400Fea00e4dA6ab69F3076cCE170206cdA5C6b86",
//   abi: stBTCABI,
// };

// export const prismaCoreContract = {
//   address: "0xA454725d4C08765b8034F805caf1665339dfa0aE",
//   abi: prismaCoreABI,
// };

// export const priceFeedContract = {
//   address: "0xEB8a00391CB27AF9Dc5A1c490D388E68E4eAFE5d",
//   abi: priceFeedAbi.abi,
// };

// // export const feeReceiverContract = {
// //   address: "0x9D5129B714E90283df1b26c30d93dc65627EA3FD",
// //   abi: feeReceiverABI,
// // };

// export const interimAdminContract = {
//   address: "0xC43E95e9b8eD16EDC6768173dddc109A3162746d",
//   abi: interimAdminAbi.abi,
// };

// export const gasPoolContract = {
//   address: "0xe0b77F3D6df1baE73c33a524F64F75e69B146321",
//   abi: gasPoolAbi.abi,
// };

// export const factoryContract = {
//   address: "0x7690D8Ddb6D941060B9D948e31288EdC4d335922",
//   abi: factoryAbi.abi,
// };

// export const liquidationManagerContract = {
//   address: "0xE9e766F9625ced546bA9C132a7e15dE51fB70D76",
//   abi: liquidationManagerAbi.abi,
// };

// export const debtTokenContract = {
//   address: "0x2A2540040FCe57259062658D9BA8A22387dC089f",
//   abi: debtTokenAbi.abi,
// };

// export const borrowerOperationsContract = {
//   address: "0xb2a25d9876F4361664acEaF2394bA6cabA49643C",
//   abi: borrowerOperationsAbi.abi,
// };

// export const stabilityPoolContract = {
//   address: "0x5CF7768176a7cAb738D5d5b4e31F32b5bE08D53A",
//   abi: stabilityPoolAbi.abi,
// };

// export const troveManagerContract = {
//   address: "0x0F389B02D25e04D467C0B5d69C59551202C2086a",
//   abi: troveManagerAbi.abi,
// };

// export const sortedTrovesContract = {
//   address: "0xf831146570d5f71d6a9698D48714CA1b01Db5e2d",
//   abi: sortedTrovesAbi.abi,
// };

// export const tokenLockerContract = {
//   address: "0xa1dB39464E440Ac43E17f0D6b75b64c4588c7471",
//   abi: tokenLockerAbi.abi,
// };

// export const incentiveVotingContract = {
//   address: "0x2C3827E83CB97eb2a1af7FD3c2601EB05C36dD42",
//   abi: incentiveVotingAbi.abi,
// };

// export const prismaTokenContract = {
//   address: "0x220782F12A6Ec2e6184ca24DCaB12c11700B3796",
//   abi: prismaTokenContract.abi,
// };

// export const prismaVaultContract = {
//   address: "0xbBA9A7Ba92cE6479174a985e91Df80E9b9026E30",
//   abi: prismaVaultABI,
// };



////////////// BIT LAYER  //////////////////////
export const priceFeedContract = {
  address: "0x04b60d847Ad52D95A7D161f3a64Cf5DC257227b8",
  abi: priceFeedAbi.abi,
};

// export const feeReceiverContract = {
//   address: "0x9D5129B714E90283df1b26c30d93dc65627EA3FD",
//   abi: feeReceiverABI,
// };

export const interimAdminContract = {
  address: "0x7068FF41626D820975Bae8B59f7e6F0c020CF43c",
  abi: interimAdminAbi.abi,
};

export const gasPoolContract = {
  address: "0xc024EA8AC328ecB7744249a775ec1372e95f3bA9",
  abi: gasPoolAbi.abi,
};

export const factoryContract = {
  address: "0x97eb55cA765F3340B09831c925Fef8E97d0BC569",
  abi: factoryAbi.abi,
};

export const liquidationManagerContract = {
  address: "0x6875131AEC4b5F26B9F28797d58a77e9Dd065513",
  abi: liquidationManagerAbi.abi,
};

export const debtTokenContract = {
  address: "0xA725e534721B6c1068a05Dd1e24211816Db97d2e",
  abi: debtTokenAbi.abi,
};

export const borrowerOperationsContract = {
  address: "0x31adc5150877A68A6461Dc03Cec275813ACC4616",
  abi: borrowerOperationsAbi.abi,
};

export const stabilityPoolContract = {
  address: "0xD1Cb91Fde19E9D62a69909891408e1463291F72A",
  abi: stabilityPoolAbi.abi,
};

export const troveManagerContract = {
  address: "0xeEF74922BE62AE152f50b3f8CAA440A03CaeFA9A",
  abi: troveManagerAbi.abi,
};

export const sortedTrovesContract = {
  address: "0xb474B86480E426E80e53B21D2aD4e5Ec1cd2d8E1",
  abi: sortedTrovesAbi.abi,
};

export const tokenLockerContract = {
  address: "0x70E64C82c8479E359599ab598677D05124162bF6",
  abi: tokenLockerAbi.abi,
};

export const incentiveVotingContract = {
  address: "0xb02702a0Aa8F36CBa0DA9b0DB5AD81AF197B2C21",
  abi: incentiveVotingAbi.abi,
};





// stBTCAddress deployed!:  0x623Ba0db2DCB8fDB45a05c85084893fE190b40A9
// MockAggregatorAddress deployed!:  0x1cE57BEe569235E518FA9EccE31a5F8ec1e8dd1B
// BabelCore deployed!:  0x8694F49BB48b85fBB686eD532fE30B558908a77F
// PriceFeed deployed!:  0x04b60d847Ad52D95A7D161f3a64Cf5DC257227b8
// FeeReceiver deployed!:  0x7f3a5D8dFeA2E77CC5AB070b3338a9e9820d5BC1
// InterimAdmin deployed!:  0x7068FF41626D820975Bae8B59f7e6F0c020CF43c
// Ownership transferred to interimAdmin!
// Gas Pool deployed!:  0xc024EA8AC328ecB7744249a775ec1372e95f3bA9
// Factory deployed!:  0x97eb55cA765F3340B09831c925Fef8E97d0BC569
// LiquidationManager deployed!:  0x6875131AEC4b5F26B9F28797d58a77e9Dd065513
// DebtToken deployed!:  0xA725e534721B6c1068a05Dd1e24211816Db97d2e
// BorrowerOperations deployed!:  0x31adc5150877A68A6461Dc03Cec275813ACC4616
// StabilityPool deployed!:  0xD1Cb91Fde19E9D62a69909891408e1463291F72A
// TroveManager deployed!:  0xeEF74922BE62AE152f50b3f8CAA440A03CaeFA9A
// SortedTroves deployed!:  0xb474B86480E426E80e53B21D2aD4e5Ec1cd2d8E1
// TokenLocker deployed!:  0x70E64C82c8479E359599ab598677D05124162bF6
// IncentiveVoting deployed!:  0xb02702a0Aa8F36CBa0DA9b0DB5AD81AF197B2C21
// BabelToken deployed!:  0xe5f172f0Eda5DD47467F37F51eD6b8760FEB1A13
// BabelVault deployed!:  0xfD5F0606eb941f6FAc947906ed548fc26Bf3114d