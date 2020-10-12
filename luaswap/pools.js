const methods = require('./methods')
const getPrice = require('./getPrice')
const BigNumber = require('bignumber.js')

var supportedPools = [
  {
    pid: 3,
    lpAddresses: {
      1: '0x25a17a5a907941aaf6d6d1c7aae9c9cc3a38680c',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    token2Addresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    },
    name: 'LUA - USDC',
    symbol: 'LUA-USDC UNI-V2 LP',
    symbolShort: 'LUA-USDC',
    description: `Deposit LUA-USDC UNI-V2 LP Earn 2xLUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'USDC',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    isHot: true,
    isNew: false,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0x25a17a5a907941aaf6d6d1c7aae9c9cc3a38680c',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0x5c89674c4ad1ccd10a29bcc9aabc303cd5f2da1d',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },
    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    name: 'TOMOE - ETH',
    symbol: 'TOMOE-ETH UNI-V2 LP',
    symbolShort: 'TOMOE-ETH',
    description: `Deposit TOMOE-ETH UNI-V2 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'ETH',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0x5c89674c4ad1ccd10a29bcc9aabc303cd5f2da1d',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/ETH'
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xcad93baf5cc5ebfe7f8a485828f0c0ecd2d0e9b8',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },
    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7'
    },
    name: 'TOMOE - USDT',
    symbol: 'TOMOE-USDT UNI-V2 LP',
    symbolShort: 'TOMOE-USDT',
    description: `Deposit TOMOE-USDT UNI-V2 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'USDT',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0xcad93baf5cc5ebfe7f8a485828f0c0ecd2d0e9b8',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xdac17f958d2ee523a2206206994597c13d831ec7'
  }, 
  {
    pid: 2,
    lpAddresses: {
      1: '0xf3279a15f5361285100474db389f7d78848bb8d1',
    },
    tokenAddresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    },

    token2Addresses: {
      1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    },
    name: 'TOMOE - USDC',
    symbol: 'TOMOE-USDC UNI-V2 LP',
    symbolShort: 'TOMOE-USDC',
    description: `Deposit TOMOE-USDC UNI-V2 LP Earn LUA`,
    tokenSymbol: 'TOMOE',
    token2Symbol: 'USDC',
    icon: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0xf3279a15f5361285100474db389f7d78848bb8d1',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },

  {
    pid: 4,
    lpAddresses: {
      1: '0x9ccc3e17ae1d1438bacde4d906cdc56bb6937e46',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba'
    },
    name: 'LUA - TOMOE',
    symbol: 'LUA-TOMOE UNI-V2 LP',
    symbolShort: 'LUA-TOMOE',
    description: `Deposit LUA-TOMOE UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'TOMOE',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0x9ccc3e17ae1d1438bacde4d906cdc56bb6937e46',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x05d3606d5c81eb9b7b18530995ec9b29da05faba/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },
  
  {
    pid: 5,
    lpAddresses: {
      1: '0x5c47016e8a4a3c6a7c46a765f81dce205d00393e',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xf8c3527cc04340b208c854e985240c02f7b7793f'
    },
    name: 'LUA - FRONT',
    symbol: 'LUA-FRONT UNI-V2 LP',
    symbolShort: 'LUA-FRONT',
    description: `Deposit LUA-FRONT UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'FRONT',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5893.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0x5c47016e8a4a3c6a7c46a765f81dce205d00393e',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xf8c3527cc04340b208c854e985240c02f7b7793f'
  },

  {
    pid: 6,
    lpAddresses: {
      1: '0xfe1ead71b27e8389d819ee0a420080d90a60132c',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2'
    },
    name: 'LUA - SUSHI',
    symbol: 'LUA-SUSHI UNI-V2 LP',
    symbolShort: 'LUA-SUSHI',
    description: `Deposit LUA-SUSHI UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'SUSHI',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6758.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0xfe1ead71b27e8389d819ee0a420080d90a60132c',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },

  {
    startAt: 1602565208,
    pid: 7,
    lpAddresses: {
      1: '0x694ad474ef16a8eefb5cc3119f9956aeef28c987',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x476c5e26a75bd202a9683ffd34359c0cc15be0ff'
    },
    name: 'LUA - SRM',
    symbol: 'LUA-SRM UNI-V2 LP',
    symbolShort: 'LUA-SRM',
    description: `Deposit LUA-SRM UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'SRM',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6187.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0x694ad474ef16a8eefb5cc3119f9956aeef28c987',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },

  {
    startAt: 1602565208,
    pid: 8,
    lpAddresses: {
      1: '0xf0ec5e8ea37911dec8e8e9bc940e9dba2de60706',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9'
    },
    name: 'LUA - FTT',
    symbol: 'LUA-FTT UNI-V2 LP',
    symbolShort: 'LUA-FTT',
    description: `Deposit LUA-FTT UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'FTT',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4195.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://info.uniswap.org/pair/0xf0ec5e8ea37911dec8e8e9bc940e9dba2de60706',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },

  {
    startAt: 1602565208,
    pid: 9,
    lpAddresses: {
      1: '0xc5d3c66133a6264b0f2e712b8e10ef96efb93eb2',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    name: 'LUA - ETH',
    symbol: 'LUA-ETH UNI-V2 LP',
    symbolShort: 'LUA-ETH',
    description: `Deposit LUA-ETH UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'ETH',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://info.uniswap.org/pair/0xc5d3c66133a6264b0f2e712b8e10ef96efb93eb2',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/ETH'
  },

  {
    startAt: 1602565208,
    pid: 10,
    lpAddresses: {
      1: '0x9af4fb969bb16038d7618df8adbdb2e7133b0f66',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093'
    },
    name: 'LUA - KAI',
    symbol: 'LUA-KAI UNI-V2 LP',
    symbolShort: 'LUA-KAI',
    description: `Deposit LUA-KAI UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'KAI',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD9Ec3ff1f8be459Bb9369b4E79e9Ebcf7141C093/logo.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://info.uniswap.org/pair/0x9af4fb969bb16038d7618df8adbdb2e7133b0f66',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc/0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093'
  },

  {
    startAt: 1602565208,
    pid: 11,
    lpAddresses: {
      1: '0x9ccb79d6523152aee4dc2be5822fdbafd0d63211',
    },
    tokenAddresses: {
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },

    token2Addresses: {
      1: '0x2baecdf43734f22fd5c152db08e3c27233f0c7d2'
    },
    name: 'LUA - OM',
    symbol: 'LUA-OM UNI-V2 LP',
    symbolShort: 'LUA-OM',
    description: `Deposit LUA-OM UNI-V2 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'OM',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/6536.png',
    isHot: false,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://info.uniswap.org/pair/0x9ccb79d6523152aee4dc2be5822fdbafd0d63211',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x2baecdf43734f22fd5c152db08e3c27233f0c7d2/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc'
  },
]


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
  var masterChefContract = '0xb67d7a6644d9e191cac4da2b88d6817351c7ff62'

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