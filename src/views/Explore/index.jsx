import React from 'react'
import styled from 'styled-components'

const Explore = () => {
    const list = [1,2,3,4,5,6,7,8,9]
    return (
        <ExploreWrapper>
            <ListWrapper>
                {
                    list.map((item, i) => {
                        return <ExploreItem key={i}>
                            <div className='top'>
                                <div className='main-content'>
                                    <img className='images' src="https://images.blur.io/_blur-prod/0x8821bee2ba0df28761afff119d66390d594cd280/4687-94d46c5ea8b88297?w=512" alt="" />
                                </div>
                            </div>
                            <div className='bottom'>Name #121212</div>
                        </ExploreItem>
                    })
                }
            </ListWrapper>
        </ExploreWrapper>
    )
}

export default Explore


const ExploreWrapper = styled.div`
    padding: 5rem 2rem;
    min-height: calc(100vh - ${({ theme }) => theme.height});
`
const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
    gap: 1rem;
    max-width: 1100px;
    margin: 0 auto;
`
const ExploreItem = styled.div`
    border: 1px solid var(--gray-800);
    border-radius: 0.6rem;
    transition: all .5s;
    overflow: hidden;
    &:hover {
        border-color: var(--yellow-700);
    }
    .top {
        display: flex;
        flex-firection: colum;
        align-items: center;
        justify-content: center;
        height: 10rem;
        padding: 1rem;
        text-align: center;
        position: relative;
        overflow: hidden;
        .main-content {
            white-space: pre-line;

            .images {
                object-fit: contain;
                width: 100%;
                height: 100%;
            }
        }
    }
    .bottom {
        font-size: 1rem;
        color: white;
        padding: 0.8rem;
        background-color: #2a210d;
    }
`
