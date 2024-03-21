import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.gap ? props.gap : '4px'};
`

export const ImgBase = styled.img`
    width: ${(props) => props.width ? props.width : '2rem'};
    display: block;
`