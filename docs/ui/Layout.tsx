import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): React.ReactNode => {
  return <Wrapper>{children}</Wrapper>
}

export default Layout
