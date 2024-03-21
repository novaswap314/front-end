import styled from 'styled-components'

export const Base = styled.button`
    padding: ${({ padding }) => (padding ? padding : '5px 20px')};
    width: ${({ width }) => (width ? width : 'auto')};
    font-weight: 600;
    text-align: center;
    border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : '20px'};
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'rgba(255, 255, 255, .1)'};
    outline: none;
    border: 1px solid transparent;
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: all .3s;
    font-family: var(--font-family);
    &:disabled {
        cursor: auto;
    }

    > * {
        user-select: none;
    }
`

export const Button = styled(Base)`
    border: 1px solid var(--gray-400);
    border-radius: 0.4rem;
    width: 100%;
    padding: 0.8rem;
    background-color: transparent;
    cursor: pointer;
    transition: all .5s;
    color: white;
    &:hover {
        background-color:  ${({theme}) => theme.main};
        border-color: ${({theme}) => theme.main};
    }
`