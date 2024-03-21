import React from "react";
import styled from "styled-components"

const HeaderBgWrapper = styled.div`
    height: ${({theme}) => theme.height};
    width: 100%;
    position: relative;
    z-index: -1;
`
const HeaderBgInner = styled.div`
    background: linear-gradient(180deg,#271d14 6.82%,rgba(20,24,38,0) 96.2%);
    height: ${({theme}) => theme.height2};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`

export default function HeaderBg() {
    return (
        <HeaderBgWrapper>
            <HeaderBgInner />
        </HeaderBgWrapper>
    )
}