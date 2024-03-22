import React, { Fragment } from "react";
import ArrowRight from '@/components/Icons/ArrowRight.jsx'
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { globalActions } from '@/store/module/global';

const Hamburger = ({ className }) => {
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()
    const checkHamburger = () => {
        dispatch(globalActions.setHamburger(!global.isHamburger))
    }

    return (
        <HamburgerWrapper onClick={() => checkHamburger()} rotate={global.isHamburger?'true':''} className={className}>
            <ArrowRight/>
        </HamburgerWrapper>
    )
}

const HamburgerWrapper = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #444;
    cursor: pointer;
    color: ${({ theme }) => theme.text2};
    transform: rotate(0deg);
    &:hover {
        color: ${({ theme }) => theme.text1};
    }
    ${({ rotate }) => rotate && css`
        transform: rotate(180deg);
    `}

`

export default Hamburger