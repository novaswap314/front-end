import React from 'react';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import { novaAbi, novaAddress } from '../../../constant';
import { useReadContract } from 'wagmi';
import { Button } from 'antd';

export default function Token({ item }) {
    console.log('item>', item)
    const { isLoading, data } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: 'getTokenInfo',
        args: [item?.returnValues.contractAddr]
    })

    console.log('data:::::', isLoading, data)

    return(
        <List>
            <div>CA: {item.address.replace(/^(\w{7}).*(\w{5})$/, '$1...$2')}</div>
            <div></div>
            <div className="ml-auto flex gap-x-2">
                {
                    isLoading
                    ? <Loading />
                    : (
                        <>
                            {!data.tradingEnable && <Button type="primary">No Trade</Button>}
                            {!data.liquidityAdded && <Button type="primary">Add Liquidity</Button>}
                        </>
                    )
                }
            </div>
        </List>
    )
}

const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px dashed ${({theme}) => theme.gray3};
    padding: 12px 0;
`