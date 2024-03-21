import styled from 'styled-components'

const Collection = () => {
    return (
        <CollectionWrapper>CollectionWrapper</CollectionWrapper>
    )
}

export default Collection


const CollectionWrapper = styled.div`
    padding: 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
