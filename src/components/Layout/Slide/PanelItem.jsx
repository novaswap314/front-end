import React, { Fragment } from "react";
import { useHistory } from 'react-router-dom'
import styled, { css } from "styled-components";

const PanelItem = ({ content, active }) => {
    const history = useHistory();

    const handleRoute = (path) => {
        history.push(path)
    }

    return (
        <Item active={ active } onClick={() => handleRoute(content.path)} >
            <ItemIcon><content.icon/></ItemIcon>
            <ItemCon>{content.title}</ItemCon>
        </Item>
    )
}


const Item = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px 12px;
    border-radius: 8px;
    color: ${({theme}) => theme.text3};
    &:hover {
        color: ${({theme}) => theme.text1};
    }
    ${({ active }) => active && css`
        background-color: ${({theme}) => theme.colorPrimary};
        color: ${({theme}) => theme.text1};
    `}
`
const ItemCon = styled.div`
    white-space: nowrap;
    font-family: var(--font-family);
`
const ItemIcon = styled.div`
    padding: 10px;
    font-size: 0;
    > svg {
        font-size: 14px;
    }
`


export default PanelItem