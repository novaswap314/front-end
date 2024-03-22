import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button, List, Col, Row, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { novaAddress, novaAbi } from '@/constant';
import { useReadContract, useChainId } from 'wagmi';
import { userActions } from '../../store/module/user';
import { useDialog } from '../Dialog/hook';
import Loading from '../Loading';

const { Search } = Input;

const SearchToken = ({ getSelectToken }) => {
    const [inputValue, setInputValue] = useState('0x74b7988Bd9dDbeD4b0ab30B208Bfbb911B45e948');
    const { selectType } = useSelector(state => state.user)
    const dialog = useDialog()
    const chainId = useChainId()
    const dispatch = useDispatch()

    const { isLoading, data } = useReadContract({
        address: novaAddress,
        abi: novaAbi,
        functionName: 'getTokenInfo',
        args: [inputValue]
    })

    const onSearch = async (e) => {
        setInputValue(e);
    };

    const onInputChang = (e) => {
        setInputValue(e.target.value);
    };

    const onPressEnter = (e) => {
        readContract(inputValue);
    };

    const searchConfirm = () => {
        if (data && data.name) {
            getSelectToken({
                ...data,
                blockToUnlockLiquidity: data.blockToUnlockLiquidity.toString(),
                decimals: data.decimals.toString(),
                pool0p: data.pool0p.toString(),
                pool1p: data.pool1p.toString(),
                totalSupply: data.totalSupply.toString(),
                tokenAddress: inputValue,
            })
            dialog.closeDialog()
        }
    }

    const data1 = [
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

    return (
        <div>
            <Search
                placeholder='Search name or paste address' 
                value={inputValue}
                onSearch={(e) => onSearch(e)}
                onChange={(e) => onInputChang(e)} 
                size='large'
                onPressEnter={onPressEnter}
                enterButton="Search"
                loading={isLoading}
            />
            {
                isLoading 
                    ? <Loading></Loading> 
                    : (
                        data ? (<Result><p>Name: { data.name }</p></Result>) : (<div>empty</div>)
                    )
            }
            
            <div className='mt-4 text-center'>
                <Button type="primary" onClick={searchConfirm}>Comfirm</Button>
            </div>
        </div>
    );
};

const Result = styled.div`
    font-size: 14px;
    padding: 30px;
`
const ListWrapper = styled(List)`

`
const ListItem = styled(List.Item)`
  border-top: 1px dashed  ${({theme}) => theme.gray3};
`

export default SearchToken;
