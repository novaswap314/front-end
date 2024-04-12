import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { createChart } from "lightweight-charts";
import { tokenPrices } from '@/api/k'
import SpwsClient from '../../libs/ws';
import Loading from '../Loading'

const timeType = [
    { label: '5m', id: '5m' },
    { label: '30m', id: '30m' },
    { label: '1h', id: '1h' },
    { label: '1d', id: '1d' },
]

export default function Chart({ ca }) {
    const chartContainerRef = useRef(null);
    const [candlestick, setCandlestick] = useState(null)
    const [ws, setWs] = useState(null)
    const [dataLoading, setDataLoading] = useState(false)
    const [type, setType] = useState('5m')

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                textColor: "black",
                background: { color: "#333" },
            },
            grid: {
                vertLines: { color: "#444" },
                horzLines: { color: "#444" },
            },
            timeScale: {
                borderColor: "#71649C",
            },
        });
        let cs = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });
        cs.priceScale().applyOptions({
            borderColor: "#71649C",
        });
        setCandlestick(cs)

        // 清除组件时销毁图表
        return () => {
            chart.remove();
        };
    }, []);


    useEffect(() => {
        let url = `${process.env.WSS_URL}/api/v1/token/ws_token_prices`
        let ws = new SpwsClient(url)
        ws.setOnMessageCallback((event) => {
            const message = event.data
            if (message == 'pong') {
                return
            }
            let res = JSON.parse(message)
            if (res.code == 200) { // type: 5m 30m 1h 1d
                // if(res.data.type === type && res.data.)
            }
            console.log('message>>', message)
        })

        return () => {
            ws.close()
        }
    }, [])

    useEffect(() => {
        if (!candlestick) return;
        if (dataLoading || !ca) return;
        setDataLoading(true)
        tokenPrices({
            token_addr: ca,
            time_type: type,
        }).then((res) => {
            if (res.data.code == 200) {
                let data = res.data.data.prices.map(v => {
                    return {
                        time: Number(v.ts),
                        open: Number(v.open),
                        high: Number(v.high),
                        low: Number(v.low),
                        close: Number(v.close),
                    }
                })
                candlestick.setData(data);
            } else {
            }
            setDataLoading(false)
        });
    }, [candlestick, ca, type]);

    return <Wrapper>
        {
            dataLoading && <LoadingW><Loading></Loading></LoadingW>
        }
        <BittonWrapper>
            {
                timeType.map(v => {
                    return v.id === type
                    ? <Button key={v.id} type="primary">{ v.label }</Button>
                    : <Button onClick={() => setType(v.id)} key={v.id} ghost >{ v.label }</Button>
                })
            }
        </BittonWrapper>
        <ChartWrapper ref={chartContainerRef}></ChartWrapper>
    </Wrapper>
}
const LoadingW = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
`
const Wrapper = styled.div`
    width: 100%;
    position: relative;
`
const BittonWrapper = styled.div`
    width: 100%;
    padding: 0 0 12px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
`
const ChartWrapper = styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.secondRadius}px;
    overflow: hidden;
    height: 300px;
`;
