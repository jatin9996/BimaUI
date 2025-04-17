type Pool = {
  id: string;
  network: string;
  debtToken: string;
  debtTokenImage: string;
  collateralToken: string;
  collateralTokenImage: string;
  morphoContract: string;
  interest: string;
  marketParams: {
    loanToken: string;
    collateralToken: string;
    oracle: string;
    irm: string;
    lltv: string;
  };
};
export const Pools: Pool[] = [
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
    network: "Bitlayer",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0x0257f54cC90239107Fb839c32c0051c4da4AEe21",
  },
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
    network: "coreTestnet",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0x01A4B3221E078106F9eb60C5303E3BA162F6a92e",
  },
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
    network: "MerlinTestnet",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0xCED482d8464b1B58f3a1eb7fB61BA5AB0011C4C9",
  },
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
    network: "baseSepolia",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0x9a64371655872B16395342B0C7A27C16d9eaC78e",
  },
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
    network: "avalancheTestnet",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0x80E4C64dE6733dAa9784b4667CA471a8E9aA2FDd",
  },
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
    network: "arbitramSepolia",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0x691F17519E79866b5f1f6963D7Ed860900f8508a",
  },
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
    network: "BNBTestnet",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0xE10e3B519e0222A0C973B062A1760f8fb67676E0",
  },
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
    network: "Holesky",
    debtTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    collateralTokenImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
    morphoContract: "0xCF00A4f433bd36a21Bc3edF322A057Fa45382Ab4",
  },
];
