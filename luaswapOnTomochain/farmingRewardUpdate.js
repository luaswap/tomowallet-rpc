const methods = require('./methods')
const BigNumber = require('bignumber.js')
const poolList = require('./poolList.json') 

async function getCurrentApr(poolInfor) {

  var currentBlock = await methods.block(-1, true)
  var startAtBlock = await methods.contract(poolInfor.masterAddresses).methods('START_BLOCK():(uint256)').params().call()

  for (var i = 0; i < poolInfor.multiplier.length; i++) {
    var numOfBloc = new BigNumber(poolInfor.halvingAfterBlock).multipliedBy(i+1);
    var endBlock = new BigNumber(startAtBlock).plus(numOfBloc);
    if (currentBlock <= endBlock) {
      return {apr: poolInfor.multiplier[i], maxRewardPerBlock: poolInfor.maxRewardPerBlock[i]}
    }
  } 
}

const updateFarmingApr = async () => {
  try {
    for (var i = 0; i < poolList.pools.length; i++) {
      var pool = poolList.pools[i]
      if(pool.isActive){
        var currentBlock = await methods.block(-1, true)
        var startAtBlock = await methods.contract(pool.masterAddresses).methods('START_BLOCK():(uint256)').params().call()
          if(new BigNumber(currentBlock).isGreaterThan(startAtBlock)){        
            var acurrentApr = await getCurrentApr(pool)
            console.log('acurrentApr: ', acurrentApr)
            await methods.contract(pool.masterAddresses).methods('updateReward(uint256,uint256,uint256):()')
            .params(acurrentApr.maxRewardPerBlock,
                    pool.minRewardPerBlock,
                    acurrentApr.apr
                    ).send(process.env.PRIVATE_KEY) 
            console.log('update apr success: ', acurrentApr)                    
          }       
      }
    }
    
  }catch (ex) {
      console.error('update apr error: ', '', ex.toString());
  }
}

module.exports = {
  updateFarmingApr,
}