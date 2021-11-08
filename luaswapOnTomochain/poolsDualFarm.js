const methods = require('./methods')
const getPrice = require('./getPrice')
const BigNumber = require('bignumber.js')
const poolList = require('./poolList.json') 
const supportedPools = 
// poolList.pools.map(e => {
//                       if (
//                         [
//                           '0x810a21afe69fe356697a9824930904383930bd96'
//                         ]
//                         .indexOf(e.lpAddresses[1].toLowerCase()) >= 0)
//                         {
//                           e.isHot = false
//                           e.isNew = true
//                         } else {
//                           e.isHot = true
//                           e.isNew = false
//                         }

//                         return e
//                       })
//                       .sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1))
// console.log("supportedPools: ", supportedPools)

[
  { masterAddresses: "0xc2016E8515AC7B323c49887798e6af0E3daB6603",
    pid: 0,
    lpAddresses: {
      88: '0xa9a34e45af16e7477aef1764314a3d3bfa1df0fb',
    },
    tokenAddresses: {
      88: '0x2e6bce13c31920b9b83c43b2a8a73c2edefb75f7',
    },

    token2Addresses: {
      88: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    },
    name: 'PIXEL - LUA',
    symbol: 'PIXEL-LUA LUA-V1 LP',
    symbolShort: 'PIXEL-LUA',
    description: `Deposit PIXEL-LUA LUA-V1 LP Earn reward`,
    tokenSymbol: {symbol: 'PIXEL',
    address: {
      88: '0x2e6bce13c31920b9b83c43b2a8a73c2edefb75f7',
      1: '0x2e6bce13c31920b9b83c43b2a8a73c2edefb75f7',
    },
    decimals: 18,
    projectLink: '',},
    token2Symbol: {symbol: 'LUA',
    address: {
      88: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
      1: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    },
    decimals: 18,
    projectLink: '',},
 
    icon: 'https://raw.githubusercontent.com/tomochain/luaswap-token-list/b5bcf504a826957df81af83e602973db366ed1a0/src/tokens/icons/tomochain/0x2E6bCE13C31920B9B83c43B2A8a73C2EDEfb75F7.png',
    icon2: 'https://luaswap.org/favicon.png',
    isHot: true,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/tomochain/pair/0xa9a34e45af16e7477aef1764314a3d3bfa1df0fb',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x2e6bce13c31920b9b83c43b2a8a73c2edefb75f7/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x2e6bce13c31920b9b83c43b2a8a73c2edefb75f7/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
  },
  { masterAddresses: "0x8Bcf7880d2Bae3E2705e7D90D28Bd417bd29020d",
    pid: 0,
    lpAddresses: {
      88: '0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036',
    },
    tokenAddresses: {
      88: '0x4eaafa85bdbe9b02930926c594f83e62b036b1be',
    },

    token2Addresses: {
      88: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    name: 'tDAO - TOMO',
    symbol: 'tDAO-TOMO LUA-V1 LP',
    symbolShort: 'tDAO-TOMO',
    description: `Deposit tDAO-TOMO LUA-V1 LP Earn reward`,
    tokenSymbol: {symbol: 'tDAO',
    address: {
      88: '0x4eaafa85bdbe9b02930926c594f83e62b036b1be',
      1: '0x4eaafa85bdbe9b02930926c594f83e62b036b1be',
    },
    decimals: 18,
    projectLink: '',},
    token2Symbol: {symbol: 'TOMO',
    address: {
      88: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
      1: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    },
    decimals: 18,
    projectLink: '',},
 
    icon: 'https://raw.githubusercontent.com/tomochain/luaswap-token-list/b5bcf504a826957df81af83e602973db366ed1a0/src/tokens/icons/tomochain/0x4EaafA85bDBe9B02930926C594F83e62B036B1be.png',
    icon2: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    isHot: true,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/tomochain/pair/0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  }  
]
.map(e => {
  if (
    [
      '0xc2016E8515AC7B323c49887798e6af0E3daB6603',
      '0x8Bcf7880d2Bae3E2705e7D90D28Bd417bd29020d'
    ]
    .indexOf(e.masterAddresses.toLowerCase()) >= 0)
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
  pairLink,
  addLiquidityLink,
  supportedPool
) => {
  var masterChefContract = supportedPool.masterAddresses
  CACHE[masterChefContract] = CACHE[masterChefContract] || {
    time: 0,
    old: 30 * 1000,
    value: null,
    isLoading: false
  }

  if (CACHE[masterChefContract].isLoading) {
    // console.log('> Wait get pool value', pid)
    await sleep(10000)
  }

  if (CACHE[masterChefContract].time + CACHE[masterChefContract].old <= new Date().getTime() || !CACHE[masterChefContract]) {

    CACHE[masterChefContract].isLoading = true
    const [
      tokenAmountWholeLP, 
      tokenDecimals, 
      lpBalance, 
      totalSupply, 
      token2AmountWholeLP, 
      token2Decimals,
      newRewardPerBlock,
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
      ...supportedPool,
      master: masterChefContract,
      pid,
      tokenAmount: tokenAmount.toNumber(),
      token2Amount: token2Amount.toNumber(),
      totalToken2Value: totalToken2Value.toNumber(),
      tokenPriceInToken2: token2Amount.div(tokenAmount).toNumber(),
      token: supportedPool.token2Symbol,
      quoteToken: supportedPool.tokenSymbol,
      addLiquidityLink: addLiquidityLink,
      pairLink: pairLink,
      lpSymbol: supportedPool.symbol,
      lpTokenName: supportedPool.symbolShort,
      lpAddresses: supportedPool.lpAddresses,
      usdValue: usdValue.toNumber(),
      newRewardPerBlock: new BigNumber(newRewardPerBlock).div(10 ** 18),
      poolWeight: new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint)).toNumber()
    }
    
    CACHE[masterChefContract].time = new Date().getTime()
    CACHE[masterChefContract].value = result;
    CACHE[masterChefContract].isLoading = false
  }
  return CACHE[masterChefContract].value

}

async function getAllLPValue() {
  return Promise.all(supportedPools.filter(e => active(e.pid, e.masterAddresses)).map(e => getLPValue(
    e.lpAddresses[88],
    e.tokenAddresses[88],
    e.token2Addresses[88],
    e.pid,
    e.pairLink,
    e.addLiquidityLink,
    e
  )))
}

function active(pid, master) {
  var e = supportedPools.find(e => e.pid == pid && e.masterAddresses == master)
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
  getLPValue: (pid, master) => {
    var e = active(pid, master)

    if (e) {
      e = supportedPools.find(e => e.pid == pid && e.masterAddresses == master)
      return getLPValue(
        e.lpAddresses[88],
        e.tokenAddresses[88],
        e.token2Addresses[88],
        e.pid,
        e.pairLink,
        e.addLiquidityLink,
        e      
      )
    }
    else {
      return {
        masterAddresses: masterChefContract,
        pid,
        tokenAmount: 0,
        token2Amount: 0,
        totalToken2Value: 0,
        tokenPriceInToken2: 0,
        usdValue: 0,
        newRewardPerBlock: 0,
        poolWeight: 0,
        token: tokenSymbol,
        quoteToken: token2Symbol,
        addLiquidityLink: addLiquidityLink,
        pairLink: pairLink,     
        lpAddresses: lpAddresses,   
      }
    }

  },
  pools: supportedPools,
}