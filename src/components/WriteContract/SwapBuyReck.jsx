import React, { Fragment, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useGasPrice, useEstimateGas, useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import { novaAbi, novaAddress } from '../../constant';
import { Button, notification, List } from 'antd';
import styled from 'styled-components';
import { parseUnits, parseEther, parseGwei } from 'viem'

export default function SwapBuyReck() {
    const [api, contextHolder] = notification.useNotification();
    const [errorText, setErrorText] = useState('');
    
    const user = useSelector(state => state.user);
    const { data: gas } = useGasPrice()
    const { data: hash, error, isPending, writeContract } = useWriteContract()
    const { data: gasData, isLoading: gasLoading, error: gasError } = useEstimateGas({
        to: novaAddress,
        value: parseEther(user?.input.inputValue.toString()),
    })

    console.log('gasData::::::', error)

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
         hash,
    })
    
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
                // gas: BigInt(Number(gasData) * 10),
            })
        } else {
            writeContract({
                abi: novaAbi,
                address: novaAddress,
                functionName: 'swapSellReck',
                args: [user.currentPairInfo?.tokenAddress, amount],
                gas: gasData,
            })
        }
    }

    return (
        <Fragment>
            <ButtonWrapper loading={isPending || isConfirming} onClick={() => submit()} type="primary" size="large" block>{isPending ? 'Confirming...' : 'Trade'}</ButtonWrapper>
            <p className='mt-4'>{error && (
                <div>Error: {error.shortMessage || error.message}</div>
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