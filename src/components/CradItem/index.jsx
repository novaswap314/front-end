import React from 'react'
import styled from 'styled-components'
import { Row } from '../../theme/base'
import { Button } from '../Button'

const CardItem = (props) => {
    return (
        <ItemWrapper>
            <div className='top'>
                <div className='tag'>#232323</div>
                <div className='main-content'>
                    { props.children }
                </div>
            </div>
            <div className='bottom'>
                <Row>
                    <div className='i-cryptocurrency-color-btc'></div>
                    <span className='btc'>0.00038</span>
                    <span className='dollar'>$38</span>
                </Row>
                <Button className='mt-4'>Buy</Button>
            </div>
        </ItemWrapper>
    )
}

export default CardItem

const ItemWrapper = styled.div`
    border: 1px solid var(--gray-800);
    border-radius: 0.6rem;
    transition: all .5s;
    overflow: hidden;
    &:hover {
        border-color: var(--yellow-700);
    }

    .top {
        display: flex;
        flex-firection: colum;
        align-items: center;
        justify-content: center;
        height: 10rem;
        padding: 1rem;
        text-align: center;
        position: relative;
        .tag {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0.6rem 0 0.4rem 0;
            padding: 2px 4px;
            background: var(--gray-800);
        }
    }

    .bottom {
        font-size: 1rem;
        color: white;
        padding: 0.8rem;
        background-color: #2a210d;
        .btc {
            font-weight: 600;
        }
        .dollar {
            font-size: 0.9rem;
            color: var(--gray-300);
            margin-left: auto;
        }
    }
`
