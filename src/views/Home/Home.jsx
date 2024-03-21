import React from "react";
import styled from 'styled-components'
import { Button } from 'antd';

const Homewrapper = styled.div`
    min-height: calc(100vh - ${({ theme }) => theme.height});
`

const Home = () => {
    return(
        <Homewrapper>
            <Button type="primary">Primary Button</Button>
        </Homewrapper>
    )
}

export default Home

