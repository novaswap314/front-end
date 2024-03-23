import React from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import TwitterX from '@/components/Icons/TwitterX.jsx'

import BGCIRCLE from '@/assets/images/bg-circle.png'
import GRID from '@/assets/images/bg-grid.png'
import BLURL from '@/assets/images/blur-left.png'
import BLURR from '@/assets/images/blur-right.png'

const Homewrapper = styled.div`
    padding: calc(${({ theme }) => theme.height} + 100px) 0 100px;
    background: url(${BGCIRCLE}) no-repeat center / cover, 
        url(${BLURL}) no-repeat left top / 600px, 
        url(${BLURR}) no-repeat right bottom -200px / 540px,
        url(${GRID}) no-repeat 70% center / 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    
    h1 {
        font-size: 40px;
        font-weight: bold;
    }
    h2 {
        font-size: 28px;
        font-weight: bold;
        margin-top: 24px;
    }
`
const Gird = styled.div`
    margin: 160px auto 0;
    gap: 40px;
`

const GirdItem = styled.div`
    border-radius: 16px;
    color: #fff;
    background: rgba(255, 255, 255, .1);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    padding: 24px 42px;
    font-weight: bold;
    text-align: center;
`
const A = styled.a`
    &:hover {
        color: ${({theme}) => theme.colorPrimary};
    }
`

const Home = () => {
    return(
        <Homewrapper>
            <h1>NovaSwap</h1>
            <h1 className="mt-1">The First MarketPlace for ERC314</h1>
            <h2>$? for airdrop Sooooooooooon!</h2>
            <A className="text-white text-3xl mt-14" href="https://twitter.com/novaswap_erc" target="_black"><TwitterX /></A>
            <Gird className="grid grid-cols-1 md:grid-cols-3 w-[80%] max-w-[900px]">
                <GirdItem>$?</GirdItem>
                <GirdItem>IDO</GirdItem>
                <GirdItem>ERC314</GirdItem>
            </Gird>
        </Homewrapper>
    )
}

export default Home

