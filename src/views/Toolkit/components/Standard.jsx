import React, {useEffect, useState, useRef, Fragment} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { useSelector } from "react-redux";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice, useChainId } from 'wagmi'
import { selectChainConfig } from '../../../constant';

const web3 = new Web3(window.ethereum);

export default function Standard() {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const { open } = useWeb3Modal()
    const user = useSelector(state => state.user)
    const formLaunch = useRef()

    const openNotificationError = (message) => {
        api['error']({
          message: 'Somthing Error.',
          description: message,
        });
    }

    const openNotificationSuccess = (message) => {
        api['success']({
          message: 'Success!',
          description: message,
        });
    }

    const onFinish = async (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleOpen = () => {
        open()
    }

    const handleFormValuesChange = (changedValues, allValues) => {
        const { team, presale, liquidity } = allValues;
        
        // 如果其中两个输入框的值都存在
        if (team !== undefined && presale !== undefined) {
            // 计算 liquidity 的值
            const calculatedLiquidity = 100 - team - presale;
            // 更新 liquidity 字段的值
            form.setFieldsValue({ liquidity: calculatedLiquidity });
        } else if (team !== undefined && liquidity !== undefined) {
            // 如果 team 和 liquidity 的值都存在，则计算 presale 的值
            const calculatedPresale = 100 - team - liquidity;
            // 更新 presale 字段的值
            form.setFieldsValue({ presale: calculatedPresale });
        } else if (presale !== undefined && liquidity !== undefined) {
            // 如果 presale 和 liquidity 的值都存在，则计算 team 的值
            const calculatedTeam = 100 - presale - liquidity;
            // 更新 team 字段的值
            form.setFieldsValue({ team: calculatedTeam });
        }
    };

    useEffect(() => {
        formLaunch.current.setFieldsValue({
            decimals: 18, // decimals 的默认值 0
            team: 10,
            presale: 45,
            liquidity: 45
        })
    }, []);


    return (
        <Fragment>
            { contextHolder }
            <FormWrapper ref={formLaunch} form={form} name="validateOnly" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" onValuesChange={handleFormValuesChange}>
                <Title className="mb-4">Standard</Title>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the name",
                                },
                            ]}
                        >
                            <Input placeholder="Please input the name." />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ticker"
                            name="ticker"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the ticker",
                                },
                            ]}
                        >
                            <Input placeholder="Please input the ticker. eg: BTC/ETH/BSC" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Supply"
                            name="supply"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the supply",
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!/^\d+$/.test(value)) {
                                            return Promise.reject(new Error("Please enter valid numbers!"));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Please input the supply." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Decimals"
                            name="decimals"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the decimals.",
                                },
                            ]}
                        >
                            <InputNumber min={1} max={99} style={{ width: "100%" }} />
                            {/* <Input placeholder="Please input the decimals."/> */}
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Basevalue"
                    name="basevalue"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Enter bnb quantity." />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="Team reservation"
                            name="team"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the team reservation ratio.",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!/^[1-9]\d*$/.test(value)) {
                                            return Promise.reject(new Error("Please enter valid numbers!"));
                                        }
                                        if (Number(getFieldValue("liquidity")) + Number(getFieldValue("presale")) + Number(value) > 100) {
                                            return Promise.reject(new Error("Team reservation + Pre-sale + Liquidity ratio cannot be greater than 100%!"));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input suffix="%" placeholder="The team reservation ratio." />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Pre-sale"
                            name="presale"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the pre-sale ratio.",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!/^[1-9]\d*$/.test(value)) {
                                            return Promise.reject(new Error("Please enter valid numbers!"));
                                        }
                                        if (Number(getFieldValue("liquidity")) + Number(getFieldValue("team")) + Number(value) > 100) {
                                            return Promise.reject(new Error("Team reservation + Pre-sale + Liquidity ratio cannot be greater than 100%!"));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input suffix="%" placeholder="Pre-sale ratio." />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Liquidity"
                            name="liquidity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the liquidity ratio.",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!/^[1-9]\d*$/.test(value)) {
                                            return Promise.reject(new Error("Please enter valid numbers!"));
                                        }
                                        if (Number(getFieldValue("presale")) + Number(getFieldValue("team")) + Number(value) > 100) {
                                            return Promise.reject(new Error("Team reservation + Pre-sale + Liquidity ratio cannot be greater than 100%!"));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input suffix="%" placeholder="Liquidity ratio." />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    {user?.address ? (
                        <Button loading={submitLoading} className="ml-auto block" type="primary" size="large" htmlType="submit">
                            Submit
                        </Button>
                    ) : (
                        <Button onClick={() => handleOpen()} className="ml-auto block" type="primary" size="large">
                            Connect Wallet
                        </Button>
                    )}
                </Form.Item>
            </FormWrapper>
        </Fragment>
    );
}

const FormWrapper = styled(Form)`

`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;