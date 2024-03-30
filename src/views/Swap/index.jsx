import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Col, Empty } from 'antd';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/module/user';
import { novaAbi, novaAddress } from '../../constant';
import Loading from '../../components/Loading';
import { debounce } from 'lodash'
import { formatNumber } from '@/utils'
import Chart from '@/components/Charts/default.jsx'

const RouletteWheel = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [formatList, setFormatList] = useState(null)
  const { isLoading, data: listLength } = useReadContract({
    abi: novaAbi,
    address: novaAddress,
    functionName: 'tokenLength'
  })

  const { isLoading: listLoading, data: ListData } = useReadContract({
    abi: novaAbi,
    address: novaAddress,
    functionName: 'tokenListRich',
    args: [0, Number(listLength) - 1]
  })

  useEffect(() => {
    if (ListData) {
      let list = ListData.map((v) => {
        v.blockToUnlockLiquidity = v.blockToUnlockLiquidity.toString()
        v.decimals = v.decimals.toString()
        v.pool0p = v.pool0p.toString()
        v.pool1p = v.pool1p.toString()
        v.totalSupply = v.totalSupply.toString()
        return v
      })
      if (list?.length > 0 && !user.currentPairInfo) {
        handleChoosePair(list[0])
      }
      setFormatList(list)
    }
  }, [ListData])

  const ETHPrice = (pool0, pool1) => {
    // 0 eth / 1 代币
    let formatPool0 = formatEther(pool0)
    let formatPool1 = formatEther(pool1)
    if (formatPool0 == 0) {
        return 0
    }
    return formatNumber(formatPool0 / formatPool1)
  }

  const handleChoosePair = (item) => {
    if (user.isBuy) { // 买入
      dispatch(userActions.setOutput({
        name: item.symbol,
        symbol: item.symbol,
      }))
    } else { // 卖出
      dispatch(userActions.setInput({
        name: item.symbol,
        symbol: item.symbol,
      }))
    }
    // 池子基础信息
    dispatch(userActions.setCurrentPairInfo({
      ...item,
      tokenAddress: item.ca,
    }))
  }
  
  return (
    <WheelContainer>
      {/* <PointsWrapper>
        <div className='card__content'></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="points">Points: Coming soon.</div>
      </PointsWrapper> */}

      <Chart />

      <Inner className="mt-5">
        <Header className="grid grid-cols-1 lg:grid-cols-4">
          <Col className='text-left'>NAME</Col>
          <Col className='text-left'>PRICE</Col>
          <Col className='text-left'>LIQUIDITY</Col>
          <Col></Col>
        </Header>
        {
          isLoading || listLoading
          ? <Loading/>
          : 
          (
            listLength
            ? (
              formatList && formatList.map((item, index) => {
                return <ListItem key={index}>
                  <PairWrapper className="grid grid-cols-1 lg:grid-cols-4">
                    <Col>
                      <PairName>{item.symbol} <span>/ {user.currentChainInfo.nativeCurrency.symbol}</span></PairName>
                      <CoinName>{item.name}</CoinName>
                      <CA><a target='_blank' className='text-white underline' href={ user?.currentChainInfo?.blockExplorers?.default?.url + '/address/' + item.ca }>{item.ca.replace(/^(\w{7}).*(\w{5})$/, '$1...$2')}</a></CA>
                    </Col>
                    <Col className='flex flex-col items-start justify-center'>
                      <Price>{ETHPrice(item.pool0p, item.pool1p)}</Price>
                    </Col>
                    <Col className='flex flex-col items-start justify-center'>
                      <Price>Liq.{ formatNumber(formatEther(item.blockToUnlockLiquidity)) }</Price>
                    </Col>
                    <Col className='flex flex-col items-end justify-center'>
                      <Button type="primary" onClick={() => handleChoosePair(item)}>Swap</Button>
                    </Col>
                  </PairWrapper>
                </ListItem>
              })
            )
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
      </Inner>
      
    </WheelContainer>
  );
};

const WheelContainer = styled.div`
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`
const Inner = styled.div`
  border: 1px solid ${({theme}) => theme.gray3};
  border-radius: ${({theme}) => theme.secondRadius}px;
  padding: 12px 24px;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
`
const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 0 0 12px 0;
  border-bottom: 1px dashed  ${({theme}) => theme.gray3};
`
const ListItem = styled.div`
  border-top: 1px dashed  ${({theme}) => theme.gray3};
  padding: 12px 0;
`
const PairWrapper = styled.div`
  color: white;
  width: 100%;
  text-align: left;
`
const PairName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.text1};
  line-height: 1.2;
  span {
    font-weight: normal;
    color: ${({theme}) => theme.text2};
  }
`
const CoinName = styled.div`
  color: ${({theme}) => theme.text2};
  font-size: 12px;
  font-weight: bold;
`
const CA = styled.div`
  color: ${({theme}) => theme.text2};
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
`
const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.text2};
`

const PointsWrapper = styled.div`
  // background: rgba(255, 255, 255, .1);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border-radius: ${({theme}) => theme.secondRadius}px;
  background: lightgrey;
  box-shadow: #d11bff42 0 15px 40px -5px;
  z-index: 1;
  overflow: hidden;
  position: relative;
  min-height: 130px;
  .card__content {
    background: linear-gradient(rgba(255, 255, 255, 0.473), rgba(150, 150, 150, 0.25));
    z-index: 1;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({theme}) => theme.secondRadius}px;
  }
  .points {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: black;
    padding: 36px;
    font-size: 20px;
    font-weight: bold;
  }
  .blob {
    position: absolute;
    z-index: -1;
    border-radius: ${({theme}) => theme.secondRadius}px;
    width: 400px;
    height: 400px;
    &:nth-child(2) {
      left: -10%;
      top: -50%;
      background: #ff930f;
    }
    &:nth-child(3) {
      right: 18%;
      top: -10%;
      z-index: -1;
      background: #bf0fff;
    }
    &:nth-child(4) {
      left: 20%;
      bottom: -20%;
      background: #ff1b6b;
    }
    &:nth-child(5) {
      right: -10%;
      bottom: 0;
      background: #0061ff;
    }
  }
`

export default RouletteWheel;
