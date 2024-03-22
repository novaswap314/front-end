import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, List, Col, Row, Empty } from 'antd';
import { useReadContract } from 'wagmi';
import { novaAbi, novaAddress } from '../../constant';
import Loading from '../../components/Loading';

// tokenLength() 

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

const RouletteWheel = () => {
  const { isLoading, data: listLength } = useReadContract({
    abi: novaAbi,
    address: novaAddress,
    functionName: 'tokenLength'
  })

  const result = useReadContract({
    abi: novaAbi,
    address: novaAddress,
    functionName: 'tokenListRich',
    args: [0, Number(listLength)]
  })

  // tokenListRich

  console.log('token length:', listLength, result)
  
  return (
    <WheelContainer>
      <Inner>
        <Header>List</Header>
        {
          isLoading
          ? <Loading/>
          : 
          (
            listLength
            ? <ListWrapper
                dataSource={data}
                renderItem={(item) => (
                  <ListItem>
                    <PairWrapper>
                      <Col span={6}>
                        <PairName>PEPE <span>/ Sol</span></PairName>
                        <CoinName>pepecoin</CoinName>
                        <CA>{'0xDB83330C3235489439d7EC4F238eAc31E7f614ED'.replace(/^(\w{5}).*(\w{4})$/, '$1...$2')}</CA>
                      </Col>
                      <Col span={6} className='flex flex-col items-start justify-center'>
                        <Price>0.00030$</Price>
                      </Col>
                      <Col span={6} className='flex flex-col items-start justify-center'>
                        <Price>Liq.13333k</Price>
                      </Col>
                      <Col span={6} className='flex flex-col items-end justify-center'>
                        <Button type="primary">Swap</Button>
                      </Col>
                    </PairWrapper>
                  </ListItem>
                )}
              />
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
      </Inner>
      
    </WheelContainer>
  );
};

const WheelContainer = styled.div`
  padding: 32px;
`
const Inner = styled.div`
  border: 1px solid ${({theme}) => theme.gray3};
  border-radius: 16px;
  padding: 12px 24px;
`
const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 0 0 12px 0;
  border-bottom: 1px dashed  ${({theme}) => theme.gray3};
`
const ListWrapper = styled(List)`
  // border: 1px solid ${({theme}) => theme.gray3};
  // border-radius: 16px;
  // padding: 12px 24px;
`
const ListItem = styled(List.Item)`
  border-top: 1px dashed  ${({theme}) => theme.gray3};
`
const PairWrapper = styled(Row)`
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

export default RouletteWheel;
