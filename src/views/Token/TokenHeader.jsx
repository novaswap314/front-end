import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory, NavLink } from 'react-router-dom'

const MarketHeader = () => {

    const navList = [
        { label: 'All', id: 0, path: '/token/all' },
        { label: 'Hot Mint', id: 1, path: '/token/hot' },
    ]

    return (
        <HeaderWrapper>
            {
                navList.map(item => {
                    return <LinkWrapper activeClassName='active' key={item.id} to={item.path}>{ item.label }</LinkWrapper>
                })   
            }
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.8rem;
    margin: 2rem 2rem 0;
`
const LinkWrapper = styled(NavLink)`
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    padding: 0.3rem;
    min-width: 8rem;
    border-radius: 0.4rem;
    text-align: center;
    background-color: var(--gray-800);
    border: 1px solid var(--gray-200);

    &.active {
        color: ${({theme}) => theme.main};
        border: 1px solid ${({theme}) => theme.main};
        box-shadow: 0 2px 1rem rgba(235,185,76,.28);
    }
`

export default MarketHeader