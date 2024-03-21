import React from 'react'
import styled from 'styled-components'
import { Row } from '../../theme/base'
import { Card } from 'primereact/card';
import Copy from '../../components/Icons/Copy'

const Balance = () => {

    const showAddress = (address) => {
        return 'bc1pzfv8arm94hfgc4gdvsxk8c4h6jt0ln3lweh8sqw0u00ddnjtzzuq3usrf6'.replace(/^(\w{7}).*(\w{7})$/, '$1......$2');
    }

    return (
        <BalanceWrapper>
            <Card className="w-60rem mx-auto mt-8">
                <FlexRow>
                    <p>{ showAddress() }</p>
                    <Copy />
                </FlexRow>
            </Card>
        </BalanceWrapper>
    )
}

export default Balance


const BalanceWrapper = styled.div`
    padding: 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const FlexRow = styled(Row)`
    font-size: 1.4rem;
    font-weight: bold;
`
