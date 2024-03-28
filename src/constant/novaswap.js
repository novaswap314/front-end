export const novaAddress = '0x09dCc8616358e0D0B4f2789aF2BD81c9c9c69E51'

export const novaAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "ERC314ExternalError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "IVRFee",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token0In",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1Out",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        }
      ],
      "name": "IVRSwap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "buyTax",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dever",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sellTax",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "suppTokens",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokenTvl",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "claimTradingFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_buyTax",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sellTax",
          "type": "uint256"
        }
      ],
      "name": "adjustTax",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "ext",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ins",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_from",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_to",
          "type": "uint256"
        }
      ],
      "name": "tokenListSimple",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_from",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_to",
          "type": "uint256"
        }
      ],
      "name": "tokenListRich",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "ca",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "decimals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalSupply",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "blockToUnlockLiquidity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "liquidityProvider",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "tradingEnable",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "liquidityAdded",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "pool0p",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pool1p",
              "type": "uint256"
            }
          ],
          "internalType": "struct Token314Info[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token314",
          "type": "address"
        }
      ],
      "name": "getTokenInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "ca",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "decimals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalSupply",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "blockToUnlockLiquidity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "liquidityProvider",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "tradingEnable",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "liquidityAdded",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "pool0p",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pool1p",
              "type": "uint256"
            }
          ],
          "internalType": "struct Token314Info",
          "name": "data",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_t0Addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_t0Amount",
          "type": "uint256"
        }
      ],
      "name": "routeBuyOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_t0Addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_t0Amount",
          "type": "uint256"
        }
      ],
      "name": "routeSellOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "claimMyToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "name": "swapBuyLimit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "swapBuyReck",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sellAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "name": "swapSellLimit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sellAmount",
          "type": "uint256"
        }
      ],
      "name": "swapSellReck",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]