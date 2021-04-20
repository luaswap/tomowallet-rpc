const axios = require('axios')

const PRICE = {};

async function getPrice(token) {
  try {
    var tokenAddress = token ? token.toLowerCase() : token;

    let price = 0;
    if (PRICE[token] && (new Date().getTime() - PRICE[token].updatedAt < 10 * 60 * 1000)) {
      return PRICE[token].value || 0;
    }
  
    if (token === 'USDC' || token === 'USDT' || tokenAddress === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' || tokenAddress === '0x381b31409e4d220919b2cff012ed94d70135a59e') {
      return 1
    }
  
    if (token === 'LUA' || tokenAddress === '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74') {
      var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=lua-token&vs_currencies=usd')
      price = parseFloat(data['lua-token'].usd) || 0
    }
    else if (token === 'ETH' || token === 'WETH' || tokenAddress === '0x2eaa73bd0db20c64f53febea7b5f5e5bccc7fb8b') {
      var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      price = parseFloat(data['ethereum'].usd) || 0
    }
    else if (token === 'TOMO' || token === 'TOMOE' || tokenAddress === '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc') {
      var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd')
      price = parseFloat(data['tomochain'].usd) || 0
    }
    else if (token === 'SRM' || tokenAddress === '0xc01643ac912b6a8ffc50cf8c1390934a6142bc91') {
      var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=serum&vs_currencies=usd')
      price = parseFloat(data['serum'].usd) || 0
    }
    else if (token === 'FTT' || tokenAddress === '0x33fa3c0c714638f12339F85dae89c42042a2D9Af') {
      var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ftx-token&vs_currencies=usd')
      price = parseFloat(data['ftx-token'].usd) || 0
    }
    else {
      price = 0
    }
  
    PRICE[token] = {
      updatedAt: new Date().getTime(),
      value: price
    };
    return price
  }
  catch (ex) {
    console.error('get price error', token, ex.toString());
    return (PRICE[token] || {}).value || 0
  }
}

module.exports = getPrice