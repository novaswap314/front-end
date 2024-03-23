import React, { Fragment, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useGasPrice, useEstimateGas, useBalance, useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import { novaAbi, novaAddress } from '../../constant';
import { Button, notification } from 'antd';
import styled from 'styled-components';
import { parseUnits, formatEther } from 'viem'

export default function SwapBuyReck() {
    const [api, contextHolder] = notification.useNotification();
    const [errorText, setErrorText] = useState('');
    const user = useSelector(state => state.user);
    const { data: gas } = useGasPrice()
    const { isLoading: balanceLoading, data: balance } = useBalance({
        address: user.address
    })
    console.log('::balance', balance)

    const { data: hash, error, isPending, writeContract } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
         hash,
    })

    console.log('isConfirming>>', isConfirming)
    
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
            if (balance.value == 0) {
                setErrorText('Insufficient balance.')
                return;
            } else {
                setErrorText('')
            }
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