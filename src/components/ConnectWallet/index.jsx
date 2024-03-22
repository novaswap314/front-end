import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'antd';
import { userActions } from '@/store/module/user';
import { globalActions } from '@/store/module/global';
import { useAccount, useDisconnect } from 'wagmi'
import Disconnect from '@/components/Icons/Disconnect.jsx';

export default function ConnectWallet() {
    const user = useSelector(state => state.user);
    const global = useSelector(state => state.global);
    const { address, status, isConnecting, chain } = useAccount()
    const { disconnect } = useDisconnect()
    const dispatch = useDispatch();

    const items = [
        {
            label: <div className='flex items-center' onClick={() => handleDisconnect()}><Disconnect /> <span className='ml-2'>Disconnect</span></div> ,
            key: '3',
        },
    ];

    const handleDisconnect = () => {
        disconnect()
        updateAddress('')
        updateConnect(false)
    }

    const updateAddress = (newAddress) => {
        dispatch(userActions.setAddress(newAddress));
    }
    const updateConnect = (connect) => {
        dispatch(globalActions.setConnect(connect));
    }

    const checkAddress = async () => {
        if (address) {
            updateAddress(address)
            updateConnect(true)
        }
    }

    useEffect(() => {
        checkAddress()
        if (status == 'connected' && chain) {
            dispatch(userActions.setCurrentChainInfo({
                id: chain.id,
                name: chain.name,
                nativeCurrency: chain.nativeCurrency
            }))
        }
    }, [status, chain, address])

    return (
        <Fragment>
            {
                global.connect
                    ? <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button type="primary">{user.address.replace(/^(\w{4}).*(\w{4})$/, '$1***$2')}</Button>
                    </Dropdown>
                    : <w3m-button />
            }
        </Fragment>
    )
}

const ChooseList = styled.div`
    .row {
        padding: 0.6rem 0.6rem 0.6rem 2rem;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 1rem;
        &:hover {
            border: 1px solid var(--gray-700);
        }
    }
    .name {
        font-size: 1.2rem;
        flex: 1;
        text-align: center;
    }
`