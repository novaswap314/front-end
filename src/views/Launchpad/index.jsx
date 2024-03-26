import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Button, Form, Input, Row, Col, Slider } from "antd";
import Web3 from 'web3';
import { useAccount } from 'wagmi'

const standardABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployer","type":"address"},{"indexed":true,"internalType":"address","name":"contractAddr","type":"address"},{"indexed":false,"internalType":"uint256","name":"_totalSupply_","type":"uint256"}],"name":"NewDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const standardBytecode = "0x60806040526009805460ff191690553480156200001b57600080fd5b5060405162001747380380620017478339810160408190526200003e91620001ec565b838383836004620000508582620002f5565b5060056200005f8482620002f5565b5060018290556002819055600680546001600160a01b031916331790556007805462ff00ff60a01b1916600160b01b1790556200009e600a83620003c1565b336000908152602081905260409020819055600290620000bf9084620003e4565b620000cb9190620003c1565b6008819055336000908152602081905260408120549091620000ee9085620003e4565b620000fa9190620003e4565b3060009081526020819052604090205550506007805460ff60a81b19169055506200040c95505050505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014f57600080fd5b81516001600160401b03808211156200016c576200016c62000127565b604051601f8301601f19908116603f0116810190828211818310171562000197576200019762000127565b81604052838152602092508683858801011115620001b457600080fd5b600091505b83821015620001d85785820183015181830184015290820190620001b9565b600093810190920192909252949350505050565b600080600080608085870312156200020357600080fd5b84516001600160401b03808211156200021b57600080fd5b62000229888389016200013d565b955060208701519150808211156200024057600080fd5b506200024f878288016200013d565b604087015160609097015195989097509350505050565b600181811c908216806200027b57607f821691505b6020821081036200029c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f057600081815260208120601f850160051c81016020861015620002cb5750805b601f850160051c820191505b81811015620002ec57828155600101620002d7565b5050505b505050565b81516001600160401b0381111562000311576200031162000127565b620003298162000322845462000266565b84620002a2565b602080601f831160018114620003615760008415620003485750858301515b600019600386901b1c1916600185901b178555620002ec565b600085815260208120601f198616915b82811015620003925788860151825594840194600190910190840162000371565b5085821015620003b15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082620003df57634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156200040657634e487b7160e01b600052601160045260246000fd5b92915050565b61132b806200041c6000396000f3fe60806040526004361061014f5760003560e01c806367b9a286116100b657806395d89b411161006f57806395d89b41146103ee5780639a540abf14610403578063a9059cbb14610416578063ae19139e14610436578063d944392314610456578063f275f64b1461047757600080fd5b806367b9a2861461033e57806370a0823114610353578063715018a6146103895780637ec18cf61461039e57806382247ec0146103b85780638da5cb5b146103ce57600080fd5b806318160ddd1161010857806318160ddd1461027557806327de2e851461028a578063313ce567146102aa5780635b8bec55146102c65780635d0044ca146102fe57806365029d821461031e57600080fd5b806304c0c4761461016357806306fdde031461019a5780630902f1ac146101bc57806311106ee2146101f557806312a54b62146102235780631693e8d41461025457600080fd5b3661015e5761015c610497565b005b600080fd5b34801561016f57600080fd5b506003546101809063ffffffff1681565b60405163ffffffff90911681526020015b60405180910390f35b3480156101a657600080fd5b506101af6105de565b6040516101919190610f8c565b3480156101c857600080fd5b506101e0306000908152602081905260409020544791565b60408051928352602083019190915201610191565b34801561020157600080fd5b50610215610210366004610fef565b610670565b604051908152602001610191565b34801561022f57600080fd5b5060075461024490600160b01b900460ff1681565b6040519015158152602001610191565b34801561026057600080fd5b5060075461024490600160a01b900460ff1681565b34801561028157600080fd5b50600154610215565b34801561029657600080fd5b5061015c6102a536600461101b565b6106d7565b3480156102b657600080fd5b5060405160128152602001610191565b3480156102d257600080fd5b506007546102e6906001600160a01b031681565b6040516001600160a01b039091168152602001610191565b34801561030a57600080fd5b5061015c610319366004611048565b610777565b34801561032a57600080fd5b5061015c61033936600461108e565b6107a6565b34801561034a57600080fd5b5061015c6108b9565b34801561035f57600080fd5b5061021561036e366004611153565b6001600160a01b031660009081526020819052604090205490565b34801561039557600080fd5b5061015c61099c565b3480156103aa57600080fd5b506009546102449060ff1681565b3480156103c457600080fd5b5061021560025481565b3480156103da57600080fd5b506006546102e6906001600160a01b031681565b3480156103fa57600080fd5b506101af6109d8565b61015c61041136600461101b565b6109e7565b34801561042257600080fd5b5061024461043136600461116e565b610b71565b34801561044257600080fd5b5061015c610451366004611198565b610ba5565b34801561046257600080fd5b5060075461024490600160a81b900460ff1681565b34801561048357600080fd5b5061015c610492366004611198565b610bed565b600754600160a01b900460ff166104ea5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b30600090815260208190526040812054479061050690346111c9565b61051091906111e0565b600754909150600160b01b900460ff161561058657600254336000908152602081905260409020546105429083611202565b11156105865760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b60448201526064016104e1565b610591303383610c35565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b6060600480546105ed90611215565b80601f016020809104026020016040519081016040528092919081815260200182805461061990611215565b80156106665780601f1061063b57610100808354040283529160200191610666565b820191906000526020600020905b81548152906001019060200180831161064957829003601f168201915b5050505050905090565b600080600061068c306000908152602081905260409020544791565b9150915083156106bd576106a08583611202565b6106aa82876111c9565b6106b491906111e0565b925050506106d1565b6106c78582611202565b6106aa83876111c9565b92915050565b6007546001600160a01b031633146107015760405162461bcd60e51b81526004016104e19061124f565b60035463ffffffff80831691161061075b5760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e00000000000060448201526064016104e1565b6003805463ffffffff191663ffffffff92909216919091179055565b6006546001600160a01b031633146107a15760405162461bcd60e51b81526004016104e190611291565b600255565b6006546001600160a01b031633146107d05760405162461bcd60e51b81526004016104e190611291565b60095460ff16156108235760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c656400000000000000000060448201526064016104e1565b6000815160085461083491906111e0565b905060005b82518110156108a75781600080858481518110610858576108586112c6565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600082825461088f9190611202565b9091555081905061089f816112dc565b915050610839565b50506009805460ff1916600117905550565b6007546001600160a01b031633146108e35760405162461bcd60e51b81526004016104e19061124f565b60035463ffffffff16431161092d5760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b60448201526064016104e1565b6007805460ff60a01b1916905560405133904780156108fc02916000818181858888f19350505050158015610966573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6006546001600160a01b031633146109c65760405162461bcd60e51b81526004016104e190611291565b600680546001600160a01b0319169055565b6060600580546105ed90611215565b6006546001600160a01b03163314610a115760405162461bcd60e51b81526004016104e190611291565b600754600160a81b900460ff1615610a6b5760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c726561647920616464656400000000000000000060448201526064016104e1565b6007805460ff60a81b1916600160a81b17905534610ab95760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b60448201526064016104e1565b8063ffffffff164310610b055760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b60448201526064016104e1565b6003805463ffffffff831663ffffffff199091168117909155600780546001600160a81b0319163317600160a01b179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610b9157610b8c82610df0565b610b9c565b610b9c338484610c35565b50600192915050565b6006546001600160a01b03163314610bcf5760405162461bcd60e51b81526004016104e190611291565b60078054911515600160b01b0260ff60b01b19909216919091179055565b6006546001600160a01b03163314610c175760405162461bcd60e51b81526004016104e190611291565b60078054911515600160a01b0260ff60a01b19909216919091179055565b336000908152600a60205260409020544363ffffffff90911603610cb55760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b60648201526084016104e1565b336000908152600a60209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610d4b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104e1565b6001600160a01b038084166000908152602081905260409020805483900390558216610d7f57600180548290039055610d9e565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610de391815260200190565b60405180910390a3505050565b600754600160a01b900460ff16610e3e5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064016104e1565b30600090815260208190526040812054610e59908390611202565b610e6347846111c9565b610e6d91906111e0565b905060008111610eb55760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b60448201526064016104e1565b80471015610f055760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e2072657365727665730000000060448201526064016104e1565b610f10333084610c35565b604051339082156108fc029083906000818181858888f19350505050158015610f3d573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b600060208083528351808285015260005b81811015610fb957858101830151858201604001528201610f9d565b506000604082860101526040601f19601f8301168501019250505092915050565b80358015158114610fea57600080fd5b919050565b6000806040838503121561100257600080fd5b8235915061101260208401610fda565b90509250929050565b60006020828403121561102d57600080fd5b813563ffffffff8116811461104157600080fd5b9392505050565b60006020828403121561105a57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b0381168114610fea57600080fd5b600060208083850312156110a157600080fd5b823567ffffffffffffffff808211156110b957600080fd5b818501915085601f8301126110cd57600080fd5b8135818111156110df576110df611061565b8060051b604051601f19603f8301168101818110858211171561110457611104611061565b60405291825284820192508381018501918883111561112257600080fd5b938501935b828510156111475761113885611077565b84529385019392850192611127565b98975050505050505050565b60006020828403121561116557600080fd5b61104182611077565b6000806040838503121561118157600080fd5b61118a83611077565b946020939093013593505050565b6000602082840312156111aa57600080fd5b61104182610fda565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176106d1576106d16111b3565b6000826111fd57634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156106d1576106d16111b3565b600181811c9082168061122957607f821691505b60208210810361124957634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b6000600182016112ee576112ee6111b3565b506001019056fea2646970667358221220802d1a5faa1b7e856273b6cb61898d3c98ad6d616e080284bbe5ec7c461a3d1f64736f6c63430008140033"

