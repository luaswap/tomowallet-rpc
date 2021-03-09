require('dotenv').config()
const methods = require('./methods')
const BigNumber = require('bignumber.js')
const axios = require('axios')
const _ = require('lodash') 
const config = require('./config.json') 

var Maker = '0x0fcb3b6232a2ad0af2f0602acd759d634743579f'
var LUA  =  '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC'

async function getTokenList(makerBalance) {
  var tokenList = []
  for (var i = 0; i < makerBalance.length; i++) {
    if(!_.includes(tokenList, makerBalance[i].token0Addresses)) {
      tokenList.push({'token': makerBalance[i].token0Symbol,
                      'address': makerBalance[i].token0Addresses})
    } 
    if(!_.includes(tokenList, makerBalance[i].token1Addresses)) {
      tokenList.push({'token': makerBalance[i].token1Symbol,
                      'address': makerBalance[i].token1Addresses})
    } 
  }
  tokenList = tokenList.filter((elem, index, self) => self.findIndex(
    (t) => {return (t.token === elem.token && t.address === elem.address)}) === index)

  return tokenList
}

async function getPath(token, address) {

  const params = _.find(config.param, (param) => {
    return param.token === token
  }) 
  if(!params){
    return [address,LUA]
  }

  return params.path
}

async function getPrice (symbol) {
  var price = 0;

  if(symbol == 'USDTUSDT') {
    return 1;
  }
  if(symbol == 'RAMPUSDT') {
    return 1;
  }
  if(symbol == 'TOMOEUSDT') {
    symbol = 'TOMOUSDT'
  }

  if(symbol == 'WBTCUSDT') {
    symbol = 'BTCUSDT'
  }

  if(symbol == 'FRONTUSDT') {
    return 2;
  }
  
  if(symbol == 'FTX TokenUSDT') {
    return 30;
  }
  const URL = 'https://www.binance.com/api/v3/ticker/price?symbol='+symbol
  try {
    var  data  = await axios.get(URL)
    price = parseFloat(data.data.price);
  }
  catch (ex) {
    price = 0.1;
  }
  return price;
}

async function removeLiqidity() {
  var data = await axios.get('https://wallet.tomochain.com/api/luaswap/makerData')

  try {
    for (var i = 0; i < data.data.length; i++) {
      var makerBalance = data.data[i]
      console.log(makerBalance.token0Symbol,': ',makerBalance.token0Balance)
      console.log(makerBalance.token1Symbol,': ',makerBalance.token1Balance)

      var usdPrice0 = await getPrice(makerBalance.token0Symbol+'USDT')
      var tokenValue0 = new BigNumber(makerBalance.token0Balance).multipliedBy(usdPrice0)

      var usdPrice1 = await getPrice(makerBalance.token1Symbol+'USDT')
      var tokenValue1 = new BigNumber(makerBalance.token1Balance).multipliedBy(usdPrice1)

      if( new BigNumber(tokenValue0).isGreaterThan(50) || new BigNumber(tokenValue1).isGreaterThan(50)){
        var [lpDecimals] = await Promise.all([methods.contract(makerBalance.lpAddresses).methods('decimals():(uint8)').params().call()])

        lpDecimals = parseInt(lpDecimals.toString())
        var lpBalance = new BigNumber(makerBalance.lpBalance).multipliedBy(10 ** lpDecimals).multipliedBy(0.9).toFixed(0).toString()
        console.log('lpBalance: ', lpBalance)

        await methods.contract(Maker).methods('removeLiqidity(address,address,uint256):()')
                                              .params(makerBalance.token0Addresses,
                                                      makerBalance.token1Addresses,
                                                      lpBalance.toString()
                                                      ).send(process.env.PRIVATE_KEY)
      }
    }
  }catch (ex) {
    console.error('Remove liqidity error: ', '', ex.toString());
  }
}

async function convertToLua() {
  var data = await axios.get('https://wallet.tomochain.com/api/luaswap/makerData')
  var tokenList = await getTokenList(data.data)
  const deadLine = Math.floor(Date.now() / 1000) + 60 * 1440

  try {
    for (var i = 0; i < tokenList.length; i++) {
      try {
        if( tokenList[i].token != 'LUA-V1' && tokenList[i].token != 'KAT' && tokenList[i].token != 'RAMP'){ 
          var token = tokenList[i]

          var [balanceOf, decimals] = await Promise.all([
                                      methods.contract(token.address).methods('balanceOf(address):(uint256)').params(Maker).call(),
                                      methods.contract(token.address).methods('decimals():(uint8)').params().call()])

          decimals = parseInt(decimals.toString())
          var balance = new BigNumber(balanceOf).dividedBy(new BigNumber(10).exponentiatedBy(decimals))

          console.log('\nbalanceOf ',token.token, ' = ', balance.toString())
          var usdPrice = await getPrice(token.token+'USDT')
          var tokenValue = new BigNumber(balance).multipliedBy(usdPrice)
          console.log('usdPrice: ', usdPrice)
          console.log('tokenValue: ', tokenValue.toString())
          var path = await getPath(token.token,token.address);

          if(new BigNumber(tokenValue).isGreaterThan(50) && token.token){
            if( token.token == 'XETH'){
              //Convert ETH to LUA
              console.log('Convert ETH to LUA! ')
              await methods.contract(Maker).methods('marketBuyLuaWithETH(address[],uint256,uint256):()')
                                                    .params(path,
                                                            balanceOf,
                                                            deadLine
                                                            ).send(process.env.PRIVATE_KEY)
            }else {
              //Convert token to LUA
              console.log('Convert ',token.token,' to LUA! ')
              console.log('path ',path)
              await methods.contract(Maker).methods('marketBuyLuaWithToken(address[],uint256,uint256):()')
                                                    .params(path,
                                                            balanceOf,
                                                            deadLine
                                                            ).send(process.env.PRIVATE_KEY)
            }
          }
        }
      }catch (ex) {
        console.error('Convert token to LUA error: ', '', ex.toString());
      }
    }
  }catch (ex) {
    console.error('Convert token to LUA error: ', '', ex.toString());
  }
}

async function main() {
  if(process.env.MODE === 'REMOVE'){
    await removeLiqidity()
    console.log('Remove liqidity done!')
  }
  if(process.env.MODE === 'CONVERT'){  
    await convertToLua()
    console.log('Convert to Lua done!')
  }
}
main()