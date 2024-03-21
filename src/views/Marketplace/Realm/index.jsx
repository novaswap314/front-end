import React from 'react'
import styled from 'styled-components'
import CardItem from '../../../components/CradItem'
import { Row } from '../../../theme/base'

const Realm = () => {
    const list = [1,2,3,4,5,6]

    return(
        <RealmWrapper>
            <ListWrapper>
                {
                    list.map((item, i) => {
                        return <CardItem key={i}>
                            <Title>sfsfs</Title>
                            <Description>ddd</Description>
                        </CardItem>
                    })
                }
            </ListWrapper>
        </RealmWrapper>
    )
}

export default Realm

const RealmWrapper = styled.div`
    padding: 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
    gap: 1rem;
`
const Title = styled.div`
    font-size: 2rem;
    color: white;
`
const Description = styled.div`
    font-size: 1rem;
    text-transform: uppercase;
    color: var(--gray-400);
`
