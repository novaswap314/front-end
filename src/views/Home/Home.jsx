import React from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import TwitterX from '@/components/Icons/TwitterX.jsx'

const Homewrapper = styled.div`
    padding: calc(${({ theme }) => theme.height} + 100px) 0 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${({ theme }) => theme.height});
    font-family: var(--font-family);
    h1 {
        font-size: 32px;
        font-weight: bold;
    }
    h2 {
        font-size: 28px;
        font-weight: bold;
        margin-top: 24px;
    }
`

const Home = () => {
    return(
        <Homewrapper>
            <h1>NovaSwap - The First MarketPlace for ERC314</h1>
            <h2>$nova for airdrop</h2>
            <h2>Sooooooooooon!</h2>
            <a className="text-white text-3xl mt-auto" href="https://twitter.com/novaswap_erc" target="_black"><TwitterX /></a>
        </Homewrapper>
    )
}

export default Home

