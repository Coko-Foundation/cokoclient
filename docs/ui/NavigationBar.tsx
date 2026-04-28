import { ReactNode } from 'react'
import styled from 'styled-components'

import { th, grid } from '../../src/toolkit'

const Wrapper = styled.div`
  font-size: 1.2rem;
  background-color: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};
  padding: ${grid(4)};
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;

  box-shadow: 1px 1px 3px rgb(0 0 0 / 15%);
  z-index: 100;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-weight: bold;
`

const Logo = styled.img`
  height: 24px;
  margin-right: ${grid(2)};
`

// const links = {
//   'UI components': '',
// }

const NavigationBar = (): ReactNode => {
  return (
    <Wrapper>
      <Title>
        <Logo src="favicon.ico" />
        Coko client docs
      </Title>
    </Wrapper>
  )
}

export default NavigationBar
