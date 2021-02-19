module.exports = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOperator",
				"type": "address"
			}
		],
		"name": "addOperator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "commitment",
				"type": "uint256"
			}
		],
		"name": "commit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "confirmNewOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "operator",
				"type": "address"
			}
		],
		"name": "removeOperator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "setRandIndex",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"name": "player",
				"type": "address"
			},
			{
				"name": "secret",
				"type": "uint256"
			},
			{
				"name": "newCommitment",
				"type": "uint256"
			}
		],
		"name": "settle",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "secret",
				"type": "uint256"
			},
			{
				"name": "newCommitment",
				"type": "uint256"
			}
		],
		"name": "settleByIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "seed",
				"type": "uint256"
			},
			{
				"name": "lines",
				"type": "uint256"
			}
		],
		"name": "spin",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "NewBet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "winAmount",
				"type": "uint256"
			}
		],
		"name": "SettleBet",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "bet",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "seed",
				"type": "uint256"
			},
			{
				"name": "lines",
				"type": "uint256"
			},
			{
				"name": "betPerLine",
				"type": "uint256"
			},
			{
				"name": "rand",
				"type": "uint256"
			},
			{
				"name": "number",
				"type": "uint256"
			},
			{
				"name": "map",
				"type": "uint256[15]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "betIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bets",
		"outputs": [
			{
				"name": "player",
				"type": "address"
			},
			{
				"name": "seed",
				"type": "uint256"
			},
			{
				"name": "lines",
				"type": "uint256"
			},
			{
				"name": "betPerLine",
				"type": "uint256"
			},
			{
				"name": "randIndex",
				"type": "uint256"
			},
			{
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "betsOfPlayer",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "commitments",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "n",
				"type": "uint256"
			}
		],
		"name": "convertNumberToRandomMap",
		"outputs": [
			{
				"name": "",
				"type": "uint256[15]"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "getCommitment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "getNumberOfBets",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "secret",
				"type": "uint256"
			},
			{
				"name": "revealdAtBlock",
				"type": "uint256"
			}
		],
		"name": "getQuickRandom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRandom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "operators",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "n",
				"type": "uint256"
			},
			{
				"name": "lines",
				"type": "uint256"
			},
			{
				"name": "betPerLine",
				"type": "uint256"
			}
		],
		"name": "payout",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256[20]"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "randIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rands",
		"outputs": [
			{
				"name": "commitment",
				"type": "uint256"
			},
			{
				"name": "secret",
				"type": "uint256"
			},
			{
				"name": "blockHash",
				"type": "uint256"
			},
			{
				"name": "revealdAtBlock",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cards",
				"type": "uint256[5]"
			}
		],
		"name": "winLine",
		"outputs": [
			{
				"name": "win",
				"type": "uint256"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
]