const web3 = new Web3(window.ethereum);
const tplContract = new web3.eth.Contract(standardABI);

const factoryContractAddress = '0x8379eDAa73DCA60c1d65A781Ac7d02F4Ff52dD8e'
const factoryContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployer","type":"address"},{"indexed":true,"internalType":"address","name":"contractAddr","type":"address"}],"name":"NewDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"}],"name":"securityCodes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tpls","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTpls","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes","name":"bytecode","type":"bytes"},{"internalType":"bytes","name":"constructorArgs","type":"bytes"}],"name":"deployContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"},{"internalType":"bool","name":"enable","type":"bool"}],"name":"configCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"value","type":"bytes32"}],"name":"bytes32ToHexString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]
const factoryContract = new web3.eth.Contract(factoryContractAbi, factoryContractAddress);

export default function Launchpad() {
    const [form] = Form.useForm();
    const { address } = useAccount()

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

        const constructorArgs = web3.eth.abi.encodeParameters(
            ['string', 'string', 'uint256', 'uint256'],
            [values.name, values.ticker, values.supply, values.max]
          );
        console.log('bytecodehash:', web3.utils.keccak256(standardBytecode))
        console.log('parameters:', constructorArgs)

        const deployContractMethod = factoryContract.methods.deployContract(standardBytecode, constructorArgs);
        const gasEstimate = await deployContractMethod.estimateGas({ from: address });
        console.log('gasEstimate', gasEstimate)
        // 发送交易
        const tx = {
            from: address,
            to: factoryContractAddress,
            data: deployContractMethod.encodeABI(),
            gas: gasEstimate
        };

        const txHash = await web3.eth.sendTransaction(tx);
        const getReceipt = async (hash) => {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt) {
              if (receipt.status === true) {
                console.log('Transaction success: ', receipt);
              } else {
                console.log('Transaction failed: ', receipt);
              }
            } else {
              setTimeout(() => getReceipt(hash), 2000);
            }
        };
        getReceipt(txHash);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const getDeployedList = async () => {
        const allEvents = await factoryContract.getPastEvents('NewDeployed', {
            filter: { deployer: address },
            fromBlock: 38904034,
            toBlock: 'latest'
        })
        console.log('all events:', allEvents)
    }

    useEffect(() => {
        getDeployedList()
    }, []);

    return (
        <LaunchpadWrapper>
            <InnerWrapper>
                <FormWrapper
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
                                <Input />
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
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Supply"
                        name="supply"
                        rules={[
                            {
                                required: true,
                                message: "Please input the supply",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Fee (0% to 5%):"
                        name="fee"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Slider max={5}/>
                    </Form.Item>

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
                        <Button className="ml-auto block" type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </FormWrapper>
                <MytokenWrapper>
                    <Title className="mb-4">My Token: todo</Title>
                </MytokenWrapper>
            </InnerWrapper>
        </LaunchpadWrapper>
    );
}

const LaunchpadWrapper = styled.div`
  padding-top: ${({ theme }) => theme.height};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg02};
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 48px 120px;
  gap: 24px;
  ${({ theme }) => theme.md`
        flex-direction: column;
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
`;
