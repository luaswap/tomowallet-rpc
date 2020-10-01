const axios = require('axios')

async function getPrice(token) {
  if (token === 'LUA') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=lua-token&vs_currencies=usd')
    return (data["lua-token"] || {}).usd || 0
  }
  else if (token === 'ETH') {
    var { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    return (data["ethereum"] || {}).usd || 0
  }
}

module.exports = getPrice