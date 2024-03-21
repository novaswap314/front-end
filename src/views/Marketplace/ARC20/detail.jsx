import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PriceStatistics from '../../../components/PriceStatistics';
import { TabView, TabPanel } from 'primereact/tabview';
import CardItem from "../../../components/CradItem";

const ARC20Detail = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const list = ['Listed', 'History', 'Holders', 'Activitis', 'My Orders']

    const onTabChange = (e) => {
        setActiveTabIndex(e.index)
    }

    useEffect(() => {
        console.log('activeTabIndex>>', activeTabIndex)
    }, [activeTabIndex])

    return (
        <DetailWrapper>
            <PriceStatistics />
            <TabView activeIndex={activeTabIndex} onTabChange={(e) => onTabChange(e)}>
                {
                    list.map((tab, i) => {
                        return <TabPanel header={tab} key={i}></TabPanel>
                    })
                }
                
            </TabView>
            <ListWrapper>
                {
                    list.map((item, i) => {
                        return <CardItem key={i}>
                            <Number>800</Number>
                            <Single><span>22,450</span> SATS / ATOM</Single>
                            <SinglePrice>$9.747 / ATOM</SinglePrice>
                        </CardItem>
                    })
                }
            </ListWrapper>
        </DetailWrapper>
    )
}


const DetailWrapper = styled.div`
    padding: 1rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
    gap: 1rem;
`
const Number = styled.div`
    font-size: 2rem;
    color: white;
`
const Single = styled.div`
    font-size: 0.9rem;
    color: white;
    margin: 0.2rem 0;
    span {
        color: ${({theme}) => theme.main};
        font-size: 1.1rem;
    }
`
const SinglePrice = styled.div`
    font-size: 0.9rem;
    color: var(--gray-400);
`

export default ARC20Detail