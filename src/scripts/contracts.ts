type Networks = {
  [key: string]: {
    borrowerOperationsAddress: string;
    oracleAddress: string;
    priceFeedAddress?: string;
    troveManagerAddress?: string;
    multiCollateralHintHelpers?: string;
    rpcURL: string;
    explorerLink?: string;
    vaults: {
      tokenName: string;
      vaultAddress: string;
      image: string;
    }[];
    SPPools: {
      poolAddress: string;
      tokenAddress: string;
      tokenName: string;
      image: string;
    }[];
    Markets?: {
      id: string;
      debtToken: string;
      collateralToken: string;
      interest: string;
      morphoContract: string;
      debtTokenImage: string;
      collateralTokenImage: string;
      marketParams: {
        loanToken: string;
        collateralToken: string;
        oracle: string;
        irm: string;
        lltv: string;
      };
    }[];
  };
};

const networks: Networks = {
  Bitlayer: {
    borrowerOperationsAddress: "0xC6D5887EBD12290bC11cAe4f3a41232D459b6d42",
    oracleAddress: "0x1503e25A71923A6d349a1a267ABC82587B11be6d",
    priceFeedAddress: "0x0d1a956cceF81740BfAF3580A34CDFdA7b576c30",
    rpcURL: "https://testnet-rpc.bitlayer.org",
    multiCollateralHintHelpers: "0xfbb5dc670379677f1e79BA25e48aC974ad71D76a",
    explorerLink: "https://testnet.btrscan.com/tx/",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0x55796b02a7650C9fEF78bC2E73De1EF6dA719283",
        image:
          "https://img.cryptorank.io/coins/150x150.bitlayer1708427921502.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0xaC63A28044200Ceb0ff005725E65a2E431D7Eedf",
        tokenAddress: "0x165d03D3Df6443B87b4B7a6268fd13d37C5e3127",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0xb88038bd9e1ae3836a7f187826fef49688f674ca514cefdbeb9d347d66a17f72",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x165d03D3Df6443B87b4B7a6268fd13d37C5e3127",
          collateralToken: "0x691F17519E79866b5f1f6963D7Ed860900f8508a",
          oracle: "0xd966E9E0De9E6F2b16cBe898CF89D6041A214F00",
          irm: "0xC6eb6dE204926325fC9201dAb87713A3a097A35f",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0x0257f54cC90239107Fb839c32c0051c4da4AEe21",
      },
    ],
  },
  Holesky: {
    borrowerOperationsAddress: "0x37Aea972f740401a2296EE466a441E55dA42Ec87",
    oracleAddress: "0xd296Ea42A6dBbd171025d6087AAe4dBFBfc7c70d",
    priceFeedAddress: "0x345dAe9dFF29EFFcb5427B8276AA49708a4314Ba",
    multiCollateralHintHelpers:"0x165d03D3Df6443B87b4B7a6268fd13d37C5e3127",
    explorerLink:'https://holesky.etherscan.io/tx/',
    rpcURL:
      "https://holesky-eth.w3node.com/f1ef94bb8175b1a8f2357a29663a3b8a5b43906d28879e114b8c225a47811c14/api",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0x683b521E33E409dAf22fb41BB4545732739eaaB0",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0x5e56C08b9837a7ca3e2Cb32Bb11DE8CA4F6dC63c",
        tokenAddress: "0x1AFBb1615Fb208298Cf3d5428bf7FD6A42Aa8e58",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0x25087e4a2d1dea1d6afd79eeda4f78fed78e9aba600a9b5c78b842c850e46322",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0xcc5ad941bcf9c839926dC89bF05107B115C37D9c",
          collateralToken: "0x7DF7731a15cc70D5bEF8EABd3Af2bA69418d2a86",
          oracle: "0x70C42F61C40C764ED5aabd939286578982d80fA4",
          irm: "0x7b3cFc6d6692D9A1574DfC539a7b45B516b8e0Dc",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0xCF00A4f433bd36a21Bc3edF322A057Fa45382Ab4",
      },
    ],
  },
  BNBTestnet: {
    borrowerOperationsAddress: "0x98cb20D30da0389028EB71eF299B688979F5cB8b",
    oracleAddress: "0x5741306c21795FdCBb9b265Ea0255F499DFe515C",
    priceFeedAddress: "0xEdd95b1325140Eb6c06d8C738DE98accb2104dFB",
    rpcURL: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    explorerLink:'https://testnet.bscscan.com/tx/',
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0xC31738748270e564BBD6200746FEDB4aC874B55F",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0x4608fb6aBCf7841855A8E797B7E1fc08Ab9a1E67",
        tokenAddress: "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0xe9e935a37196b41da62481c9a30aa0f40d01a345d703eaf8445dea41ddbea55b",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663",
          collateralToken: "0xcFd7Fc6D664FFcc2FC74b68C321ECd6a400d2118",
          oracle: "0x4c5d597b8A1D0521D3fDB52D0B474D2578fc38BC",
          irm: "0xac392ef4106EBE101D5Baee573a8Ff0471c5Cd37",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
      },
    ],
  },
  MerlinTestnet: {
    borrowerOperationsAddress: "0xc38B60716E634080d95eB8a921D4CFd07CeD881E",
    oracleAddress: "0xE20B0B5E240910Ca1461893542C6F226793aAD25",
    priceFeedAddress: "0xb3A2c6ca9093Aaf13f752735E0759e3cA17002E3",
    rpcURL: "https://testnet-rpc.merlinchain.io",
    explorerLink:'https://testnet-scan.merlinchain.io/tx/',
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0x702dF4B9d42c27237a1527CF874b7fa14588Fca9",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0x931910D714e0Bee05e54d6449cfB81D08b047556",
        tokenAddress: "0xcc5ad941bcf9c839926dC89bF05107B115C37D9c",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0x0a9b0132408bd5970eb22e2dc8e7c2c540602043f27b90320f110e74e49b6d69",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0xcc5ad941bcf9c839926dC89bF05107B115C37D9c",
          collateralToken: "0xacBce5cFD3703E6F6e59f596deF42feDBCfD964E",
          oracle: "0x8218E44C457BAd32247c04D2f3839EF001DFb6F5",
          irm: "0xE70759571d99B7C11da194b3A2c3F5c6364F5896",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0xCED482d8464b1B58f3a1eb7fB61BA5AB0011C4C9",
      },
    ],
  },
  arbitramSepolia: {
    borrowerOperationsAddress: "0xb50b156c2f9418DE5c38Ca9070Ef2c3FA5e1AFA2",
    oracleAddress: "0x56a43EB56Da12C0dc1D972ACb089c06a5dEF8e69",
    priceFeedAddress: "0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
    rpcURL: "https://sepolia-rollup.arbitrum.io/rpc",
    explorerLink:'https://sepolia.arbiscan.io/tx/',
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0xb28FEFe4680E3ee6b6A5eb4Bb3AfDf58C71aed76",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0xA385C1494F7540CF3e6e35C0FBcCab2Fa6696C9C",
        tokenAddress: "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0xf76049db2e82721152a1998ce261c30fd51d6c1449a0ceac269a9ece90835aba",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
          collateralToken: "0xE20B0B5E240910Ca1461893542C6F226793aAD25",
          oracle: "0xd0004a6224D6268b448A54d6f9cE8789E760BC5e",
          irm: "0xdA9Ab7D4BFbE63c76351C767Ca85F7F4EF7fC2e9",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0x691F17519E79866b5f1f6963D7Ed860900f8508a",
      },
    ],
  },
  avalancheTestnet: {
    borrowerOperationsAddress: "0xEd0Ac2EEA2cEC5C27E509e29814574603587f682",
    oracleAddress: "0x31CF013A08c6Ac228C94551d535d5BAfE19c602a",
    priceFeedAddress: "0x15e47CF518073bd980f10a1064231db14238858A",
    rpcURL: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
    explorerLink:'https://testnet.snowtrace.io/tx/',
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0x96446938F8Cd78612C70b64790A21B063675752E",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0xE66E60c64d7295e5CB5d1C00A3531ff33e8B09ce",
        tokenAddress: "0x9540dd2AF8242518562101b42D71Ce2ec169A5a3",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0x7721349c60273b3006b707ffccf7a000d205f08ab8eb6b22b890af245746ecff",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x9540dd2AF8242518562101b42D71Ce2ec169A5a3",
          collateralToken: "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
          oracle: "0xd45d80aa25BdFFbf5dF13A1E6ACAA8809Ddef642",
          irm: "0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
      },
    ],
  },
  coreTestnet: {
    borrowerOperationsAddress: "0x5b6785476bC7834bfEd85e74A79aC3a144affB31",
    oracleAddress: "0x4260121248Db5c3330A55A415A6A5C8aF4936182",
    priceFeedAddress: "0x7Bb3a6d55DF48d7B5A9419712743e326235e3887",
    rpcURL: "https://rpc.test.btcs.network",
    explorerLink:'https://scan.test.btcs.network/tx/',
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0xb00efC873F242c60925E61B9d615170f9f55372F",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
        tokenAddress: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0xde7ff8162a879a898232e454cdde5eb6f4679873d860e66a37e8227a8c1428ac",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
          collateralToken: "0x75e30CE7c54569eD628592970ddf92980adcF1B0",
          oracle: "0xB048B329dcC1c8D04832888415b763087f71785C",
          irm: "0xc38B60716E634080d95eB8a921D4CFd07CeD881E",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0x01A4B3221E078106F9eb60C5303E3BA162F6a92e",
      },
    ],
  },
  baseSepolia: {
    borrowerOperationsAddress: "0xaDBf99AD3d108220576d3B2aAF8B955de2729364",
    oracleAddress: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
    priceFeedAddress: "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
    rpcURL: "https://sepolia.base.org",
    multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
    explorerLink:'https://sepolia.basescan.org/tx/',
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0xBB6b5A6d8Eef7280c2816C79A71DCF8503273CFa",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0xc13265Cb35a63aCe3BBd8dF5C249551355070321",
        tokenAddress: "0x678Ed24ec99e569B502B1D34001852f0595BD2df",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    Markets: [
      {
        id: "0xde2b24689ab27514c0e84a26bba66bd512ee302accfc675950b6bb9f398dcb8f",
        debtToken: "USBD",
        collateralToken: "bmBTC",
        interest: "1",
        marketParams: {
          loanToken: "0x678Ed24ec99e569B502B1D34001852f0595BD2df",
          collateralToken: "0x6EE35974e29F9F53E051B00EAcc153552fC87dbb",
          oracle: "0x292e0055691e103fb9Aa028B8f4ed7C789Ac2A52",
          irm: "0x2B9eB679Aeb4Ede15D7ad14E78AD6eA0500a4d6b",
          lltv: "900000000000000000",
        },
        debtTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        collateralTokenImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        morphoContract: "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
      },
    ],
  },
  rootstockTestnet: {
    borrowerOperationsAddress: "0xc29eC2c56f2D94c30ba1Be9A2bCc1bcA06B30D63",
    oracleAddress: "0x584B370b8b7d6BFF7932C21cd5A7055363B95a8c",
    priceFeedAddress: "0x727152232FF02b3E4724B841fa3FB77f666ae509",
    rpcURL: "https://mycrypto.testnet.rsk.co",
    multiCollateralHintHelpers: "0xdE04dECA2e208b2daf89Bb48D3a4B5D4BdEc0677",
    explorerLink:'https://sepolia.basescan.org/tx/',
    vaults: [
      {
        tokenName: "bmBTC",
        vaultAddress: "0x3Ac3b96bE5380b7F9A1242039215dcA35F7A8f51",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      },
    ],
    SPPools: [
      {
        poolAddress: "0x9F0bAA382BAEe03cF1245d4E9090945e60FA50Ef",
        tokenAddress: "0x07C4B0dB9c020296275dcEb6381397aC58bBf5C7",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
        tokenName: "USBD",
      },
    ],
    // Markets: [
    //   {
    //     id: "0xde2b24689ab27514c0e84a26bba66bd512ee302accfc675950b6bb9f398dcb8f",
    //     debtToken: "USBD",
    //     collateralToken: "bmBTC",
    //     interest: "1",
    //     marketParams: {
    //       loanToken: "0x678Ed24ec99e569B502B1D34001852f0595BD2df",
    //       collateralToken: "0x6EE35974e29F9F53E051B00EAcc153552fC87dbb",
    //       oracle: "0x292e0055691e103fb9Aa028B8f4ed7C789Ac2A52",
    //       irm: "0x2B9eB679Aeb4Ede15D7ad14E78AD6eA0500a4d6b",
    //       lltv: "900000000000000000",
    //     },
    //     debtTokenImage:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    //     collateralTokenImage:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    //     morphoContract: "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
    //   },
    // ],
  },
    // ZkevmCardona: {
  //   borrowerOperationsAddress: "0x5b6785476bC7834bfEd85e74A79aC3a144affB31",
  //   oracleAddress: "0xa24A68DD788e1D7eb4CA517765CFb2b7e217e7a3",
  //   priceFeedAddress: "0x7Bb3a6d55DF48d7B5A9419712743e326235e3887",
  //   rpcURL: "https://etherscan.cardona.zkevm-rpc.com",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xe94baa7890A81e6873632c95D0FCB29604C10C12",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
  //       tokenAddress: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // scrollTestnet: {
  //   borrowerOperationsAddress: "0x98cb20D30da0389028EB71eF299B688979F5cB8b",
  //   oracleAddress: "0x87dce67002e66C17BC0d723Fe20D736b80CAaFda",
  //   priceFeedAddress: "0xEdd95b1325140Eb6c06d8C738DE98accb2104dFB",
  //   rpcURL: "https://sepolia-rpc.scroll.io",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x1B2f879Ab2a3eB125a650cd53a6964052cf53613",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x4608fb6aBCf7841855A8E797B7E1fc08Ab9a1E67",
  //       tokenAddress: "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // manta: {
  //   borrowerOperationsAddress: "0xcFd7Fc6D664FFcc2FC74b68C321ECd6a400d2118",
  //   oracleAddress: "0x21531c13E104B7b074bEE2BF56FD3A68B37B24a7",
  //   rpcURL: "https://pacific-rpc.sepolia-testnet.manta.network/http",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x811aE5d50363dbd38B0aae5FE83915A39F7d57d8",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //     {
  //       tokenName: "mBTC",
  //       vaultAddress: "0x811aE5d50363dbd38B0aae5FE83915A39F7d57d8",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x73A991e3cDFF08E729F2e663Da33A975f521FdEc",
  //       tokenAddress: "0x75e30CE7c54569eD628592970ddf92980adcF1B0",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // citrea: {
  //   borrowerOperationsAddress: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
  //   oracleAddress: "0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
  //   rpcURL: "https://rpc.testnet.citrea.xyz",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x710aB13F1Bf405bCBDc9Ad8851bcab749faA3337",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x5b6785476bC7834bfEd85e74A79aC3a144affB31",
  //       tokenAddress: "0x911450A656185B2F3CAc631c7a0e9b653dfe335f",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // filecoin: {
  //   borrowerOperationsAddress: "0xEc63b8a3a2402892d3E6AB97b89CF47132a29dAa",
  //   oracleAddress: "0xacBce5cFD3703E6F6e59f596deF42feDBCfD964E",
  //   rpcURL: "https://filecoin-calibration.chainup.net/rpc/v1",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xA08788E54E80Ea422AD3e316cD0B2FD3d7F38B13",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x0BB0aA6Aa3A3FD4F7a43FB5e3d90bF9e6B4ef799",
  //       tokenAddress: "0x0bA523Cd5Aa725C66C3FE015BD52e7A16D3Fdb32",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // BoB: {
  //   borrowerOperationsAddress: "0x1f21E97cb89b03C414846ebffb482076753399C3",
  //   oracleAddress: "0xC3b8593869Be9f8c4154015AF1CDb69f0B6f0949",
  //   rpcURL: "https://bob-sepolia.rpc.gobob.xyz",
  //   vaults: [
  //     {
  //       tokenName: "tBTC",
  //       vaultAddress: "0xB4A2b7B818eB310771fa2F4afF84a6ffa1aC4606",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //     {
  //       tokenName: "wBTC",
  //       vaultAddress: "0x10D257e8F496A84d792EBCC4384957390DFb6543",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x9BC04137C2c95b92677C341511F84B694F451d8B",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x21531c13E104B7b074bEE2BF56FD3A68B37B24a7",
  //       tokenAddress: "0x7Bb3a6d55DF48d7B5A9419712743e326235e3887",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // zetachain: {
  //   borrowerOperationsAddress: "0x5b6785476bC7834bfEd85e74A79aC3a144affB31",
  //   oracleAddress: "0xDbB15AC4e44b999eFaeDA902A4f8F59bF881382B",
  //   rpcURL: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x3ec595ee68E1D2A80009A8F9122EEdc95B06f2Fc",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
  //       tokenAddress: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // xlayerTestnet: {
  //   borrowerOperationsAddress: "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
  //   oracleAddress: "0x2288125D557B9E0f3dC84731Ab57bEf60af47fbF",
  //   rpcURL: "https://endpoints.omniatech.io/v1/xlayer/testnet/public",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xa5876FDe789b918fa856b79caE7b5BBeCC412934",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x911450A656185B2F3CAc631c7a0e9b653dfe335f",
  //       tokenAddress: "0x6B7Bfc6880f3ca892E0f1800bf1F5bc58Cd560b1",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // minatoTestnet: {
  //   borrowerOperationsAddress: "0x98cb20D30da0389028EB71eF299B688979F5cB8b",
  //   oracleAddress: "0x7B783a093eE5Fe07E49b5bd913a1b4AD1e90B23F",
  //   rpcURL: "https://rpc.minato.soneium.org",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x1B2f879Ab2a3eB125a650cd53a6964052cf53613",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x4608fb6aBCf7841855A8E797B7E1fc08Ab9a1E67",
  //       tokenAddress: "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
    // sepolia: {
  //   borrowerOperationsAddress: "0x73A991e3cDFF08E729F2e663Da33A975f521FdEc",
  //   oracleAddress: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
  //   priceFeedAddress: "0x0bA523Cd5Aa725C66C3FE015BD52e7A16D3Fdb32",
  //   rpcURL: `https://eth-sepolia.g.alchemy.com/v2/0opVkTqr2Xz_uY4Lzh9gRAptCs4bnGFh`,
  //   multiCollateralHintHelpers: "0x39d2770AbcC456f6C6be820705eD966592E0ad96",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xB39403dE269198651837f54501Bc28f55Cfc4ee2",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //     {
  //       tokenName: "solvBTC",
  //       vaultAddress: "0x509aAb1A2501Ee6ce056De0D517Fc1ee44D45933",
  //       image: "https://res1.sft-api.com/token/SolvBTC.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0xacBce5cFD3703E6F6e59f596deF42feDBCfD964E",
  //       tokenAddress: "0xcFd7Fc6D664FFcc2FC74b68C321ECd6a400d2118",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // BEVMTestnet: {
  //   borrowerOperationsAddress: "0x6539C23868dc9Ac70f78a6034af853476477BcEc",
  //   oracleAddress: "0x4260121248Db5c3330A55A415A6A5C8aF4936182",
  //   priceFeedAddress: "0x8b6a055BcF85203e320A62b0D1baEbBa0AA5ef13",
  //   rpcURL: "https://testnet.bevm.io/rpc",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0x72C56eD0D46364C08257F8502b7cf17CB8f596D6",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x96F0EaCF9097fcEA88bDe9de3f7E8B215f6757Df",
  //       tokenAddress: "0x4608fb6aBCf7841855A8E797B7E1fc08Ab9a1E67",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // OptimismSepolia: {
  //   borrowerOperationsAddress: "0x0B446824fc53b7898DCcAE72743Ac4c1AD3c2Af7",
  //   oracleAddress: "0x3015aa11f5c2D4Bd0f891E708C8927961b38cE7D",
  //   priceFeedAddress: "0x05b5044984747e8FB4D1B4837Ad4bD4Fd8b78428",
  //   rpcURL: "https://11155420.rpc.thirdweb.com/",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xA6f932aefd02269Fd4897283774Ce22a2Ba5Fc07",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //     {
  //       tokenName: "aBTC",
  //       vaultAddress: "0xb0925C437c7e0D3151ec9c3e928987a04f186cf9",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0xe128DA406fAEDd16a08702726B52E10B8C7A8587",
  //       tokenAddress: "0xc13265Cb35a63aCe3BBd8dF5C249551355070321",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
  // fantomTestnet: {
  //   borrowerOperationsAddress: "0x98cb20D30da0389028EB71eF299B688979F5cB8b",
  //   oracleAddress: "0x65E8d79f3e8e36fE48eC31A2ae935e92F5bBF529",
  //   priceFeedAddress: "0xEdd95b1325140Eb6c06d8C738DE98accb2104dFB",
  //   rpcURL: "https://rpc.testnet.fantom.network",
  //   vaults: [
  //     {
  //       tokenName: "bmBTC",
  //       vaultAddress: "0xBc78150ea2C7F2d5AAf9312dF13548D5b1D2B04B",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //     },
  //   ],
  //   SPPools: [
  //     {
  //       poolAddress: "0x4608fb6aBCf7841855A8E797B7E1fc08Ab9a1E67",
  //       tokenAddress: "0x5F4aF136342B4A56fB2dAb7B8a453F9CB8900663",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  //       tokenName: "USBD",
  //     },
  //   ],
  // },
};

export default networks;
