type Chains = {
  [key: number]: {
    NetworkName: string;
  };
};



const chains: Chains = {
    83291: {
        NetworkName: "Lorenzo"
    },
    200810: {
        NetworkName: "Bitlayer"
    },
    808813: {
        NetworkName: "BoB"
    },
    17000:{
        NetworkName: "Holesky"
    },
    97:{
        NetworkName: "BNBTestnet"
    },
    686868:{
        NetworkName: "MerlinTestnet"
    },
    2442:{
        NetworkName: "ZkevmCardona"
    },
    11503:{
        NetworkName: "BEVMTestnet"
    },
    11155111:{
        NetworkName: "sepolia"
    },
    421614:{
        NetworkName :"arbitramSepolia"
    },
    11155420:{
        NetworkName :"OptimismSepolia"
    },
    4002:{
        NetworkName :"fantomTestnet"
    },
    43113:{
        NetworkName :"avalancheTestnet"
    },
    84532:{
        NetworkName :"baseSepolia"
    },
    534351:{
        NetworkName :"scrollTestnet"
    },
    1115:{
        NetworkName :"coreTestnet"
    },
    3441006:{
        NetworkName:"manta"
    },
    5115:{
        NetworkName:"citrea"
    },
    314159:{
        NetworkName:"filecoin"
    },
    7001:{
        NetworkName:"zetachain"
    },
    195:{
        NetworkName:"xlayerTestnet"
    },
    1946:{
        NetworkName:"minatoTestnet"
    },
    31:{
        NetworkName:"rootstockTestnet"
    }
}

export default chains;
