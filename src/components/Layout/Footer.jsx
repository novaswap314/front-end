import React from "react";
import styled from "styled-components";
import Github from "@/components/Icons/Github.jsx"

const Footer = () => {
    return (
        <FooterWrapper>
            <footer>
                <Github style={{fontSize: '1.3rem'}}/>
                <p>Service Service Service</p>
            </footer>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--gray-400);
`

export default Footer