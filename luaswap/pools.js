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
  }
]


var CACHE = {}

const getLPValue = async (
  lpContract,
  tokenContract,
  token2Contract,
  pid,
) => {

  var masterChefContract = '0xb67d7a6644d9e191cac4da2b88d6817351c7ff62'

  var usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  var usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  var wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  

  CACHE[pid] = CACHE[pid] || {
    time: 0,
    old: 30 * 1000,
    value: null
  }

  if (CACHE[pid].time + CACHE[pid].old <= new Date().getTime() || !CACHE[pid]) {

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
    if (token2Contract.toLowerCase() == usdtAddress 
      || token2Contract.toLowerCase() == usdcAddress) {
      usdValue = totalToken2Value
    } 
    else if (token2Contract.toLowerCase() == wethAddress) {
      var price = await getPrice('ETH');
      usdValue = totalToken2Value.times(price)
    }

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
  }
  return CACHE[pid].value

}

async function getAllLPValue() {
  return Promise.all(supportedPools.map(e => getLPValue(
    e.lpAddresses[1],
    e.tokenAddresses[1],
    e.token2Addresses[1],
    e.pid,
  )))
}

module.exports = {
  getAllLPValue,
  getLPValue: (pid) => {
    var e = supportedPools.find(e => e.pid == pid)

    return getLPValue(
      e.lpAddresses[1],
      e.tokenAddresses[1],
      e.token2Addresses[1],
      e.pid,
    )
  },
  pools: supportedPools,
}