import React, { useState } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { novaAbi, novaAddress } from '../../../constant';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useReadContract, useGasPrice, useAccount } from 'wagmi';
import { Button, Form, Input, notification } from 'antd';
import { useSelector } from 'react-redux';
import { formatNumber } from '@/utils';
import Loading from '@/components/Loading';
import Copy from '@/components/Icons/Copy.jsx'

const standardABI = [{"inputs":[{"internalType":"address","name":"_owner_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"batchTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blockToUnlockLiquidity","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bool","name":"_buy","type":"bool"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityProvider","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address[]","name":"_investors","type":"address[]"}],"name":"presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_tradingEnable","type":"bool"}],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_maxWalletEnable","type":"bool"}],"name":"enableMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet_","type":"uint256"}],"name":"setMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"addLiquidity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_blockToUnlockLiquidity","type":"uint32"}],"name":"extendLiquidityLock","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export default function Token({ item }) {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [submitLoading, setSubmitLoading] = useState(false)
    const { data: gasPrice } = useGasPrice()
    const { address } = useAccount()
    const { open } = useWeb3Modal()
    const user = useSelector(state => state.user)

    const { isLoading, data } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: 'getTokenInfo',
        args: [item?.returnValues.contractAddr]
    })

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
        setSubmitLoading(true)
        const tokenAddr = item?.returnValues.contractAddr;
        console.log("values:", values, tokenAddr);
        const web3 = new Web3(window.ethereum);
        const tplContract = new web3.eth.Contract(standardABI, tokenAddr);

        let coinAmount = web3.utils.toWei(values.amount, 'ether')

        try {
            const addLiqMethod = tplContract.methods.addLiquidity(38918947 + 10000000);
            const gasEstimate = await addLiqMethod.estimateGas({ from: address,  value: coinAmount});
            console.log('gasEstimate', gasEstimate, gasPrice)
            // 发送交易
            const tx = {
                from: address,
                to: tokenAddr,
                data: addLiqMethod.encodeABI(),
                gas: gasEstimate,
                gasPrice: gasPrice.toString(),
                value: coinAmount,
            };
            console.log('add liquidity:', tx)
    
            const txHash = await web3.eth.sendTransaction(tx);
            const getReceipt = async (hash) => {
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
            };
            getReceipt(txHash.transactionHash);
        } catch(err) {
            setSubmitLoading(false)
            openNotificationError(err?.message || 'Please try again later.')
        }
    }

    const onFinishFailed = () => {

    }

    const handleOpen = () => {
        open()
    }

    const copyCA = async (message) => {
        await navigator.clipboard.writeText(message)
        openNotificationSuccess('Copyed!')
    }

    const calculateSupply = (supply, decimals) => {
        return formatNumber(supply / Math.pow(10, decimals))
    }

    return(
        <>
            {contextHolder}
            <List>
                {
                    isLoading
                    ? <Loading />
                    : (
                        <>
                            <div className='grid md:grid-cols-5 flex-1 text-center'>
                                <div>
                                    <a target='_blank' className='text-white' href={ user?.currentChainInfo?.blockExplorers?.default?.url + '/address/' + item?.returnValues.contractAddr }>{item?.returnValues.contractAddr.replace(/^(\w{7}).*(\w{5})$/, '$1...$2')}</a>
                                    <CopyWrapper onClick={() => copyCA(item?.returnValues.contractAddr)} />
                                </div>
                                <div>{data.name}</div>
                                <div>{data.symbol}</div>
                                <div>{calculateSupply(data.totalSupply.toString(), data.decimals.toString())}</div>
                                <div className="flex gap-x-2 text-right">
                                    {!data.tradingEnable && <Button type="primary" size="small">No Trade</Button>}
                                    {!data.liquidityAdded && 
                                        <FormWrapper
                                            form={form}
                                            name="validate"
                                            layout="vertical"
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                name="height"
                                                style={ItemStyle}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Block height",
                                                    },
                                                ]}
                                            >
                                                <Input style={InputStyle} placeholder='Block height' />
                                            </Form.Item>
                                            <Form.Item
                                                name="amount"
                                                style={ItemStyle}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Amount",
                                                    },
                                                ]}
                                            >
                                                <Input style={InputStyle} placeholder='Amount'/>
                                            </Form.Item>
                    
                                            <Form.Item>
                                                {
                                                    user?.address
                                                    ? <Button loading={submitLoading} className="ml-auto block" type="primary" size="small" htmlType="submit">Add Liquidity</Button>
                                                    : <Button onClick={() => handleOpen()} className="ml-auto block" type="primary" size="small">Connect Wallet</Button>
                                                }
                                                
                                            </Form.Item>
                                        </FormWrapper>
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </List>
        </>
    )
}

const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px dashed ${({theme}) => theme.gray3};
    padding: 12px 0;
`
const FormWrapper = styled(Form)`

`;

const CopyWrapper = styled(Copy)`
    color: ${({theme}) => theme.colorPrimary};
    margin: 0 10px -2px;
    cursor: pointer;
`

const InputStyle = {
    lineHeight: '1.2',
}
const ItemStyle = {
    marginBottom: '0px',
    marginTop: '-3px',
}