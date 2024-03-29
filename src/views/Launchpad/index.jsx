import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice } from 'wagmi'
import Loading from '@/components/Loading';
import Token from './components/Token'

const standardABI = [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const standardBytecode = "0x6080604052600c805460ff191690553480156200001b57600080fd5b5060405162001ad238038062001ad28339810160408190526200003e91620002eb565b83838360036200004f848262000417565b5060046200005e838262000417565b5060015550506005805460ff1916905560075460ff1615620000c55760405162461bcd60e51b8152602060048201526026602482015260008051602062001ab2833981519152604482015265185b1a5e995960d21b60648201526084015b60405180910390fd5b600980546001600160a01b0319166001600160a01b03871617905560088190556005805460ff1916905580156200010a57600a805460ff60a01b1916600160a01b1790555b600262000119600a84620004f9565b6200012590846200051c565b620001319190620004f9565b600b81905560095462000169916001600160a01b039091169062000157600a86620004f9565b62000163919062000538565b620001a0565b6200017d30600b54620001a060201b60201c565b50506005805461ff001916905550506007805460ff19166001179055506200054e565b60075460ff1615620001f35760405162461bcd60e51b8152602060048201526026602482015260008051602062001ab2833981519152604482015265185b1a5e995960d21b6064820152608401620000bc565b6001600160a01b038216600090815260208190526040812080548392906200021d90849062000538565b90915550505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200024e57600080fd5b81516001600160401b03808211156200026b576200026b62000226565b604051601f8301601f19908116603f0116810190828211818310171562000296576200029662000226565b81604052838152602092508683858801011115620002b357600080fd5b600091505b83821015620002d75785820183015181830184015290820190620002b8565b600093810190920192909252949350505050565b600080600080600060a086880312156200030457600080fd5b85516001600160a01b03811681146200031c57600080fd5b60208701519095506001600160401b03808211156200033a57600080fd5b6200034889838a016200023c565b955060408801519150808211156200035f57600080fd5b506200036e888289016200023c565b606088015160809098015196999598509695949350505050565b600181811c908216806200039d57607f821691505b602082108103620003be57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200041257600081815260208120601f850160051c81016020861015620003ed5750805b601f850160051c820191505b818110156200040e57828155600101620003f9565b5050505b505050565b81516001600160401b0381111562000433576200043362000226565b6200044b8162000444845462000388565b84620003c4565b602080601f8311600181146200048357600084156200046a5750858301515b600019600386901b1c1916600185901b1785556200040e565b600085815260208120601f198616915b82811015620004b45788860151825594840194600190910190840162000493565b5085821015620004d35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b6000826200051757634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115620005325762000532620004e3565b92915050565b80820180821115620005325762000532620004e3565b611554806200055e6000396000f3fe6080604052600436106101855760003560e01c806367b9a286116100d15780638da5cb5b1161008a578063a9059cbb11610064578063a9059cbb14610485578063ae19139e146104a5578063d9443923146104c5578063f275f64b146104e457600080fd5b80638da5cb5b1461043d57806395d89b411461045d5780639a540abf1461047257600080fd5b806367b9a2861461038d57806370a08231146103a2578063715018a6146103d85780637ec18cf6146103ed57806382247ec01461040757806383f12fec1461041d57600080fd5b80631693e8d41161013e578063313ce56711610118578063313ce567146102f95780635b8bec55146103155780635d0044ca1461034d57806365029d821461036d57600080fd5b80631693e8d4146102aa57806318160ddd146102c457806327de2e85146102d957600080fd5b806301ffc9a71461019957806304c0c476146101ce57806306fdde03146102005780630902f1ac1461022257806311106ee21461025b57806312a54b621461028957600080fd5b3661019457610192610504565b005b600080fd5b3480156101a557600080fd5b506101b96101b4366004611119565b6105db565b60405190151581526020015b60405180910390f35b3480156101da57600080fd5b506002546101eb9063ffffffff1681565b60405163ffffffff90911681526020016101c5565b34801561020c57600080fd5b5061021561060a565b6040516101c5919061114a565b34801561022e57600080fd5b50610246306000908152602081905260409020544791565b604080519283526020830191909152016101c5565b34801561026757600080fd5b5061027b6102763660046111ad565b61069c565b6040519081526020016101c5565b34801561029557600080fd5b50600a546101b990600160a01b900460ff1681565b3480156102b657600080fd5b506005546101b99060ff1681565b3480156102d057600080fd5b5060015461027b565b3480156102e557600080fd5b506101926102f43660046111d9565b6106fd565b34801561030557600080fd5b50604051601281526020016101c5565b34801561032157600080fd5b50600a54610335906001600160a01b031681565b6040516001600160a01b0390911681526020016101c5565b34801561035957600080fd5b506101926103683660046111ff565b61079d565b34801561037957600080fd5b506101926103883660046112e7565b6107cc565b34801561039957600080fd5b50610192610877565b3480156103ae57600080fd5b5061027b6103bd366004611324565b6001600160a01b031660009081526020819052604090205490565b3480156103e457600080fd5b50610192610957565b3480156103f957600080fd5b50600c546101b99060ff1681565b34801561041357600080fd5b5061027b60085481565b34801561042957600080fd5b5061019261043836600461133f565b610993565b34801561044957600080fd5b50600954610335906001600160a01b031681565b34801561046957600080fd5b50610215610aea565b6101926104803660046111d9565b610af9565b34801561049157600080fd5b506101b96104a0366004611384565b610c84565b3480156104b157600080fd5b506101926104c03660046113ae565b610cb8565b3480156104d157600080fd5b506005546101b990610100900460ff1681565b3480156104f057600080fd5b506101926104ff3660046113ae565b610d00565b60055460ff166105505760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b30600090815260208190526040812054479061056c90346113df565b61057691906113f6565b9050610583303383610d3d565b61058e303383610dbe565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b60006001600160e01b031982166301ffc9a760e01b148061060457506001600160e01b03198216155b92915050565b60606003805461061990611418565b80601f016020809104026020016040519081016040528092919081815260200182805461064590611418565b80156106925780601f1061066757610100808354040283529160200191610692565b820191906000526020600020905b81548152906001019060200180831161067557829003601f168201915b5050505050905090565b60008060006106b8306000908152602081905260409020544791565b9150915083156106e9576106cc8583611452565b6106d682876113df565b6106e091906113f6565b92505050610604565b6106f38582611452565b6106d683876113df565b600a546001600160a01b031633146107275760405162461bcd60e51b815260040161054790611465565b60025463ffffffff8083169116106107815760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e0000000000006044820152606401610547565b6002805463ffffffff191663ffffffff92909216919091179055565b6009546001600160a01b031633146107c75760405162461bcd60e51b8152600401610547906114a7565b600855565b6009546001600160a01b031633146107f65760405162461bcd60e51b8152600401610547906114a7565b600c5460ff16156108495760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c65640000000000000000006044820152606401610547565b60008151600b5461085a91906113f6565b90506108668282610993565b5050600c805460ff19166001179055565b600a546001600160a01b031633146108a15760405162461bcd60e51b815260040161054790611465565b60025463ffffffff1643116108eb5760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b6044820152606401610547565b6005805460ff1916905560405133904780156108fc02916000818181858888f19350505050158015610921573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6009546001600160a01b031633146109815760405162461bcd60e51b8152600401610547906114a7565b600980546001600160a01b0319169055565b600082511180156109a45750600081115b6109e75760405162461bcd60e51b8152602060048201526014602482015273696e76616c696420626174636820706172616d7360601b6044820152606401610547565b60008183516109f691906113df565b33600090815260208190526040902054909150811115610a4f5760405162461bcd60e51b8152602060048201526014602482015273696e73756666696369656e742062616c616e636560601b6044820152606401610547565b60005b8351811015610ac05782600080868481518110610a7157610a716114dc565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000828254610aa89190611452565b90915550819050610ab8816114f2565b915050610a52565b503360009081526020819052604081208054839290610ae090849061150b565b9091555050505050565b60606004805461061990611418565b6009546001600160a01b03163314610b235760405162461bcd60e51b8152600401610547906114a7565b600554610100900460ff1615610b7b5760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c72656164792061646465640000000000000000006044820152606401610547565b6005805461ff00191661010017905534610bc55760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b6044820152606401610547565b8063ffffffff164310610c115760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b6044820152606401610547565b6002805463ffffffff831663ffffffff1990911681179091556005805460ff19166001179055600a80546001600160a01b03191633179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610ca457610c9f82610f79565b610caf565b610caf338484610dbe565b50600192915050565b6009546001600160a01b03163314610ce25760405162461bcd60e51b8152600401610547906114a7565b600a8054911515600160a01b0260ff60a01b19909216919091179055565b6009546001600160a01b03163314610d2a5760405162461bcd60e51b8152600401610547906114a7565b6005805460ff1916911515919091179055565b600a54600160a01b900460ff1615610db9576008546001600160a01b038316600090815260208190526040902054610d759083611452565b1115610db95760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b6044820152606401610547565b505050565b336000908152600660205260409020544363ffffffff90911603610e3e5760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b6064820152608401610547565b336000908152600660209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610ed45760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610547565b6001600160a01b038084166000908152602081905260409020805483900390558216610f0857600180548290039055610f27565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f6c91815260200190565b60405180910390a3505050565b60055460ff16610fc05760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b6044820152606401610547565b30600090815260208190526040812054610fdb908390611452565b610fe547846113df565b610fef91906113f6565b9050610ffc303384610d3d565b600081116110425760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b6044820152606401610547565b804710156110925760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e207265736572766573000000006044820152606401610547565b61109d333084610dbe565b604051339082156108fc029083906000818181858888f193505050501580156110ca573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b60006020828403121561112b57600080fd5b81356001600160e01b03198116811461114357600080fd5b9392505050565b600060208083528351808285015260005b818110156111775785810183015185820160400152820161115b565b506000604082860101526040601f19601f8301168501019250505092915050565b803580151581146111a857600080fd5b919050565b600080604083850312156111c057600080fd5b823591506111d060208401611198565b90509250929050565b6000602082840312156111eb57600080fd5b813563ffffffff8116811461114357600080fd5b60006020828403121561121157600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b03811681146111a857600080fd5b600082601f83011261125657600080fd5b8135602067ffffffffffffffff8083111561127357611273611218565b8260051b604051601f19603f8301168101818110848211171561129857611298611218565b6040529384528581018301938381019250878511156112b657600080fd5b83870191505b848210156112dc576112cd8261122e565b835291830191908301906112bc565b979650505050505050565b6000602082840312156112f957600080fd5b813567ffffffffffffffff81111561131057600080fd5b61131c84828501611245565b949350505050565b60006020828403121561133657600080fd5b6111438261122e565b6000806040838503121561135257600080fd5b823567ffffffffffffffff81111561136957600080fd5b61137585828601611245565b95602094909401359450505050565b6000806040838503121561139757600080fd5b6113a08361122e565b946020939093013593505050565b6000602082840312156113c057600080fd5b61114382611198565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610604576106046113c9565b60008261141357634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061142c57607f821691505b60208210810361144c57634e487b7160e01b600052602260045260246000fd5b50919050565b80820180821115610604576106046113c9565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b600060018201611504576115046113c9565b5060010190565b81810381811115610604576106046113c956fea2646970667358221220e277648f4bdeccac99bce384314b87d71dccf6daf96844774d4c29985c33d95d64736f6c6343000814003363616e206e6f742061737369676e20616761696e20616674657220696e697469"

const web3 = new Web3(window.ethereum);
const tplContract = new web3.eth.Contract(standardABI);

const factoryContractAddress = '0x1771dC0BcfC5fdE97FB079b92ba9a0E656aB11E6'
const factoryContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployer","type":"address"},{"indexed":true,"internalType":"address","name":"contractAddr","type":"address"}],"name":"NewDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"}],"name":"securityCodes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tpls","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTpls","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes","name":"bytecode","type":"bytes"},{"internalType":"bytes","name":"constructorArgs","type":"bytes"}],"name":"deployContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"},{"internalType":"bool","name":"enable","type":"bool"}],"name":"configCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"value","type":"bytes32"}],"name":"bytes32ToHexString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]
const factoryContract = new web3.eth.Contract(factoryContractAbi, factoryContractAddress);

