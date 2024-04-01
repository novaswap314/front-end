export const novaAddress = '0x3E58130455F143C05A0EF6426184b54DF31aA60C'

export const novaAbi = [{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"ERC314ExternalError","type":"error"},{"inputs":[],"name":"InvalidInitialization","type":"error"},{"inputs":[],"name":"NotInitializing","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"IVRFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"token0In","type":"address"},{"indexed":true,"internalType":"address","name":"token1Out","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"IVRSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"version","type":"uint64"}],"name":"Initialized","type":"event"},{"inputs":[],"name":"buyTax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dever","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"suppTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenTvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gaslimit","type":"uint256"}],"name":"reinitialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimTradingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyTax","type":"uint256"},{"internalType":"uint256","name":"_sellTax","type":"uint256"}],"name":"adjustTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"ext","type":"uint256"},{"internalType":"uint256","name":"ins","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"tokenListSimple","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"tokenListRich","outputs":[{"components":[{"internalType":"address","name":"ca","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"blockToUnlockLiquidity","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"liquidityProvider","type":"address"},{"internalType":"bool","name":"tradingEnable","type":"bool"},{"internalType":"bool","name":"liquidityAdded","type":"bool"},{"internalType":"uint256","name":"pool0p","type":"uint256"},{"internalType":"uint256","name":"pool1p","type":"uint256"}],"internalType":"struct Token314Info[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"},{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"checkSupportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token314","type":"address"}],"name":"getTokenInfo","outputs":[{"components":[{"internalType":"address","name":"ca","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"blockToUnlockLiquidity","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"liquidityProvider","type":"address"},{"internalType":"bool","name":"tradingEnable","type":"bool"},{"internalType":"bool","name":"liquidityAdded","type":"bool"},{"internalType":"uint256","name":"pool0p","type":"uint256"},{"internalType":"uint256","name":"pool1p","type":"uint256"}],"internalType":"struct Token314Info","name":"data","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token314","type":"address"}],"name":"getIEERC314MetaInfo","outputs":[{"components":[{"internalType":"address","name":"ca","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"blockToUnlockLiquidity","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"liquidityProvider","type":"address"},{"internalType":"bool","name":"tradingEnable","type":"bool"},{"internalType":"bool","name":"liquidityAdded","type":"bool"},{"internalType":"uint256","name":"pool0p","type":"uint256"},{"internalType":"uint256","name":"pool1p","type":"uint256"}],"internalType":"struct Token314Info","name":"data","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token314","type":"address"}],"name":"getIERC2510Info","outputs":[{"components":[{"internalType":"address","name":"ca","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"blockToUnlockLiquidity","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"liquidityProvider","type":"address"},{"internalType":"bool","name":"tradingEnable","type":"bool"},{"internalType":"bool","name":"liquidityAdded","type":"bool"},{"internalType":"uint256","name":"pool0p","type":"uint256"},{"internalType":"uint256","name":"pool1p","type":"uint256"}],"internalType":"struct Token314Info","name":"data","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t0Addr","type":"address"},{"internalType":"uint256","name":"_t0Amount","type":"uint256"}],"name":"routeBuyOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t0Addr","type":"address"},{"internalType":"uint256","name":"_t0Amount","type":"uint256"}],"name":"routeSellOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claimMyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_minAmount","type":"uint256"}],"name":"swapBuyLimit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"swapBuyReck","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"},{"internalType":"uint256","name":"_minAmount","type":"uint256"}],"name":"swapSellLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"swapSellReck","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const factoryContractAddress = '0xab5B63638F88966e015A37B9545003b7ca013912'
const factoryContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployer","type":"address"},{"indexed":true,"internalType":"address","name":"contractAddr","type":"address"}],"name":"NewDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"}],"name":"securityCodes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tpls","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTpls","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes","name":"bytecode","type":"bytes"},{"internalType":"bytes","name":"constructorArgs","type":"bytes"}],"name":"deployContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"codeHash","type":"bytes32"},{"internalType":"bool","name":"enable","type":"bool"}],"name":"configCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"value","type":"bytes32"}],"name":"bytes32ToHexString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]

