import styled, { css } from 'styled-components';
import { useHistory, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { useSwitchChain } from 'wagmi'
import { useSelector } from 'react-redux';
import ConnectWallet from '../ConnectWallet/index.jsx';
import LogoW from '@/assets/logo.svg';
import GasStation from '@/components/Icons/GasStation.jsx'

export const Header = () => {
    const history = useHistory();
    const user = useSelector(state => state.user)
    const [currentPath, setCurrentPath] = useState(history.location.pathname);
    const { chains, switchChain } = useSwitchChain()

    useEffect(() => {
        const unlisten = history.listen((location) => {
          setCurrentPath(location.pathname);
        });
    
        return () => {
          unlisten(); // 清除监听器，防止内存泄漏
        };
    }, [history]);

    // useEffect(() => {
    //     fetch('https://mempool.space/api/v1/fees/recommended')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             // 解析响应的 JSON 数据
    //             return response.json();
    //         })
    //         .then(data => {
    //             setGasPrice(data.halfHourFee)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // } ,[])

    return(
        <HeaderWrapper>
            <img src={LogoW} className='w-12' />
            <ButtonWrapper>
                <GasWrapper>
                    <Dropdown
                        menu={{ items: chains.map((v) => {
                            v.label = <div onClick={() => switchChain({ chainId: v.id })}>{v.name}</div>
                            return v
                        }) }}
                        placement="bottomRight"
                    >
                        <Button ghost>{ user?.currentChainInfo.name }</Button>
                    </Dropdown>
                </GasWrapper>
                <ConnectWallet />
            </ButtonWrapper>
        </HeaderWrapper>
    )
}

const IconsWrapper = styled(GasStation)`
    // font-size: 1.2rem;
`

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    height: ${({ theme }) => theme.height};
    width: 100%;
    background: rgba(255, 255, 255, .1);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    z-index: 10;
    border-bottom: 1px solid hsla(0,0%,100%,.2);
    gap: 2rem;
`
const UlWrapper = styled.div`
    display: flex;
    align-items: center;
`
const LiWrapper = styled.div`
    font-size: 1.2rem;
    color: ${({theme}) => theme.text1};
    padding: 0 10px;
    cursor: pointer;
    transition: all .3s;
    font-weight: 600;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 4px;
        border-radius: 6px 6px 0 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: all .3s;
        opacity: 0;
    }
    &:hover {
        &::after {
            opacity: 1;
            width: 100%;
            background-color: ${({theme}) => theme.text1};
        }
    }
    ${props =>
        props.current &&
        css`
            color: ${({ theme }) => theme.main};
            background-color: rgba(234,194,73,.06);
            &::after {
                opacity: 1;
                width: 100%;
                background-color: ${({theme}) => theme.main};
            }
            &:hover {
                &::after {
                    opacity: 1;
                    width: 100%;
                    background-color: ${({theme}) => theme.main};
                }
            }
        `}
    &:first-child {
        margin-left: auto;
    }
    &:last-child {
        margin-right: auto;
    }
`
const LiInner = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    line-height: ${({theme}) => theme.height};
    height: ${({theme}) => theme.height};
    span {
        ${props => props.theme.sm`
            display: none;
        `}
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-left: auto;
`
const GasWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`

export default Header