const express = require('express')
const methods = require('./methods')
const pools = require('./pools')
const maker = require('./maker')
const router = express.Router()
const axios = require('axios')
const { default: BigNumber } = require('bignumber.js')
const getPrice = require('./getPrice')
const RPC = process.env.RPC

var MakerData = []

const TRY = fn => async (req, res) => {
  try {
    await fn(req, res)
  }
  catch (ex) {
    console.error('LUASWAP ERROR', req.url, req.body, ex)
    res
      .status(406)
      .send(ex.toString())
  }
}

var sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

var makerIsRunning = false
getMarket();
async function getMarket() {
  if (makerIsRunning) return
  makerIsRunning = true
  console.log('Get MakerData! ')
  MakerData = await maker.getMakerValue(MakerData) 
  makerIsRunning = false
  t = setTimeout(getMarket, 3000);
}

async function processParams(params, user, req) {
  var result = params
  if (typeof params === 'object') {
    if (!Array.isArray(params)) {
      result = [result]
    }
  }
  else {
    result = [result]
  }
  return result || []
}

var CACHE_RPC = {
  COUNT_KEY: 0
}

router.post('/tomochain/rpc', TRY(async (req, res) => {
  var body = req.body

  if (body.method == 'eth_chainId') {
    return res.json({
      "jsonrpc":"2.0",
      "id":body.id,
      "result":"0x1"
    })
  }
  if (body.method != 'eth_blockNumber' && body.method != 'eth_getBlockByNumber') {
    console.log('Call RPC', body.method)
    var { data } = await axios.post(RPC, body)
    return res.json(data)
  }


  if (CACHE_RPC.COUNT_KEY >= 10000) {
    CACHE_RPC = {
      COUNT_KEY: 0
    }
  }

  var key = body.method
  if (body.method == 'eth_getBlockByNumber') {
    if (!body.params[0]) {
      return res.json({
        "jsonrpc": "2.0",
        "id": body.id,
        "error": {
            "code": -32602,
            "message": "invalid argument 0: empty hex string"
        }
      })
    }
    key += body.params[0]
  }

  if (!CACHE_RPC[key]) {
    CACHE_RPC.COUNT_KEY++;
  }

  CACHE_RPC[key] = CACHE_RPC[key] || {
    time: 0,
    old: 5 * 1000,
    value: 0,
    isLoading: false
  }

  if (CACHE_RPC[key].isLoading) {
    // console.log('> [Wait] Call RPC', key)
    await sleep(2000)
  }

  if (CACHE_RPC[key].time + CACHE_RPC[key].old <= new Date().getTime()) {
    console.log('Call RPC', key)
    CACHE_RPC[key].isLoading = true
    var { data } = await axios.post(RPC, body)
    if (data !== null || data !== undefined) {
      CACHE_RPC[key].time = new Date().getTime()
      CACHE_RPC[key].value = data
    }
    CACHE_RPC[key].isLoading = false
  }

  if (CACHE_RPC[key].value == null || CACHE_RPC[key].value == undefined) {
    return res.json({
      "jsonrpc": "2.0",
      "id": body.id,
      "error": {
          "code": -32602,
          "message": "cannot get data"
      }
    })
  }
  else {
    res.json({
      ...CACHE_RPC[key].value,
      "id": body.id
    })
  }
}))

var CACHE_CONTRACT_CALL = {
  COUNT_KEY: 0
}

router.post('/tomochain/read/:address', TRY(async (req, res) => {
  var { address } = req.params
  var { abi, method, params, cache } = req.body
  var key = ''
  if (CACHE_CONTRACT_CALL.COUNT_KEY >= 10000) {
    CACHE_CONTRACT_CALL = {
      COUNT_KEY: 0
    }
  }
  try {
    if (cache && address && method) {
      key = `${address}>${method}>${params ? JSON.stringify(params) : 'noparam' }`
    }
  }
  catch (ex) {

  }

  if (key) {
    if (!CACHE_CONTRACT_CALL[key]) {
      CACHE_CONTRACT_CALL.COUNT_KEY++;
    }
    CACHE_CONTRACT_CALL[key] = CACHE_CONTRACT_CALL[key] || {
      time: 0,
      old: 5 * 1000,
      value: null,
      isLoading: false
    }

    if (CACHE_CONTRACT_CALL[key].isLoading) {
      // console.log('> [Wait] Read contract', key)
      await sleep(2000)
    }
  }

  if (
    !key ||
    CACHE_CONTRACT_CALL[key].time + CACHE_CONTRACT_CALL[key].old <= new Date().getTime() 
    || !CACHE_CONTRACT_CALL[key] 
    || CACHE_CONTRACT_CALL[key].value == null) {
    console.log('Read contract', key)
    CACHE_CONTRACT_CALL[key].isLoading = true
    params = await processParams(params, null, req)
    var data = await methods.contract(address, abi)
      .methods(method)
      .params(...params)
      .call()
    if (!key) {
      return res.json({
        data
      })
    }
    CACHE_CONTRACT_CALL[key].time = new Date().getTime()
    CACHE_CONTRACT_CALL[key].value = data
    CACHE_CONTRACT_CALL[key].isLoading = false
  }

  if (CACHE_CONTRACT_CALL[key].value == null || CACHE_CONTRACT_CALL[key].value == undefined) {
    throw Error("Cannot get data")
  }
  else {
    res.json({
      data: CACHE_CONTRACT_CALL[key].value
    })
  }
}))