export const novaChainConfig = [
    {
        chainId: 97,
        chainName: "BSC Test Net",
        routerAddr: novaAddress,
        routerABI: novaAbi,
        factoryAddr: factoryContractAddress,
        factoryABI: factoryContractAbi,
        factoryDeployBlock: 39087079,
        factoryTokens: [
            {
                key: "stdTpl",
                name: "Standard Token Template",
                abi: [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}],
                bytecodes: "0x6080604052600c805460ff191690553480156200001b57600080fd5b5060405162001af138038062001af18339810160408190526200003e91620002f2565b84848460036200004f848262000427565b5060046200005e838262000427565b5060015550506005805460ff1916905560075460ff1615620000c55760405162461bcd60e51b8152602060048201526026602482015260008051602062001ad1833981519152604482015265185b1a5e995960d21b60648201526084015b60405180910390fd5b600980546001600160a01b0319166001600160a01b03881617905560088190556005805460ff1916905580156200010a57600a805460ff60a01b1916600160a01b1790555b600d82905560026200011e600a8562000509565b6200012a90856200052c565b62000136919062000509565b600b8190556009546200016e916001600160a01b03909116906200015c600a8762000509565b62000168919062000548565b620001a7565b6200018230600b54620001a760201b60201c565b50506005805461ff001916905550506007805460ff19166001179055506200055e9050565b60075460ff1615620001fa5760405162461bcd60e51b8152602060048201526026602482015260008051602062001ad1833981519152604482015265185b1a5e995960d21b6064820152608401620000bc565b6001600160a01b038216600090815260208190526040812080548392906200022490849062000548565b90915550505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025557600080fd5b81516001600160401b03808211156200027257620002726200022d565b604051601f8301601f19908116603f011681019082821181831017156200029d576200029d6200022d565b81604052838152602092508683858801011115620002ba57600080fd5b600091505b83821015620002de5785820183015181830184015290820190620002bf565b600093810190920192909252949350505050565b60008060008060008060c087890312156200030c57600080fd5b86516001600160a01b03811681146200032457600080fd5b60208801519096506001600160401b03808211156200034257600080fd5b620003508a838b0162000243565b965060408901519150808211156200036757600080fd5b506200037689828a0162000243565b945050606087015192506080870151915060a087015190509295509295509295565b600181811c90821680620003ad57607f821691505b602082108103620003ce57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200042257600081815260208120601f850160051c81016020861015620003fd5750805b601f850160051c820191505b818110156200041e5782815560010162000409565b5050505b505050565b81516001600160401b038111156200044357620004436200022d565b6200045b8162000454845462000398565b84620003d4565b602080601f8311600181146200049357600084156200047a5750858301515b600019600386901b1c1916600185901b1785556200041e565b600085815260208120601f198616915b82811015620004c457888601518255948401946001909101908401620004a3565b5085821015620004e35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b6000826200052757634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115620005425762000542620004f3565b92915050565b80820180821115620005425762000542620004f3565b611563806200056e6000396000f3fe6080604052600436106101a05760003560e01c806365029d82116100ec5780638da5cb5b1161008a578063a9059cbb11610064578063a9059cbb146104a0578063ae19139e146104c0578063d9443923146104e0578063f275f64b146104ff57600080fd5b80638da5cb5b1461045857806395d89b41146104785780639a540abf1461048d57600080fd5b8063715018a6116100c6578063715018a6146103f35780637ec18cf61461040857806382247ec01461042257806383f12fec1461043857600080fd5b806365029d821461038857806367b9a286146103a857806370a08231146103bd57600080fd5b80631693e8d411610159578063313ce56711610133578063313ce567146102f85780633b97e8561461031a5780635b8bec55146103305780635d0044ca1461036857600080fd5b80631693e8d4146102a957806318160ddd146102c357806327de2e85146102d857600080fd5b806301ffc9a7146101b457806304c0c476146101e957806306fdde031461020d5780630902f1ac1461022f57806311106ee21461026857806312a54b621461028857600080fd5b366101af576101ad61051f565b005b600080fd5b3480156101c057600080fd5b506101d46101cf366004611128565b6105f6565b60405190151581526020015b60405180910390f35b3480156101f557600080fd5b506101ff60025481565b6040519081526020016101e0565b34801561021957600080fd5b50610222610640565b6040516101e09190611159565b34801561023b57600080fd5b50610253306000908152602081905260409020544791565b604080519283526020830191909152016101e0565b34801561027457600080fd5b506101ff6102833660046111bc565b6106d2565b34801561029457600080fd5b50600a546101d490600160a01b900460ff1681565b3480156102b557600080fd5b506005546101d49060ff1681565b3480156102cf57600080fd5b506001546101ff565b3480156102e457600080fd5b506101ad6102f33660046111e8565b610733565b34801561030457600080fd5b50600d5460405160ff90911681526020016101e0565b34801561032657600080fd5b506101ff600d5481565b34801561033c57600080fd5b50600a54610350906001600160a01b031681565b6040516001600160a01b0390911681526020016101e0565b34801561037457600080fd5b506101ad61038336600461120e565b6107bf565b34801561039457600080fd5b506101ad6103a33660046112f6565b6107ee565b3480156103b457600080fd5b506101ad610899565b3480156103c957600080fd5b506101ff6103d8366004611333565b6001600160a01b031660009081526020819052604090205490565b3480156103ff57600080fd5b506101ad610973565b34801561041457600080fd5b50600c546101d49060ff1681565b34801561042e57600080fd5b506101ff60085481565b34801561044457600080fd5b506101ad61045336600461134e565b6109af565b34801561046457600080fd5b50600954610350906001600160a01b031681565b34801561048457600080fd5b50610222610b06565b6101ad61049b3660046111e8565b610b15565b3480156104ac57600080fd5b506101d46104bb366004611393565b610c93565b3480156104cc57600080fd5b506101ad6104db3660046113bd565b610cc7565b3480156104ec57600080fd5b506005546101d490610100900460ff1681565b34801561050b57600080fd5b506101ad61051a3660046113bd565b610d0f565b60055460ff1661056b5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b60448201526064015b60405180910390fd5b30600090815260208190526040812054479061058790346113ee565b6105919190611405565b905061059e303383610d4c565b6105a9303383610dcd565b604080513481526000602082018190528183015260608101839052905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a250565b60006001600160e01b031982166301ffc9a760e01b148061061f57506001600160e01b03198216155b8061063a57506001600160e01b03198216634db65b4560e11b145b92915050565b60606003805461064f90611427565b80601f016020809104026020016040519081016040528092919081815260200182805461067b90611427565b80156106c85780601f1061069d576101008083540402835291602001916106c8565b820191906000526020600020905b8154815290600101906020018083116106ab57829003601f168201915b5050505050905090565b60008060006106ee306000908152602081905260409020544791565b91509150831561071f576107028583611461565b61070c82876113ee565b6107169190611405565b9250505061063a565b6107298582611461565b61070c83876113ee565b600a546001600160a01b0316331461075d5760405162461bcd60e51b815260040161056290611474565b8063ffffffff16600254106107b45760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073686f7274656e206475726174696f6e0000000000006044820152606401610562565b63ffffffff16600255565b6009546001600160a01b031633146107e95760405162461bcd60e51b8152600401610562906114b6565b600855565b6009546001600160a01b031633146108185760405162461bcd60e51b8152600401610562906114b6565b600c5460ff161561086b5760405162461bcd60e51b815260206004820152601760248201527f50726573616c6520616c726561647920656e61626c65640000000000000000006044820152606401610562565b60008151600b5461087c9190611405565b905061088882826109af565b5050600c805460ff19166001179055565b600a546001600160a01b031633146108c35760405162461bcd60e51b815260040161056290611474565b60025443116109075760405162461bcd60e51b815260206004820152601060248201526f131a5c5d5a591a5d1e481b1bd8dad95960821b6044820152606401610562565b6005805460ff1916905560405133904780156108fc02916000818181858888f1935050505015801561093d573d6000803e3d6000fd5b506040514781527f9a5a8a32afd899e7f95003c6e21c9fab2d50e11992439d14472229180c60c7aa9060200160405180910390a1565b6009546001600160a01b0316331461099d5760405162461bcd60e51b8152600401610562906114b6565b600980546001600160a01b0319169055565b600082511180156109c05750600081115b610a035760405162461bcd60e51b8152602060048201526014602482015273696e76616c696420626174636820706172616d7360601b6044820152606401610562565b6000818351610a1291906113ee565b33600090815260208190526040902054909150811115610a6b5760405162461bcd60e51b8152602060048201526014602482015273696e73756666696369656e742062616c616e636560601b6044820152606401610562565b60005b8351811015610adc5782600080868481518110610a8d57610a8d6114eb565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000828254610ac49190611461565b90915550819050610ad481611501565b915050610a6e565b503360009081526020819052604081208054839290610afc90849061151a565b9091555050505050565b60606004805461064f90611427565b6009546001600160a01b03163314610b3f5760405162461bcd60e51b8152600401610562906114b6565b600554610100900460ff1615610b975760405162461bcd60e51b815260206004820152601760248201527f4c697175696469747920616c72656164792061646465640000000000000000006044820152606401610562565b6005805461ff00191661010017905534610be15760405162461bcd60e51b815260206004820152600b60248201526a139bc8115512081cd95b9d60aa1b6044820152606401610562565b8063ffffffff164310610c2d5760405162461bcd60e51b8152602060048201526014602482015273426c6f636b206e756d62657220746f6f206c6f7760601b6044820152606401610562565b63ffffffff811660028190556005805460ff19166001179055600a80546001600160a01b03191633179055604080519182523460208301527f0c6c8102f3ac634c5fb327ba1a5d5c18030294d9f5cc309afa9e8a9020a77175910160405180910390a150565b6000306001600160a01b03841603610cb357610cae82610f88565b610cbe565b610cbe338484610dcd565b50600192915050565b6009546001600160a01b03163314610cf15760405162461bcd60e51b8152600401610562906114b6565b600a8054911515600160a01b0260ff60a01b19909216919091179055565b6009546001600160a01b03163314610d395760405162461bcd60e51b8152600401610562906114b6565b6005805460ff1916911515919091179055565b600a54600160a01b900460ff1615610dc8576008546001600160a01b038316600090815260208190526040902054610d849083611461565b1115610dc85760405162461bcd60e51b815260206004820152601360248201527213585e081dd85b1b195d08195e18d959591959606a1b6044820152606401610562565b505050565b336000908152600660205260409020544363ffffffff90911603610e4d5760405162461bcd60e51b815260206004820152603160248201527f596f752063616e2774206d616b652074776f207472616e73616374696f6e7320604482015270696e207468652073616d6520626c6f636b60781b6064820152608401610562565b336000908152600660209081526040808320805463ffffffff19164363ffffffff161790556001600160a01b038616835290829052902054811115610ee35760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610562565b6001600160a01b038084166000908152602081905260409020805483900390558216610f1757600180548290039055610f36565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f7b91815260200190565b60405180910390a3505050565b60055460ff16610fcf5760405162461bcd60e51b815260206004820152601260248201527154726164696e67206e6f7420656e61626c6560701b6044820152606401610562565b30600090815260208190526040812054610fea908390611461565b610ff447846113ee565b610ffe9190611405565b905061100b303384610d4c565b600081116110515760405162461bcd60e51b815260206004820152601360248201527253656c6c20616d6f756e7420746f6f206c6f7760681b6044820152606401610562565b804710156110a15760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e742045544820696e207265736572766573000000006044820152606401610562565b6110ac333084610dcd565b604051339082156108fc029083906000818181858888f193505050501580156110d9573d6000803e3d6000fd5b50604080516000808252602082018590528183018490526060820152905133917f49926bbebe8474393f434dfa4f78694c0923efa07d19f2284518bfabd06eb737919081900360800190a25050565b60006020828403121561113a57600080fd5b81356001600160e01b03198116811461115257600080fd5b9392505050565b600060208083528351808285015260005b818110156111865785810183015185820160400152820161116a565b506000604082860101526040601f19601f8301168501019250505092915050565b803580151581146111b757600080fd5b919050565b600080604083850312156111cf57600080fd5b823591506111df602084016111a7565b90509250929050565b6000602082840312156111fa57600080fd5b813563ffffffff8116811461115257600080fd5b60006020828403121561122057600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b03811681146111b757600080fd5b600082601f83011261126557600080fd5b8135602067ffffffffffffffff8083111561128257611282611227565b8260051b604051601f19603f830116810181811084821117156112a7576112a7611227565b6040529384528581018301938381019250878511156112c557600080fd5b83870191505b848210156112eb576112dc8261123d565b835291830191908301906112cb565b979650505050505050565b60006020828403121561130857600080fd5b813567ffffffffffffffff81111561131f57600080fd5b61132b84828501611254565b949350505050565b60006020828403121561134557600080fd5b6111528261123d565b6000806040838503121561136157600080fd5b823567ffffffffffffffff81111561137857600080fd5b61138485828601611254565b95602094909401359450505050565b600080604083850312156113a657600080fd5b6113af8361123d565b946020939093013593505050565b6000602082840312156113cf57600080fd5b611152826111a7565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761063a5761063a6113d8565b60008261142257634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061143b57607f821691505b60208210810361145b57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561063a5761063a6113d8565b60208082526022908201527f596f7520617265206e6f7420746865206c69717569646974792070726f76696460408201526132b960f11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b600060018201611513576115136113d8565b5060010190565b8181038181111561063a5761063a6113d856fea2646970667358221220059dd39be64efd3d7a32f5435191d4325f2c7bf830b8c2536b0e46457ad5502c64736f6c6343000814003363616e206e6f742061737369676e20616761696e20616674657220696e697469",
            }
        ]
    }
]

export const selectChainConfig = (chainId) => {
    return novaChainConfig.find(chain => chain.chainId === chainId);
}