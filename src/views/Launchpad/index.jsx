import React from "react";
import styled from "styled-components";
import { Button, Form, Input, Row, Col, Slider } from "antd";

export default function Launchpad() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <LaunchpadWrapper>
            <InnerWrapper>
                <FormWrapper
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Title className="mb-4">ERC314 Factory</Title>

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
                                <Input />
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
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Supply"
                        name="supply"
                        rules={[
                            {
                                required: true,
                                message: "Please input the supply",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Fee (0% to 5%):"
                        name="fee"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Slider max={5}/>
                    </Form.Item>

                    <Form.Item
                        label="Max wallet (1% to 100%):"
                        name="max"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Slider max={100}/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="ml-auto block" type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </FormWrapper>
                <MytokenWrapper>
                    <Title className="mb-4">My Token: todo</Title>
                </MytokenWrapper>
            </InnerWrapper>
        </LaunchpadWrapper>
    );
}

const LaunchpadWrapper = styled.div`
  padding-top: ${({ theme }) => theme.height};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg02};
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 48px 120px;
  gap: 24px;
  ${({ theme }) => theme.md`
        flex-direction: column;
    `}
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const FormWrapper = styled(Form)`
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: ${({ theme }) => theme.secondRadius}px;
  flex: 1;
  padding: 24px;
`;
const MytokenWrapper = styled.div`
  flex: 1;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: ${({ theme }) => theme.secondRadius}px;
`;
