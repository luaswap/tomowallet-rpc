const methods = require('./methods')
const getPrice = require('./getPrice')
const BigNumber = require('bignumber.js')
const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0x810a21afe69fe356697a9824930904383930bd96',
    },
    tokenAddresses: {
      1: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
    },

    token2Addresses: {
      1: '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC',
    },
    name: 'LUA - TOMO',
    symbol: 'LUA-TOMO LUA-V1 LP',
    symbolShort: 'LUA-TOMO',
    description: `Deposit LUA-TOMO LUA-V1 LP Earn LUA`,
    tokenSymbol: 'LUA',
    token2Symbol: 'TOMO',
    icon: 'https://luaswap.org/favicon.png',
    icon2: 'https://wallet.tomochain.com/public/imgs/tomoiconwhite.png',
    isHot: true,
    isNew: true,
    protocal: 'LuaSwap',
    iconProtocal: 'https://luaswap.org/favicon.png',
    pairLink:
      'https://info.luaswap.org/tomochain/pair/0x810a21afe69fe356697a9824930904383930bd96',
    addLiquidityLink:
      'https://app.luaswap.org/#/add/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    removeLiquidityLink:
      'https://app.luaswap.org/#/remove/0x7262fa193e9590b2e075c3c16170f3f2f32f5c74/0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
  }
]
.map(e => {
  if (
    [
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
  var masterChefContract = '0x4a81F710b4FA14BB8bFBc7058B0B919390f993dD'
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