import React from "react";
import styled from 'styled-components'
import { Button } from 'antd';

const Homewrapper = styled.div`
    padding-top: ${({ theme }) => theme.height};
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
            <h1>novaswap is launching for erc314 market.</h1>
            <h2>$nova for airdrop</h2>
            <h2>Sooooooooooon!</h2>
        </Homewrapper>
    )
}

export default Home

