import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createChart } from "lightweight-charts";
import { tokenPrices } from '@/api/k'

export default function Chart() {
    const chartContainerRef = useRef(null);
    const [candlestick, setCandlestick] = useState(null)

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
        setCandlestick(cs)

        // 清除组件时销毁图表
        return () => {
            chart.remove();
        };
    }, []);

    useEffect(() => {
        if (!candlestick) return;
        candlestick.priceScale().applyOptions({
            borderColor: "#71649C",
        });

        let data = [
            {
              "open": 0.000060180722891600,
              "close": 0.000060618932038800,
              "high": 0.000060618932038800,
              "low": 0.000060180722891600,
              "time": 1642427876
            },
            {
              "open": 0.000060478681027700,
              "close": 0.000060747947704500,
              "high": 0.000060747947704500,
              "low": 0.000060478681027700,
              "time": 1642514276
            },
            {
              "open": 0.000062437500000000,
              "close": 0.000062437500000000,
              "high": 0.000062437500000000,
              "low": 0.000062437500000000,
              "time": 1642600676
            }
        ]
        candlestick.setData(data)
        tokenPrices({
            token_addr: "0X10F86D3C97A0DF10A5399363AF175A4F9BB69363",
            time_type: "5m",
        }).then((res) => {
            if (res.code == 200) {
                // candlestick.setData(res.data.prices)

                // 设置数据
        
                // const data = [
                //     { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
                //     { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
                //     { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
                //     { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
                //     { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
                //     { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
                //     { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
                //     { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
                //     { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
                //     { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
                // ];

                // candlestick.setData(data);
                
            } else {
            }
        });
    }, [candlestick]);

    return <ChartWrapper ref={chartContainerRef}></ChartWrapper>;
}

const ChartWrapper = styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.secondRadius}px;
    overflow: hidden;
    height: 300px;
`;
