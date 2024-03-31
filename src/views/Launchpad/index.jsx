import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { useSelector } from "react-redux";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice } from 'wagmi'
import Loading from '@/components/Loading';
import Token from './components/Token'

const standardABI = [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const standardBytecode = "0x6080604052600c805460ff191690553480156200001b57600080fd5b5060405162001b1938038062001b198339810160408190526200003e91620002f2565b84848460036200004f848262000427565b5060046200005e838262000427565b5060015550506005805460ff1916905560075460ff1615620000c55760405162461bcd60e51b8152602060048201526026602482015260008051602062001af9833981519152604482015265185b1a5e995960d21b60648201526084015b60405180910390fd5b600980546001600160a01b0319166001600160a01b03881617905560088190556005805460ff1916905580156200010a57600a805460ff60a01b1916600160a01b1790555b600d82905560026200011e600a8562000509565b6200012a90856200052c565b62000136919062000509565b600b8190556009546200016e916001600160a01b03909116906200015c600a8762000509565b62000168919062000548565b620001a7565b6200018230600b54620001a760201b60201c565b50506005805461ff001916905550506007805460ff19166001179055506200055e9050565b60075460ff1615620001fa5760405162461bcd60e51b8152602060048201526026602482015260008051602062001af9833981519152604482015265185b1a5e995960d21b6064820152608401620000bc565b6001600160a01b038216600090815260208190526040812080548392906200022490849062000548565b90915550505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025557600080fd5b81516001600160401b03808211156200027257620002726200022d565b604051601f8301601f19908116603f011681019082821181831017156200029d576200029d6200022d565b81604052838152602092508683858801011115620002ba57600080fd5b600091505b83821015620002de5785820183015181830184015290820190620002bf565b600093810190920192909252949350505050565b60008060008060008060c087890312156200030c57600080fd5b86516001600160a01b03811681146200032457600080fd5b60208801519096506001600160401b03808211156200034257600080fd5b620003508a838b0162000243565b965060408901519150808211156200036757600080fd5b506200037689828a0162000243565b945050606087015192506080870151915060a087015190509295509295509295565b600181811c90821680620003ad57607f821691505b602082108103620003ce57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200042257600081815260208120601f850160051c81016020861015620003fd5750805b601f850160051c820191505b818110156200041e5782815560010162000409565b5050505b505050565b81516001600160401b038111156200044357620004436200022d565b6200045b8162000454845462000398565b84620003d4565b602080601f8311600181146200049357600084156200047a5750858301515b600019600386901b1c1916600185901b1785556200041e565b600085815260208120601f198616915b82811015620004c457888601518255948401946001909101908401620004a3565b5085821015620004e35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b6000826200052757634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115620005425762000542620004f3565b92915050565b80820180821115620005425762000542620004f3565b61158b806200056e6000396000f3fe6080604052600436106101a05760003560e01c806365029d82116100ec5780638da5cb5b1161008a578063a9059cbb11610064578063a9059cbb146104bc578063ae19139e146104dc578063d9443923146104fc578063f275f64b1461051b57600080fd5b80638da5cb5b1461047457806395d89b41146104945780639a540abf146104a957600080fd5b8063715018a6116100c6578063715018a61461040f5780637ec18cf61461042457806382247ec01461043e57806383f12fec1461045457600080fd5b806365029d82146103a457806367b9a286146103c457806370a08231146103d957600080fd5b80631693e8d411610159578063313ce56711610133578063313ce567146103145780633b97e856146103365780635b8bec551461034c5780635d0044ca1461038457600080fd5b80631693e8d4146102c557806318160ddd146102df57806327de2e85146102f457600080fd5b806301ffc9a7146101b457806304c0c476146101e957806306fdde031461021b5780630902f1ac1461023d57806311106ee21461027657806312a54b62146102a457600080fd5b366101af576101ad61053b565b005b600080fd5b3480156101c057600080fd5b506101d46101cf366004611150565b610612565b60405190151581526020015b60405180910390f35b3480156101f557600080fd5b506002546102069063ffffffff1681565b60405163ffffffff90911681526020016101e0565b34801561022757600080fd5b50610230610641565b6040516101e09190611181565b34801561024957600080fd5b50610261306000908152602081905260409020544791565b604080519283526020830191909152016101e0565b34801561028257600080fd5b506102966102913660046111e4565b6106d3565b6040519081526020016101e0565b3480156102b057600080fd5b50600a546101d490600160a01b900460ff1681565b3480156102d157600080fd5b506005546101d49060ff1681565b3480156102eb57600080fd5b50600154610296565b34801561030057600080fd5b506101ad61030f366004611210565b610734565b34801561032057600080fd5b50600d5460405160ff90911681526020016101e0565b34801561034257600080fd5b50610296600d5481565b34801561035857600080fd5b50600a5461036c906001600160a01b031681565b6040516001600160a01b0390911681526020016101e0565b34801561039057600080fd5b506101ad61039f366004611236565b6107d4565b3480156103b057600080fd5b506101ad6103bf36600461131e565b610803565b3480156103d057600080fd5b506101ad6108ae565b3480156103e557600080fd5b506102966103f436600461135b565b6001600160a01b031660009081526020819052604090205490565b34801561041b57600080fd5b506101ad61098e565b34801561043057600080fd5b50600c546101d49060ff1681565b34801561044a57600080fd5b5061029660085481565b34801561046057600080fd5b506101ad61046f366004611376565b6109ca565b34801561048057600080fd5b5060095461036c906001600160a01b031681565b3480156104a057600080fd5b50610230610b21565b6101ad6104b7366004611210565b610b30565b3480156104c857600080fd5b506101d46104d73660046113bb565b610cbb565b3480156104e857600080fd5b506101ad6104f73660046113e5565b610cef565b34801561050857600080fd5b506005546101d490610100900460ff1681565b34801561052757600080fd5b506101ad6105363660046113e5565b610d37565b60055460ff166105875760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b3060009081526020819052604081205447906105a39034611416565b6105ad919061142d565b90506105ba303383610d74565b6105c5303383610df5565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b60006001600160e01b031982166301ffc9a760e01b148061063b57506001600160e01b03198216155b92915050565b6060600380546106509061144f565b80601f016020809104026020016040519081016040528092919081815260200182805461067c9061144f565b80156106c95780601f1061069e576101008083540402835291602001916106c9565b820191906000526020600020905b8154815290600101906020018083116106ac57829003601f168201915b5050505050905090565b60008060006106ef306000908152602081905260409020544791565b915091508315610720576107038583611489565b61070d8287611416565b610717919061142d565b9250505061063b565b61072a8582611489565b61070d8387611416565b600a546001600160a01b0316331461075e5760405162461bcd60e51b815260040161057e9061149c565b60025463ffffffff8083169116106107b85760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e000000000000604482015260640161057e565b6002805463ffffffff191663ffffffff92909216919091179055565b6009546001600160a01b031633146107fe5760405162461bcd60e51b815260040161057e906114de565b600855565b6009546001600160a01b0316331461082d5760405162461bcd60e51b815260040161057e906114de565b600c5460ff16156108805760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c6564000000000000000000604482015260640161057e565b60008151600b54610891919061142d565b905061089d82826109ca565b5050600c805460ff19166001179055565b600a546001600160a01b031633146108d85760405162461bcd60e51b815260040161057e9061149c565b60025463ffffffff1643116109225760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b604482015260640161057e565b6005805460ff1916905560405133904780156108fc02916000818181858888f19350505050158015610958573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6009546001600160a01b031633146109b85760405162461bcd60e51b815260040161057e906114de565b600980546001600160a01b0319169055565b600082511180156109db5750600081115b610a1e5760405162461bcd60e51b8152602060048201526014602482015273696e76616c696420626174636820706172616d7360601b604482015260640161057e565b6000818351610a2d9190611416565b33600090815260208190526040902054909150811115610a865760405162461bcd60e51b8152602060048201526014602482015273696e73756666696369656e742062616c616e636560601b604482015260640161057e565b60005b8351811015610af75782600080868481518110610aa857610aa8611513565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000828254610adf9190611489565b90915550819050610aef81611529565b915050610a89565b503360009081526020819052604081208054839290610b17908490611542565b9091555050505050565b6060600480546106509061144f565b6009546001600160a01b03163314610b5a5760405162461bcd60e51b815260040161057e906114de565b600554610100900460ff1615610bb25760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c7265616479206164646564000000000000000000604482015260640161057e565b6005805461ff00191661010017905534610bfc5760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b604482015260640161057e565b8063ffffffff164310610c485760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b604482015260640161057e565b6002805463ffffffff831663ffffffff1990911681179091556005805460ff19166001179055600a80546001600160a01b03191633179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610cdb57610cd682610fb0565b610ce6565b610ce6338484610df5565b50600192915050565b6009546001600160a01b03163314610d195760405162461bcd60e51b815260040161057e906114de565b600a8054911515600160a01b0260ff60a01b19909216919091179055565b6009546001600160a01b03163314610d615760405162461bcd60e51b815260040161057e906114de565b6005805460ff1916911515919091179055565b600a54600160a01b900460ff1615610df0576008546001600160a01b038316600090815260208190526040902054610dac9083611489565b1115610df05760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b604482015260640161057e565b505050565b336000908152600660205260409020544363ffffffff90911603610e755760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b606482015260840161057e565b336000908152600660209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610f0b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161057e565b6001600160a01b038084166000908152602081905260409020805483900390558216610f3f57600180548290039055610f5e565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610fa391815260200190565b60405180910390a3505050565b60055460ff16610ff75760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b604482015260640161057e565b30600090815260208190526040812054611012908390611489565b61101c4784611416565b611026919061142d565b9050611033303384610d74565b600081116110795760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b604482015260640161057e565b804710156110c95760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e20726573657276657300000000604482015260640161057e565b6110d4333084610df5565b604051339082156108fc029083906000818181858888f19350505050158015611101573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b60006020828403121561116257600080fd5b81356001600160e01b03198116811461117a57600080fd5b9392505050565b600060208083528351808285015260005b818110156111ae57858101830151858201604001528201611192565b506000604082860101526040601f19601f8301168501019250505092915050565b803580151581146111df57600080fd5b919050565b600080604083850312156111f757600080fd5b82359150611207602084016111cf565b90509250929050565b60006020828403121561122257600080fd5b813563ffffffff8116811461117a57600080fd5b60006020828403121561124857600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b03811681146111df57600080fd5b600082601f83011261128d57600080fd5b8135602067ffffffffffffffff808311156112aa576112aa61124f565b8260051b604051601f19603f830116810181811084821117156112cf576112cf61124f565b6040529384528581018301938381019250878511156112ed57600080fd5b83870191505b848210156113135761130482611265565b835291830191908301906112f3565b979650505050505050565b60006020828403121561133057600080fd5b813567ffffffffffffffff81111561134757600080fd5b6113538482850161127c565b949350505050565b60006020828403121561136d57600080fd5b61117a82611265565b6000806040838503121561138957600080fd5b823567ffffffffffffffff8111156113a057600080fd5b6113ac8582860161127c565b95602094909401359450505050565b600080604083850312156113ce57600080fd5b6113d783611265565b946020939093013593505050565b6000602082840312156113f757600080fd5b61117a826111cf565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761063b5761063b611400565b60008261144a57634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061146357607f821691505b60208210810361148357634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561063b5761063b611400565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60006001820161153b5761153b611400565b5060010190565b8181038181111561063b5761063b61140056fea2646970667358221220350d1705ef9b5456d53c128dc53b64c470565679fd1d9f53a775d3ab4a3dcab964736f6c6343000814003363616e206e6f742061737369676e20616761696e20616674657220696e697469"

const web3 = new Web3(window.ethereum);
const tplContract = new web3.eth.Contract(standardABI);

const factoryContractAddress = '0xc6B16586F4C9798f7006ca1b4e691BD7d70029FA'
const factoryContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployer","type":"address"},{"indexed":true,"internalType":"address","name":"contractAddr","type":"address"}],"name":"NewDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"}],"name":"securityCodes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tpls","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTpls","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes","name":"bytecode","type":"bytes"},{"internalType":"bytes","name":"constructorArgs","type":"bytes"}],"name":"deployContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"},{"internalType":"bool","name":"enable","type":"bool"}],"name":"configCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"value","type":"bytes32"}],"name":"bytes32ToHexString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]
const factoryContract = new web3.eth.Contract(factoryContractAbi, factoryContractAddress);

