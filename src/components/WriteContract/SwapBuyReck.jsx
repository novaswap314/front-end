import React, { Fragment, useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useGasPrice, useEstimateGas } from 'wagmi';
import { useSelector } from 'react-redux';
import { novaAbi, novaAddress } from '../../constant';
import { Button, notification } from 'antd';
import styled from 'styled-components';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { parseUnits } from 'viem'

export default function SwapBuyReck({ onFinish }) {
    const { open } = useWeb3Modal()
    const [api, contextHolder] = notification.useNotification();
    const [errorText, setErrorText] = useState('');
    const user = useSelector(state => state.user);
    const { data: gas } = useGasPrice()
    const { data: hash, error, isPending, writeContract } = useWriteContract()
    // const { data: gasData, isLoading: gasLoading, error: gasError } = useEstimateGas({
    //     to: novaAddress,
    //     value: parseEther(user?.input.inputValue.toString()),
    // })

    const { isLoading: isConfirming, isSuccess: isConfirmed, status } = useWaitForTransactionReceipt({
         hash,
    })

    useEffect(() => {
        onFinish(status)
    }, [status])
    
    async function submit(e) {
        // if (!user.currentPairInfo?.tokenAddress) {
        //     api.error({
        //         message: 'Error',
        //         description: 'Please select token.',
        //         placement: 'topRight',
        //     });
        //     return;
        // }
        
        let amount = parseUnits(user?.input.inputValue.toString(), 18)

        if (user.isBuy) {
            writeContract({
                abi: novaAbi,
                address: novaAddress,
                functionName: 'swapBuyReck',
                args: [user.currentPairInfo?.tokenAddress],
                value: amount,
                gasPrice: gas,
            })
        } else {
            writeContract({
                abi: novaAbi,
                address: novaAddress,
                functionName: 'swapSellReck',
                args: [user.currentPairInfo?.tokenAddress, amount],
                gasPrice: gas,
            })
        }
    }

    return (
        <Fragment>
            {contextHolder}
            {
                user?.address
                ? <ButtonWrapper loading={isPending || isConfirming} onClick={() => submit()} type="primary" size="large" block>{isPending ? 'Confirming...' : 'Trade'}</ButtonWrapper>
                : <ButtonWrapper onClick={() => open()} type="primary" size="large" block>Connect Wallet</ButtonWrapper>
            }
            
            <p className='mt-4'>{error && (
                <p>Error: {error.shortMessage || error.message}</p>
              )}</p>
            <p className='mt-4'>{errorText}</p>
        </Fragment>
    )
}

const ButtonWrapper = styled(Button)`
    height: 50px;
    font-size: 18px;
    font-weight: bold;
`