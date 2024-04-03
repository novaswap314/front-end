import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { novaAbi, novaAddress } from '../../../constant';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useReadContract, useGasPrice, useAccount, useChainId } from 'wagmi';
import { Button, Form, Input, notification } from 'antd';
import { useSelector } from 'react-redux';
import { powWithDecimals } from '@/utils';
import Loading from '@/components/Loading';
import Copy from '@/components/Icons/Copy.jsx'

import { selectChainConfig } from '../../../constant';

export default function Token({ item }) {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [submitLoading, setSubmitLoading] = useState(false)
    const { data: gasPrice } = useGasPrice()
    const { address } = useAccount()
    const { open } = useWeb3Modal()
    const user = useSelector(state => state.user)
    const chainId = useChainId()
    const [factoryObj, setFactoryObj] = useState();

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
        const tplContract = new web3.eth.Contract(factoryObj?.factoryTokens[0].abi, tokenAddr);

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

    useEffect(() => {
        const currentChain = selectChainConfig(chainId)
        setFactoryObj(currentChain);
    }, [user?.address, chainId]);

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
                                <div>{powWithDecimals(data.totalSupply.toString(), data.decimals.toString())}</div>
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