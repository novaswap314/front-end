import React from 'react';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import { novaAbi, novaAddress } from '../../../constant';
import { useReadContract } from 'wagmi';
import { Button, Form, Input } from 'antd';

export default function Token({ item }) {
    const [form] = Form.useForm();
    const { isLoading, data } = useReadContract({
        abi: novaAbi,
        address: novaAddress,
        functionName: 'getTokenInfo',
        args: [item?.returnValues.contractAddr]
    })
    
    const onFinish = (values) => {
        console.log("values:", values);
    }

    const onFinishFailed = () => {

    }

    return(
        <List>
            {
                isLoading
                ? <Loading />
                : (
                    <>
                        <div className='grid md:grid-cols-5 flex-1 text-center'>
                            <div>{item?.returnValues.contractAddr.replace(/^(\w{7}).*(\w{5})$/, '$1...$2')}</div>
                            <div>{data.name}</div>
                            <div>{data.symbol}</div>
                            <div>{data.totalSupply.toString()}</div>
                            <div className="flex gap-x-2 text-right">
                                {!data.tradingEnable && <Button type="primary" size="small">No Trade</Button>}
                                {/* {!data.liquidityAdded && <Button type="primary" size="small">Add Liquidity</Button>} */}
                                {!data.liquidityAdded && 
                                    <FormWrapper
                                        form={form}
                                        name="validate"
                                        layout="vertical"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="height"
                                            style={ItemStyle}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Block height",
                                                },
                                            ]}
                                        >
                                            <Input style={InputStyle} placeholder='Block height' />
                                        </Form.Item>
                                        <Form.Item
                                            name="amount"
                                            style={ItemStyle}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Amount",
                                                },
                                            ]}
                                        >
                                            <Input style={InputStyle} placeholder='Amount'/>
                                        </Form.Item>
                
                                        <Form.Item>
                                            <Button className="ml-auto block" type="primary" size="small" htmlType="submit">Add Liquidity</Button>
                                        </Form.Item>
                                    </FormWrapper>
                                }
                            </div>
                        </div>
                    </>
                )
            }
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
const FormWrapper = styled(Form)`

`;

const InputStyle = {
    lineHeight: '1.2',
}
const ItemStyle = {
    marginBottom: '0px',
    marginTop: '-3px',
}