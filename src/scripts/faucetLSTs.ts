type LSTs = {
    [key: string]: {
        lstTokens:{
            lstName: string;
            lstAddress: string;
            lstImage: string;
        }[];
    }
};

type faucetContract = {
    [key: string]: {
        contractAddress: string;
        faucetLink: string;
    }
};

export const faucetContracts: faucetContract = {
    '200810':{
        contractAddress: "0x0E9B3208BBc81C18ED32a72e6Aa9505bfeB85eD9",
        faucetLink: "https://www.bitlayer.org/faucet"
    },
    '17000':{
        contractAddress: "0x82F7548ea57BeBc02aE16b0DD8B157BD7b2C222a",
        faucetLink: "https://www.holeskyfaucet.io/"
    },
    '686868':{
        contractAddress: "0xE66E60c64d7295e5CB5d1C00A3531ff33e8B09ce",
        faucetLink: "https://www.merlinfaucet.io/"
    },
    '421614':{
        contractAddress: "0xc38B60716E634080d95eB8a921D4CFd07CeD881E",
        faucetLink: "https://www.merlinfaucet.io/"
    },
    '43113':{
        contractAddress:"0x6B7Bfc6880f3ca892E0f1800bf1F5bc58Cd560b1",
        faucetLink: "https://core.app/tools/testnet-faucet/?subnet=c&token=c"
    },
    '1115':{
        contractAddress:"0x9540dd2AF8242518562101b42D71Ce2ec169A5a3",
        faucetLink: "https://scan.test.btcs.network/faucet"
    },
    '84532':{
        contractAddress:"0x6B7Bfc6880f3ca892E0f1800bf1F5bc58Cd560b1",
        faucetLink: "https://www.alchemy.com/faucets/base-sepolia"
    },
    '11503':{
        contractAddress: "0xEd0Ac2EEA2cEC5C27E509e29814574603587f682",
        faucetLink: "https://bevm-testnet-faucet-alpha.vercel.app/"
    },
    '32':{
        contractAddress: "0x0C02D76404Bf28a82e2206fA0Afb333b4116eDac",
        faucetLink: "https://faucet.fantom.network/"
    }
    // '2442':{
    //     contractAddress: "0xb3A2c6ca9093Aaf13f752735E0759e3cA17002E3",
    //     faucetLink: "https://faucet.polygon.technology/"
    // },
    // '97':{
    //     contractAddress: "0xEd0Ac2EEA2cEC5C27E509e29814574603587f682",
    //     faucetLink: "https://www.bnbchain.org/en/testnet-faucet"
    // },
    // '11155111':{
    //     contractAddress: "0x1503e25A71923A6d349a1a267ABC82587B11be6d",
    //     faucetLink: "https://www.alchemy.com/faucets/ethereum-sepolia"
    // },
    // '11155420':{
    //     contractAddress: "0x1503e25A71923A6d349a1a267ABC82587B11be6d",
    //     faucetLink: "https://bevm-testnet-faucet-alpha.vercel.app/"
    // },
    // '4002':{
    //     contractAddress:"0x6EE35974e29F9F53E051B00EAcc153552fC87dbb",
    //     faucetLink: "https://faucet.fantom.network/"
    // },
    // '534351':{
    //     contractAddress:"0x73A991e3cDFF08E729F2e663Da33A975f521FdEc",
    //     faucetLink: "https://faucets.chain.link/scroll-sepolia-testnet"
    // },

    // '3441006':{
    //     contractAddress:"0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
    //     faucetLink: "https://thirdweb.com/manta-pacific-sepolia-testnet"
    // },
    // '62298':{
    //     contractAddress:"0x0B446824fc53b7898DCcAE72743Ac4c1AD3c2Af7",
    //     faucetLink:"https://citrea.xyz/bridge"
    // },
    // '314159':{
    //     contractAddress:"0x466C92d5bf1Adc11D62e08e3CAae6DB2b7D42A85",
    //     faucetLink:"https://faucet.calibnet.chainsafe-fil.io/"
    // },
    // '808813':{
    //     contractAddress:"0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
    //     faucetLink:"https://bob-sepolia.gobob.xyz/?type=deposit&network=sepolia"
    // },
    // '7001':{
    //     contractAddress:"0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
    //     faucetLink:"https://www.zetachain.com/docs/reference/apps/get-testnet-zeta/"
    // },
    // '195':{
    //     contractAddress:"0xe05295f7be167a9bFfEd5b0a4626b42dEdDC955f",
    //     faucetLink:"https://www.okx.com/xlayer/faucet"
    
    // }

}


const lsts: LSTs = {
    '200810': {
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0x691F17519E79866b5f1f6963D7Ed860900f8508a",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '17000':{
        lstTokens: [
            {
                lstName : "stBTC",
                lstAddress : "0x7DF7731a15cc70D5bEF8EABd3Af2bA69418d2a86",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '686868': {
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0xacBce5cFD3703E6F6e59f596deF42feDBCfD964E",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '421614': {
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0xE20B0B5E240910Ca1461893542C6F226793aAD25",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '43113':{
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '1115':{
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0x75e30CE7c54569eD628592970ddf92980adcF1B0",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '84532':{
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0x6EE35974e29F9F53E051B00EAcc153552fC87dbb",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '11503':{
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0xcFd7Fc6D664FFcc2FC74b68C321ECd6a400d2118",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    },
    '31':{
        lstTokens: [
            {
                lstName : "bmBTC",
                lstAddress : "0x75F6420a198a95700226e7285B5E0b508E3b4Fd8",
                lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
            }
        ]
    }
    // '2442': {
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '97': {
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xcFd7Fc6D664FFcc2FC74b68C321ECd6a400d2118",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '11155111':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xF2f5354B51AcF096df9eCaeBfEEF050922FaDf49",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '11155420':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '4002':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xacBce5cFD3703E6F6e59f596deF42feDBCfD964E",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },

    // '534351':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xE20B0B5E240910Ca1461893542C6F226793aAD25",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '3441006':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xe8ce5A9A4B8f64E7e91a1d640E2661c5897492D6",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '62298':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0x7adAF14C8E26564dE61BDFcD0d4448db02F7B72D",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '314159':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0x9540dd2AF8242518562101b42D71Ce2ec169A5a3",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '808813':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xac392ef4106EBE101D5Baee573a8Ff0471c5Cd37",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // },
    // '7001':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0x2288125D557B9E0f3dC84731Ab57bEf60af47fbF",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]

    // },
    // '195':{
    //     lstTokens: [
    //         {
    //             lstName : "bmBTC",
    //             lstAddress : "0xF2f5354B51AcF096df9eCaeBfEEF050922FaDf49",
    //             lstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
    //         }
    //     ]
    // }
}

export default lsts;