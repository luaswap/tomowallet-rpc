require('dotenv').config()

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser')
const Web3 = require('web3')
const web3 = new Web3('https://rpc.tomochain.com')
const fs = require('fs')


const ACCOUNT = web3.eth.accounts.privateKeyToAccount('0xd4bb4317bed750e0a4dac9abb2369a718cdf6bb534f4de2e755a18935df99869');
var NONCE = 0
const AIRDROPED = fs.readFileSync('./airdrop.txt', 'utf8').split('\n')

web3.eth.accounts.wallet.add(ACCOUNT)
web3.eth.defaultAccount = ACCOUNT.address

console.log(process.env.RPC)

const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.json())
app.use(compression());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// app.use((req, res, next) => {
//   console.log(req.url)
//   next()
// })

app.use(require('./luaswap'))
app.get('/airdrop/:address', async (req, res) => {
  var address = req.params.address || ''
  address = address.toLowerCase()
  if (web3.utils.isAddress(address) && AIRDROPED.indexOf(address) < 0) {
    try {
      console.log('Try airdrop', address)
      if (NONCE == 0) {
        NONCE = await web3.eth.getTransactionCount(ACCOUNT.address)
      }
      var tx = await web3.eth.sendTransaction({
        nonce: NONCE++,
        from: ACCOUNT.address,
        to: address,
        value: '1500000000000000',
        gasLimit: 21000,
        gasPrice: 260000000,
        chainId: '88'
      })

      AIRDROPED.push(address)
      fs.appendFileSync('./airdrop.txt', address + '\n')
      
      console.log('Airdroped to ', address, ' tx: ', tx.transactionHash)
      res.json({
        error: false
      })
    }
    catch (ex) {
      NONCE = await web3.eth.getTransactionCount(ACCOUNT.address)
      console.log('Airdrop', ex)

      res.json({
        error: true
      })
    }
  }
  else {
    res.json({
      error: true
    })
  }
})

http.listen(process.env.PORT || 8020, async (err) => {
  if (err) {
    console.log(err)
  }
  console.log('server started', process.env.PORT || 8020)
});