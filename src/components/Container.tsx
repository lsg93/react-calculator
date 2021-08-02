import React from 'react'
import styled from 'styled-components'

type Props = {
    children : React.ReactNode
}

const StyledContainer = styled.div`
    height : 100%;
    display : flex;
    flex-direction: column;
    background-color : #A9BCD0;
`
const Container: React.FC<Props> = ({children}) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}

export default Container
