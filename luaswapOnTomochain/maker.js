const methods = require('./methods')
const BigNumber = require('bignumber.js')

const getMakerValue = async (MakerData) => {
  try {
    var Factory = '0x28c79368257CD71A122409330ad2bEBA7277a396'
    var Maker = '0xF5bF43C60B3ef1eCf6B5676767957749845F9401'
    var n = await methods.contract(Factory).methods('allPairsLength():(uint256)').params().call()
    
    var result = []

    for (var i = 0; i < n; i++) {
      var LP = await methods.contract(Factory).methods('allPairs(uint256):(address)').params(i).call()

      var [totalSupply, bal] = await Promise.all([
        methods.contract(LP).methods('totalSupply():(uint256)').params().call(),
        methods.contract(LP).methods('balanceOf(address):(uint256)').params(Maker).call()])

      var reserves  = await methods.contract(LP).methods('getReserves():(uint112,uint112)').params().call()

      var amount0 = new BigNumber(reserves[0]).multipliedBy(bal).dividedBy(totalSupply)
      var amount1 = new BigNumber(reserves[1]).multipliedBy(bal).dividedBy(totalSupply)

      var [token0, token1] = await Promise.all([
        methods.contract(LP).methods('token0():(address)').params().call(),
        methods.contract(LP).methods('token1():(address)').params().call()])  

      var [symbol0, symbol1] = await Promise.all([
        methods.contract(token0).methods('symbol():(string)').params().call(),
        methods.contract(token1).methods('symbol():(string)').params().call()])

      var [decimals0, decimals1, lpDecimals] = await Promise.all([
        methods.contract(token0).methods('decimals():(uint8)').params().call(),
        methods.contract(token1).methods('decimals():(uint8)').params().call(),
        methods.contract(LP).methods('decimals():(uint8)').params().call()])

        decimals0 = parseInt(decimals0.toString())
        //amount0 = parseFloat(amount0.toString())
        amount0 = new BigNumber(amount0).dividedBy(new BigNumber(10).exponentiatedBy(decimals0))
        amount0 = parseFloat(amount0.toString())
        decimals1 = parseInt(decimals1.toString())
        //amount1 = parseFloat(amount1.toString())
        amount1 = new BigNumber(amount1).dividedBy(new BigNumber(10).exponentiatedBy(decimals1))
        amount1 = parseFloat(amount1.toString())
        lpDecimals = parseInt(lpDecimals.toString())
        //bal = bal / (10 ** lpDecimals)
        bal = new BigNumber(bal).dividedBy(new BigNumber(10).exponentiatedBy(lpDecimals))
        bal = parseFloat(bal.toString())

      const lpValue = {
              lpAddresses: LP,
              lpBalance: bal,
              token0Addresses: token0,
              token0Symbol: symbol0 == 'WETH'?'ETH':symbol0,
              token0Balance: amount0,
              token1Addresses: token1,
              token1Symbol: symbol1 == 'WETH'?'ETH':symbol1,
              token1Balance: amount1
        }

      result.push(lpValue)
      // console.log(LP, bal.toString())
      // console.log(token0, symbol0, amount0)
      // console.log(token1, symbol1, amount1)
      // console.log('done')
      // console.log('\n')
    }
    return result
  }catch (ex) {
      console.error('get maker data error: ', '', ex.toString());
      return  MakerData
  }
}

module.exports = {
  getMakerValue,
}