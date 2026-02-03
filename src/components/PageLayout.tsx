import { ComponentType, ReactNode } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

import { fadeIn, grid, th } from '../toolkit'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100vh;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }
`

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const fadeInPage = css`
  animation: ${fadeIn} 0.5s;
`

const padPage = css`
  padding: ${grid(2)} ${grid(2)} 50px ${grid(2)};
`

type PageProps = {
  $padPages?: boolean
  $fadeInPages?: boolean
}

const Page = styled.div<PageProps>`
  flex: auto;
  font-family: ${th('fontInterface')};
  height: 100%;
  overflow-y: auto;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props => props.$padPages && padPage}

  /* stylelint-disable-next-line no-descending-specificity */
  > div {
    ${props => props.$fadeInPages && fadeInPage}
  }
`

type LayoutProps = {
  children?: ReactNode
  className?: string
  fadeInPages?: boolean
  padPages?: boolean
  navComponent?: ComponentType | null
}

// TO DO -- move global style to root when you export that from this client
const Layout = ({
  children,
  className,
  fadeInPages = true,
  padPages = true,
  navComponent = null,
}: LayoutProps): ReactNode => {
  const NavComponent = navComponent

  return (
    <>
      <GlobalStyle />
      <PageLayout className={className}>
        {NavComponent && <NavComponent />}
        <Page $fadeInPages={fadeInPages} $padPages={padPages}>
          {children}
        </Page>
      </PageLayout>
    </>
  )
}

export default Layout
