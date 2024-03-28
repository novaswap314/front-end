import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice } from 'wagmi'
import Loading from '@/components/Loading';
import Token from './components/Token'

const standardABI = [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const standardBytecode = "0x6080604052600b805460ff191690553480156200001b57600080fd5b5060405162001b0338038062001b038339810160408190526200003e91620003e5565b83838360036200004f848262000510565b5060046200005e838262000510565b5060015550506005805460ff19169055600880546001600160a01b0319166001600160a01b03871617905560078190558015620000a9576009805460ff60a01b1916600160a01b1790555b600854620000cd906001600160a01b0316620000c7600a85620005f2565b62000162565b6008546001600160a01b0316600090815260208190526040902054600290620000f7908462000615565b620001039190620005f2565b600a556008546001600160a01b0316600090815260208190526040812054600a5462000130908562000615565b6200013c919062000615565b90506200014a308262000162565b50506005805461ff0019169055506200064792505050565b6001600160a01b038216620001be5760405162461bcd60e51b815260206004820181905260248201527f4552433331343a206d696e7420746f20746865207a65726f206164647265737360448201526064015b60405180910390fd5b306000908152602081905260409020548111156200021f5760405162461bcd60e51b815260206004820152601c60248201527f696e73756666696369656e742062616c616e6365206f662074686973000000006044820152606401620001b5565b6200022c30838362000290565b30600081815260208181526040808320805486900390556001600160a01b03861680845292819020805486019055518481529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600954600160a01b900460ff16156200031b576007546001600160a01b038316600090815260208190526040902054620002cb908362000631565b11156200031b5760405162461bcd60e51b815260206004820152601360248201527f4d61782077616c6c6574206578636565646564000000000000000000000000006044820152606401620001b5565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200034857600080fd5b81516001600160401b038082111562000365576200036562000320565b604051601f8301601f19908116603f0116810190828211818310171562000390576200039062000320565b81604052838152602092508683858801011115620003ad57600080fd5b600091505b83821015620003d15785820183015181830184015290820190620003b2565b600093810190920192909252949350505050565b600080600080600060a08688031215620003fe57600080fd5b85516001600160a01b03811681146200041657600080fd5b60208701519095506001600160401b03808211156200043457600080fd5b6200044289838a0162000336565b955060408801519150808211156200045957600080fd5b50620004688882890162000336565b606088015160809098015196999598509695949350505050565b600181811c908216806200049757607f821691505b602082108103620004b857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200031b57600081815260208120601f850160051c81016020861015620004e75750805b601f850160051c820191505b818110156200050857828155600101620004f3565b505050505050565b81516001600160401b038111156200052c576200052c62000320565b62000544816200053d845462000482565b84620004be565b602080601f8311600181146200057c5760008415620005635750858301515b600019600386901b1c1916600185901b17855562000508565b600085815260208120601f198616915b82811015620005ad578886015182559484019460019091019084016200058c565b5085821015620005cc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b6000826200061057634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156200062b576200062b620005dc565b92915050565b808201808211156200062b576200062b620005dc565b6114ac80620006576000396000f3fe60806040526004361061016a5760003560e01c806365029d82116100d15780638da5cb5b1161008a578063a9059cbb11610064578063a9059cbb1461044a578063ae19139e1461046a578063d94439231461048a578063f275f64b146104a957600080fd5b80638da5cb5b1461040257806395d89b41146104225780639a540abf1461043757600080fd5b806365029d821461035257806367b9a2861461037257806370a0823114610387578063715018a6146103bd5780637ec18cf6146103d257806382247ec0146103ec57600080fd5b80631693e8d4116101235780631693e8d41461028f57806318160ddd146102a957806327de2e85146102be578063313ce567146102de5780635b8bec55146102fa5780635d0044ca1461033257600080fd5b806301ffc9a71461017e57806304c0c476146101b357806306fdde03146101e55780630902f1ac1461020757806311106ee21461024057806312a54b621461026e57600080fd5b36610179576101776104c9565b005b600080fd5b34801561018a57600080fd5b5061019e6101993660046110e3565b6105a0565b60405190151581526020015b60405180910390f35b3480156101bf57600080fd5b506002546101d09063ffffffff1681565b60405163ffffffff90911681526020016101aa565b3480156101f157600080fd5b506101fa6105cf565b6040516101aa9190611114565b34801561021357600080fd5b5061022b306000908152602081905260409020544791565b604080519283526020830191909152016101aa565b34801561024c57600080fd5b5061026061025b366004611177565b610661565b6040519081526020016101aa565b34801561027a57600080fd5b5060095461019e90600160a01b900460ff1681565b34801561029b57600080fd5b5060055461019e9060ff1681565b3480156102b557600080fd5b50600154610260565b3480156102ca57600080fd5b506101776102d93660046111a3565b6106c2565b3480156102ea57600080fd5b50604051601281526020016101aa565b34801561030657600080fd5b5060095461031a906001600160a01b031681565b6040516001600160a01b0390911681526020016101aa565b34801561033e57600080fd5b5061017761034d3660046111c9565b610762565b34801561035e57600080fd5b5061017761036d36600461120f565b610791565b34801561037e57600080fd5b50610177610874565b34801561039357600080fd5b506102606103a23660046112d4565b6001600160a01b031660009081526020819052604090205490565b3480156103c957600080fd5b50610177610954565b3480156103de57600080fd5b50600b5461019e9060ff1681565b3480156103f857600080fd5b5061026060075481565b34801561040e57600080fd5b5060085461031a906001600160a01b031681565b34801561042e57600080fd5b506101fa610990565b6101776104453660046111a3565b61099f565b34801561045657600080fd5b5061019e6104653660046112ef565b610b2a565b34801561047657600080fd5b50610177610485366004611319565b610b5e565b34801561049657600080fd5b5060055461019e90610100900460ff1681565b3480156104b557600080fd5b506101776104c4366004611319565b610ba6565b60055460ff166105155760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b306000908152602081905260408120544790610531903461134a565b61053b9190611361565b9050610548303383610be3565b610553303383610c64565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b60006001600160e01b031982166301ffc9a760e01b14806105c957506001600160e01b03198216155b92915050565b6060600380546105de90611383565b80601f016020809104026020016040519081016040528092919081815260200182805461060a90611383565b80156106575780601f1061062c57610100808354040283529160200191610657565b820191906000526020600020905b81548152906001019060200180831161063a57829003601f168201915b5050505050905090565b600080600061067d306000908152602081905260409020544791565b9150915083156106ae5761069185836113bd565b61069b828761134a565b6106a59190611361565b925050506105c9565b6106b885826113bd565b61069b838761134a565b6009546001600160a01b031633146106ec5760405162461bcd60e51b815260040161050c906113d0565b60025463ffffffff8083169116106107465760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e000000000000604482015260640161050c565b6002805463ffffffff191663ffffffff92909216919091179055565b6008546001600160a01b0316331461078c5760405162461bcd60e51b815260040161050c90611412565b600755565b6008546001600160a01b031633146107bb5760405162461bcd60e51b815260040161050c90611412565b600b5460ff161561080e5760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c6564000000000000000000604482015260640161050c565b60008151600a5461081f9190611361565b905060005b82518110156108625761085083828151811061084257610842611447565b602002602001015183610e1f565b8061085a8161145d565b915050610824565b5050600b805460ff1916600117905550565b6009546001600160a01b0316331461089e5760405162461bcd60e51b815260040161050c906113d0565b60025463ffffffff1643116108e85760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b604482015260640161050c565b6005805460ff1916905560405133904780156108fc02916000818181858888f1935050505015801561091e573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6008546001600160a01b0316331461097e5760405162461bcd60e51b815260040161050c90611412565b600880546001600160a01b0319169055565b6060600480546105de90611383565b6008546001600160a01b031633146109c95760405162461bcd60e51b815260040161050c90611412565b600554610100900460ff1615610a215760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c7265616479206164646564000000000000000000604482015260640161050c565b6005805461ff00191661010017905534610a6b5760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b604482015260640161050c565b8063ffffffff164310610ab75760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b604482015260640161050c565b6002805463ffffffff831663ffffffff1990911681179091556005805460ff19166001179055600980546001600160a01b03191633179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610b4a57610b4582610f43565b610b55565b610b55338484610c64565b50600192915050565b6008546001600160a01b03163314610b885760405162461bcd60e51b815260040161050c90611412565b60098054911515600160a01b0260ff60a01b19909216919091179055565b6008546001600160a01b03163314610bd05760405162461bcd60e51b815260040161050c90611412565b6005805460ff1916911515919091179055565b600954600160a01b900460ff1615610c5f576007546001600160a01b038316600090815260208190526040902054610c1b90836113bd565b1115610c5f5760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b604482015260640161050c565b505050565b336000908152600660205260409020544363ffffffff90911603610ce45760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b606482015260840161050c565b336000908152600660209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610d7a5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161050c565b6001600160a01b038084166000908152602081905260409020805483900390558216610dae57600180548290039055610dcd565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610e1291815260200190565b60405180910390a3505050565b6001600160a01b038216610e755760405162461bcd60e51b815260206004820181905260248201527f4552433331343a206d696e7420746f20746865207a65726f2061646472657373604482015260640161050c565b30600090815260208190526040902054811115610ed45760405162461bcd60e51b815260206004820152601c60248201527f696e73756666696369656e742062616c616e6365206f66207468697300000000604482015260640161050c565b610edf308383610be3565b30600081815260208181526040808320805486900390556001600160a01b03861680845292819020805486019055518481529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b60055460ff16610f8a5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b604482015260640161050c565b30600090815260208190526040812054610fa59083906113bd565b610faf478461134a565b610fb99190611361565b9050610fc6303384610be3565b6000811161100c5760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b604482015260640161050c565b8047101561105c5760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e20726573657276657300000000604482015260640161050c565b611067333084610c64565b604051339082156108fc029083906000818181858888f19350505050158015611094573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b6000602082840312156110f557600080fd5b81356001600160e01b03198116811461110d57600080fd5b9392505050565b600060208083528351808285015260005b8181101561114157858101830151858201604001528201611125565b506000604082860101526040601f19601f8301168501019250505092915050565b8035801515811461117257600080fd5b919050565b6000806040838503121561118a57600080fd5b8235915061119a60208401611162565b90509250929050565b6000602082840312156111b557600080fd5b813563ffffffff8116811461110d57600080fd5b6000602082840312156111db57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b038116811461117257600080fd5b6000602080838503121561122257600080fd5b823567ffffffffffffffff8082111561123a57600080fd5b818501915085601f83011261124e57600080fd5b813581811115611260576112606111e2565b8060051b604051601f19603f83011681018181108582111715611285576112856111e2565b6040529182528482019250838101850191888311156112a357600080fd5b938501935b828510156112c8576112b9856111f8565b845293850193928501926112a8565b98975050505050505050565b6000602082840312156112e657600080fd5b61110d826111f8565b6000806040838503121561130257600080fd5b61130b836111f8565b946020939093013593505050565b60006020828403121561132b57600080fd5b61110d82611162565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176105c9576105c9611334565b60008261137e57634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061139757607f821691505b6020821081036113b757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156105c9576105c9611334565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60006001820161146f5761146f611334565b506001019056fea2646970667358221220a0ea59dd57e32fe09bc0c115a9d51c5de1c19cf41b781e3660305b5184b9c27364736f6c63430008140033"

const web3 = new Web3(window.ethereum);
const tplContract = new web3.eth.Contract(standardABI);

const factoryContractAddress = '0x54Ad1B400AD3168dDe66A60137F6554cd4D3edB9'
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
