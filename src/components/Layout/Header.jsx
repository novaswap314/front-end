import styled, { css } from 'styled-components';
import { useHistory, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { useSwitchChain, useAccount, useChains } from 'wagmi'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '@/store/module/user';
import { globalActions } from '@/store/module/global';

import ConnectWallet from '../ConnectWallet/index.jsx';
import LogoW from '@/assets/logo.svg';
import TwitterXFill from '@/components/Icons/TwitterXFill.jsx'
import ArrowRight from '@/components/Icons/ArrowRight.jsx'

const nav = [
    { path: '/homepage', label: 'Home' },
    { path: '/swap', label: 'Swap' },
    { path: '/toolkit', label: 'ToolKit' },
]

export const Header = () => {
    const history = useHistory();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { chains, switchChain } = useSwitchChain()
    const { address, status, isConnecting, chain } = useAccount()
    const [currentPath, setCurrentPath] = useState(history.location.pathname);

    useEffect(() => {
        const unlisten = history.listen((location) => {
          setCurrentPath(location.pathname);
        });
    
        return () => {
          unlisten(); // 清除监听器，防止内存泄漏
        };
    }, [history]);

    useEffect(() => {
        checkAddress()
        if (chain) {
            dispatch(userActions.setCurrentChainInfo({
                id: chain.id,
                name: chain.name,
                nativeCurrency: chain.nativeCurrency,
                blockExplorers: chain.blockExplorers
            }))
        }
    }, [status, chain, address])

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

    const checkAddress = async () => {
        if (address) {
            dispatch(userActions.setAddress(address));
            dispatch(globalActions.setConnect(true));
        }
    }

    

    return(
        <HeaderWrapper>
            <NavLink to="/"><img src={LogoW} className='w-10' /></NavLink>
            <NavWrapper>
                {
                    nav.map((v, i) => {
                        return <NavLink key={i} to={v.path}>{v.label} {currentPath == v.path ? <ArrowRight className="icon" /> : <></> }</NavLink>
                    })
                }
            </NavWrapper>
            <ButtonWrapper>
                <a href="https://twitter.com/novaswap_erc" target="_black"><IconsWrapper><TwitterXFill /></IconsWrapper></a>
                {
                    user.address && user?.currentChainInfo
                    ? <GasWrapper>
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
                    : <></>
                }
                <ConnectWallet />
            </ButtonWrapper>
        </HeaderWrapper>
    )
}

const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    > a {
        font-size: 1rem;
        color: white;
        font-weight: bold;
        text-decoration: none;
        position: relative;
        .icon {
            position: absolute;
            font-size: 12px;
            color: ${({theme}) => theme.colorPrimary};
            left: 50%;
            bottom: -12px;
            transform: translateX(-50%) rotate(-90deg);
        }
    }
`

const IconsWrapper = styled.div`
    width: 29px;
    height: 29px;
    border-radius: ${({theme}) => theme.primaryRadius}px;
    border: 1px solid ${({theme}) => theme.gray3};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.text2};
    font-size: 16px;
    &:hover {
        color: white;
    }
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