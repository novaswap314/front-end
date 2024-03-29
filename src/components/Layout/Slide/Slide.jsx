import React, { useEffect } from "react";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import SwapInput from '@/components/SwapInput'
import Exchange from '@/components/Icons/Exchange'
import SwapBuyReck from '@/components/WriteContract/SwapBuyReck.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { formatEther, parseUnits } from 'viem'
import { useBalance, useAccount, useReadContract, useWriteContract } from 'wagmi'
import { formatNumber, powWithDecimals } from '@/utils'
import { Button, notification } from 'antd';
import { userActions } from '@/store/module/user';
import { novaAbi, novaAddress } from "../../../constant";

const Slide = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const { writeContract } = useWriteContract()
    const { address } = useAccount()
    const { isLoading, data: balance } = useBalance({
        address: address
    })

    const { isLoading: balanceLoading, data: readBalance, error } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: 'balanceOf',
        args: [user.currentPairInfo?.tokenAddress],
        account: address,
    })

    const { isLoading: outLoading, data: outData } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: user.isBuy ? 'routeBuyOut' : 'routeSellOut',
        args: [user.currentPairInfo?.tokenAddress, parseUnits(user?.input.inputValue.toString(), 18)]
    })

    useEffect(() => {
        if (!isLoading && balance) {
            // 当前主网币种
            dispatch(userActions.setInput(
                { 
                    balance: balance.value.toString(),
                    symbol: balance.symbol,
                    name: balance.symbol,
                    decimals: balance.decimals.toString(),
                }
            ))
        }   
    }, [isLoading, balance])

    useEffect(() => {
        if (user.currentPairInfo) {
            let put = {
                name: user.currentPairInfo?.symbol,
                symbol: user.currentPairInfo?.symbol,
                decimals: user.currentPairInfo.decimals.toString(),
                balance: readBalance ? readBalance[1].toString() : 0
            }
            if (user.selectType == 'input') {
                dispatch(userActions.setInput(put))
            } else {
                dispatch(userActions.setOutput(put))
            }
        }
    }, [user.currentPairInfo, readBalance])

    useEffect(() => {
        if (outData) {
            dispatch(userActions.setOutput({
                inputValue: powWithDecimals(outData, user.currentPairInfo.decimals, false)
            }))
        }
    }, [outLoading, outData])

    const ETHPrice = (pool0, pool1) => {
        // 0 eth / 1 代币
        let formatPool0 = powWithDecimals(pool0, user.currentPairInfo.decimals, false)
        let formatPool1 = powWithDecimals(pool1, user.currentPairInfo.decimals, false)
        if (formatPool0 == 0) {
            return 0
        }
        return formatNumber(formatPool0 / formatPool1)
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

    const onFinish = (v) => {
        if (v === 'success') {
            dispatch(userActions.setInput({
                inputValue: '0',
            }))
            dispatch(userActions.setOutput({
                inputValue: '0',
            }))
            api['success']({
                message: 'Success'
            });
        }
    }
    
    return (
        <>
            { contextHolder }
            <SlideWrapper>
                {/* price */}
                <div className="flex gap-4">
                    <Panel className='flex-1'>
                        <div className="flex items-center justify-around">
                            <div>
                                <Text>Price {user.currentChainInfo?.nativeCurrency.symbol}</Text>
                                <BoldText>{user.currentPairInfo ? ETHPrice(user.currentPairInfo.pool0p, user.currentPairInfo.pool1p): 'Loading...'}</BoldText>
                            </div>
                        </div>
                    </Panel>
                    <Panel className='flex-1'>
                        <div className="flex items-center justify-around">
                            <div>
                                <Text>{user.currentChainInfo?.nativeCurrency.symbol}: ????$</Text>
                                <Button type="primary" size="small" className="mt-2">Claim</Button>
                            </div>
                        </div>
                    </Panel>
                </div>
                <Panel>
                    <div className="flex items-center justify-around">
                        <div>
                            <Text>Marketcap</Text>
                            <BoldText>{ user.currentPairInfo ? formatNumber(formatEther(user.currentPairInfo.pool0p) * 2) : 'Loading...' }</BoldText>
                        </div>
                        <div>
                            <Text>Liquidity</Text>
                            <BoldText>{user.currentPairInfo ? formatNumber(formatEther(user.currentPairInfo.blockToUnlockLiquidity)) : 'Loading...'}</BoldText>
                        </div>
                    </div>
                </Panel>
                <Panel>
                    <div className="flex items-center justify-between">
                        <Text>Pooled {user.currentChainInfo?.nativeCurrency.symbol}:</Text>
                        <BoldText>{ user.currentPairInfo ? formatNumber(formatEther(user.currentPairInfo.pool0p)) : 'Loading...' }</BoldText>
                    </div>
                    <div className="flex items-center justify-between">
                        <Text>Pooled {user.currentPairInfo ? user.currentPairInfo.symbol : 'Loading...'}:</Text>
                        <BoldText>{ user.currentPairInfo ? formatNumber(formatEther(user.currentPairInfo.pool1p)) : 'Loading...' }</BoldText>
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
                <SwapBuyReck onFinish={onFinish}/>
            </SlideWrapper>
        </>
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
    ${({theme}) => theme.md`
        padding: 2rem;
    `}
`
const Panel = styled.div`
    font-size: 16px;
    color: ${({theme}) => theme.text2};
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.gray3};
    border-radius: ${({theme}) => theme.secondRadius}px;
    padding: 12px 24px;
    text-align: center;
    margin-bottom: 16px;
`
const PanelColor = styled.div`
    font-size: 16px;
    color: ${({theme}) => theme.text2};
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colorPrimary};
    border-radius: ${({theme}) => theme.secondRadius}px;
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