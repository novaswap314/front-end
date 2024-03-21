import React from "react";
import styled from "styled-components";
import { Row } from '../../theme/base'

const PriceStatistics = () => {
    return (
        <Wrapper>
            <dl>
                <dt>Floor Price</dt>
                <dd>23,490 sats</dd>
            </dl>
            <dl>
                <dt>24 Hour Volume</dt>
                <dd><div className="i-cryptocurrency-color-btc" />11.673534</dd>
            </dl>
            <dl>
                <dt>7 Days Volume</dt>
                <dd><div className="i-cryptocurrency-color-btc" />11.673534</dd>
            </dl>
            <dl>
                <dt>24 Hour Sales</dt>
                <dd>23,490 sats</dd>
            </dl>
            <dl>
                <dt>Total Item Listed</dt>
                <dd>23,490 sats</dd>
            </dl>
            <dl>
                <dt>Total Volume</dt>
                <dd>23,490 sats</dd>
            </dl>
        </Wrapper>
    )
}

export default PriceStatistics

const Wrapper = styled(Row)`
    gap: 3rem;
    font-size: 0.9rem;

    dl {
        &:first-child {
            margin-left: auto;
        }
        &:last-child {
            margin-right: auto;
        }
    }

    dt {
        color: var(--gray-400);
    }
    dd {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.1rem;
        font-size: 1rem;
    }
`