var CACHE_BLOCK_NUMBER = {
  time: 0,
  old: 5 * 1000,
  value: 0,
  isLoading: false
}

router.get('/tomochain/blockNumber', TRY(async (req, res) => {
  if (CACHE_BLOCK_NUMBER.isLoading) {
    // console.log('> [Wait] Block Number')
    await sleep(2000)
  }
  if (CACHE_BLOCK_NUMBER.time + CACHE_BLOCK_NUMBER.old <= new Date().getTime()) {
    console.log('Block Number Tomochain')
    CACHE_BLOCK_NUMBER.isLoading = true
    var data = await methods.block(-1, true)
    CACHE_BLOCK_NUMBER.time = new Date().getTime()
    CACHE_BLOCK_NUMBER.value = data;
    CACHE_BLOCK_NUMBER.isLoading = false
    res.json(CACHE_BLOCK_NUMBER.value)
  }
  else {
    res.json(CACHE_BLOCK_NUMBER.value)
  }
}))


var CACHE_MAKER = {
  time: 0,
  old: 5 * 1000,
  value: 0,
  isLoading: false
}

router.get('/tomochain/pools', TRY(async (req, res) => {
  res.json(await pools.getAllLPValue())
}))

router.get('/tomochain/supportedPools', TRY(async (req, res) => {
  res.json(pools.pools)
}))

router.get('/tomochain/pools/:pid', TRY(async (req, res) => {
  var { pid } = req.params
  res.json(await pools.getLPValue(pid))
}))

router.get('/tomochain/info', TRY(async (req, res) => {
  var poolValue = await pools.getAllLPValue()
  var luaPrice = await getPrice('LUA')
  var result = {
    provider: 'LuaSwap',
    provider_logo: 'https://luaswap.org/favicon100x100.png',
    provider_URL: 'https://luaswap.org/',
    links: [
      {
        title: 'Twitter',
        link: 'https://twitter.com/LuaSwap',
      }
    ], 
    pools: pools.pools.map(e => {
      var pv = poolValue.find(v => e.pid == v.pid)
      return {
        name: e.name,
        pair: e.symbolShort,
        pairLink: `https://luaswap.org/#/farms/${e.symbol}`,
        poolRewards: ['LUA'],
        apr: luaPrice * 2425000 * pv.newRewardPerBlock / pv.usdValue,
        totalStaked: pv.usdValue,
      }
    })
  }

  res.json(result)
}))

router.get('/tomochain/total-supply', TRY(async (req, res) => {
  var v = await methods.contract('0x7262fa193e9590b2e075c3c16170f3f2f32f5c74')
  .methods('totalSupply():(uint256)')
  .params()
  .call()

  res.send(200, Math.round(BigNumber(v).div(10 ** 18).toNumber()))
}))

router.get('/tomochain/circulating-supply', TRY(async (req, res) => {
  var v = await methods.contract('0x7262fa193e9590b2e075c3c16170f3f2f32f5c74')
  .methods('circulatingSupply():(uint256)')
  .params()
  .call()

  var b = await methods.contract('0x7262fa193e9590b2e075c3c16170f3f2f32f5c74')
  .methods('balanceOf(address):(uint256)')
  .params('0xb67d7a6644d9e191cac4da2b88d6817351c7ff62')
  .call()

  res.send(200, Math.round(BigNumber(v).minus(b).div(10 ** 18).toNumber()))
}))

router.get('/tomochain/price/:token', TRY(async (req, res) => {
  var token = req.params.token
  res.json({
    usdPrice: await getPrice(token)
  })
}))

router.get('/tomochain/makerData', TRY(async (req, res) => {
  res.json(MakerData)
}))

router.get('/tomochain/poolActive/:pid', TRY(async (req, res) => {
  res.json({
    active: pools.active(req.params.pid)
  })
}))


router.get('/tomochain/v', TRY(async (req, res) => {
  res.json({
    version: '1.0'
  })
}))
module.exports = router