const methods = require('./methods')
const getPrice = require('./getPrice')
const BigNumber = require('bignumber.js')
const supportedPools = [
  {
    pid: 3,
    lpAddresses: {
      1: '0x96258bb42779bf300cf69c9b5bd2ba5245cb4bc4',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    token2Addresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    name: 'LUA - USDC',
    symbol: 'LUA-USDC LUA-V1 LP',
    symbolShort: 'LUA-USDC',
    description: `Deposit LUA-USDC LUA-V1 LP Earn 3xLUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'USDC',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x96258BB42779Bf300cf69c9B5bD2Ba5245CB4bc4',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0x810a21afe69fe356697a9824930904383930bd96',
    },
    tokenAddresses: {
      1: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    },

    token2Addresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    name: 'LUA - TOMO',
    symbol: 'LUA-TOMO LUA-V1 LP',
    symbolShort: 'LUA-TOMO',
    description: `Deposit LUA-TOMO LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'TOMO',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/tomochain/pair/0x810a21afe69fe356697a9824930904383930bd96',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0x7885e359a085372EbCF1ed6829402f149D02c600',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },
    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    name: 'TOMOE - ETH',
    symbol: 'TOMOE-ETH LUA-V1 LP',
    symbolShort: 'TOMOE-ETH',
    description: `Deposit TOMOE-ETH LUA-V1 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'ETH',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x7885e359a085372EbCF1ed6829402f149D02c600',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/ETH',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/ETH',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xbFFD9FF55685A3B6940C59DCDCc69b1737363BE0',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },
    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'TOMOE - USDT',
    symbol: 'TOMOE-USDT LUA-V1 LP',
    symbolShort: 'TOMOE-USDT',
    description: `Deposit TOMOE-USDT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'USDT',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xbFFD9FF55685A3B6940C59DCDCc69b1737363BE0',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xdAC17F958D2ee523a2206206994597C13D831ec7',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },

  {
    pid: 9,
    lpAddresses: {
      1: '0x65FaBAF7e6c5380243E063D8559d84e589Db6438',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    name: 'LUA - ETH',
    symbol: 'LUA-ETH LUA-V1 LP',
    symbolShort: 'LUA-ETH',
    description: `Deposit LUA-ETH LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'ETH',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x65FaBAF7e6c5380243E063D8559d84e589Db6438',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/ETH',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/ETH',
  },

  {
    pid: 13,
    lpAddresses: {
      1: '0x66E10dEa0019dC7353D2e4106E9b84f1CFc17CBa',
    },
    tokenAddresses: {
      1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    },

    token2Addresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    name: 'WBTC - USDC',
    symbol: 'WBTC-USDC LUA-V1 LP',
    symbolShort: 'WBTC-USDC',
    description: `Deposit WBTC-USDC LUA-V1 LP Earn LUA`,
    tokenSymbol: 'WBTC',
    token2Symbol: 'USDC',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x66E10dEa0019dC7353D2e4106E9b84f1CFc17CBa',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },

  {
    pid: 17,
    lpAddresses: {
      1: '0x187230ce611269b0b9fdbb62278b6c70f6ec428a',
    },
    tokenAddresses: {
      1: '0x14da230d6726c50f759bc1838717f8ce6373509c',
    },

    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'KAT - USDT',
    symbol: 'KAT-USDT LUA-V1 LP',
    symbolShort: 'KAT-USDT',
    description: `Deposit KAT-USDT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'KAT',
    token2Symbol: 'USDT',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3634.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x187230ce611269b0b9fdbb62278b6c70f6ec428a',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x14da230d6726c50f759bc1838717f8ce6373509c/0xdac17f958d2ee523a2206206994597c13d831ec7',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x14da230d6726c50f759bc1838717f8ce6373509c/0xdac17f958d2ee523a2206206994597c13d831ec7',
  },

  {
    startAt: 1605601513,
    pid: 15,
    lpAddresses: {
      1: '0xd6be3b9780572f0215afb3e4d15751955503cebe',
    },
    tokenAddresses: {
      1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },

    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'ETH - USDT',
    symbol: 'ETH-USDT LUA-V1 LP',
    symbolShort: 'ETH-USDT',
    description: `Deposit ETH-USDT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'ETH',
    token2Symbol: 'USDT',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xd6be3b9780572f0215afb3e4d15751955503cebe',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/ETH/0xdac17f958d2ee523a2206206994597c13d831ec7',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/ETH/0xdac17f958d2ee523a2206206994597c13d831ec7',
  },

  {
    pid: 14,
    lpAddresses: {
      1: '0xb195325642431b6aA6CD3C646591e7825BB3F90c',
    },
    tokenAddresses: {
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },

    token2Addresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    name: 'UNI - LUA',
    symbol: 'UNI-LUA LUA-V1 LP',
    symbolShort: 'UNI-LUA',
    description: `Deposit UNI-LUA LUA-V1 LP Earn LUA`,
    tokenSymbol: 'UNI',
    token2Symbol: 'LUA',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/7083.png',
    icon2: 'https://luaswap.org/favicon.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xb195325642431b6aA6CD3C646591e7825BB3F90c',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },

  {
    pid: 16,
    lpAddresses: {
      1: '0x627846f6131a4631ddf6bb53bd682ccf51f623b3',
    },
    tokenAddresses: {
      1: '0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f',
    },

    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'RAMP - USDT',
    symbol: 'RAMP-USDT USDT-V1 LP',
    symbolShort: 'RAMP-USDT',
    description: `Deposit RAMP-USDT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'RAMP',
    token2Symbol: 'USDT',
    icon:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f/logo.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x627846f6131a4631ddf6bb53bd682ccf51f623b3',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f/0xdac17f958d2ee523a2206206994597c13d831ec7',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f/0xdac17f958d2ee523a2206206994597c13d831ec7',
  },

  {
    pid: 2,
    lpAddresses: {
      1: '0xB10C1840f562f0ac914DA2bad3290833C75fdddF',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },

    token2Addresses: {
      1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    name: 'TOMOE - USDC',
    symbol: 'TOMOE-USDC LUA-V1 LP',
    symbolShort: 'TOMOE-USDC',
    description: `Deposit TOMOE-USDC LUA-V1 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'USDC',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xB10C1840f562f0ac914DA2bad3290833C75fdddF',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },

  {
    pid: 12,
    lpAddresses: {
      1: '0xB3558F47Fa914F7ec1dA1a6F52aB41eE63E81301',
    },
    tokenAddresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },

    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'USDC - USDT',
    symbol: 'USDC-USDT LUA-V1 LP',
    symbolShort: 'USDC-USDT',
    description: `Deposit USDC-USDT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'USDC',
    token2Symbol: 'USDT',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xB3558F47Fa914F7ec1dA1a6F52aB41eE63E81301',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xdac17f958d2ee523a2206206994597c13d831ec7',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xdac17f958d2ee523a2206206994597c13d831ec7',
  },

  {
    pid: 5,
    lpAddresses: {
      1: '0x97e1081c5DECB27606dbcDEA9d8E615757aB11c4',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xf8c3527cc04340b208c854e985240c02f7b7793f',
    },
    name: 'LUA - FRONT',
    symbol: 'LUA-FRONT LUA-V1 LP',
    symbolShort: 'LUA-FRONT',
    description: `Deposit LUA-FRONT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'FRONT',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5893.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x97e1081c5DECB27606dbcDEA9d8E615757aB11c4',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xf8c3527cc04340b208c854e985240c02f7b7793f',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xf8c3527cc04340b208c854e985240c02f7b7793f',
  },

  {
    pid: 6,
    lpAddresses: {
      1: '0xc9a72CC23f900b381FC6355afD8ee674B1F12DF6',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'LUA - SUSHI',
    symbol: 'LUA-SUSHI LUA-V1 LP',
    symbolShort: 'LUA-SUSHI',
    description: `Deposit LUA-SUSHI LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'SUSHI',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6758.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xc9a72CC23f900b381FC6355afD8ee674B1F12DF6',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },

  {
    pid: 7,
    lpAddresses: {
      1: '0x26Da27Cd29D75BcD925665223B4416025450d756',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x476c5e26a75bd202a9683ffd34359c0cc15be0ff',
    },
    name: 'LUA - SRM',
    symbol: 'LUA-SRM LUA-V1 LP',
    symbolShort: 'LUA-SRM',
    description: `Deposit LUA-SRM LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'SRM',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6187.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x26Da27Cd29D75BcD925665223B4416025450d756',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },

  {
    pid: 8,
    lpAddresses: {
      1: '0x38F9307839A8E82b071EA6Fcbef029814Ed88fcb',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
    },
    name: 'LUA - FTT',
    symbol: 'LUA-FTT LUA-V1 LP',
    symbolShort: 'LUA-FTT',
    description: `Deposit LUA-FTT LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'FTT',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4195.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0x38F9307839A8E82b071EA6Fcbef029814Ed88fcb',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },

  {
    pid: 10,
    lpAddresses: {
      1: '0xeAAc91B4B28b97236605B1D40178D83C273dbe80',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093',
    },
    name: 'LUA - KAI',
    symbol: 'LUA-KAI LUA-V1 LP',
    symbolShort: 'LUA-KAI',
    description: `Deposit LUA-KAI LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'KAI',
    icon: 'https://luaswap.org/favicon.png',
    icon2:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD9Ec3ff1f8be459Bb9369b4E79e9Ebcf7141C093/logo.png',
    isHot: true,
    isNew: false,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xeAAc91B4B28b97236605B1D40178D83C273dbe80',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093',
  },

  {
    pid: 11,
    lpAddresses: {
      1: '0xfa1B8F29D9505d18b22F823B82E7Da886Dfc8bdf',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x2baecdf43734f22fd5c152db08e3c27233f0c7d2',
    },
    name: 'LUA - OM',
    symbol: 'LUA-OM LUA-V1 LP',
    symbolShort: 'LUA-OM',
    description: `Deposit LUA-OM LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'OM',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6536.png',
    isHot: false,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/pair/0xfa1B8F29D9505d18b22F823B82E7Da886Dfc8bdf',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x2baecdf43734f22fd5c152db08e3c27233f0c7d2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x2baecdf43734f22fd5c152db08e3c27233f0c7d2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  },
]
.map(e => {
  if (
    [
      // '0x96258bb42779bf300cf69c9b5bd2ba5245cb4bc4',
      // '0xe2f4cc0198150a7bea98e0a2a66fecafc30a5cd0',
      // '0xbffd9ff55685a3b6940c59dcdcc69b1737363be0',
      // '0x7885e359a085372ebcf1ed6829402f149d02c600',
      // '0x627846f6131a4631ddf6bb53bd682ccf51f623b3',
      // '0x65fabaf7e6c5380243e063d8559d84e589db6438',
      // '0xd6be3b9780572f0215afb3e4d15751955503cebe',
      // '0xb195325642431b6aa6cd3c646591e7825bb3f90c',
      // '0x38f9307839a8e82b071ea6fcbef029814ed88fcb',
      // '0xc9a72cc23f900b381fc6355afd8ee674b1f12df6',
      // '0xb3558f47fa914f7ec1da1a6f52ab41ee63e81301',
      // '0xb10c1840f562f0ac914da2bad3290833c75fdddf',
      '0x810a21afe69fe356697a9824930904383930bd96'
    ]
    .indexOf(e.lpAddresses[1].toLowerCase()) >= 0)
    {
      e.isHot = false
      e.isNew = true
    } else {
      e.isHot = true
      e.isNew = false
    }

    return e
  })
  .sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1))

var CACHE = {}

var sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

const getLPValue = async (
  lpContract,
  tokenContract,
  token2Contract,
  pid,
) => {
  var masterChefContract = '0xb0b8e9BBAd546Eb0d816a472D44f9100309885c1'
  CACHE[pid] = CACHE[pid] || {
    time: 0,
    old: 30 * 1000,
    value: null,
    isLoading: false
  }

  if (CACHE[pid].isLoading) {
    // console.log('> Wait get pool value', pid)
    await sleep(10000)
  }

  if (CACHE[pid].time + CACHE[pid].old <= new Date().getTime() || !CACHE[pid]) {
    console.log('Get pool value', pid)
    CACHE[pid].isLoading = true
    const [
      tokenAmountWholeLP, 
      tokenDecimals, 
      lpBalance, 
      totalSupply, 
      token2AmountWholeLP, 
      token2Decimals,
      newRewardPerBlock
    ] = await Promise.all([
      methods.balance(lpContract, tokenContract),
      methods.contract(tokenContract).methods('decimals():(uint256)').params().call(),
      methods.balance(masterChefContract, lpContract),
      methods.contract(lpContract).methods('totalSupply():(uint256)').params().call(),
      methods.balance(lpContract, token2Contract),
      methods.contract(token2Contract).methods('decimals():(uint256)').params().call(),
      methods.contract(masterChefContract).methods('getNewRewardPerBlock(uint256):(uint256)').params(pid + 1).call(),
    ])
    
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(lpBalance).div(new BigNumber(totalSupply))
    const totalLpToken2Value = portionLp.times(token2AmountWholeLP).times(new BigNumber(2))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

    const token2Amount = new BigNumber(token2AmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(token2Decimals))

    var usdValue = 0;
    var totalToken2Value = totalLpToken2Value.div(new BigNumber(10).pow(token2Decimals))

    var price = await getPrice(token2Contract.toLowerCase());
    usdValue = totalToken2Value.times(price)

    const allocPoint = (await methods
      .contract(masterChefContract)
      .methods('poolInfo(uint256):(address,uint256,uint256,uint256)')
      .params(pid)
      .call())[1]
    const totalAllocPoint = await methods.contract(masterChefContract)
      .methods('totalAllocPoint():(uint256)')
      .params()
      .call()

    var result = {
      pid,
      tokenAmount: tokenAmount.toNumber(),
      token2Amount: token2Amount.toNumber(),
      totalToken2Value: totalToken2Value.toNumber(),
      tokenPriceInToken2: token2Amount.div(tokenAmount).toNumber(),
      usdValue: usdValue.toNumber(),
      newRewardPerBlock: new BigNumber(newRewardPerBlock).div(10 ** 18),
      poolWeight: new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint)).toNumber()
    }
    
    CACHE[pid].time = new Date().getTime()
    CACHE[pid].value = result;
    CACHE[pid].isLoading = false
  }
  return CACHE[pid].value

}

async function getAllLPValue() {
  return Promise.all(supportedPools.filter(e => active(e.pid)).map(e => getLPValue(
    e.lpAddresses[1],
    e.tokenAddresses[1],
    e.token2Addresses[1],
    e.pid,
  )))
}

function active(pid) {
  var e = supportedPools.find(e => e.pid == pid)
  if (e) {
    if (e.startAt) {
      return e.startAt < new Date().getTime() / 1000
    }
    else {
      return true
    }
  }
  else {
    return false
  }
}

module.exports = {
  getAllLPValue,
  active,
  getLPValue: (pid) => {
    var e = active(pid)

    if (e) {
      e = supportedPools.find(v => v.pid == pid)
      return getLPValue(
        e.lpAddresses[1],
        e.tokenAddresses[1],
        e.token2Addresses[1],
        e.pid,
      )
    }
    else {
      return {
        pid,
        tokenAmount: 0,
        token2Amount: 0,
        totalToken2Value: 0,
        tokenPriceInToken2: 0,
        usdValue: 0,
        newRewardPerBlock: 0,
        poolWeight: 0,
      }
    }

  },
  pools: supportedPools,
}