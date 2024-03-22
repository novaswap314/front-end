import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import SwapInput from '@/components/SwapInput'
import Exchange from '@/components/Icons/Exchange'

import { Button } from 'antd';
import SwapBuyReck from '@/components/WriteContract/SwapBuyReck.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { formatEther } from 'viem'
import { useBalance, useAccount, useReadContract, useWriteContract, useSimulateContract } from 'wagmi'
import { erc20Abi, parseUnits } from 'viem'
import { userActions } from '@/store/module/user';
import { novaAbi, novaAddress } from "../../../constant";

const Slide = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { writeContract } = useWriteContract()
    const { address } = useAccount()
    const { isLoading, data: balance } = useBalance({
        address: address
    })

    const { isLoading: balanceLoading, data: arc20balance, error } = useReadContract({
    // const result = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: 'balanceOf',
        args: [user.currentPairInfo?.tokenAddress],
        overrides: {
            from: address
        }
    })

    console.log('arc20balance>>>', balanceLoading, arc20balance, error)

    const { isLoading: outLoading, data: outData } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: user.isBuy ? 'routeBuyOut' : 'routeSellOut',
        args: [user.currentPairInfo?.tokenAddress, parseUnits(user?.input.inputValue.toString(), 18)]
    })
    console.log('routeBuyOut outData:', outData)

    useEffect(() => {
        if (!isLoading && balance) {
            // 默认 input 输入，是当前链的主币种
            dispatch(userActions.setInput(
                { 
                    balance: balance.value.toString() ,
                    symbol: balance.symbol,
                    name: balance.symbol,
                }
            ))
        }   
    }, [isLoading, balance])

    useEffect(() => {
        if (user.currentPairInfo) {
            let put = {
                name: user.currentPairInfo?.symbol,
                symbol: user.currentPairInfo?.symbol,
                balance: arc20balance ? arc20balance?.toString() : 0
            }
            if (user.selectType == 'input') {
                dispatch(userActions.setInput(put))
            } else {
                dispatch(userActions.setOutput(put))
            }
        }
    }, [user.currentPairInfo, arc20balance])

    useEffect(() => {
        if (outData) {
            dispatch(userActions.setOutput({
                inputValue: formatEther(outData)
            }))
        }
    }, [outLoading, outData])

    const ETHPrice = (pool0, pool1) => {
        // 0 eth / 1 代币
        let formatPool0 = formatEther(pool0)
        let formatPool1 = formatEther(pool1)
        if (formatPool0 == 0) {
            return 0
        }
        return formatPool0 / formatPool1
    }

    const getInputValue = (value) => {
        dispatch(userActions.setInput({
            inputValue: value
        }))
    }

    const getOutputValue = (value) => {
        dispatch(userActions.setOutput({
            inputValue: value
        }))
    }

    // input output 切换
    const handleSwitch = () => {
        let originInput = user.input
        let originOutput = user.output
        dispatch(userActions.setSelectType(user.selectType == 'input' ? 'output' : 'input'))
        dispatch(userActions.setInput(originOutput))
        dispatch(userActions.setOutput(originInput))
        dispatch(userActions.setIsBuy(!user.isBuy))
    }
    
    return (
        <SlideWrapper>
            {/* price */}
            <Panel>
                <div className="flex items-center justify-around">
                    <div>
                        <Text>Price ETH</Text>
                        <BoldText>{user.currentPairInfo ? ETHPrice(user.currentPairInfo.pool0p, user.currentPairInfo.pool1p): '??'}</BoldText>
                    </div>
                </div>
            </Panel>
            <Panel>
                <div className="flex items-center justify-around">
                    <div>
                        <Text>Marketcap</Text>
                        <BoldText>{ user.currentPairInfo ? formatEther(user.currentPairInfo.pool0p) * 2 : '??' }</BoldText>
                    </div>
                    <div>
                        <Text>Liquidity</Text>
                        <BoldText>{user.currentPairInfo ? formatEther(user.currentPairInfo.blockToUnlockLiquidity) : '??'}</BoldText>
                    </div>
                </div>
            </Panel>
            <Panel>
                <div className="flex items-center justify-between">
                    <Text>Pooled {user.currentChainInfo?.nativeCurrency.symbol}:</Text>
                    <BoldText>{ user.currentPairInfo ? formatEther(user.currentPairInfo.pool0p) : '??' }</BoldText>
                </div>
                <div className="flex items-center justify-between">
                    <Text>Pooled {user.currentPairInfo ? user.currentPairInfo.symbol : '??'}:</Text>
                    <BoldText>{ user.currentPairInfo ? formatEther(user.currentPairInfo.pool1p) : '??' }</BoldText>
                </div>
            </Panel>
            <PanelColor className="mt-10">
                <SwapInput getInputValue={(v) => getInputValue(v)} showMax={true} tokenInfo={user.input} type='input' />
            </PanelColor>
            <ExchangeSwapper>
                <Exchange onClick={() => handleSwitch()} className="text-2xl"/>
            </ExchangeSwapper>
            <PanelColor>
                <SwapInput getInputValue={(v) => getOutputValue(v)} tokenInfo={user.output} type='output' />
            </PanelColor>
            <SwapBuyReck />
            <HamburgerPosition></HamburgerPosition>
        </SlideWrapper>
    )
}

const HamburgerPosition = styled(Hamburger)`
    position: absolute;
    top: 20px;
    left: -12px;
`

const SlideWrapper = styled.div`
    padding: 2rem 4rem 2rem 2rem;
    transition: all .3s;
    position: relative;
`
const Panel = styled.div`
    font-size: 16px;
    color: ${({theme}) => theme.text2};
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.gray3};
    border-radius: 16px;
    padding: 12px 24px;
    text-align: center;
    margin-bottom: 16px;
`
const PanelColor = styled.div`
    font-size: 16px;
    color: ${({theme}) => theme.text2};
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colorPrimary};
    border-radius: 16px;
    padding: 12px 24px;
    text-align: center;
    margin-bottom: 16px;
`
const Text = styled.div`
    font-size: 16px;
    line-height: 1.4;
`
const BoldText = styled.div`
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
`
const ExchangeSwapper = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 99px;
    border: 1px solid ${({theme}) => theme.gray3};
    margin: -5px auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background:${({theme}) => theme.gray3};
`

export default Slide