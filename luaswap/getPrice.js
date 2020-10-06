const axios = require('axios')

const PRICE = {};

async function getPrice(token) {
  let price = 0;
  if (PRICE[token] && (new Date().getTime() - PRICE[token].updatedAt < 5 * 60 * 1000)) {
    return PRICE[token].value || 0;
  }

  if (token === 'LUA') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=lua-token&vs_currencies=usd')
    price = parseFloat(data['lua-token'].usd) || 0
  }
  else if (token === 'ETH') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    price = parseFloat(data['ethereum'].usd) || 0
  }
  else if (token === 'SUSHI') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=sushi&vs_currencies=usd')
    price = parseFloat(data['sushi'].usd) || 0
  }
  else if (token === 'TOMO' || token === 'TOMOE') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd')
    price = parseFloat(data['tomochain'].usd) || 0
  }
  else if (token === 'FRONT') {
    price = 0.3
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

module.exports = getPrice