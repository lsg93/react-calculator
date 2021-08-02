import React from 'react';
import styled from 'styled-components'
import Container from './components/Container'
import Calculator from './components/Calculator'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body, #root {
    font-family: 'Roboto', sans-serif;
    height: 100%;
  }
  body {
    margin: 0;
  }`

const Title = styled.h1`
  color : #373F51;
  text-align: center;
`

const App: React.FC = () => {
  return( 
        <>
          <Container>
            <Title>React Calculator</Title>
            <Calculator/>
          </Container>
          <GlobalStyle/>
        </>
    )
}


export default App;
