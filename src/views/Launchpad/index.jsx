import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { useSelector } from "react-redux";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice } from 'wagmi'
import Loading from '@/components/Loading';
import Token from './components/Token'

const standardABI = [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const standardBytecode = "0x6080604052600c805460ff191690553480156200001b57600080fd5b5060405162001ad638038062001ad68339810160408190526200003e91620002f2565b84848460036200004f848262000427565b5060046200005e838262000427565b5060015550506005805460ff1916905560075460ff1615620000c55760405162461bcd60e51b8152602060048201526026602482015260008051602062001ab6833981519152604482015265185b1a5e995960d21b60648201526084015b60405180910390fd5b600980546001600160a01b0319166001600160a01b03881617905560088190556005805460ff1916905580156200010a57600a805460ff60a01b1916600160a01b1790555b600d82905560026200011e600a8562000509565b6200012a90856200052c565b62000136919062000509565b600b8190556009546200016e916001600160a01b03909116906200015c600a8762000509565b62000168919062000548565b620001a7565b6200018230600b54620001a760201b60201c565b50506005805461ff001916905550506007805460ff19166001179055506200055e9050565b60075460ff1615620001fa5760405162461bcd60e51b8152602060048201526026602482015260008051602062001ab6833981519152604482015265185b1a5e995960d21b6064820152608401620000bc565b6001600160a01b038216600090815260208190526040812080548392906200022490849062000548565b90915550505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025557600080fd5b81516001600160401b03808211156200027257620002726200022d565b604051601f8301601f19908116603f011681019082821181831017156200029d576200029d6200022d565b81604052838152602092508683858801011115620002ba57600080fd5b600091505b83821015620002de5785820183015181830184015290820190620002bf565b600093810190920192909252949350505050565b60008060008060008060c087890312156200030c57600080fd5b86516001600160a01b03811681146200032457600080fd5b60208801519096506001600160401b03808211156200034257600080fd5b620003508a838b0162000243565b965060408901519150808211156200036757600080fd5b506200037689828a0162000243565b945050606087015192506080870151915060a087015190509295509295509295565b600181811c90821680620003ad57607f821691505b602082108103620003ce57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200042257600081815260208120601f850160051c81016020861015620003fd5750805b601f850160051c820191505b818110156200041e5782815560010162000409565b5050505b505050565b81516001600160401b038111156200044357620004436200022d565b6200045b8162000454845462000398565b84620003d4565b602080601f8311600181146200049357600084156200047a5750858301515b600019600386901b1c1916600185901b1785556200041e565b600085815260208120601f198616915b82811015620004c457888601518255948401946001909101908401620004a3565b5085821015620004e35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b6000826200052757634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115620005425762000542620004f3565b92915050565b80820180821115620005425762000542620004f3565b611548806200056e6000396000f3fe6080604052600436106101a05760003560e01c806365029d82116100ec5780638da5cb5b1161008a578063a9059cbb11610064578063a9059cbb146104a0578063ae19139e146104c0578063d9443923146104e0578063f275f64b146104ff57600080fd5b80638da5cb5b1461045857806395d89b41146104785780639a540abf1461048d57600080fd5b8063715018a6116100c6578063715018a6146103f35780637ec18cf61461040857806382247ec01461042257806383f12fec1461043857600080fd5b806365029d821461038857806367b9a286146103a857806370a08231146103bd57600080fd5b80631693e8d411610159578063313ce56711610133578063313ce567146102f85780633b97e8561461031a5780635b8bec55146103305780635d0044ca1461036857600080fd5b80631693e8d4146102a957806318160ddd146102c357806327de2e85146102d857600080fd5b806301ffc9a7146101b457806304c0c476146101e957806306fdde031461020d5780630902f1ac1461022f57806311106ee21461026857806312a54b621461028857600080fd5b366101af576101ad61051f565b005b600080fd5b3480156101c057600080fd5b506101d46101cf36600461110d565b6105f6565b60405190151581526020015b60405180910390f35b3480156101f557600080fd5b506101ff60025481565b6040519081526020016101e0565b34801561021957600080fd5b50610222610625565b6040516101e0919061113e565b34801561023b57600080fd5b50610253306000908152602081905260409020544791565b604080519283526020830191909152016101e0565b34801561027457600080fd5b506101ff6102833660046111a1565b6106b7565b34801561029457600080fd5b50600a546101d490600160a01b900460ff1681565b3480156102b557600080fd5b506005546101d49060ff1681565b3480156102cf57600080fd5b506001546101ff565b3480156102e457600080fd5b506101ad6102f33660046111cd565b610718565b34801561030457600080fd5b50600d5460405160ff90911681526020016101e0565b34801561032657600080fd5b506101ff600d5481565b34801561033c57600080fd5b50600a54610350906001600160a01b031681565b6040516001600160a01b0390911681526020016101e0565b34801561037457600080fd5b506101ad6103833660046111f3565b6107a4565b34801561039457600080fd5b506101ad6103a33660046112db565b6107d3565b3480156103b457600080fd5b506101ad61087e565b3480156103c957600080fd5b506101ff6103d8366004611318565b6001600160a01b031660009081526020819052604090205490565b3480156103ff57600080fd5b506101ad610958565b34801561041457600080fd5b50600c546101d49060ff1681565b34801561042e57600080fd5b506101ff60085481565b34801561044457600080fd5b506101ad610453366004611333565b610994565b34801561046457600080fd5b50600954610350906001600160a01b031681565b34801561048457600080fd5b50610222610aeb565b6101ad61049b3660046111cd565b610afa565b3480156104ac57600080fd5b506101d46104bb366004611378565b610c78565b3480156104cc57600080fd5b506101ad6104db3660046113a2565b610cac565b3480156104ec57600080fd5b506005546101d490610100900460ff1681565b34801561050b57600080fd5b506101ad61051a3660046113a2565b610cf4565b60055460ff1661056b5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b30600090815260208190526040812054479061058790346113d3565b61059191906113ea565b905061059e303383610d31565b6105a9303383610db2565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b60006001600160e01b031982166301ffc9a760e01b148061061f57506001600160e01b03198216155b92915050565b6060600380546106349061140c565b80601f01602080910402602001604051908101604052809291908181526020018280546106609061140c565b80156106ad5780601f10610682576101008083540402835291602001916106ad565b820191906000526020600020905b81548152906001019060200180831161069057829003601f168201915b5050505050905090565b60008060006106d3306000908152602081905260409020544791565b915091508315610704576106e78583611446565b6106f182876113d3565b6106fb91906113ea565b9250505061061f565b61070e8582611446565b6106f183876113d3565b600a546001600160a01b031633146107425760405162461bcd60e51b815260040161056290611459565b8063ffffffff16600254106107995760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e0000000000006044820152606401610562565b63ffffffff16600255565b6009546001600160a01b031633146107ce5760405162461bcd60e51b81526004016105629061149b565b600855565b6009546001600160a01b031633146107fd5760405162461bcd60e51b81526004016105629061149b565b600c5460ff16156108505760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c65640000000000000000006044820152606401610562565b60008151600b5461086191906113ea565b905061086d8282610994565b5050600c805460ff19166001179055565b600a546001600160a01b031633146108a85760405162461bcd60e51b815260040161056290611459565b60025443116108ec5760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b6044820152606401610562565b6005805460ff1916905560405133904780156108fc02916000818181858888f19350505050158015610922573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6009546001600160a01b031633146109825760405162461bcd60e51b81526004016105629061149b565b600980546001600160a01b0319169055565b600082511180156109a55750600081115b6109e85760405162461bcd60e51b8152602060048201526014602482015273696e76616c696420626174636820706172616d7360601b6044820152606401610562565b60008183516109f791906113d3565b33600090815260208190526040902054909150811115610a505760405162461bcd60e51b8152602060048201526014602482015273696e73756666696369656e742062616c616e636560601b6044820152606401610562565b60005b8351811015610ac15782600080868481518110610a7257610a726114d0565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000828254610aa99190611446565b90915550819050610ab9816114e6565b915050610a53565b503360009081526020819052604081208054839290610ae19084906114ff565b9091555050505050565b6060600480546106349061140c565b6009546001600160a01b03163314610b245760405162461bcd60e51b81526004016105629061149b565b600554610100900460ff1615610b7c5760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c72656164792061646465640000000000000000006044820152606401610562565b6005805461ff00191661010017905534610bc65760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b6044820152606401610562565b8063ffffffff164310610c125760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b6044820152606401610562565b63ffffffff811660028190556005805460ff19166001179055600a80546001600160a01b03191633179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610c9857610c9382610f6d565b610ca3565b610ca3338484610db2565b50600192915050565b6009546001600160a01b03163314610cd65760405162461bcd60e51b81526004016105629061149b565b600a8054911515600160a01b0260ff60a01b19909216919091179055565b6009546001600160a01b03163314610d1e5760405162461bcd60e51b81526004016105629061149b565b6005805460ff1916911515919091179055565b600a54600160a01b900460ff1615610dad576008546001600160a01b038316600090815260208190526040902054610d699083611446565b1115610dad5760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b6044820152606401610562565b505050565b336000908152600660205260409020544363ffffffff90911603610e325760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b6064820152608401610562565b336000908152600660209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610ec85760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610562565b6001600160a01b038084166000908152602081905260409020805483900390558216610efc57600180548290039055610f1b565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f6091815260200190565b60405180910390a3505050565b60055460ff16610fb45760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b6044820152606401610562565b30600090815260208190526040812054610fcf908390611446565b610fd947846113d3565b610fe391906113ea565b9050610ff0303384610d31565b600081116110365760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b6044820152606401610562565b804710156110865760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e207265736572766573000000006044820152606401610562565b611091333084610db2565b604051339082156108fc029083906000818181858888f193505050501580156110be573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b60006020828403121561111f57600080fd5b81356001600160e01b03198116811461113757600080fd5b9392505050565b600060208083528351808285015260005b8181101561116b5785810183015185820160400152820161114f565b506000604082860101526040601f19601f8301168501019250505092915050565b8035801515811461119c57600080fd5b919050565b600080604083850312156111b457600080fd5b823591506111c46020840161118c565b90509250929050565b6000602082840312156111df57600080fd5b813563ffffffff8116811461113757600080fd5b60006020828403121561120557600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b038116811461119c57600080fd5b600082601f83011261124a57600080fd5b8135602067ffffffffffffffff808311156112675761126761120c565b8260051b604051601f19603f8301168101818110848211171561128c5761128c61120c565b6040529384528581018301938381019250878511156112aa57600080fd5b83870191505b848210156112d0576112c182611222565b835291830191908301906112b0565b979650505050505050565b6000602082840312156112ed57600080fd5b813567ffffffffffffffff81111561130457600080fd5b61131084828501611239565b949350505050565b60006020828403121561132a57600080fd5b61113782611222565b6000806040838503121561134657600080fd5b823567ffffffffffffffff81111561135d57600080fd5b61136985828601611239565b95602094909401359450505050565b6000806040838503121561138b57600080fd5b61139483611222565b946020939093013593505050565b6000602082840312156113b457600080fd5b6111378261118c565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761061f5761061f6113bd565b60008261140757634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061142057607f821691505b60208210810361144057634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561061f5761061f6113bd565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b6000600182016114f8576114f86113bd565b5060010190565b8181038181111561061f5761061f6113bd56fea2646970667358221220a2522dcfd47d9b32220a9f6eebf1aa793f529c0a88c3c092c731c3437863554964736f6c6343000814003363616e206e6f742061737369676e20616761696e20616674657220696e697469"

const web3 = new Web3(window.ethereum);
const tplContract = new web3.eth.Contract(standardABI);

const factoryContractAddress = '0xf6fac1e8Ed62c51100d09653BF7Db61d8e68Cdcd'
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
