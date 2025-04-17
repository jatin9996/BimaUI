import test from 'node:test'
import { type Chain } from 'viem'
import { defineChain } from 'viem';
import bevm from "@/assets/chains-logo/bevm.png"
import merlin from "@/assets/chains-logo/merlin.webp"
import minato from "@/assets/chains-logo/minato.jpg"
import filecoin from "@/assets/chains-logo/filecoin.png"
import core from "@/assets/chains-logo/core.png"
import polygon from "@/assets/chains-logo/polygon.png"
import bitlayer from "@/assets/chains-logo/bitlayer.png"
import bob from "@/assets/chains-logo/bob.jpg"
export const MerlinTestnet = defineChain({
  id: 686868,
  name: 'Merlin Chain Testnet',
  nativeCurrency: { name: 'BTC', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.merlinchain.io/'] },
  },
  blockExplorers: {
    default: { name: 'merlinchain_scan', url: 'https://testnet-scan.merlinchain.io/' },
  },
  testnet: true,
      iconUrl: merlin.src, 
  iconBackground: '#ffffff',

})
export const bobSepolia = defineChain({
  id: 808813,
  name: 'BOB Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://bob-sepolia.rpc.gobob.xyz'],
      webSocket: ['wss://bob-sepolia.rpc.gobob.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BOB Sepolia Explorer',
      url: 'https://bob-sepolia.explorer.gobob.xyz',
    },
  },

  testnet: true,
        iconUrl: bob.src, 
  iconBackground: '#ffffff',

})
export const BEVMTestnet =defineChain( {
    id: 11503,
    name: 'BEVM Testnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['https://testnet.bevm.io/rpc'] },
    },
    blockExplorers: {
      default: {
        name: 'BEVM Testnet Explorer',
        url: 'https://scan-testnet.bevm.io/',
      },
    },
    testnet: true,
      iconUrl: bevm.src, 
  iconBackground: '#ffffff',
  })
  
  export const coreTestnet= defineChain({
    id: 1115, // Core Testnet chain ID
    name: 'Core Blockchain Testnet',
    nativeCurrency: {
      name: 'Core',
      symbol: 'tCORE', // Testnet token symbol
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.test.btcs.network'],
      },
    },
    blockExplorers: {
      default: { name: 'CoreScan', url: 'https://scan.test.btcs.network' },
    },
    testnet: true,
     iconUrl: core.src, 
  iconBackground: '#ffffff',
  })

  export const citreaTestnet: Chain = {
    id: 5115, 
    name: 'Citrea Testnet',
    nativeCurrency: {
      name: 'Citrea BTC',
      symbol: 'CBTC',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.testnet.citrea.xyz'], 
      },
    },
    blockExplorers: {
      default: { name: 'CitreaScan', url: 'https://explorer.testnet.citrea.xyz/' },
    },
    testnet: true,
  };
  

  export const BNBTestnet: Chain = {
    id: 97, 
    name: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'], 
      },
    },
    blockExplorers: {
      default: { name: 'tbnb_scan', url: 'https://testnet.bscscan.com' },
    },
    testnet: true,
  };

    export const PolygonzkEvmTestnet = defineChain({
    id: 2442, 
    name: 'Polygon zkEVM Cardona Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.cardona.zkevm-rpc.com'], 
      },
    },
    blockExplorers: {
      default: { name: 'cardona_scan', url: 'https://cardona-zkevm.polygonscan.com' },
    },
    testnet: true,
       iconUrl: polygon.src, 
  iconBackground: '#ffffff',
  })


    export const OptimismTestnet: Chain = {
    id: 11155420, 
    name: 'OP Sepolia Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://sepolia.optimism.io'], 
      },
    },
    blockExplorers: {
      default: { name: 'opsepoliatestnet_scan', url: 'https://optimism-sepolia.blockscout.com' },
    },
    testnet: true,
  };


      export const AvalancheTestnet: Chain = {
    id: 43113, 
    name: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://api.avax-test.network/ext/bc/C/rpc'], 
      },
    },
    blockExplorers: {
      default: { name: 'avalanchetestnet_scan', url: 'https://testnet.snowtrace.io' },
    },
    testnet: true,
  };


        export const FilecoinTestnet = defineChain({
    id: 314159, 
    name: 'Filecoin - Calibration testnet',
    nativeCurrency: {
      name: 'tFIL',
      symbol: 'tFIL',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://api.calibration.node.glif.io/rpc/v1'], 
      },
    },
    blockExplorers: {
      default: { name: 'filecointestnet_scan', url: 'https://calibration.filscan.io' },
    },
    testnet: true,
            iconUrl: filecoin.src, 
  iconBackground: '#ffffff',
  })


export const MinatoTestnet = defineChain({
  id: 1946,
  name: 'Minato',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.minato.soneium.org'] },
  },
  blockExplorers: {
    default: { name: 'minatochain_scan', url: 'https://explorer-testnet.soneium.org' },
  },
  testnet: true,
        iconUrl: minato.src, 
  iconBackground: '#ffffff',
} )

export const btrTestnet = defineChain({
  id: 200810,
  name: 'Bitlayer Testnet',
  nativeCurrency: {
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.bitlayer.org'],
      webSocket: [
        'wss://testnet-ws.bitlayer.org',
        'wss://testnet-ws.bitlayer-rpc.com',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Bitlayer(BTR) Scan',
      url: 'https://testnet.btrscan.com',
    },
  },
  testnet: true,
   iconUrl: bitlayer.src, 
  iconBackground: '#ffffff',
})