export default function Launchpad() {
    const [form] = Form.useForm();
    const [allEvents, setAllEvents] = useState([])
    const [listLoading, setListLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const user = useSelector(state => state.user)
    const formLaunch = useRef()
    const { open } = useWeb3Modal()
    const { data: gasPrice } = useGasPrice()
    const { address } = useAccount()
    const [readingStartBlock, setReadingStartBlock] = useState(BigInt(0))
    const [readingEndBlock, setReadingEndBlock] = useState(BigInt(0))

    const openNotificationError = (message) => {
        api['error']({
          message: 'Somthing Error.',
          description: message,
        });
    }

    const openNotificationSuccess = (message) => {
        api['success']({
          message: 'Success!',
          description: message,
        });
    }

    const onFinish = async (values) => {
        console.log("Success:", values);
        
        // const deployTx = tplContract.deploy({
        //     data: standardBytecode,
        //     arguments: [values.name, values.ticker, values.supply, values.max],
        // });
        // const gas = await deployTx.estimateGas({ from: address });
        // const tx = {
        //     from: address,
        //     to: '',
        //     data: deployTx.encodeABI(),
        //     gas
        // };

        setSubmitLoading(true)

        //compute max wallet
        // let maxPerWallet = BigInt(values.max) * BigInt(values.supply) / BigInt(100)
        let maxSupply = BigInt(values.supply) * BigInt(10 ** Number(values.decimals))
        let maxPerWallet = BigInt(values.max) * maxSupply / BigInt(100)

        const constructorArgs = web3.eth.abi.encodeParameters(
            ['address', 'string', 'string', 'uint256', 'uint256', 'uint256'],
            [address.toString(), values.name, values.ticker, maxSupply, values.decimals, maxPerWallet]
          );
        console.log('bytecodehash:', web3.utils.keccak256(standardBytecode))
        console.log('parameters:', constructorArgs, [address.toString(), values.name, values.ticker, maxSupply, values.decimals, maxPerWallet])

        try {
            const deployContractMethod = factoryContract.methods.deployContract(standardBytecode, constructorArgs);
            const gasEstimate = await deployContractMethod.estimateGas({ from: address });
            console.log('gasEstimate', gasEstimate, gasPrice)
            // 发送交易
            const tx = {
                from: address,
                to: factoryContractAddress,
                data: deployContractMethod.encodeABI(),
                gas: gasEstimate,
                gasPrice: gasPrice.toString(),
            };
            const txHash = await web3.eth.sendTransaction(tx);
            getReceipt(txHash.transactionHash);
        } catch (err) {
            openNotificationError(err?.message || 'Please try again later.')
            setSubmitLoading(false)
        }
    };

    const getReceipt = async (hash) => {
        try {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt) {
                if (receipt.status === true || receipt.status == 1) {
                    openNotificationSuccess(`Transaction success`)
                    setSubmitLoading(false)
                    console.log('Transaction success: ', receipt);
                } else {
                    openNotificationError(`Transaction failed`)
                    setSubmitLoading(false)
                    console.log('Transaction failed: ', receipt);
                }
            } else {
              setTimeout(() => getReceipt(hash), 2000);
            }
        } catch (err) {
            console.log('getReceipt err:', err)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const addEvent = (newEvent) => {
        setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const pendingBlockEvent = async (startBlock, endBlock) => {
        setReadingStartBlock(startBlock)
        setReadingEndBlock(endBlock)
        try {
            const blockEvents = await factoryContract.getPastEvents('NewDeployed', {
                filter: { deployer: address },
                fromBlock: startBlock,
                toBlock: endBlock
            })
            setAllEvents((prevEvents) => [...prevEvents, ...blockEvents]);
            // setListLoading(false)
            console.log('all events:', allEvents)
        } catch(err) {
            // setListLoading(false)
            openNotificationError(err?.message || 'Please try again later.')
        }
    }

    const getDeployedList = async () => {
        let startBlock = BigInt(38990718);
        let latestBlock = await web3.eth.getBlockNumber();
        const blockCheckRange = 5000;
        if(latestBlock - BigInt(blockCheckRange) <= startBlock) {
            pendingBlockEvent(startBlock, latestBlock)
            return
        }
        for(;;) {
            console.log("current block:", startBlock)
            if(startBlock > latestBlock) break
            await pendingBlockEvent(startBlock, startBlock + BigInt(blockCheckRange));
            startBlock += BigInt(blockCheckRange)
        }
        setListLoading(false)
    }

    const handleOpen = () => {
        open()
    }

    useEffect(() => {
        if (user?.address) {
            getDeployedList()
        }
        formLaunch.current.setFieldsValue({
            decimals: 18, // decimals 的默认值 0
        })
    }, [user?.address]);

    return (
        <>
            {contextHolder}
            <LaunchpadWrapper>
                <InnerWrapper>
                    <FormWrapper
                        ref={formLaunch}
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Title className="mb-4">ERC314 Factory</Title>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the name",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please input the name."/>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Ticker"
                                    name="ticker"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the ticker",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please input the ticker. eg: BTC/ETH/BSC"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Supply"
                                    name="supply"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the supply",
                                        },
                                        () => ({
                                            validator(_, value) {
                                                if (!/^\d+$/.test(value)) {
                                                    return Promise.reject(new Error('Please enter valid numbers!'));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder="Please input the supply."/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Decimals"
                                    name="decimals"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the decimals.",
                                        },
                                    ]}
                                >
                                    <InputNumber min={1} max={99} style={{ width: '100%'}}/>
                                    {/* <Input placeholder="Please input the decimals."/> */}
                                </Form.Item>
                            </Col>
                        </Row>

                        

                        <Form.Item
                            label="Max wallet (1% to 100%):"
                            name="max"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Slider max={100}/>
                        </Form.Item>

                        <Form.Item>
                            {
                                user?.address
                                ? <Button loading={submitLoading} className="ml-auto block" type="primary" size="large" htmlType="submit">Submit</Button>
                                : <Button onClick={() => handleOpen()} className="ml-auto block" type="primary" size="large">Connect Wallet</Button>
                            }
                            
                        </Form.Item>
                    </FormWrapper>
                    <MytokenWrapper>
                        <Title className="mb-4">My Tokens </Title>
                        <Title className="mb-4">{readingStartBlock.toString()} - {readingEndBlock.toString()} </Title>
                        <ListWrapper>
                            {
                                listLoading
                                ? <div className="text-center"><Loading/></div> 
                                : (
                                    allEvents && allEvents.length > 0
                                    ? (
                                        <>
                                            <div className='grid md:grid-cols-5 flex-1 font-bold text-center py-3'>
                                                <div>CA</div>
                                                <div>NAME</div>
                                                <div>SYMBOL</div>
                                                <div>TotalSupply</div>
                                                <div></div>
                                            </div>
                                            {allEvents.map((item,index) => {
                                                return <Token key={index} item={item} />
                                            })}
                                        </>
                                    )
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                )
                            }
                        </ListWrapper>
                    </MytokenWrapper>
                </InnerWrapper>
            </LaunchpadWrapper>
        </>
    );
}

const ListWrapper = styled.div`

`
const Header = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
`

const LaunchpadWrapper = styled.div`
  padding-top: ${({ theme }) => theme.height};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg02};
`;

const InnerWrapper = styled.div`
  margin: 30px auto 0;
  max-width: 1000px;
  ${({ theme }) => theme.md`
  
    `}
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const FormWrapper = styled(Form)`
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: ${({ theme }) => theme.secondRadius}px;
  flex: 1;
  padding: 24px;
`;
const MytokenWrapper = styled.div`
  flex: 1;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: ${({ theme }) => theme.secondRadius}px;
  margin-top: 30px;
`;
