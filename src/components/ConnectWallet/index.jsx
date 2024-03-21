import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'antd';
import { userActions } from '@/store/module/user';
import { globalActions } from '@/store/module/global';
import { Row, ImgBase } from '../../theme/base';
import Disconnect from '@/components/Icons/Disconnect.jsx';
// import { useDialog } from '../Dialog/hook'
// import { useToast } from '../Toast';  
import LOGO from '../../assets/logo.svg'

export default function ConnectWallet() {
    const user = useSelector(state => state.user);
    const global = useSelector(state => state.global);
    const dispatch = useDispatch();

    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <div className='flex items-center'><Disconnect /> <span className='ml-2'>Disconnect</span></div> ,
            key: '3',
        },
    ];

    const ConnectWallet = async () => {
        if (!atom) {
            return showError('Please install atomical wallet.')
        }
    }

    const updateAddress = (newAddress) => {
        dispatch(userActions.setAddress(newAddress));
    }
    const updateConnect = (connect) => {
        dispatch(globalActions.setConnect(connect));
    }

    const handleOpenDialog = () => {
        openDialog(
            'Connect Wallet',
            <ChooseList>
                <Row className='row' onClick={() => ConnectWallet()}>
                    <ImgBase width="2.5rem" src={LOGO} alt="atomicals" />
                    <p className='name'>Atomicals Wallet</p>
                </Row>
            </ChooseList>
        );
    }

    const checkAddress = async () => {
        let accounts = await atom.getAccounts()

        if (!accounts || accounts.length == 0) {
            accounts = await atom.requestAccounts()
        }

        if (accounts.length > 0) {
            updateAddress(accounts[0])
            updateConnect(true)
        }
    }

    useEffect(() => {
        checkAddress()
    }, [])

    return (
        <Fragment>
            {
                global.connect
                    ? <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button type="primary">{user.address.replace(/^(\w{4}).*(\w{4})$/, '$1***$2')}</Button>
                    </Dropdown>
                    : <Button type="primary" onClick={() => handleOpenDialog()} label="Connect" />
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