import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button, Form, Empty, notification, Tabs } from "antd";
import { useAccount, useGasPrice, useChainId } from "wagmi";
import Loading from "@/components/Loading";
import { selectChainConfig } from "../../constant";
import Token from "./components/Token";
import Simple from "./components/Simple";
import Standard from "./components/Standard";

const web3 = new Web3(window.ethereum);
const tabs = [
    {
        key: "1",
        label: "ERC314",
        children: <Simple />,
    },
    {
        key: "2",
        label: "ERC2510",
        children: <Standard />,
    },
];

export default function Toolkit() {
    const [allEvents, setAllEvents] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const user = useSelector((state) => state.user);
    const { open } = useWeb3Modal();
    const { address } = useAccount();
    const [readingStartBlock, setReadingStartBlock] = useState(BigInt(0));
    const [readingEndBlock, setReadingEndBlock] = useState(BigInt(0));
    const chainId = useChainId();
    const [factoryContract, setFactoryContract] = useState();
    const [factoryObj, setFactoryObj] = useState();

    const openNotificationError = (message) => {
        api["error"]({
            message: "Somthing Error.",
            description: message,
        });
    };

    const openNotificationSuccess = (message) => {
        api["success"]({
            message: "Success!",
            description: message,
        });
    };

    const pendingBlockEvent = async (startBlock, endBlock) => {
        setReadingStartBlock(startBlock);
        setReadingEndBlock(endBlock);
        try {
            const blockEvents = await factoryContract.getPastEvents("NewDeployed", {
                filter: { deployer: address },
                fromBlock: startBlock,
                toBlock: endBlock,
            });
            setAllEvents((prevEvents) => [...prevEvents, ...blockEvents]);
            // setListLoading(false)
        } catch (err) {
            // setListLoading(false)
            openNotificationError(err?.message || "Please try again later.");
        }
    };

    const getDeployedList = async () => {
        let startBlock = BigInt(39087079);
        let latestBlock = await web3.eth.getBlockNumber();
        const blockCheckRange = 500;
        if (latestBlock - BigInt(blockCheckRange) <= startBlock) {
            pendingBlockEvent(startBlock, latestBlock);
        } else {
            for (;;) {
                console.log("current block:", startBlock);
                if (startBlock > latestBlock) break;
                await pendingBlockEvent(startBlock, startBlock + BigInt(blockCheckRange));
                startBlock += BigInt(blockCheckRange);
            }
        }
        console.log("all events:", allEvents);
        setListLoading(false);
    };

    const handleOpen = () => {
        open();
    };

    useEffect(() => {
        const currentChain = selectChainConfig(chainId);
        setFactoryObj(currentChain);
        if (currentChain != null) {
            const newFactoryContract = new web3.eth.Contract(currentChain.factoryABI, currentChain.factoryAddr);
            setFactoryContract(newFactoryContract);
        }
    }, [user?.address, chainId]);

    useEffect(() => {
        if (user?.address && factoryContract) {
            getDeployedList();
        }
    }, [user?.address, factoryContract]);

    const onChange = () => {

    }

    return (
        <>
            {contextHolder}
            <LaunchpadWrapper>
                <InnerWrapper>
                    <TabWrapper>
                        <Tabs
                            defaultActiveKey="1"
                            items={tabs}
                            size="large"
                            onChange={onChange}
                            indicator={{
                                size: (origin) => origin - 20,
                                align: 'center',
                            }}
                        />
                    </TabWrapper>
                    <MytokenWrapper>
                        <Title className="mb-4">My Tokens </Title>
                        <Title className="mb-4">
                            {readingStartBlock.toString()} - {readingEndBlock.toString()}{" "}
                        </Title>
                        <ListWrapper>
                            {listLoading ? (
                                <div className="text-center">
                                    <Loading />
                                </div>
                            ) : allEvents && allEvents.length > 0 ? (
                                <>
                                    <div className="grid md:grid-cols-5 flex-1 font-bold text-center py-3">
                                        <div>CA</div>
                                        <div>NAME</div>
                                        <div>SYMBOL</div>
                                        <div>TotalSupply</div>
                                        <div></div>
                                    </div>
                                    {allEvents.map((item, index) => {
                                        return <Token key={index} item={item} />;
                                    })}
                                </>
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </ListWrapper>
                    </MytokenWrapper>
                </InnerWrapper>
            </LaunchpadWrapper>
        </>
    );
}

const ListWrapper = styled.div``;
const Header = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
`;

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
const TabWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.gray3};
    border-radius: ${({ theme }) => theme.secondRadius}px;
    flex: 1;
    padding: 24px;
    .ant-tabs-nav::before {
        border-bottom: 1px solid ${({ theme }) => theme.gray3};
    }
`;
const MytokenWrapper = styled.div`
    flex: 1;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.gray3};
    border-radius: ${({ theme }) => theme.secondRadius}px;
    margin-top: 30px;
`;
