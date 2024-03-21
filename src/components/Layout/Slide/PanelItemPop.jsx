import React, { Fragment } from "react";
import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom'
import styled, { css } from "styled-components";

const PanelItemPop = ({ content, active }) => {
    const history = useHistory();

    const handleRoute = (path) => {
        history.push(path)
    }

    return (
        <Item active={ active } onClick={() => handleRoute(content.path)} >
            <Tooltip placement="right" title={content.title}>
                <ItemIcon><content.icon/></ItemIcon>
            </Tooltip>
        </Item>
    )
}

const Item = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    color: ${({theme}) => theme.text3};
    ${({ active }) => active && css`
        background-color: ${({theme}) => theme.colorPrimary};
        color: ${({theme}) => theme.text1};
    `}
`
const ItemIcon = styled.div`
    padding: 12px;
    font-size: 0;
    &:hover {
        color: ${({theme}) => theme.text1};
    }
    > svg {
        font-size: 14px;
    }
`


export default PanelItemPop