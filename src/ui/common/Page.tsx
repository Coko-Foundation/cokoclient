import React from 'react'
import styled, { css } from 'styled-components'

import { type ThemeValue } from '../../toolkit'

type PageProps = {
  className?: string
  children?: React.ReactNode
  maxWidth?: number | null
}

const Wrapper = styled.div<{ $maxWidth?: number | null }>`
  height: 100%;

  ${(props): ThemeValue =>
    !!props.$maxWidth &&
    css`
      display: flex;
      justify-content: center;

      > div {
        max-width: ${props.$maxWidth}px;
      }
    `}
`

const Page = (props: PageProps): React.ReactNode => {
  const { className, children, maxWidth = null } = props

  return (
    <Wrapper $maxWidth={maxWidth} className={className}>
      {children}
    </Wrapper>
  )
}

export default Page
