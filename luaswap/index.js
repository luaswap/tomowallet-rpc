const express = require('express')
const methods = require('./methods')
const pools = require('./pools')
const router = express.Router()
const axios = require('axios')
const { default: BigNumber } = require('bignumber.js')
const getPrice = require('./getPrice')
const RPC = process.env.RPC
const TRY = fn => async (req, res) => {
  try {
    await fn(req, res)
  }
  catch (ex) {
    console.error('LUASWAP ERROR', ex)
    res
      .status(406)
      .send(ex.toString())
  }
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
  return result
}

var CACHE_RPC = {}

router.post('/rpc', TRY(async (req, res) => {
  var body = req.body
  if (body.method != 'eth_blockNumber' && body.method != 'eth_getBlockByNumber') {
    var { data } = await axios.post(RPC, body)
    return res.json(data)
  }


  var key = body.method
  if (body.method == 'eth_getBlockByNumber') {
    key += body.params[0]
  }


  CACHE_RPC[key] = CACHE_RPC[key] || {
    time: 0,
    old: 5 * 1000,
    value: 0
  }

  if (
    CACHE_RPC[key].time + CACHE_RPC[key].old <= new Date().getTime() ) {
    var { data } = await axios.post(RPC, body)
    if (data !== null || data !== undefined) {
      CACHE_RPC[key].time = new Date().getTime()
      CACHE_RPC[key].value = data
    }
  }

  if (CACHE_RPC[key].value == null || CACHE_RPC[key].value == undefined) {
    throw Error("Cannot get data")
  }
  else {
    res.json(CACHE_RPC[key].value)
  }
}))

var CACHE_CONTRACT_CALL = {}

router.post('/read/:address', TRY(async (req, res) => {
  var { address } = req.params
  var { abi, method, params, cache } = req.body
  var key = ''
  try {
    if (cache && address && method) {
      key = `${address}>${method}>${params ? JSON.stringify(params) : 'noparam' }`
    }
  }
  catch (ex) {

  }

  if (key) {
    CACHE_CONTRACT_CALL[key] = CACHE_CONTRACT_CALL[key] || {
      time: 0,
      old: 15 * 1000,
      value: null
    }
  }

  if (
    !key ||
    CACHE_CONTRACT_CALL[key].time + CACHE_CONTRACT_CALL[key].old <= new Date().getTime() 
    || !CACHE_CONTRACT_CALL[key] 
    || CACHE_CONTRACT_CALL[key].value == null) {
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
  value: 0
}

router.get('/blockNumber', TRY(async (req, res) => {
  if (CACHE_BLOCK_NUMBER.time + CACHE_BLOCK_NUMBER.old <= new Date().getTime()) {
    var data = await methods.block(-1, true)
    CACHE_BLOCK_NUMBER.time = new Date().getTime()
    CACHE_BLOCK_NUMBER.value = data;
    res.json(CACHE_BLOCK_NUMBER.value)
  }
  else {
    res.json(CACHE_BLOCK_NUMBER.value)
  }
}))

router.get('/pools', TRY(async (req, res) => {
  res.json(await pools.getAllLPValue())
}))

router.get('/pools/:pid', TRY(async (req, res) => {
  var { pid } = req.params
  res.json(await pools.getLPValue(pid))
}))

router.get('/info', TRY(async (req, res) => {
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

router.get('/total-supply', TRY(async (req, res) => {
  var v = await methods.contract('0xB1f66997A5760428D3a87D68b90BfE0aE64121cC')
  .methods('totalSupply():(uint256)')
  .params()
  .call()

  res.send(200, Math.round(BigNumber(v).div(10 ** 18).toNumber()))
}))

router.get('/circulating-supply', TRY(async (req, res) => {
  var v = await methods.contract('0xB1f66997A5760428D3a87D68b90BfE0aE64121cC')
  .methods('circulatingSupply():(uint256)')
  .params()
  .call()

  var b = await methods.contract('0xB1f66997A5760428D3a87D68b90BfE0aE64121cC')
  .methods('balanceOf(address):(uint256)')
  .params('0xb67d7a6644d9e191cac4da2b88d6817351c7ff62')
  .call()

  res.send(200, Math.round(BigNumber(v).minus(b).div(10 ** 18).toNumber()))
}))

router.get('/price/:token', TRY(async (req, res) => {
  var token = req.params.token
  res.json({
    usdPrice: await getPrice(token)
  })
}))
module.exports = router