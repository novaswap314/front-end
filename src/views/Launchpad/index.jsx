import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import Web3 from 'web3';
import { useSelector } from "react-redux";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Form, Input, Row, Col, Slider, Empty, notification, InputNumber } from "antd";
import { useAccount, useGasPrice, useChainId } from 'wagmi'
import Loading from '@/components/Loading';
import Token from './components/Token'
import { selectChainConfig } from '../../constant';

const web3 = new Web3(window.ethereum);

export default function Launchpad() {
    const [form] = Form.useForm();
    const [allEvents, setAllEvents] = useState([])
    const [listLoading, setListLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const user = useSelector(state => state.user)
    const formLaunch = useRef()
    const { open } = useWeb3Modal()
    const { data: gasPrice } = useGasPrice()
    const { address } = useAccount()
    const [readingStartBlock, setReadingStartBlock] = useState(BigInt(0))
    const [readingEndBlock, setReadingEndBlock] = useState(BigInt(0))
    const chainId = useChainId()
    const [factoryContract, setFactoryContract] = useState();
    const [factoryObj, setFactoryObj] = useState();

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
        // const tplContract = new web3.eth.Contract(standardABI);
        // const deployTx = tplContract.deploy({
        //     data: standardBytecode,
        //     arguments: [values.name, values.ticker, values.supply, values.max],
        // });
        // const gas = await deployTx.estimateGas({ from: address });
        // const tx = {
        //     from: address,
        //     to: '',
        //     data: deployTx.encodeABI(),
        //     gas
        // };

        setSubmitLoading(true)

        //compute max wallet
        // let maxPerWallet = BigInt(values.max) * BigInt(values.supply) / BigInt(100)
        let maxSupply = BigInt(values.supply) * BigInt(10 ** Number(values.decimals))
        let maxPerWallet = BigInt(values.max) * maxSupply / BigInt(100)

        const constructorArgs = web3.eth.abi.encodeParameters(
            ['address', 'string', 'string', 'uint256', 'uint256', 'uint256'],
            [address.toString(), values.name, values.ticker, maxSupply, values.decimals, maxPerWallet]
          );
        console.log('bytecodehash:', web3.utils.keccak256(factoryObj?.factoryTokens[0].bytecodes))
        console.log('parameters:', constructorArgs, [address.toString(), values.name, values.ticker, maxSupply, values.decimals, maxPerWallet])

        try {
            const deployContractMethod = factoryContract.methods.deployContract(factoryObj?.factoryTokens[0].bytecodes, constructorArgs);
            const gasEstimate = await deployContractMethod.estimateGas({ from: address });
            console.log('gasEstimate', gasEstimate, gasPrice)
            // 发送交易
            const tx = {
                from: address,
                to: factoryObj?.factoryAddr,
                data: deployContractMethod.encodeABI(),
                gas: gasEstimate,
                gasPrice: gasPrice.toString(),
            };
            const txHash = await web3.eth.sendTransaction(tx);
            getReceipt(txHash.transactionHash);
        } catch (err) {
            openNotificationError(err?.message || 'Please try again later.')
            setSubmitLoading(false)
        }
    };

    const getReceipt = async (hash) => {
        try {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt) {
                if (receipt.status === true || receipt.status == 1) {
                    openNotificationSuccess(`Transaction success`)
                    setSubmitLoading(false)
                    console.log('Transaction success: ', receipt);
                } else {
                    openNotificationError(`Transaction failed`)
                    setSubmitLoading(false)
                    console.log('Transaction failed: ', receipt);
                }
            } else {
              setTimeout(() => getReceipt(hash), 2000);
            }
        } catch (err) {
            console.log('getReceipt err:', err)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const addEvent = (newEvent) => {
        setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const pendingBlockEvent = async (startBlock, endBlock) => {
        setReadingStartBlock(startBlock)
        setReadingEndBlock(endBlock)
        try {
            const blockEvents = await factoryContract.getPastEvents('NewDeployed', {
                filter: { deployer: address },
                fromBlock: startBlock,
                toBlock: endBlock
            })
            setAllEvents((prevEvents) => [...prevEvents, ...blockEvents]);
            // setListLoading(false)
        } catch(err) {
            // setListLoading(false)
            openNotificationError(err?.message || 'Please try again later.')
        }
    }

    const getDeployedList = async () => {
        let startBlock = BigInt(39087079);
        let latestBlock = await web3.eth.getBlockNumber();
        const blockCheckRange = 500;
        if(latestBlock - BigInt(blockCheckRange) <= startBlock) {
            pendingBlockEvent(startBlock, latestBlock)
        } else {
            for(;;) {
                console.log("current block:", startBlock)
                if(startBlock > latestBlock) break
                await pendingBlockEvent(startBlock, startBlock + BigInt(blockCheckRange));
                startBlock += BigInt(blockCheckRange)
            }
        }
        console.log('all events:', allEvents)
        setListLoading(false)
    }

    const handleOpen = () => {
        open()
    }

    useEffect(() => {
        const currentChain = selectChainConfig(chainId)
        setFactoryObj(currentChain);
        if(currentChain != null) {
            const newFactoryContract = new web3.eth.Contract(currentChain.factoryABI, currentChain.factoryAddr)
            setFactoryContract(newFactoryContract)
        }
        formLaunch.current.setFieldsValue({
            decimals: 18, // decimals 的默认值 0
        })
    }, [user?.address, chainId]);

    useEffect(() => {
        if (user?.address && factoryContract) {
            getDeployedList();
        }
    }, [user?.address, factoryContract]);

    return (
        <>
            {contextHolder}
            <LaunchpadWrapper>
                <InnerWrapper>
                    <FormWrapper
                        ref={formLaunch}
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Title className="mb-4">ERC2510 Factory</Title>

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
                                    <Input placeholder="Please input the name."/>
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
                                    <Input placeholder="Please input the ticker. eg: BTC/ETH/BSC"/>
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
                                                    return Promise.reject(new Error('Please enter valid numbers!'));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder="Please input the supply."/>
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
                                    <InputNumber min={1} max={99} style={{ width: '100%'}}/>
                                    {/* <Input placeholder="Please input the decimals."/> */}
                                </Form.Item>
                            </Col>
                        </Row>

                        

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
                            {
                                user?.address
                                ? <Button loading={submitLoading} className="ml-auto block" type="primary" size="large" htmlType="submit">Submit</Button>
                                : <Button onClick={() => handleOpen()} className="ml-auto block" type="primary" size="large">Connect Wallet</Button>
                            }
                            
                        </Form.Item>
                    </FormWrapper>
                    <MytokenWrapper>
                        <Title className="mb-4">My Tokens </Title>
                        <Title className="mb-4">{readingStartBlock.toString()} - {readingEndBlock.toString()} </Title>
                        <ListWrapper>
                            {
                                listLoading
                                ? <div className="text-center"><Loading/></div> 
                                : (
                                    allEvents && allEvents.length > 0
                                    ? (
                                        <>
                                            <div className='grid md:grid-cols-5 flex-1 font-bold text-center py-3'>
                                                <div>CA</div>
                                                <div>NAME</div>
                                                <div>SYMBOL</div>
                                                <div>TotalSupply</div>
                                                <div></div>
                                            </div>
                                            {allEvents.map((item,index) => {
                                                return <Token key={index} item={item} />
                                            })}
                                        </>
                                    )
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                )
                            }
                        </ListWrapper>
                    </MytokenWrapper>
                </InnerWrapper>
            </LaunchpadWrapper>
        </>
    );
}

const ListWrapper = styled.div`

`
const Header = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
`

const LaunchpadWrapper = styled.div`
  padding-top: ${({ theme }) => theme.height};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg02};
`;

const InnerWrapper = styled.div`
  margin: 30px auto 0;
  max-width: 1000px;
  ${({ theme }) => theme.md`
  
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
  margin-top: 30px;
`;
