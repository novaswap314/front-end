import React, { Fragment } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useGasPrice, useEstimateGas } from 'wagmi';
import { useSelector } from 'react-redux';
import { novaAbi, novaAddress } from '../../constant';
import { Button, notification } from 'antd';
import styled from 'styled-components';
import { parseUnits } from 'viem'

export default function SwapBuyReck() {
    const [api, contextHolder] = notification.useNotification();
    const user = useSelector(state => state.user);
    const { data: gas } = useGasPrice()

    const { data: hash, error, isPending, writeContract } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
         hash,
    })
    
    console.log('error::::', error)

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
        writeContract({
            abi: novaAbi,
            address: novaAddress,
            functionName: user.isBuy ? 'swapBuyReck' : 'swapSellReck',
            args: user.isBuy ? [user.currentPairInfo?.tokenAddress] : [user.currentPairInfo?.tokenAddress, amount],
            value: user.isBuy ? amount : 0,
            gasPrice: gas,
        })
    }

    return (
        <Fragment>
            <ButtonWrapper loading={isPending} onClick={() => submit()} type="primary" size="large" block>{isPending ? 'Confirming...' : 'Trade'}</ButtonWrapper>
            <p className='mt-4'>{error && (
                <div>Error: {error.shortMessage || error.message}</div>
              )}</p>
        </Fragment>
    )
}

const ButtonWrapper = styled(Button)`
    height: 50px;
    font-size: 18px;
    font-weight: bold;
`