export default function Launchpad() {
    const [form] = Form.useForm();
    const [allEvents, setAllEvents] = useState([])
    const [listLoading, setListLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const formLaunch = useRef()
    const { data: gasPrice } = useGasPrice()
    const { address } = useAccount()

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
        let maxPerWallet = BigInt(values.max) * BigInt(values.supply) * BigInt(10 ** 16)

        const constructorArgs = web3.eth.abi.encodeParameters(
            ['address', 'string', 'string', 'uint256', 'uint256'],
            [address.toString(), values.name, values.ticker, values.supply, maxPerWallet]
          );
        console.log('bytecodehash:', web3.utils.keccak256(standardBytecode))
        console.log('parameters:', constructorArgs, [address, values.name, values.ticker, values.supply, maxPerWallet])

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
            const getReceipt = async (hash) => {
                const receipt = await web3.eth.getTransactionReceipt(hash);
                if (receipt) {
                    if (receipt.status === true) {
                        openNotificationSuccess(`'Transaction success: ${receipt}`)
                        setSubmitLoading(false)
                        console.log('Transaction success: ', receipt);
                    } else {
                        openNotificationError(`Transaction failed: ${receipt}`)
                        setSubmitLoading(false)
                        console.log('Transaction failed: ', receipt);
                    }
                } else {
                  setTimeout(() => getReceipt(hash), 2000);
                }
            };
            getReceipt(txHash);
        } catch (err) {
            openNotificationError(err?.message || 'Please try again later.')
            setSubmitLoading(false)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const getDeployedList = async () => {

        try {
            const allEvents = await factoryContract.getPastEvents('NewDeployed', {
                filter: { deployer: address },
                fromBlock: 38930597,
                toBlock: 'latest'
            })
            setAllEvents(allEvents)
            setListLoading(false)
            console.log('all events:', allEvents)
        } catch(err) {
            setListLoading(false)
            openNotificationError(err?.message || 'Please try again later.')
        }

    }

    useEffect(() => {
        getDeployedList()
        formLaunch.current.setFieldsValue({
            decimals: 18, // decimals 的默认值 0
        })
    }, []);

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
                            <Button loading={submitLoading} className="ml-auto block" type="primary" size="large" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </FormWrapper>
                    <MytokenWrapper>
                        <Title className="mb-4">My Token </Title>
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
