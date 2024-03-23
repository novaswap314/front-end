import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/module/user';
import { useDialog } from '@/components/Dialog/hook';
import { debounce } from 'lodash';
import { formatEther } from 'viem'
import SearchToken from '../SearchToken'
import ETH from '@/assets/ETH.svg'
import Arrow from '@/assets/ArrowDown.svg'
import { formatNumber } from '@/utils'

const SwapInput = ({ showMax = false, tokenInfo, type, getInputValue }) => {
    const [number, setNumber] = useState(0);
    const { currentChainInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const dialog = useDialog();

    const getSelectToken = (v) => {
        dispatch(userActions.setCurrentPairInfo(v))
    }

    const switchToken = () => {
        dialog.openDialog(
            'Select Token', 
            <SearchToken getSelectToken={getSelectToken}/>
        )
    }

    const swapInputChange = debounce((value) => {
        const sanitizedValue = value.replace(/[^\d.]/g, ''); // 只保留数字和小数点
        setNumber(sanitizedValue)
    }, 100)
    
    // const swapInputChange = (value) => {
    //     const sanitizedValue = value.replace(/[^\d.]/g, ''); // 只保留数字和小数点
    //     setNumber(sanitizedValue)
    // }

    const hangleMax = (val) => {
        setNumber(val)
    }

    useEffect(() => {
        if (tokenInfo.inputValue) {
            setNumber(tokenInfo.inputValue)
        }
    }, [tokenInfo])

    useEffect(() => {
        getInputValue(number)
    }, [number])

    useEffect(() => {
        dispatch(userActions.setSelectType(type))
    }, [])

    return (
        <Wrapper>
            <InputWrapper>
                <Input disabled={type === 'output'} value={number} onChange={(e) => swapInputChange(e.target.value)} className='text-white flex-1' placeholder="Borderless" variant="borderless" />
                <div className='text-right'>
                    {
                        currentChainInfo.nativeCurrency.symbol === tokenInfo.symbol // 当前链主币
                        ? <Button type="primary" className="rounded-full flex items-center ml-auto">
                            <img src={ETH} className='w-6' /><span className='ml-1 font-bold'>{ tokenInfo.symbol }</span>
                        </Button>
                        : <Button type="primary" onClick={switchToken} className="rounded-full flex items-center ml-auto">
                            {
                                tokenInfo.symbol
                                ? <div className='flex items-center'><img src={ETH} className='w-6' /><span className='ml-1 font-bold'>{ tokenInfo.symbol }</span></div>
                                : <span className='font-bold text-orange'>Select Token</span>
                            }
                            <img src={Arrow} className='w-4 block' alt="" />
                        </Button>
                    }
                    
                    <div className='flex items-center justify-end gap-1 mt-2'>
                        <Balance>Sold: { formatNumber(formatEther(tokenInfo.balance)) }</Balance>
                        {
                            showMax ? <Max ghost size="small" onClick={() => hangleMax(formatEther(tokenInfo.balance))}>Max</Max> : <></>
                        }
                    </div>
                </div>
            </InputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    
`
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: between;
    .ant-input {
        font-size: 28px;
    }
`
const Balance = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.text2};
`
const Max = styled(Button)`
    // color: ${({theme}) => theme.text2};
`

export default SwapInput